const express = require("express");
const router = express.Router();

const {
  favratios,
  getTrendingMovies,
  getMovieTrailers,
  getSimilarMovies,
  getMovieDetails,
  getMoviesByCategory,
} = require("../controller/movieController");
const verifytoken = require("../middleware/authMiddleware");

router.get("/fav", verifytoken, favratios);
router.get("/trending", getTrendingMovies);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);
module.exports = router;
