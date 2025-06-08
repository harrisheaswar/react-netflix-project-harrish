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
import Spinner from "../CustomComponents/Spinner/Spinner";
import { useMovieContext } from "@/context/MovieContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieData: MovieDetails;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, movieData }) => {
  if (!isOpen) return null;
  const { addToFavoriteList, randomDuration } = useUtilsContext();
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoId, setVideoId] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { setModalOpen } = useMovieContext();
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("movieList") || "[]");
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
      <div className="modalMainContainer" onClick={(e) => e.stopPropagation()}>
        <div className="modalContainer">
          <button
            className="modalCloseButton"
            onClick={() => {
              onClose();
            }}
          >
            <X size={20} />
          </button>

          <div className="playContainer" style={{ zIndex: 1000 }}>
            <div>
              <p className="modalTitle">{movieDetails?.title}</p>
              <div className="modalPlayContainer">
                <div className="modalButtonSet">
                  <button
                    className="modalPlayButton"
                    onClick={() => {
                      navigate(`/watch/${videoId}`);
                      setModalOpen(false);
                    }}
                  >
                    <Play size={20} fill="black" />
                    <span>Play</span>
                  </button>
                  <button
                    className="modalOtherButtons"
                    onClick={() => {
                      addToFavoriteList(movieDetails as Movie);
                      setAddedToFavorites(!addedToFavorites);
                      !addedToFavorites
                        ? toast.success(`Added to Favorites (MyList Page)`)
                        : toast.success(`Removed from Favorites (MyList Page)`);
                    }}
                  >
                    {addedToFavorites ? (
                      <Check size={25} />
                    ) : (
                      <Plus size={25} />
                    )}
                  </button>
                  <button className="modalOtherButtons">
                    <ThumbsUp size={25} />
                  </button>
                </div>
                <button
                  className="modalOtherButtons"
                  onClick={() => setIsMuted((prev) => !prev)}
                >
                  {isMuted ? <VolumeOff size={25} /> : <Volume2 size={25} />}
                </button>
              </div>
            </div>
            <div className="modalMovieDetailsContainer">
              <div className="modalDetails">
                <div className="durationDetails">
                  <span style={{ color: "green" }}>
                    {movieDetails?.vote_average
                      ? `${(movieDetails?.vote_average * 10).toFixed(0)}% Match`
                      : "N/A"}
                  </span>
                  <span>
                    {movieDetails?.release_date
                      ? movieDetails?.release_date.slice(0, 4)
                      : "2015"}
                  </span>
                  <span className="pegiStyleDetails">HD</span>
                  <span>
                    {movieDetails?.runtime
                      ? movieDetails?.runtime + "mins"
                      : "2hrs 14min"}
                  </span>
                </div>
                <div className="pegiDetails">
                  <span className="pegiStyleDetails">
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
              <div className="languageDetails">
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
            <div className="similarMoviesMainContainer">
              <h2>More Like This</h2>
              <div className="similarMoviesDetails">
                {similarMovies &&
                  similarMovies
                    .slice(0, 12)
                    .map((movie) => (
                      <SimilarMovieCard
                        movieDetails={movie}
                        duration={randomDuration()}
                      />
                    ))}
              </div>
            </div>
          </div>
          <div className="modalVideoContainer">
            {videoId ? (
              <>
                <div className="modalVideoBackdrop"></div>
                <VideoPlayer videoId={videoId} isMuted={isMuted} />
              </>
            ) : movieData?.backdrop_path ? (
              <>
                <div className="modalVideoBackdrop"></div>
                <img
                  style={{ width: "100%" }}
                  src={`https://image.tmdb.org/t/p/w500${movieData?.backdrop_path}`}
                />
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
