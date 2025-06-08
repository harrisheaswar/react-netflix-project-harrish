import Card from "@/components/Card/Card";
import { useUtilsContext } from "@/context/UtilsContext";
import type { Movie } from "@/types/types";
import { useEffect, type FC } from "react";
import "./pageStyles/moviesPageStyles.css";
const MyLists: FC = () => {
  const utilsContext = useUtilsContext();
  if (!utilsContext) return null;
  const { movieList } = utilsContext;
  useEffect(() => {}, [movieList]);
  return (
    <div className="moviesPageContainer">
      <h1>My List</h1>
      <div className="moviesContainer">
        {movieList.length > 0 ? (
          movieList.map(
            (movie: Movie, index: any) =>
              movie && <Card key={index} item={movie} />
          )
        ) : (
          <h1 style={{ whiteSpace: "pre", fontSize: "30px" }}>
            {`Oops, your favorite list is empty...\nAdd movies to your favorite list to see them here.`}
          </h1>
        )}
      </div>
    </div>
  );
};

export default MyLists;
