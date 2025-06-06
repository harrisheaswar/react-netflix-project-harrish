import type { Movie, MovieDetails } from "@/types/types";
import {
  Check,
  Play,
  Plus,
  ThumbsUp,
  Volume2,
  VolumeOff,
  X,
} from "lucide-react";
import { useEffect, useState, type FC } from "react";
import "./modalStyles.css";
import { useUtilsContext } from "@/context/UtilsContext";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { tmdbApi } from "@/tmdbApi";
import SimilarMovieCard from "../SimilarMovieCard/SimilarMovieCard";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieData: MovieDetails;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, movieData }) => {
  if (!isOpen) return null;
  const { addToFavoriteList } = useUtilsContext();
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoId, setVideoId] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("movieList") || "[]");
    console.log(list);
    setAddedToFavorites(
      list.some((item: Movie) => item && item?.id === movieData?.id)
    );
    const fetchData = async () => {
      const [trailerResponse, movieDetailsResponse, similarMoviesResponse] =
        await Promise.all([
          tmdbApi.getMovieTrailer(movieData.id),
          tmdbApi.getMovieDetails(movieData.id),
          tmdbApi.getSimilarMovies(movieData.id),
        ]);
      if (trailerResponse.error) {
        setVideoId("");
      } else if (trailerResponse.data) {
        setVideoId(trailerResponse.data.results[0].key);
      }
      if (movieDetailsResponse.error) {
        setMovieDetails(null);
      } else if (movieDetailsResponse.data) {
        setMovieDetails(movieDetailsResponse.data);
      }
      if (similarMoviesResponse.error) {
        console.log(similarMoviesResponse);
        setSimilarMovies([]);
      } else if (similarMoviesResponse.data) {
        setSimilarMovies(similarMoviesResponse?.data?.results);
        console.log(similarMoviesResponse?.data?.results);
      }
    };
    fetchData();
  }, [isOpen]);

  return (
    <>
      <div className="modalMainContainer">
        <div className="modalContainer">
          <button
            style={{
              position: "absolute",
              top: 20,
              right: 10,
              backgroundColor: "#141414",
              color: "white",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              pointerEvents: "auto",
              zIndex: 5,
              cursor: "pointer",
            }}
            onClick={() => {
              onClose();
            }}
          >
            <X size={20} />
          </button>
          <div className="playContainer" style={{ zIndex: 1000 }}>
            <div>
              <p
                style={{
                  fontSize: "3vw",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {movieDetails?.title}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  pointerEvents: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    style={{
                      display: "flex",
                      fontSize: "20px",
                      backgroundColor: "white",
                      color: "black",
                      alignItems: "center",
                      padding: "12px 40px",
                      borderRadius: "5px",
                      border: "none",
                      fontWeight: "500",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <Play size={20} fill="black" />
                    <span>Play</span>
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      border: "1px solid rgba(255, 255, 255, 0.7)",
                      padding: "12px 12px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "rgba(255, 255, 255, 0.7)",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      addToFavoriteList(movieDetails as Movie);
                      setAddedToFavorites(!addedToFavorites);
                    }}
                  >
                    {addedToFavorites ? (
                      <Check size={25} />
                    ) : (
                      <Plus size={25} />
                    )}
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      border: "1px solid rgba(255, 255, 255, 0.7)",
                      padding: "12px 12px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "rgba(255, 255, 255, 0.7)",
                      cursor: "pointer",
                    }}
                  >
                    <ThumbsUp size={25} />
                  </button>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(255, 255, 255, 0.7)",
                    padding: "12px 12px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.7)",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsMuted((prev) => !prev)}
                >
                  {isMuted ? <VolumeOff size={25} /> : <Volume2 size={25} />}
                </button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "14px",
                color: "gray",
                fontWeight: "600",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span style={{ color: "green" }}>
                    {movieDetails?.vote_average
                      ? `${(movieDetails?.vote_average * 10).toFixed(0)}% Match`
                      : "N/A"}
                  </span>
                  <span>
                    {movieDetails?.release_date
                      ? movieDetails?.release_date.slice(0, 4)
                      : "2hrs 14min"}
                  </span>
                  <span
                    style={{
                      border: "1px solid gray",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "1px 1px 1px 3px",
                      margin: "0px 0px",
                    }}
                  >
                    HD
                  </span>
                  <span>
                    {movieDetails?.runtime
                      ? movieDetails?.runtime + "mins"
                      : "2hrs 14min"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    fontWeight: "600",
                    color: "lightGray",
                  }}
                >
                  <span
                    style={{
                      border: "1px solid gray",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "1px 1px 1px 3px",
                      margin: "0px 0px",
                    }}
                  >
                    {movieDetails?.adult ? "A" : "U/A 16+"}
                  </span>
                  <span style={{ fontSize: "12px" }}>
                    {movieDetails?.genres
                      ? movieDetails.genres
                          .map((genre) => genre.name)
                          .join(", ")
                      : "adventure, action, intense"}
                  </span>
                </div>
                <div style={{ width: "60%" }}>
                  {movieDetails?.overview
                    ? movieDetails?.overview.slice(0, 200) + "..."
                    : "N/A"}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  gap: "10px",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  Original Language:{" "}
                  <span style={{ color: "lightGray" }}>
                    {movieDetails?.original_language || "en"}
                  </span>
                </div>
                <div style={{ display: "inline-block" }}>
                  Languages:{" "}
                  <span style={{ color: "lightGray" }}>
                    {movieDetails?.spoken_languages
                      ? movieDetails?.spoken_languages
                          ?.map((item) => item.english_name)
                          .join(", ")
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <h2>More Like This</h2>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                {similarMovies &&
                  similarMovies.map((movie) => (
                    <SimilarMovieCard movieDetails={movie} />
                  ))}
              </div>
            </div>
          </div>

          {videoId ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "60%",
                zIndex: 0,
              }}
            >
              <div className="modalVideoBackdrop"></div>
              <VideoPlayer videoId={videoId} isMuted={isMuted} />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "40%",
                zIndex: 0,
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
