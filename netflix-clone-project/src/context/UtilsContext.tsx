import type { Movie } from "@/types/types";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface UtilsContextType {
  addToFavoriteList: (movie: Movie) => void;
  movieList: Movie[];
  randomDuration: () => string;
}

const UtilsContext = createContext<UtilsContextType | null>(null);

export const UtilsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("movieList") || "[]")
  );

  const addToFavoriteList = (movie: Movie) => {
    let list = localStorage.getItem("movieList");

    if (list) {
      try {
        const parsedList = JSON.parse(list) as Movie[];
        setMovieList(parsedList);

        const exists = parsedList.some((item: Movie) => item.id === movie.id);
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

  const randomDuration = () => {
    const randomMins = Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    const hrs = Math.floor(randomMins / 60);
    const mins = Math.floor(randomMins % 60);

    return `${hrs}h ${mins}mins`;
  };

  return (
    <UtilsContext.Provider
      value={{ addToFavoriteList, movieList, randomDuration }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtilsContext = () => useContext(UtilsContext);
