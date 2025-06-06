import type { Movie } from "@/types/types";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { useCardContext } from "./CardContext";

interface UtilsContextType {
  addToFavoriteList: (movie: Movie) => void;
  movieList: Movie[];
}

const UtilsContext = createContext<UtilsContextType | null>(null);

export const UtilsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("movieList") || "[]")
  );
  const { setCardState } = useCardContext();

  const addToFavoriteList = (movie: Movie) => {
    console.log(movie);
    let list = localStorage.getItem("movieList");

    if (list) {
      try {
        const parsedList = JSON.parse(list) as Movie[];
        setMovieList(parsedList);

        const exists = parsedList.some((item: Movie) => item.id === movie.id);
        console.log(exists, "===>");
        if (exists) {
          const newMovieList = parsedList.filter(
            (item: Movie) => item.id !== movie.id
          );
          setMovieList(newMovieList);
          localStorage.setItem("movieList", JSON.stringify(newMovieList));
          return;
        }
      } catch (error) {
        localStorage.removeItem("movieList");
      }
    }

    const newMovieList = [...movieList, movie];
    setMovieList(newMovieList);

    try {
      localStorage.setItem("movieList", JSON.stringify(newMovieList));
    } catch (error) {
      console.error("Error saving to Local Storage:", error);
    }
  };

  return (
    <UtilsContext.Provider value={{ addToFavoriteList, movieList }}>
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtilsContext = () => useContext(UtilsContext);
