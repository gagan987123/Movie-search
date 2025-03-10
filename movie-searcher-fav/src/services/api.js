const BASE_URL =
    import.meta.env.VITE_BASE_URL;
const API_KEY =
    import.meta.env.VITE_API_KEY;

//https://www.themoviedb.org/

export const getPopularMovies = async() => {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results;
};

export const searchMovie = async(query) => {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
    );
    const data = await res.json();
    return data.results;
};