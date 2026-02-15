using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    // ========================
    // BASIC CRUD
    // ========================

    public async Task<IEnumerable<User>> GetAllAsync()
        => await _context.Users
            .AsNoTracking()
            .ToListAsync();

    public async Task<User?> GetByIdAsync(int id)
        => await _context.Users
            .Include(u => u.UserFavorites)
            .ThenInclude(uf => uf.Exercise)
            .FirstOrDefaultAsync(u => u.Id == id);

    public async Task AddAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    // ========================
    // FAVORITES
    // ========================

    public async Task AddFavoriteAsync(int userId, int exerciseId)
    {
        var exists = await _context.UserFavorites
            .AnyAsync(uf => uf.UserId == userId && uf.ExerciseId == exerciseId);

        if (exists)
            return; // Undvik duplicat

        var favorite = new UserFavorite
        {
            UserId = userId,
            ExerciseId = exerciseId
        };

        _context.UserFavorites.Add(favorite);
        await _context.SaveChangesAsync();
    }

    public async Task RemoveFavoriteAsync(int userId, int exerciseId)
    {
        var favorite = await _context.UserFavorites
            .FirstOrDefaultAsync(uf =>
                uf.UserId == userId &&
                uf.ExerciseId == exerciseId);

        if (favorite is null)
            return;

        _context.UserFavorites.Remove(favorite);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Exercise>> GetUserFavoritesAsync(int userId)
    {
        return await _context.UserFavorites
            .Where(uf => uf.UserId == userId)
            .Include(uf => uf.Exercise)
            .Select(uf => uf.Exercise)
            .AsNoTracking()
            .ToListAsync();
    }
}
