using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class UserService
{
    private readonly IUserRepository _repo;

    public UserService(IUserRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<User>> GetAllAsync()
        => _repo.GetAllAsync();

    public Task<User?> GetByIdAsync(int id)
        => _repo.GetByIdAsync(id);

    public async Task<User> CreateAsync(User user)
    {
        await _repo.AddAsync(user);
        return user;
    }

    public async Task<bool> UpdateAsync(int id, User user)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        existing.Name = user.Name;
        existing.Email = user.Email;

        await _repo.UpdateAsync(existing);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        await _repo.DeleteAsync(existing);
        return true;
    }
}
