import { Routes, Route } from "react-router-dom";

import HomePage  from "../pages/HomePage";
import Projects from "../pages/Projects";
import Exercises from "../pages/Exercises";
import ExerciseDetails from "../pages/ExerciseDetails";
import NotFound from "../pages/NotFound";
import Users from "../pages/Users";
import ProjectTasks from "../pages/ProjectTasks";
import MuscleExplorerPage from "../pages/MuscleExplorerPage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MuscleExercisesPage from "../pages/MuscleExercisesPage";

export default function AppRouter() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId/tasks" element={<ProjectTasks />} />
          <Route path="/users" element={<Users />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercises/:id" element={<ExerciseDetails />} />
          <Route path="/muscles" element={<MuscleExplorerPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/muscle/:muscleId" element={<MuscleExercisesPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
