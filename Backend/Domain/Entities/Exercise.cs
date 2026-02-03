using Domain.Enums;

namespace Domain.Entities;

public class Exercise
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public DifficultyLevel DifficultyLevel { get; set; }

    public ICollection<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; }
        = new List<ExerciseMuscleGroup>();
}
