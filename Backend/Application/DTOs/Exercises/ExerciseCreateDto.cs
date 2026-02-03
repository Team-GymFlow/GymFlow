namespace Application.DTOs.Exercises;

public class ExerciseCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    // 1=Easy, 2=Medium, 3=Hard
    public int? DifficultyLevel { get; set; }
}
