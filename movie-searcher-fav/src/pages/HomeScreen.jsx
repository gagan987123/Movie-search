import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Info, Play } from "lucide-react";
import MovieSlider from "../components/MovieSlider";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { useContentStore } from "../store/ContentStore";
const MOVIE_CATEGORIES = ["now_playing", "top_rated", "popular", "upcoming"];
const TV_CATEGORIES = ["airing_today", "on_the_air", "popular", "top_rated"];
const HomeScreen = () => {
  const { trendingContents } = useGetTrendingContent();
  console.log(trendingContents);
  const { contentType } = useContentStore();
  if (!trendingContents)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />

        <img
          src={
            "https://image.tmdb.org/t/p/original" +
            trendingContents?.backdrop_path
          }
          alt="Hero img"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 shimmer"
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 z-20">
          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold">
              {trendingContents?.title || trendingContents?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContents?.release_date?.split("-")[0] ||
                trendingContents?.first_air_date?.split("-")[0] ||
                "N/A"}
            </p>

            <p className="mt-4 text-lg">
              {trendingContents?.overview?.length > 200
                ? `${trendingContents?.overview.slice(0, 200)}...`
                : trendingContents?.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContents?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>

            <Link
              to={`/watch/${trendingContents?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
