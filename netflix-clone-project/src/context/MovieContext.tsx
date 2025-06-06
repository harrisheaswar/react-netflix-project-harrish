import type { Movie } from "@/types/types";
import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface MovieContextType {
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  popularMovies: Movie[] | null;
  setPopularMovies: (movies: Movie[] | null) => void;
  topRatedMovies: Movie[] | null;
  setTopRatedMovies: (movies: Movie[] | null) => void;
  trendingMovies: Movie[] | null;
  setTrendingMovies: (movies: Movie[] | null) => void;
  trailerUrl: string;
  setTrailerUrl: (url: string) => void;
  isModalOpen: boolean;
  setModalOpen: (modal: boolean) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[] | null>(null);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[] | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[] | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <MovieContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        popularMovies,
        setPopularMovies,
        topRatedMovies,
        setTopRatedMovies,
        trendingMovies,
        setTrendingMovies,
        trailerUrl,
        setTrailerUrl,
        isModalOpen,
        setModalOpen,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
