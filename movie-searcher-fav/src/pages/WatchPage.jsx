import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContentStore } from "../store/ContentStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
const WatchPage = () => {
  const sliderRef = useRef(null);
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const [content, setContent] = useState({});
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  function formatReleaseDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/${contentType}/${id}/trailers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const rest = await axios.get(
          `https://api.themoviedb.org/3/${contentType}/${id}/similar?api_key=0cc45ff11992894728ed77cd9cfccfe2`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("similar");
        console.log(rest);
        setSimilarContent(rest.data.results || []);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/${contentType}/${id}/details`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      }
    };

    getContentDetails();
  }, [contentType, id]);
  const handleNext = () => {
    if (currentTrailerIdx < trailers.length - 1)
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };
  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
              }}
							`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed "
                  : ""
              }}
							`}
              disabled={currentTrailerIdx === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>
          <img
            src={"https://image.tmdb.org/t/p/original" + content?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {similarContent?.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + content.poster_path
                      }
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default WatchPage;
