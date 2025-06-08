import { useMovieContext } from "@/context/MovieContext";
import { useUtilsContext } from "@/context/UtilsContext";
import type { Movie, MovieDetails } from "@/types/types";
import { Check, Play, Plus } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import "./similarMovieCardStyles.css";
import { tmdbApi } from "@/tmdbApi";
import toast from "react-hot-toast";
interface SimilarMovieCard {
  movieDetails?: MovieDetails;
  duration?: string;
}

const SimilarMovieCard: FC<SimilarMovieCard> = ({ movieDetails, duration }) => {
  const { setModalOpen } = useMovieContext();
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState<number | null>(null);
  const utilsContext = useUtilsContext();
  if (!utilsContext) return null;
  const { addToFavoriteList } = utilsContext;
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>(false);

  const [imageSrc] = useState<string>(movieDetails?.backdrop_path || "");
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("movieList") || "[]");
    setAddedToFavorites(
      list.some((item: Movie) => item && item?.id === movieDetails?.id)
    );
  }, []);

  const handlePlay = async () => {
    const trailerRes = await tmdbApi.getMovieTrailer(
      parseInt(movieDetails?.id.toString() || "")
    );
    if (trailerRes.error) {
      navigate(`/watch/404-not-found`);
      setModalOpen(false);
    } else {
      setModalOpen(false);
      if (trailerRes.data && trailerRes.data?.results?.length > 0) {
        navigate(`/watch/${trailerRes.data?.results[0].key}`);
      } else {
        navigate(`/watch/404-not-found`);
      }
    }
  };

  return imageSrc ? (
    <div
      className="similarMovieCard"
      onMouseEnter={() => setHovered(movieDetails?.id || null)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => handlePlay()}
    >
      <div className="similarMovieImageContainer">
        <div
          className="playButtonOnHover"
          style={{
            opacity: isHovered === movieDetails?.id ? 1 : 0,
          }}
        >
          <div className="similarMoviesPlayButton">
            <Play size={30} fill="white" />
          </div>
        </div>
        <div className="timeDuration">{duration}</div>
        <img
          src={`https://image.tmdb.org/t/p/w300${imageSrc}`}
          alt="img"
          style={{ width: "100%", height: "100%" }}
        />
        <h3 className="similarMovieTitle">{movieDetails?.title || "N/A"}</h3>
      </div>
      <div className="similarMovieMisc">
        <div style={{ display: "flex", gap: "8px", fontSize: "12px" }}>
          <span className="extraText">
            {movieDetails?.adult ? movieDetails.adult : "U/A 16+"}
          </span>
          <span className="extraText">HD</span>
          <span style={{ alignSelf: "center" }}>
            {movieDetails?.release_date
              ? movieDetails.release_date?.slice(0, 4)
              : "2015"}
          </span>
        </div>
        <button
          className="similarMovieFavButton"
          onClick={(e) => {
            e.stopPropagation();
            addToFavoriteList(movieDetails as Movie);
            setAddedToFavorites(!addedToFavorites);
            !addedToFavorites
              ? toast.success(`Added to Favorites (MyList Page)`)
              : toast.success(`Removed from Favorites (MyList Page)`);
          }}
        >
          {addedToFavorites ? <Check size={25} /> : <Plus size={25} />}
        </button>
      </div>
      <p style={{ fontSize: "13px", fontWeight: "500", margin: "0px 10px" }}>
        {movieDetails?.overview
          ? movieDetails?.overview.slice(0, 200) + "..."
          : "Description Not Available"}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default SimilarMovieCard;
