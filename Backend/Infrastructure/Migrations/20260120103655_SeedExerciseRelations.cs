using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedExerciseRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DifficultyLevel = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MuscleGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MuscleGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ExerciseMuscleGroups",
                columns: table => new
                {
                    ExerciseId = table.Column<int>(type: "int", nullable: false),
                    MuscleGroupId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseMuscleGroups", x => new { x.ExerciseId, x.MuscleGroupId });
                    table.ForeignKey(
                        name: "FK_ExerciseMuscleGroups_Exercises_ExerciseId",
                        column: x => x.ExerciseId,
                        principalTable: "Exercises",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExerciseMuscleGroups_MuscleGroups_MuscleGroupId",
                        column: x => x.MuscleGroupId,
                        principalTable: "MuscleGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "DifficultyLevel", "Name" },
                values: new object[,]
                {
                    { 1, "Intermediate", "Bench Press" },
                    { 2, "Intermediate", "Squat" },
                    { 3, "Advanced", "Deadlift" },
                    { 4, "Beginner", "Bicep Curl" },
                    { 5, "Beginner", "Tricep Pushdown" },
                    { 6, "Beginner", "Crunches" },
                    { 7, "Intermediate", "Russian Twist" },
                    { 8, "Intermediate", "Overhead Shoulder Press" },
                    { 9, "Intermediate", "Rear Delt Fly" },
                    { 10, "Intermediate", "Barbell Row" },
                    { 11, "Advanced", "Pull-Up" },
                    { 12, "Intermediate", "Back Extension" },
                    { 13, "Intermediate", "Glute Bridge" },
                    { 14, "Intermediate", "Hamstring Curl" },
                    { 15, "Beginner", "Calf Raise" },
                    { 16, "Beginner", "Tibialis Raise" },
                    { 17, "Beginner", "Forearm Curl" }
                });

            migrationBuilder.InsertData(
                table: "MuscleGroups",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Chest" },
                    { 2, "Traps" },
                    { 3, "Abs" },
                    { 4, "Obliques" },
                    { 5, "Biceps" },
                    { 6, "Forearms" },
                    { 7, "Quads" },
                    { 8, "Lower legs" },
                    { 9, "Front and side delts" },
                    { 10, "Posterior delts" },
                    { 11, "Upper/mid back" },
                    { 12, "Lats" },
                    { 13, "Lower back" },
                    { 14, "Triceps" },
                    { 15, "Glutes" },
                    { 16, "Hamstrings" }
                });

            migrationBuilder.InsertData(
                table: "ExerciseMuscleGroups",
                columns: new[] { "ExerciseId", "MuscleGroupId", "Id" },
                values: new object[,]
                {
                    { 1, 1, 0 },
                    { 1, 9, 0 },
                    { 2, 7, 0 },
                    { 2, 15, 0 },
                    { 3, 13, 0 },
                    { 3, 15, 0 },
                    { 4, 5, 0 },
                    { 5, 14, 0 },
                    { 6, 3, 0 },
                    { 7, 4, 0 },
                    { 8, 9, 0 },
                    { 9, 10, 0 },
                    { 10, 11, 0 },
                    { 11, 12, 0 },
                    { 12, 13, 0 },
                    { 13, 15, 0 },
                    { 14, 16, 0 },
                    { 15, 8, 0 },
                    { 16, 8, 0 },
                    { 17, 6, 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseMuscleGroups_MuscleGroupId",
                table: "ExerciseMuscleGroups",
                column: "MuscleGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExerciseMuscleGroups");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "MuscleGroups");
        }
    }
}
