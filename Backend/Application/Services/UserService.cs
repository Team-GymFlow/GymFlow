using Application.DTOs.Users;
using Application.Interfaces;
using Application.Mapping;

namespace Application.Services;

public class UserService
{
    private readonly IUserRepository _repo;

    public UserService(IUserRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<UserDto>> GetAllAsync()
        => (await _repo.GetAllAsync()).Select(u => u.ToDto());

    public async Task<UserDto?> GetByIdAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        return user is null ? null : user.ToDto();
    }

    public async Task<UserDto> CreateAsync(UserCreateDto dto)
    {
        var user = dto.ToEntity();
        await _repo.AddAsync(user);
        return user.ToDto();
    }

    public async Task<bool> UpdateAsync(int id, UserUpdateDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        existing.ApplyUpdate(dto);
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
