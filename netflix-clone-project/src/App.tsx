import type { FC } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import MyLists from "./pages/MyLists";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { MovieProvider, useMovieContext } from "./context/MovieContext";
import { CardProvider, useCardContext } from "./context/CardContext";
import PopUpCard from "./components/PopUpCard/PopUpCard";
import { UtilsProvider } from "./context/UtilsContext";
import Modal from "./components/Modal/Modal";
import Movies from "./pages/Movies";
const App: FC = () => {
  return (
    <MovieProvider>
      <CardProvider>
        <UtilsProvider>
          <Router>
            <MainContent />
          </Router>
        </UtilsProvider>
      </CardProvider>
    </MovieProvider>
  );
};

export default App;

const MainContent: FC = () => {
  const { cardState } = useCardContext();
  const { selectedMovie, isModalOpen, setModalOpen } = useMovieContext();
  const handleModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Navbar />
      <PopUpCard
        isHovered={cardState.isHovered}
        x={cardState?.position?.x || 0}
        y={cardState?.position?.y || 0}
      />

      <Modal
        movieData={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleModal}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/myList" element={<MyLists />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route
          path="*"
          element={<NotFound content={`Oops ...Page not found`} />}
        />
        <Route
          path="/watch/404-not-found"
          element={<NotFound content={`Oops ...Page not found`} />}
        />
      </Routes>
    </>
  );
};
