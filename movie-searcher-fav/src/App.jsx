import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/fav" element={<Favorites />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
