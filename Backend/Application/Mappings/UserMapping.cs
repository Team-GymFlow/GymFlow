using Application.DTOs.Users;
using Domain.Entities;

namespace Application.Mapping;

public static class UserMapping
{
    public static UserDto ToDto(this User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        };
    }

    public static User ToEntity(this UserCreateDto dto)
    {
        return new User
        {
            Name = dto.Name,
            Email = dto.Email
        };
    }

    public static void ApplyUpdate(this User user, UserUpdateDto dto)
    {
        user.Name = dto.Name;
        user.Email = dto.Email;
    }
}
