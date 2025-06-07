import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { type FC } from "react";
import { useParams } from "react-router-dom";

const Watch: FC = () => {
  const id = useParams();
  if (!id) return <div>No Movie Selected</div>;
  return (id.id as String) !== "404-not-found" ? (
    <div style={{ position: "relative" }}>
      <VideoPlayer videoId={id.id} isMuted={true} />
    </div>
  ) : (
    <div>404-Not-Found</div>
  );
};

export default Watch;
