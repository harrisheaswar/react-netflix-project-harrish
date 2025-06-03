import { useMovieContext } from "@/context/MovieContext";
import React from "react";
import "./heroStyles.css";
import { Info, Play, Volume2 } from "lucide-react";
const Hero = ({ selectedMovie }) => {
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

        {selectedMovie && (
          <div className="heroTitleContainer">
            <h1 className="heroTitle">
              {selectedMovie?.title?.length > 30 && window.innerWidth < 765
                ? selectedMovie.title?.substring(0, 30) + "..."
                : formatTitle(selectedMovie.title)}
            </h1>
            <p className="heroDescription">
              {selectedMovie?.overview?.length > 30 && window.innerWidth < 600
                ? selectedMovie.overview?.substring(0, 100) + "..."
                : selectedMovie.overview?.substring(0, 200) + "..."}
            </p>
            <div className="playAndInfo">
              <div style={{ display: "flex", gap: "20px" }}>
                <button className="customButtonStyle">
                  <Play size={20} />
                  <span>Play</span>
                </button>
                <button className="customButtonStyle info">
                  <Info />
                  <span>Info</span>
                </button>
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                <button className="volumeButtonStyle">
                  <Volume2 size={20} />
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
