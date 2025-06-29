import type { Movie } from "@/types/types";
import type { FC } from "react";
import "./cardStyles.css";
import { useCardContext } from "@/context/CardContext";
interface CardProps {
  item: Movie;
}

const Card: FC<CardProps> = ({ item }) => {
  const { cardState, setCardState } = useCardContext();
  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardState.cardId == item.id && cardState.isHovered) {
      return;
    }
    const cardElement = e.currentTarget as HTMLElement;
    const cardRect = cardElement.getBoundingClientRect();
    setTimeout(() => {
      setCardState({
        item,
        isHovered: true,
        cardId: item.id,
        position: {
          x: cardRect.left + cardRect.width / 2,
          y: cardRect.top,
        },
      });
    }, 300);
  };

  return (
    <div
      className="cardContainer"
      onMouseEnter={(e) => handleHover(e)}
      onClick={(e) => handleHover(e)}
      role="presentation"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};

export default Card;
