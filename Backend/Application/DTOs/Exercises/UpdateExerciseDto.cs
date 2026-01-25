using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Exercises;

public class UpdateExerciseDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = null!;

    [MaxLength(500)]
    public string Description { get; set; } = null!;

    [Required]
    public string DifficultyLevel { get; set; } = null!;
<<<<<<< HEAD
}
=======
}
>>>>>>> feature/repository-and-services
