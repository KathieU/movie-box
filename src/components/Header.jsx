import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Header.css";
import Navbar from "./Navbar";

function Header() {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    // Fetch a list of movies from the TMDB API
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: {
          api_key: "8a95801f297f0d22f2a306459d6e37f6",
          sort_by: "popularity.desc",
          page: 1,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  useEffect(() => {
    // Rotate to the next movie every 5 seconds
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[currentMovieIndex];

  return (
    <div
      className="homepage"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path})`,
      }}
    >
      <Navbar />
      <div className="movie-info">
        <h1>{currentMovie?.title}</h1>
        <p>Rating: {currentMovie?.vote_average}</p>
        <p>{currentMovie?.overview}</p>
      </div>
    </div>
  );
}

export default Header;
