namespace Domain.Entities;

public class UserFavorite
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    
    public int ExerciseId { get; set; }
    public Exercise Exercise { get; set; } = null!;
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}