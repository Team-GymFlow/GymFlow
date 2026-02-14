using Application.DTOs.Projects;
using Application.Interfaces;
using Application.Mappings;

namespace Application.Services;

public class ProjectService
{
    private readonly IProjectRepository _repo;

    public ProjectService(IProjectRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ProjectDto>> GetAllAsync()
    {
        var projects = await _repo.GetAllAsync();
        return projects.Select(p => p.ToDto());
    }

    public async Task<ProjectDto?> GetByIdAsync(int id)
    {
        var project = await _repo.GetByIdAsync(id);
        return project?.ToDto();
    }

    // ✅ MÅSTE vara 2 argument
    public async Task<ProjectDto> CreateAsync(ProjectCreateDto dto, int userId)
    {
        var entity = dto.ToEntity();
        entity.UserId = userId;

        await _repo.AddAsync(entity);
        return entity.ToDto();
    }

    public async Task<bool> UpdateAsync(int id, ProjectUpdateDto dto)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        dto.UpdateEntity(existing);
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
