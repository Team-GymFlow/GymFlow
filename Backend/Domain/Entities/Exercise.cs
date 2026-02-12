using Domain.Enums;

namespace Domain.Entities;

public class Exercise
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? YouTubeUrl { get; set; }


    public DifficultyLevel DifficultyLevel { get; set; } = DifficultyLevel.Easy;

    public List<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; } = new();
}