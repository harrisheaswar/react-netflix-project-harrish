import type { Movie } from "@/types/types";
import type { FC } from "react";
import "./cardStyles.css";
interface CardProps {
  item: Movie;
}

const Card: FC<CardProps> = ({ item }) => {
  return (
    <div className="cardContainer" onMouseEnter={() => {}} role="presentation">
      <img
        src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%", // or a fixed height like "200px"
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};

export default Card;
