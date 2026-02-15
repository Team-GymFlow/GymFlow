using Domain.Entities;

namespace Application.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task DeleteAsync(User user);
    Task AddFavoriteAsync(int userId, int exerciseId);
Task RemoveFavoriteAsync(int userId, int exerciseId);
Task<IEnumerable<Exercise>> GetUserFavoritesAsync(int userId);

}
