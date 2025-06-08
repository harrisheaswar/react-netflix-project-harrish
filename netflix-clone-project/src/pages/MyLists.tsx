import Card from "@/components/Card/Card";
import { useUtilsContext } from "@/context/UtilsContext";
import type { Movie } from "@/types/types";
import { useEffect, type FC } from "react";
import "./pageStyles/moviesPageStyles.css";
const MyLists: FC = () => {
  const { movieList } = useUtilsContext();
  const movies = JSON.parse(localStorage.getItem("movieList") || "");
  console.log(movies);
  useEffect(() => {}, [movieList]);
  return (
    <div className="moviesPageContainer">
      <h1>My List</h1>
      <div className="moviesContainer">
        {movieList.length > 0 ? (
          movieList.map(
            (movie: Movie, index: any) => movie && <Card item={movie} />
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyLists;
