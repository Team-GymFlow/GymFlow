using Application.DTOs.Exercises;
using FluentValidation;

namespace Application.Validation.ExerciseValidation;

public class ExerciseCreateDtoValidator : AbstractValidator<ExerciseCreateDto>
{
    public ExerciseCreateDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MinimumLength(2).WithMessage("Name must be at least 2 characters long.")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

        RuleFor(x => x.Description)
            .MaximumLength(500).WithMessage("Description must not exceed 500 characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

       RuleFor(x => x.DifficultyLevel)
    .InclusiveBetween(1, 3)
    .WithMessage("DifficultyLevel must be 1, 2 or 3.");

    }
}
