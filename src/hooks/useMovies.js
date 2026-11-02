import { useState } from "react";
import { fetchMoviesBySearch } from "../services/omdbApi";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (query) => {
    if (!query || !query.trim()) {
      setError("Enter a movie title to search.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    // Maintain a smooth perceived transition (min 800ms)
    const minimumLoadingTime = new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const [data] = await Promise.all([
        fetchMoviesBySearch(query),
        minimumLoadingTime,
      ]);

      if (data.Response === "False") {
        setMovies([]);
        setError(data.Error || "No movies found.");
      } else {
        setMovies(data.Search || []);
      }
    } catch (err) {
      setError("Unable to load movies. Please check your connection and try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, searchMovies };
}
