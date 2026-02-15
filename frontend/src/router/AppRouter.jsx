import { Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Landing from "../pages/Landing";
import MusclePage from "../pages/MusclePage";
import MyExercises from "../pages/MyExercises";
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
