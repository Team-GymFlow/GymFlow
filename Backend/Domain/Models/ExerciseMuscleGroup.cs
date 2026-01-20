using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ExerciseMuscleGroup
    {
        public int Id { get; set; }
        public int ExerciseId { get; set; }
        public int MuscleGroupId { get; set; }
        MuscleGroupRole MuscleGroupRole { get; set; }
       

        public Exercise? Exercise { get; set; }
        public MuscleGroup? MuscleGroup { get; set; }

    }
}
