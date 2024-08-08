﻿namespace APITestAutomationFramework_POC.Server.Models
{
    public class TestResults
    {
        public int StatusCode { get; set; }
        public bool IsStatusCodeValid { get; set; }
        public string ResponseBody { get; set; }
        public bool IsResponseBodyValid { get; set; }
        public bool IsResponseBodyStructureValid { get; set; }
        public bool IsResponseDataMatching { get; set; }
        public List<string> ErrorMessages { get; set; }
    }
}
