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
import { Toaster } from "react-hot-toast";
import type { MovieDetails } from "./types/types";
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
      <Toaster
        position="top-right"
        containerStyle={{
          zIndex: 100000,
        }}
      />
      <Navbar />
      <PopUpCard
        isHovered={cardState.isHovered}
        x={cardState?.position?.x || 0}
        y={cardState?.position?.y || 0}
      />

      <Modal
        movieData={selectedMovie as MovieDetails}
        isOpen={isModalOpen}
        onClose={handleModal}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/myList" element={<MyLists />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/popular" element={<Home />} />
        <Route path="/tv" element={<Home />} />
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
