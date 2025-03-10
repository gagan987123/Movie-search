const BASE_URL = process.env.BASE_URL; //https://www.themoviedb.org/
const API_KEY = process.env.API_KEY; //https://www.themoviedb.org/

export const getPopularMovies = async() => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
};

export const searchMovie = async(query) => {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
    );
    const data = await res.json();
    return data.results;
};