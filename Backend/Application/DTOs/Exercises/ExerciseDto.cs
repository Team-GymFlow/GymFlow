namespace Application.DTOs.Exercises;

public class ExerciseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    // Vi skickar enum som text ut till Swagger: "Easy", "Medium", "Hard"
    public string DifficultyLevel { get; set; } = "Easy";
}
