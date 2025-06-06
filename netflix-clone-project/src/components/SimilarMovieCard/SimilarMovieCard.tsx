import { useMovieContext } from "@/context/MovieContext";
import { useUtilsContext } from "@/context/UtilsContext";
import type { Movie, MovieDetails } from "@/types/types";
import { Check, Play, Plus } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import "./similarMovieCardStyles.css";
interface SimilarMovieCard {
  movieDetails?: MovieDetails;
}

const SimilarMovieCard: FC<SimilarMovieCard> = ({ movieDetails }) => {
  const { setModalOpen } = useMovieContext();
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState<number | null>(null);
  const { addToFavoriteList } = useUtilsContext();
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>(false);

  const [imageSrc] = useState<string>(movieDetails?.backdrop_path || "");
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("movieList") || "[]");
    console.log(list);
    setAddedToFavorites(
      list.some((item: Movie) => item && item?.id === movieDetails?.id)
    );
  }, []);
  return imageSrc ? (
    <div
      className="similarMovieCard"
      onMouseEnter={() => setHovered(movieDetails?.id || null)}
      onMouseLeave={() => setHovered(null)}
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
          onClick={() => {
            addToFavoriteList(movieDetails as Movie);
            setAddedToFavorites(!addedToFavorites);
          }}
        >
          {addedToFavorites ? <Check size={25} /> : <Plus size={25} />}
        </button>
      </div>
      <p style={{ fontSize: "13px", fontWeight: "500", margin: "0px 10px" }}>
        {movieDetails?.overview.slice(0, 200) + "..."}
      </p>
    </div>
  ) : (
    <></>
  );
};

export default SimilarMovieCard;
