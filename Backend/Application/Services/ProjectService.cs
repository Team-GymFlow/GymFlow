using Application.Interfaces;
using Domain.Entities;

namespace Application.Services;

public class ProjectService
{
    private readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<Project>> GetAllAsync()
        => await _projectRepository.GetAllAsync();

    public async Task<Project> CreateAsync(Project project)
    {
        await _projectRepository.AddAsync(project);
        return project;
    }
}
