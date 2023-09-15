import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const posterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const releaseDate = new Date(movie.release_date).toLocaleDateString();

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      data-testid="movie-card"
    >
      <img
        src={posterURL}
        alt={`${movie.title} Poster`}
        className="movie-poster"
        data-testid="movie-poster"
      />
      <h2 className="movie-title" data-testid="movie-title">
        {movie.title}
      </h2>
      <p className="movie-release-date" data-testid="movie-release-date">
        Release Date: {releaseDate}
      </p>
    </Link>
  );
}

export default MovieCard;
