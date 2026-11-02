import React from 'react'
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const fallbackImg = "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie movie--link">
      <figure className="movie__img--wrapper">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : fallbackImg}
          alt={movie.Title}
          className="movie__img"
          loading="lazy"
        />
      </figure>
      <div className="movie__info">
        <h3 className="movie__title">{movie.Title}</h3>
        <div className="movie__year">Release: {movie.Year}</div>
        <div className="movie__id">IMDb: {movie.imdbID}</div>
      </div>
    </Link>
  );
}
