import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams(); // Access the "id" parameter from the route
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=8a95801f297f0d22f2a306459d6e37f6`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]); // Use "id" from useParams as the dependency

  const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div>
      <h2 data-testid="movie-title">{movie.title}</h2>
      <p data-testid="movie-release-date">
        Release Date (UTC): {movie.release_date}
      </p>
      <p data-testid="movie-runtime">Runtime (minutes): {movie.runtime}</p>
      <img
        src={posterURL}
        alt={`${movie.title} Poster`}
        data-testid="movie-poster"
      />
      <p data-testid="movie-overview">{movie.overview}</p>
      {/* Display other movie details here */}
    </div>
  );
}

export default MovieDetails;
