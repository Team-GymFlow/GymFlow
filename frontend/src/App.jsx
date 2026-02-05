import AppRouter from "./router/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <AppRouter />
      </main>

      <Footer />
    </>
  );
}

export default App;
