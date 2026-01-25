<<<<<<< HEAD
﻿using Domain.Entities;
using Domain.Models;
=======
using Domain.Entities;
>>>>>>> feature/repository-and-services

namespace Application.Interfaces;

public interface IUserRepository
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
    Task AddAsync(User user);
<<<<<<< HEAD
    Task UpdateAsync(User user);
=======
>>>>>>> feature/repository-and-services
    Task DeleteAsync(User user);
}
