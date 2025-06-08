import { useMovieContext } from "@/context/MovieContext";
import "./heroStyles.css";
import { Info, Play, Volume2, VolumeOff } from "lucide-react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
interface HeroProps {
  setIsMuted?: () => void;
  isMuted?: boolean;
}

const Hero: FC<HeroProps> = ({ setIsMuted, isMuted }) => {
  const { heroTrailer, setSelectedMovie, setModalOpen, trailerUrl } =
    useMovieContext();
  const navigate = useNavigate();
  const formatTitle = (title: string) => {
    if (title && title.length > 18) {
      const breakIndex = title.indexOf(" ", 15);
      if (breakIndex === -1) return title;
      return (
        <>
          {title.substring(0, breakIndex)}
          <br />
          {title.substring(breakIndex + 1)}
        </>
      );
    }
    return title;
  };

  return (
    <>
      <div className="heroContainer">
        {/* Video Player */}

        {heroTrailer && (
          <div className="heroTitleContainer">
            <h1 className="heroTitle">
              {heroTrailer.title &&
              heroTrailer?.title?.length > 30 &&
              window.innerWidth < 765
                ? heroTrailer.title?.substring(0, 30) + "..."
                : formatTitle(heroTrailer.title ?? "")}
            </h1>
            <p className="heroDescription">
              {heroTrailer.overview &&
              heroTrailer?.overview?.length > 30 &&
              window.innerWidth < 600
                ? heroTrailer.overview?.substring(0, 100) + "..."
                : heroTrailer.overview?.substring(0, 200) + "..."}
            </p>
            <div className="playAndInfo">
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  className="customButtonStyle"
                  onClick={() => navigate(`/watch/${trailerUrl}`)}
                >
                  <Play size={20} />
                  <span>Play</span>
                </button>
                <button
                  className="customButtonStyle info"
                  onClick={() => {
                    setModalOpen(true);
                    setSelectedMovie(heroTrailer);
                  }}
                >
                  <Info />
                  <span>Info</span>
                </button>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <button
                  onClick={() => setIsMuted?.()}
                  className="volumeButtonStyle"
                >
                  {!isMuted ? <Volume2 size={20} /> : <VolumeOff size={20} />}
                </button>
                <div className="ageWarning">
                  <span>18+</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Hero;
