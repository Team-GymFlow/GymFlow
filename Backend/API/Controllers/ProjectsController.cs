using Application.DTOs.Projects;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _service;
    private readonly TaskService _taskService;

    public ProjectsController(ProjectService service, TaskService taskService)
    {
        _service = service;
        _taskService = taskService;
    }

    // ✅ Alla får läsa
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    // ✅ Alla får läsa
    [HttpGet("{id:int}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _service.GetByIdAsync(id);
        return project is null ? NotFound() : Ok(project);
    }

    // 🔒 Bara Admin får skapa
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] ProjectCreateDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // 🔒 Bara Admin får uppdatera
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] ProjectUpdateDto dto)
    {
        var ok = await _service.UpdateAsync(id, dto);
        return ok ? NoContent() : NotFound();
    }

    // 🔒 Bara Admin får radera
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }

    // (Valfritt) Om du vill att ALLA ska få se tasks, låt den vara AllowAnonymous.
    // Vill du att bara Admin ska se tasks? Byt till [Authorize(Roles="Admin")]
    [HttpGet("{projectId:int}/tasks")]
    [AllowAnonymous]
    public async Task<IActionResult> GetTasksForProject(int projectId)
    {
        var tasks = await _taskService.GetByProjectIdAsync(projectId);
        return Ok(tasks);
    }
}
