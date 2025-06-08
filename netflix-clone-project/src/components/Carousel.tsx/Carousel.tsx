import type { Movie } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type FC } from "react";
import Card from "../Card/Card";
import "./carousalStyles.css";

interface CarouselProps {
  title?: string;
  items?: Movie[];
}

const Carousel: FC<CarouselProps> = ({ items, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollVisible, setScrollVisible] = useState<number>(0);
  const scrollBy = (distance: number) => {
    if (scrollRef.current) {
      setScrollVisible((prev: number) => prev + distance);
      scrollRef.current.scrollBy({ left: distance, behavior: "smooth" });
    }
  };
  return (
    <div className="carouselContainer">
      <h2 className="genreTitle">{title}</h2>
      <div style={{ position: "relative" }}>
        <div className="itemContainer hide-scrollbar" ref={scrollRef}>
          {items?.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
        {scrollVisible !== 0 && (
          <button className="scrollButton left" onClick={() => scrollBy(-1000)}>
            <ChevronLeft size={30} color="white" />
          </button>
        )}
        <button className="scrollButton right" onClick={() => scrollBy(1000)}>
          <ChevronRight size={30} color="white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
