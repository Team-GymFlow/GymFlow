import { useEffect } from "react";

function App() {

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_BASE}/api/projects`)
    .then(res => res.json())
    .then(data => console.log("API DATA:", data))
    .catch(err => console.error("FETCH ERROR:", err));
}, []);


  return <h1>GymFlow Frontend</h1>;
}

export default App;
