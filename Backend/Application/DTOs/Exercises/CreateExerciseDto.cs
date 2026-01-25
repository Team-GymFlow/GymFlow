using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Exercises;

public class CreateExerciseDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = null!;

    [Required]
    public string DifficultyLevel { get; set; } = null!;
}
