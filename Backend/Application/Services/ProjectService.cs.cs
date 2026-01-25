using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class ProjectService
{
    private readonly IProjectRepository _repo;

    public ProjectService(IProjectRepository repo)
    {
        _repo = repo;
    }

    public Task<IEnumerable<Project>> GetAllAsync()
        => _repo.GetAllAsync();

    public Task<Project?> GetByIdAsync(int id)
        => _repo.GetByIdAsync(id);

    public async Task<Project> CreateAsync(Project project)
    {
        await _repo.AddAsync(project);
        return project;
    }

    public async Task<bool> UpdateAsync(int id, Project project)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        existing.Name = project.Name;
        existing.Description = project.Description;

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
