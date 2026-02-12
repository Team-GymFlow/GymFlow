namespace Application.DTOs.Exercises;

public class ExerciseUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public string? ImageUrl { get; set; }
    public string? YouTubeUrl { get; set; }


    public int? DifficultyLevel { get; set; }
}