using Newtonsoft.Json.Linq;
using System.Text.Json;

namespace APITestAutomationFramework_POC.Server.Models
{
    public class TestResults
    {
        public int StatusCode { get; set; }
        public bool IsStatusCodeValid { get; set; }
        public JsonDocument ResponseBody { get; set; }
        public bool IsResponseBodyValid { get; set; }
        public bool IsResponseBodyStructureValid { get; set; }
        public List<string> ErrorMessages { get; set; }
        public bool IsResponseDataMatching { get; set; }
        public JsonDocument MismatchDetails { get; set; }
    }
}
