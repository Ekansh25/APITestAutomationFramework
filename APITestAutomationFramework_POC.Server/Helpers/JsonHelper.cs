using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;

namespace APITestAutomationFramework_POC.Server.Helpers
{
    public static class JsonHelper
    {
        public static bool IsValidJson(string strInput)
        {
            if (string.IsNullOrWhiteSpace(strInput)) return false;
            strInput = strInput.Trim();
            if ((strInput.StartsWith("{") && strInput.EndsWith("}")) ||
                (strInput.StartsWith("[") && strInput.EndsWith("]")))
            {
                try
                {
                    JToken.Parse(strInput);
                    return true;
                }
                catch (JsonReaderException) { return false; }
                catch (Exception) { return false; }
            }
            return false;
        }

        public static (bool isValid, List<string> errorMessages) ValidateResponseStructure(string responseBody, JSchema schema)
        {
            var errorMessages = new List<string>();
            try
            {
                var responseObj = JToken.Parse(responseBody);
                bool isValid = responseObj.IsValid(schema, out IList<string> validationErrors);
                errorMessages.AddRange(validationErrors);
                return (isValid, errorMessages);
            }
            catch (Exception ex)
            {
                errorMessages.Add($"Exception during validation: {ex.Message}");
                return (false, errorMessages);
            }
        }

        public static JSchema GenerateSchemaFromJson(string json)
        {
            var token = JToken.Parse(json);
            return GenerateSchema(token);
        }

        private static JSchema GenerateSchema(JToken token)
        {
            var schema = new JSchema();
            switch (token.Type)
            {
                case JTokenType.Object:
                    schema.Type = JSchemaType.Object;
                    foreach (var property in (JObject)token)
                    {
                        var propertySchema = GenerateSchema(property.Value);
                        schema.Properties[property.Key] = propertySchema;
                        schema.Required.Add(property.Key);
                    }
                    break;

                case JTokenType.Array:
                    schema.Type = JSchemaType.Array;
                    schema.Items.Add(GenerateSchema(((JArray)token).FirstOrDefault()));
                    break;

                case JTokenType.Integer:
                    schema.Type = JSchemaType.Integer;
                    break;

                case JTokenType.Float:
                    schema.Type = JSchemaType.Number;
                    break;

                case JTokenType.String:
                    schema.Type = JSchemaType.String;
                    break;

                case JTokenType.Boolean:
                    schema.Type = JSchemaType.Boolean;
                    break;

                case JTokenType.Null:
                    schema.Type = JSchemaType.Null;
                    break;

                default:
                    throw new InvalidOperationException($"Unsupported JTokenType: {token.Type}");
            }
            return schema;
        }
    }
}
