import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useMovieContext } from "../context/MovieContext";
import "./Favorites.css";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";

const Favorites = () => {
  const { favorites } = useMovieContext();
  const [favs, setFavs] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:3000/fav", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include", // Ensures cookies are sent for session-based auth
        });

        if (response.status === 401 || response.status === 403) {
          toast.error("Unauthorized. Please log in.");
          navigate("/signup"); // Redirect to signup page
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFavs(data.fav || []); // Accessing the 'fav' array safely
      } catch (error) {
        console.error("Error:", error.message);
        toast.error("Failed to load favorites");
      }
    };

    fetchFavorites();
  }, [navigate]);

  if (favorites.length !== 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favs.length > 0 ? (
            favs.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p>No favorites found.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
    </div>
  );
};

export default Favorites;
