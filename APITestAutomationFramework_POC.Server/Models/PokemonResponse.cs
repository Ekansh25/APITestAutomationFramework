namespace APITestAutomationFramework_POC.Server.Models
{
    public class PokemonResponse
    {
        public int Count { get; set; }
        public string Next { get; set; }
        public string Previous { get; set; }
        public List<PokemonResult> Results { get; set; }
    }

    public class PokemonResult
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }

}
