import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Exercises from "../pages/Exercises";
import ExerciseDetails from "../pages/ExerciseDetails";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exercises" element={<Exercises />} />
      <Route path="/exercises/:id" element={<ExerciseDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
