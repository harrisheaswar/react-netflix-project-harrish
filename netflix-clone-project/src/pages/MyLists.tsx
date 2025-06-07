import Card from "@/components/Card/Card";
import { useUtilsContext } from "@/context/UtilsContext";
import type { Movie } from "@/types/types";
import { useEffect, type FC } from "react";
const MyLists: FC = () => {
  const { movieList } = useUtilsContext();
  const movies = JSON.parse(localStorage.getItem("movieList"));
  console.log(movies);
  useEffect(() => {}, [movieList]);
  return (
    <div
      style={{
        position: "relative",
        marginLeft: "60px",
        paddingTop: "60px",
        color: "white",
      }}
    >
      <h1>My List</h1>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
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
