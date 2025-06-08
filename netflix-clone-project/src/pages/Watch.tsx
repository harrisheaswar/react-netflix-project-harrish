import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import { type FC } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

const Watch: FC = () => {
  const id = useParams();
  if (!id) return <div>No Movie Selected</div>;
  return (id.id as String) !== "404-not-found" ? (
    <div style={{ position: "relative" }}>
      <VideoPlayer videoId={id.id?.toString() || ""} isMuted={true} />
    </div>
  ) : (
    <NotFound content={`Oops.. Page Not Found`} />
  );
};

export default Watch;
