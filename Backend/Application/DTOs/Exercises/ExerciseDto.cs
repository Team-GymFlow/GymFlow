namespace Application.DTOs.Exercises;
using Domain.Enums;


public class ExerciseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? YouTubeUrl { get; set; }


   public int DifficultyLevel { get; set; }

    public string? ImageUrl { get; set; }     // ✅ NYTT

    public List<int> MuscleGroupIds { get; set; } = new(); // ✅ NYTT
}
