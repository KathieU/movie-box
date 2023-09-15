import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = useCallback(async () => {
    if (query.trim() === "") return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=8a95801f297f0d22f2a306459d6e37f6&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }

    setLoading(false);
  }, [query]);

  useEffect(() => {
    if (query.trim() === "") {
      setMovies([]);
      return;
    }

    const searchTimer = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [query, searchMovies]);

  return (
    <div>
      <input
        type="text"
        placeholder="What do you want to watch?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
