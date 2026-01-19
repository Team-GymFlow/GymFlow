using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
        => await _userRepository.GetAllAsync();

    public async Task<User> CreateAsync(User user)
    {
        await _userRepository.AddAsync(user);
        return user;
    }
}
