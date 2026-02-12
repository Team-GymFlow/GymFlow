using Application.DTOs.Projects;
using Domain.Entities;

namespace Application.Mappings;

public static class ProjectMappings
{
    public static Project ToEntity(this ProjectCreateDto dto)
    {
        return new Project
        {
            Name = dto.Name,
            UserId = dto.UserId   
        };
    }

    public static ProjectDto ToDto(this Project entity)
    {
        return new ProjectDto
        {
            Id = entity.Id,
            Name = entity.Name,
            UserId = entity.UserId
        };
    }

    public static void UpdateEntity(this ProjectUpdateDto dto, Project entity)
    {
        entity.Name = dto.Name;
    }
}
