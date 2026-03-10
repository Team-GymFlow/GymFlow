import { Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Landing from "../pages/Landing";
import MusclePage from "../pages/MusclePage";
import MyExercises from "../pages/MyExercises";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/muscles" element={<MusclePage />} />
          <Route path="/my-exercises" element={<MyExercises />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
