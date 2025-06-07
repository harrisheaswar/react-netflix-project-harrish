import React, { use, useEffect, useRef, useState, type FC } from "react";
import ReactPlayer from "react-player";
import "../Hero/heroStyles.css";
import "./videoPlayerStyles.css";
interface VideoPlayerProps {
  videoId: string;
  isMuted?: boolean;
  pip?: boolean;
  customHeight?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  videoId,
  isMuted,
  pip,
  customHeight,
}) => {
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);

  useEffect(() => {
    setVolume(isMuted ? 0 : 0.8);
  }, [isMuted]);

  const getContainerClass = () => {
    if (pip) return "container-pip";
    if (location.pathname.startsWith("/watch")) return "container-watch";
    return "container-default";
  };

  const heightStyle =
    !pip && !location.pathname.startsWith("/watch")
      ? { height: `${customHeight}vh` }
      : undefined;
  const isWatchPage = location.pathname.startsWith("/watch");
  return (
    <div className={getContainerClass()} style={heightStyle} ref={containerRef}>
      <div className="heroVideoBackdrop"></div>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${videoId}`}
        playing={playing}
        volume={volume}
        loop={true}
        controls={isWatchPage}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: isWatchPage ? 10000 : -10000,
        }}
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
              disablekb: 1,
              playlist: videoId,
              controls: isWatchPage ? 1 : 0,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
