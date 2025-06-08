import Card from "@/components/Card/Card";
import { tmdbApi } from "@/tmdbApi";
import type { Movie } from "@/types/types";
import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";

const Search: FC = () => {
  const { query } = useParams<{ query: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdbApi.searchMovies(query || "", 1);

      if (response.error) {
        setMovies([]);
      } else if (response.data) {
        setMovies(response.data.results);
      }
    };
    fetchData();
  }, [query]);
  return (
    <div
      style={{
        marginLeft: "80px",
        position: "absolute",
        top: "10dvh",
      }}
    >
      {movies.length > 0 && <h1 style={{ color: "white" }}>Search Results:</h1>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {movies.length > 0 ? (
          movies
            .filter((movie) => movie.backdrop_path)
            .map((movie) => <Card item={movie} key={movie.id} />)
        ) : (
          <p style={{ fontSize: "40px", color: "white" }}>
            No Movies Found For The Search : {query}
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
