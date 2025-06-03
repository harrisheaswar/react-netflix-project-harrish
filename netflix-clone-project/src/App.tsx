import type { FC } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import MyLists from "./pages/MyLists";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { MovieProvider } from "./context/MovieContext";
const App: FC = () => {
  return (
    <MovieProvider>
      <Router>
        <MainContent />
      </Router>
    </MovieProvider>
  );
};

export default App;

const MainContent: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/myList" element={<MyLists />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
