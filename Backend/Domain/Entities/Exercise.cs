namespace Domain.Entities;
using Domain.Enums;
public class Exercise
{
    

    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public DifficultyLevel DifficultyLevel { get; set; }// 1=Easy, 2=Medium, 3=Hard
    public string? ImageUrl { get; set; }
    public string? YouTubeUrl { get; set; }

    // Navigation properties
    public ICollection<ExerciseMuscleGroup> ExerciseMuscleGroups { get; set; } = new List<ExerciseMuscleGroup>();

    
    // NYTT: Favorites
    public ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();
}