using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;
using System.Text.Json;

namespace APITestAutomationFramework_POC.Server.Models
{
    public class CreateTestCaseResponse
    {
        public JsonDocument Schema { get; set; }
        public JsonDocument ExpectedResponse { get; set; }
    }
}
