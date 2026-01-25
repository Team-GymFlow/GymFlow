<<<<<<< HEAD
﻿using Domain.Entities;
using Domain.Models;
=======
using Domain.Entities;
>>>>>>> feature/repository-and-services

namespace Application.Interfaces;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllAsync();
    Task<Project?> GetByIdAsync(int id);
    Task AddAsync(Project project);
    Task UpdateAsync(Project project);
    Task DeleteAsync(Project project);
}
