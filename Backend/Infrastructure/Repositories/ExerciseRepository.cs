using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ExerciseRepository : IExerciseRepository
{
    private readonly AppDbContext _db;

    public ExerciseRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Exercise>> GetAllAsync()
        => await _db.Exercises.ToListAsync();

    public async Task<Exercise?> GetByIdAsync(int id)
        => await _db.Exercises.FirstOrDefaultAsync(x => x.Id == id);

    public async Task<Exercise> AddAsync(Exercise exercise)
    {
        _db.Exercises.Add(exercise);
        await _db.SaveChangesAsync();
        return exercise;
    }

    public async Task<bool> UpdateAsync(Exercise exercise)
    {
        _db.Exercises.Update(exercise);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Exercise exercise)
    {
        _db.Exercises.Remove(exercise);
        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<List<Exercise>> GetByMuscleGroupAsync(int muscleGroupId)
    {
        return await _db.ExerciseMuscleGroups
            .Where(x => x.MuscleGroupId == muscleGroupId)
            .Select(x => x.Exercise)
            .Distinct()
            .ToListAsync();
    }
}
