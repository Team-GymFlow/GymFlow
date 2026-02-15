namespace Domain.Entities;

public class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;

    // "User" eller "Admin"
    public string Role { get; set; } = "User";

    public string PasswordHash { get; set; } = null!;

    // Navigation property för favorites
    public ICollection<UserFavorite> UserFavorites { get; set; } = new List<UserFavorite>();
}