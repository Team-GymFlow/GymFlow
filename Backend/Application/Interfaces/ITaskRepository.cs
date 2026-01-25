<<<<<<< HEAD
﻿using Domain.Entities;
using Domain.Models;
=======
using Domain.Entities;
>>>>>>> feature/repository-and-services

namespace Application.Interfaces;

public interface ITaskRepository
{
    Task<IEnumerable<TaskItem>> GetAllAsync();
    Task<TaskItem?> GetByIdAsync(int id);
    Task AddAsync(TaskItem task);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(TaskItem task);
}
