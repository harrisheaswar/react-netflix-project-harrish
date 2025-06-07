import Card from "@/components/Card/Card";
import { tmdbApi } from "@/tmdbApi";
import type { Movie } from "@/types/types";
import React, { useEffect, useState, type FC } from "react";

const Movies: FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const loadAllMovies = async () => {
      const [movieSetA, movieSetB, movieSetC] = await Promise.all([
        tmdbApi.fetchPopularMovies(3),
        tmdbApi.fetchPopularMovies(4),
        tmdbApi.fetchPopularMovies(5),
      ]);
      if (!movieSetA.error && movieSetA.data) {
        setAllMovies((prev) => [...prev, ...(movieSetA?.data?.results || [])]);
      }
      if (!movieSetB.error && movieSetB.data) {
        setAllMovies((prev) => [...prev, ...(movieSetB?.data?.results || [])]);
      }
      if (!movieSetC.error && movieSetC.data) {
        setAllMovies((prev) => [...prev, ...(movieSetC?.data?.results || [])]);
      }
    };

    loadAllMovies();
  }, []);
  return (
    <div
      style={{
        position: "relative",
        marginLeft: "60px",
        paddingTop: "60px",
        color: "white",
      }}
    >
      <h1>All Movies</h1>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {allMovies.length > 0 ? (
          allMovies
            .filter((movie) => movie && movie?.backdrop_path)
            .map(
              (movie: Movie, index: any) =>
                movie && <Card key={index} item={movie} />
            )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Movies;
