import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Home.css";

import { searchMovie, getPopularMovies } from "../services/api";
import Navbar from "../components/Navbar";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovie = await getPopularMovies();
        setMovies(popularMovie);
      } catch (err) {
        console.log(err);
        setError("failed to load");
      } finally {
        setLoding(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoding(true);
    try {
      const searchresult = await searchMovie(searchQuery);
      setMovies(searchresult);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movie..");
    } finally {
      setLoding(false);
    }
  };

  return (
    <>
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <div className="home bg-black">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="movies-grid">
            {movies.map(
              (movie) =>
                movie.title.toLowerCase().startsWith(searchQuery) && (
                  <MovieCard movie={movie} key={movie.id} />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
