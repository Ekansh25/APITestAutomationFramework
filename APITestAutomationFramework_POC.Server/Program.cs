using APITestAutomationFramework_POC.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register SchemaService with dependency injection
builder.Services.AddScoped<ISchemaService, SchemaService>();

builder.Services.AddControllers();
// Register the IHttpClientFactory service
builder.Services.AddHttpClient();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
