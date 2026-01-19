using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _taskService.GetAllAsync());

        [HttpPost]
        public async Task<IActionResult> Create(TaskItem task)
        {
            var created = await _taskService.CreateAsync(task);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
        }
    }
}
