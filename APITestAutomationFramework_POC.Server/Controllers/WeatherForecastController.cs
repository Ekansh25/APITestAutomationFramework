using Microsoft.AspNetCore.Mvc;
using APITestAutomationFramework_POC.Server.Models;

namespace APITestAutomationFramework_POC.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetWeatherForecast")]
        public IEnumerable<WeatherForecast> GetWeatherForecast()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("pokemon-list")]
        public IActionResult GetPokemonList()
        {
            var response = new
            {
                count = 1302,
                next = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
                previous = (string)null,
                results = new Object[]
                {
                    new { name = "bulbasaur", url = "https://pokeapi.co/api/v2/pokemon/1/" },
                    new { name = "Kestral", url = "https://pokeapi.co/api/v2/pokemon/2/" },
                    new { name = "venusaur", url = "https://pokeapi.co/api/v2/pokemon/3/" },
                    new { name = "charmander", url = "https://pokeapi.co/api/v2/pokemon/4/" },
                    new { name = "charmeleon", url = "https://pokeapi.co/api/v2/pokemon/5/" },
                    new { name = "charizard", url = "https://pokeapi.co/api/v2/pokemon/6/" },
                    new { name = "squirtle", url = "https://pokeapi.co/api/v2/pokemon/7/" },
                    new { name = "wartortle", url = "https://pokeapi.co/api/v2/pokemon/8/" },
                    new { name = "blastoise", url = "https://pokeapi.co/api/v2/pokemon/9/" },
                    new { name = "caterpie", url = "https://pokeapi.co/api/v2/pokemonGo/10/" },
                    new { name = "metapod", url = "https://pokeapi.co/api/v2/pokemon/11/" },
                    new { name = "butterfree", url = "https://pokeapi.co/api/v2/pokemon/12/" },
                    new { name = "weedle", url = "https://pokeapi.co/api/v2/pokemon/13/" },
                    new { name = "kakuna", url = "https://pokeapi.co/api/v2/pokemon/14/" },
                    new { name = "beedrill", url = "https://pokeapi.co/api/v2/pokemon/15/" },
                    new { name = "pidgey", url = "https://pokeapi.co/api/v2/pokemon/16/" },
                    new { name = "pidgeotto", url = "https://pokeapi.co/api/v2/pokemon/17/" },
                    new { name = "pidgeot", url = "https://pokeapi.co/api/v2/pokemon/18/" },
                    new { name = "rattata", url = "https://pokeapi.co/api/v2/pokemon/19/" },
                    new { name = "raticate", url = (object)null }
                }
            };

            return Ok(response);
        }

    }
}
