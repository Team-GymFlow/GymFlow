using Application.DTOs.Task;
using FluentValidation;

namespace Application.Validation.TaskValidation;

public class TaskUpdateDtoValidator : AbstractValidator<TaskUpdateDto>
{
    public TaskUpdateDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(100).WithMessage("Title max length is 100");

        RuleFor(x => x.Description)
            .MaximumLength(500).WithMessage("Description max length is 500");

        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Status is required")
            .MaximumLength(30).WithMessage("Status max length is 30");

        RuleFor(x => x.ProjectId)
            .GreaterThan(0).WithMessage("ProjectId must be greater than 0");
    }
}
