namespace Application.DTOs.Exercises;

public class ExerciseUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    // valfri vid update
    public int? DifficultyLevel { get; set; }
}
