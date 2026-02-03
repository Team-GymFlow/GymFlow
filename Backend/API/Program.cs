using Application.Interfaces;
using Application.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Database;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// FluentValidation (auto-validation + hitta validators)
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Application.Validation.TaskValidation.TaskCreateDtoValidator>();
// ^ du kan peka på vilken validator som helst i Application.Validation så hittas alla i samma assembly

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

// Repos
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();

// Services
builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ExerciseService>();

// För att UseAuthorization inte ska crasha
builder.Services.AddAuthorization();



// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
