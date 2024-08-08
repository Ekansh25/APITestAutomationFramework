﻿using Microsoft.AspNetCore.Mvc;
using APITestAutomationFramework_POC.Server.Models;
using APITestAutomationFramework_POC.Server.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace APITestAutomationFramework_POC.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class APITestController : ControllerBase
    {
        private readonly ISchemaService _schemaService;

        public APITestController(ISchemaService schemaService)
        {
            _schemaService = schemaService;
        }

        [HttpPost("create-schema")]
        public async Task<IActionResult> CreateSchema([FromBody] CreateSchemaRequest request)
        {
            var schema = await _schemaService.GenerateSchemaFromUrl(request.Url);
            if (schema == null)
            {
                return BadRequest("Failed to generate schema.");
            }
            return Ok(schema.ToString());
        }

        [HttpPost("run-tests")]
        public async Task<IActionResult> RunTests([FromBody] TestRequest request)
        {
            if (string.IsNullOrEmpty(request.Url) || string.IsNullOrEmpty(request.Schema.ToString()))
            {
                return BadRequest("Both URL and Schema are required.");
            }

            JObject schemaObject;
            try
            {
                schemaObject = JObject.Parse(request.Schema.ToString());
            }
            catch (JsonException ex)
            {
                return BadRequest($"Invalid schema: {ex.Message}");
            }

            var testResults = await _schemaService.RunTests(request.Url, schemaObject, request.ExpectedData);
            return Ok(testResults);
        }
    }
}