import Carousel from "@/components/Carousel.tsx/Carousel";
import Hero from "@/components/Hero/Hero";
import { useMovieContext } from "@/context/MovieContext";
import { tmdbApi } from "@/tmdbApi";
import type { GenreWithMovie } from "@/types/types";
import "../components/Hero/heroStyles.css";
import { useEffect, useState, type FC } from "react";
import "./pageStyles/homePageStyle.css";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import Spinner from "@/components/CustomComponents/Spinner/Spinner";
const Home: FC = () => {
  const [genresWithMovies, setGenresWithMovies] = useState<
    GenreWithMovie[] | null
  >(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const {
    popularMovies,
    setPopularMovies,
    setTopRatedMovies,
    topRatedMovies,
    trendingMovies,
    setTrendingMovies,
    trailerUrl,
    setTrailerUrl,
    heroTrailer,
    setHeroTrailer,
  } = useMovieContext();

  useEffect(() => {
    const loadMovies = async () => {
      const [
        popularMoviesResult,
        topRatedMoviesResult,
        trendingMoviesResult,
        allGenres,
      ] = await Promise.all([
        tmdbApi.fetchPopularMovies(),
        tmdbApi.fetchTopRatedMovies(),
        tmdbApi.fetchTrendingMovies(),
        tmdbApi.getGenres(),
      ]);

      if (allGenres.error) {
        console.log(allGenres.error);
        setGenresWithMovies([]);
      } else if (allGenres.data) {
        const allGenreWithMovies = await Promise.all(
          allGenres.data?.genres.map(async (genre) => {
            const movies = await tmdbApi.getMoviesByGenre(genre.id);
            return {
              id: genre.id,
              name: genre.name,
              movies: movies.data?.results ?? [],
            };
          })
        );
        setGenresWithMovies(allGenreWithMovies);
      }

      if (popularMoviesResult.error) {
        setPopularMovies([]);
      } else if (popularMoviesResult?.data) {
        setPopularMovies(popularMoviesResult.data.results);
        const randomIndex = Math.floor(
          Math.random() * popularMoviesResult.data?.results.length
        );

        const randomMovie = popularMoviesResult.data?.results[randomIndex];
        setHeroTrailer(randomMovie);
        const trailerRes = await tmdbApi.getMovieTrailer(randomMovie.id);
        if (trailerRes.error) {
          setTrailerUrl("");
        } else {
          setTrailerUrl(trailerRes?.data.results[0].key);
        }
      }

      if (topRatedMoviesResult.error) {
        setTopRatedMovies([]);
      } else if (topRatedMoviesResult.data) {
        setTopRatedMovies(topRatedMoviesResult.data.results);
      }

      if (trendingMoviesResult.error) {
        setTrendingMovies([]);
      } else if (trendingMoviesResult.data) {
        setTrendingMovies(trendingMoviesResult.data.results);
      }
    };

    loadMovies();
  }, []);
  return (
    <>
      <div className="homeContainer">
        <Hero
          setIsMuted={() => setIsMuted((prev) => !prev)}
          isMuted={isMuted}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {popularMovies && (
            <Carousel title="Popular Movies" items={popularMovies} />
          )}
          {trendingMovies && (
            <Carousel title="Trending Movies" items={trendingMovies} />
          )}
          {topRatedMovies && (
            <Carousel title="Top Rated Movies" items={topRatedMovies} />
          )}
          {genresWithMovies &&
            genresWithMovies?.map((movieList, index) => (
              <Carousel
                key={index}
                items={movieList?.movies}
                title={`${movieList.name} Movies`}
              />
            ))}
        </div>
      </div>
      <div className="homeVideo">
        {heroTrailer && (
          <img
            src={`https://image.tmdb.org/t/p/original/${heroTrailer?.backdrop_path}`}
            alt="Image"
            style={{ width: "100%", height: "100%" }}
          />
        )}
        <div className="heroVideoBackdrop"></div>
        {trailerUrl ? (
          <VideoPlayer
            videoId={trailerUrl}
            customHeight="0"
            isMuted={isMuted}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default Home;
