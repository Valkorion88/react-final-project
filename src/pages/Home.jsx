import React from 'react'
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FilterSelect from "../components/FilterSelect";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("search") || "";

  const { movies, loading, error, searchMovies } = useMovies();
  const [filter, setFilter] = useState("DEFAULT");

  // Trigger search whenever the URL query parameter changes
  useEffect(() => {
    if (queryFromUrl.trim()) {
      searchMovies(queryFromUrl.trim());
    }
  }, [queryFromUrl]);

  // Derive sorted & limited movie list without mutating raw state
  const displayedMovies = useMemo(() => {
    const list = [...movies];
    if (filter === "OLD_TO_NEW") {
      list.sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10));
    } else if (filter === "NEW_TO_OLD") {
      list.sort((a, b) => parseInt(b.Year, 10) - parseInt(a.Year, 10));
    } else if (filter === "A_TO_Z") {
      list.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === "Z_TO_A") {
      list.sort((a, b) => b.Title.localeCompare(a.Title));
    }
    return list.slice(0, 10);
  }, [movies, filter]);

  return (
    <main className="container home-results">
      <div className="controls">
        <p className="controls__label">
          {queryFromUrl ? `Showing: ${queryFromUrl}` : "Search for a movie"}
        </p>
        {movies.length > 0 && !loading && (
          <FilterSelect filter={filter} onFilterChange={setFilter} />
        )}
      </div>

      <section className="movies" aria-busy={loading}>
        {loading && (
          <>
            <p className="visually-hidden" role="status">
              Loading movie search results
            </p>
            {Array.from({ length: 10 }, (_, index) => (
              <div
                className="movie-card--skeleton"
                aria-hidden="true"
                key={`movie-skeleton-${index}`}
              >
                <div className="movie-card__img--skeleton" />
                <div className="movie-card__title--skeleton" />
                <div className="movie-card__year--skeleton" />
              </div>
            ))}
          </>
        )}

        {!loading && error && (
          <div className="movies__message error">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && displayedMovies.length === 0 && (
          <div className="movies__message empty">
            <i className="fas fa-film"></i>
            <p>{queryFromUrl ? "No movies matched your search." : "Enter a movie title to search."}</p>
          </div>
        )}

        {!loading &&
          !error &&
          displayedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
      </section>
    </main>
  );
}
