<<<<<<< HEAD
﻿using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Models;
=======
using Application.Interfaces;
using Domain.Entities;
>>>>>>> feature/repository-and-services

namespace Application.Services;

public class TaskService
{
<<<<<<< HEAD
    private readonly ITaskRepository _repo;

    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
        => await _repo.GetAllAsync();

    public async Task<TaskItem?> GetByIdAsync(int id)
        => await _repo.GetByIdAsync(id);

    public async Task<TaskItem> CreateAsync(TaskCreateDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            ProjectId = dto.ProjectId,
            Status = "New",
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(task);
        return task;
    }

    public async Task<bool> UpdateAsync(int id, TaskUpdateDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        existing.Title = dto.Title;
        existing.Description = dto.Description;
        existing.Status = dto.Status;
        existing.ProjectId = dto.ProjectId;

        await _repo.UpdateAsync(existing);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        await _repo.DeleteAsync(existing);
        return true;
=======
    private readonly ITaskRepository _taskRepository;

    public TaskService(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
        => await _taskRepository.GetAllAsync();

    public async Task<TaskItem> CreateAsync(TaskItem task)
    {
        task.Status ??= "New";
        task.CreatedAt = DateTime.UtcNow;

        await _taskRepository.AddAsync(task);
        return task;
    }

    public async Task UpdateAsync(TaskItem task)
        => await _taskRepository.UpdateAsync(task);

    public async Task DeleteAsync(int id)
    {
        var task = await _taskRepository.GetByIdAsync(id);
        if (task is null) return;

        await _taskRepository.DeleteAsync(task);
>>>>>>> feature/repository-and-services
    }
}
