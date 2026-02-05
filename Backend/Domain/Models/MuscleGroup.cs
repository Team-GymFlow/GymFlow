namespace Domain.Entities;

public class MuscleGroup
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; }
        = new List<ExerciseMuscleGroup>();
}
