const User = require("../models/User");

const { fetchmoviedata } = require("../services/api");
const BASE_URL = "https://api.themoviedb.org/3";
const API = "0cc45ff11992894728ed77cd9cfccfe2";
exports.favratios = async (req, res) => {
  const user = req.user.id;
  const findUser = await User.findById(user);
  if (!findUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ fav: findUser.fav });
};

exports.getTrendingMovies = async (req, res) => {
  try {
    const data = await fetchmoviedata(
      `${BASE_URL}/trending/movie/day?api_key=${API}`
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchmoviedata(
      `${BASE_URL}/movie/${id}/videos?api_key=${API}`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchmoviedata(`${BASE_URL}/movie/${id}?api_key=${API}`);
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchmoviedata(
      `${BASE_URL}/movie/${id}/similar?api_key=${API}`
    );

    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchmoviedata(
      `${BASE_URL}/movie/${category}?api_key=${API}`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
