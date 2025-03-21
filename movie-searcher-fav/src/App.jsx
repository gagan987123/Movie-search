import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import { Loader } from "lucide-react";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { MovieProvider } from "./context/MovieContext";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import NotFoundPage from "../src/pages/404";

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  const navigate = useNavigate(); // ✅ Correctly defined here

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <MovieProvider>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <Login /> : <HomePage />} />
          <Route path="/signup" element={!user ? <SignUp /> : <HomePage />} />
          <Route path="/fav" element={user ? <Favorites /> : <Login />} />
          <Route path="/search" element={user ? <SearchPage /> : <Login />} />
          <Route path="/watch/:id" element={user ? <WatchPage /> : <Login />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </main>
    </MovieProvider>
  );
}

export default App;
