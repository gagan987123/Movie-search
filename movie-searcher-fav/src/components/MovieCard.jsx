import React from "react";

const MovieCard = ({ movie }) => {
  function handlefav() {
    // alert("clicked");
  }
  return (
    <div className="movie-card">
      <div className="movie-img">
        <img src={movie.url} alt={movie.title} />
        <div className="movie-overlay">
          <button className="fav-btn" onClick={handlefav()}>
            Fav
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieCard;
