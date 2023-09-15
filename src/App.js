import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
