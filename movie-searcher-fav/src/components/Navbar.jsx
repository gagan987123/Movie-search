import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="logo" to="/">
            Netflix
          </Link>
          <Link className="small-link" to="/">
            Home
          </Link>

          <Link className="small-link" to="/">
            TV Shows
          </Link>

          <Link className="small-link" to="/">
            Movies
          </Link>
          <Link className="small-link" to="/">
            New & Popular
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/fav" className="nav-link">
            Favorites
          </Link>
        </div>
      </nav>
      <div className="back">
        <img
          className="back-img"
          src="https://cdn.europosters.eu/image/750/posters/twilight-movie-poster-i4603.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
