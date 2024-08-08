using APITestAutomationFramework_POC.Server.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using System.Threading.Tasks;

namespace APITestAutomationFramework_POC.Server.Services
{
    public interface ISchemaService
    {
        Task<JSchema> GenerateSchemaFromUrl(string url);
        Task<TestResults> RunTests(string url, JObject schemaObject, Object ExpectedData);
    }
}
