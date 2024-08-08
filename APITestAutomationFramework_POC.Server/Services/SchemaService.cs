using APITestAutomationFramework_POC.Server.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using System.Net.Http;
using System.Threading.Tasks;
using APITestAutomationFramework_POC.Server.Helpers;
using Newtonsoft.Json;

namespace APITestAutomationFramework_POC.Server.Services
{
    public class SchemaService : ISchemaService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public SchemaService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<JSchema> GenerateSchemaFromUrl(string url)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            return JsonHelper.GenerateSchemaFromJson(responseBody);
        }

        public async Task<TestResults> RunTests(string url, JObject schemaObject, Object expectedData)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(url);
            var responseBody = await response.Content.ReadAsStringAsync();

            JSchema schema;
            try
            {
                schema = JSchema.Parse(schemaObject.ToString());
            }
            catch (JsonException ex)
            {
                return new TestResults
                {
                    StatusCode = (int)response.StatusCode,
                    IsStatusCodeValid = false,
                    ResponseBody = $"Invalid schema: {ex.Message}",
                    IsResponseBodyValid = false,
                    IsResponseBodyStructureValid = false,
                    IsResponseDataMatching = false
                };
            }
            var (isValid, errorMessages) = JsonHelper.ValidateResponseStructure(responseBody, schema);
            return new TestResults
            {
                StatusCode = (int)response.StatusCode,
                IsStatusCodeValid = response.IsSuccessStatusCode,
                ResponseBody = responseBody,
                IsResponseBodyValid = JsonHelper.IsValidJson(responseBody),
                IsResponseBodyStructureValid = isValid,
                ErrorMessages = errorMessages
            };
        }
    }
}
