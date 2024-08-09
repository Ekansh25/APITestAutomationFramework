using APITestAutomationFramework_POC.Server.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using System.Net.Http;
using System.Threading.Tasks;
using APITestAutomationFramework_POC.Server.Helpers;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using JsonDiffPatchDotNet;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace APITestAutomationFramework_POC.Server.Services
{
    public class SchemaService : ISchemaService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly Dictionary<string, string> _expectedResponses; // Simulating a store for expected responses

        public SchemaService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
            _expectedResponses = new Dictionary<string, string>(); // In-memory store; replace with actual DB/storage
        }

        public async Task<CreateTestCaseResponse> GenerateSchemaFromUrl(string url)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            _expectedResponses[url] = responseBody;
            var schema = JsonHelper.GenerateSchemaFromJson(responseBody);

            CreateTestCaseResponse createTestCaseResponse = new()
            {
                Schema = JsonDocument.Parse(schema.ToString()),
                ExpectedResponse = JsonDocument.Parse(responseBody)
            };
            return createTestCaseResponse;
        }

        public async Task<TestResults> RunTests(string url, JObject schemaObject)
        {
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.GetAsync(url);
            var responseBody = await response.Content.ReadAsStringAsync();

            JSchema schema;
            try
            {
                schema = JSchema.Parse(schemaObject.ToString());
            }
            catch (Exception ex)
            {
                return new TestResults
                {
                    StatusCode = (int)response.StatusCode,
                    IsStatusCodeValid = false,
                    ResponseBody = JsonDocument.Parse($"Invalid schema: {ex.Message}"),
                    IsResponseBodyValid = false,
                    IsResponseBodyStructureValid = false,
                    IsResponseDataMatching = false
                };
            }
            var (isValid, errorMessages) = JsonHelper.ValidateResponseStructure(responseBody, schema);

            // Retrieve the expected response from the store
            var expectedResponse = _expectedResponses.ContainsKey(url) ? _expectedResponses[url] : null;

            // Use JsonDiffPatch to compare the actual response with the expected response
            var jdp = new JsonDiffPatch();
            JToken expectedJObject;
            JToken actualJObject;

            // Determine if the expected response is an array or an object
            if (expectedResponse.Trim().StartsWith("["))
            {
                expectedJObject = JArray.Parse(expectedResponse);
            }
            else
            {
                expectedJObject = JObject.Parse(expectedResponse);
            }

            // Determine if the actual response is an array or an object
            if (responseBody.Trim().StartsWith("["))
            {
                actualJObject = JArray.Parse(responseBody);
            }
            else
            {
                actualJObject = JObject.Parse(responseBody);
            }


            // Get the differences
            var diff = jdp.Diff(expectedJObject, actualJObject);

            var isMatch = diff == null; // diff is null if the objects are identical


            return new TestResults
            {
                StatusCode = (int)response.StatusCode,
                IsStatusCodeValid = response.IsSuccessStatusCode,
                ResponseBody = JsonDocument.Parse(responseBody),
                IsResponseBodyValid = JsonHelper.IsValidJson(responseBody),
                IsResponseBodyStructureValid = isValid,
                ErrorMessages = errorMessages,
                IsResponseDataMatching = isMatch,
                MismatchDetails = diff != null ? JsonDocument.Parse(diff.ToString()) : null
            };
        }
    
    }
}
