import React, { useEffect, useState, type FC } from "react";
import "./popUpCardStyles.css";
import {
  Check,
  ChevronDown,
  Play,
  Plus,
  ThumbsUp,
  Volume2,
  VolumeOff,
} from "lucide-react";
import "../Hero/heroStyles.css";
import { tmdbApi } from "@/tmdbApi";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useCardContext } from "@/context/CardContext";
import type { Movie } from "@/types/types";
import { useMediaQuery } from "react-responsive";
import { useUtilsContext } from "@/context/UtilsContext";
import { Link } from "react-router";
import { useMovieContext } from "@/context/MovieContext";
import toast from "react-hot-toast";
interface PopUpCardProps {
  isHovered: boolean;
  x: number;
  y: number;
}

const PopUpCard: FC<PopUpCardProps> = ({ isHovered, x, y }) => {
  const { cardState, setCardState } = useCardContext();
  const { setModalOpen, setSelectedMovie } = useMovieContext();
  const { addToFavoriteList } = useUtilsContext();
  const [thumbsUp, setThumbsUp] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const [title, setTitle] = useState<string>("MOVIE");
  const [muted, setMuted] = useState<boolean>(true);
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [movieId, setMovieId] = useState<number>(0);
  const [faveData, setFavData] = useState<Movie | null>(null);
  const [addedToFavorites, setAddedToFavorites] = useState<boolean>(false);
  const handlePopoverMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardState((prev: any) => ({
      position: { x: -1000, y: 0 },
      isHovered: false,
      cardId: null,
      item: null,
    }));
    setShowTrailer(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (cardState.isHovered) {
        setCardState((prev: any) => ({
          ...prev,
          isHovered: false,
        }));
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [cardState.isHovered, setCardState]);

  useEffect(() => {
    if (cardState.item) {
      setImgUrl(
        ` https://image.tmdb.org/t/p/w500${cardState.item.backdrop_path}`
      );
      setTitle(cardState?.item?.title || "MOVIE");
      setMovieId(cardState?.item?.id);
      setFavData(cardState?.item);

      let list = JSON.parse(localStorage.getItem("movieList") || "[]");
      console.log(list);
      setAddedToFavorites(
        list.some((item: Movie) => item && item.id === cardState.item.id)
      );
      const fetchDetails = async () => {
        const trailerRes = await tmdbApi.getMovieTrailer(cardState.item?.id);
        if (trailerRes.error) {
          setTrailerUrl("");
        } else if (trailerRes.data) {
          setTrailerUrl(trailerRes.data.results[0].key);
        }
      };
      fetchDetails();
    }
  }, [cardState]);
  const styles = {
    popupCard: {
      backgroundColor: "rgb(20,20,20)",
      boxShadow:
        "rgba(0,0,0,0.2) 0px 2px 1px 1px, rgba(0,0,0,0.14) 0px 1px 1px 0px, rgba(0,0,0,0.12) 0px 1px 3px 0px",
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
      borderRadius: "8px",
      position: "fixed",
      zIndex: "1000",
      overflow: "hidden",
    },
    transitionAll: {
      transition: "transform 0.3s ease 0.1s, opacity 0.3s ease",
    },
    popupScaleDown: {
      transform: "translate(-50%,-100%) scale(0)",
      opacity: 0,
    },
    popupScaleUp: {
      transform: "translate(-50%,-100%) scale(1)",
      opacity: 1,
    },
  };

  return (
    <div
      className="popupContainer"
      style={{
        ...styles.popupCard,
        top: `${y + 270}px`,
        left: `${
          x < 200 ? x + 60 : window.innerWidth - x < 200 ? x - 60 : x
        }px`,
        ...styles.transitionAll,
        ...(isHovered ? styles.popupScaleUp : styles.popupScaleDown),
      }}
      onMouseLeave={(e) => handlePopoverMouseLeave(e)}
    >
      <div
        className="popupContentContainer"
        onMouseEnter={() => {
          setShowTrailer(true);
        }}
        onMouseLeave={() => {
          setShowTrailer(false);
        }}
      >
        <div
          style={{ height: "230px", position: "relative", overflow: "hidden" }}
        >
          <div className="popupVideoContainer">
            <p className={`popupTitle ${isSmallScreen ? "small" : ""}`}>
              {title.length > 15 ? title.slice(0, 15) + "..." : title}
            </p>
            <button
              className="popUpVolumeStyle"
              onClick={() => setMuted((prev) => !prev)}
            >
              {muted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
          <div className="popupVideo">
            {(trailerUrl && showTrailer) || (isSmallScreen && trailerUrl) ? (
              <VideoPlayer pip={true} isMuted={muted} videoId={trailerUrl} />
            ) : imgUrl ? (
              <img
                src={imgUrl}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span>No Image Available</span>
            )}
          </div>
        </div>
        <div className="popupPlayContainer">
          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to={`/watch/${trailerUrl}`}
              className="popUpVolumeStyle otherButtons"
            >
              <Play size={25} />
            </Link>
            <button
              className="popUpVolumeStyle otherButtons"
              onClick={() => {
                addToFavoriteList(faveData as Movie);
                setAddedToFavorites((prev) => !prev);
                !addedToFavorites
                  ? toast.success(`Added to Favorites (MyList Page)`)
                  : toast.success(`Removed from Favorites (MyList Page)`);
              }}
            >
              {addedToFavorites ? <Check size={25} /> : <Plus size={25} />}
            </button>
            <button
              className="popUpVolumeStyle otherButtons"
              onClick={() => setThumbsUp(!thumbsUp)}
            >
              <ThumbsUp size={25} fill={thumbsUp ? "white" : "transparent"} />
            </button>
          </div>
          <button
            className="popUpVolumeStyle otherButtons"
            onClick={() => {
              setModalOpen(true);
              setSelectedMovie(faveData as Movie);
              setCardState((prev: any) => ({
                ...prev,
                isHovered: false,
                cardId: null,
                item: null,
              }));
            }}
          >
            <ChevronDown size={25} />
          </button>
        </div>
        <div className="popupDetails">
          <span style={{ color: "green", fontWeight: 700 }}>70% Match</span>
          <span style={{ border: "1px solid gray", padding: "1px 2px" }}>
            UA/16+
          </span>
          <span>2h 20m</span>
          <span style={{ border: "1px solid gray", padding: "1px 2px" }}>
            HD
          </span>
        </div>
        <div className="popupGenre">Witty •Heartfelt •Drama</div>
      </div>
    </div>
  );
};

export default PopUpCard;
