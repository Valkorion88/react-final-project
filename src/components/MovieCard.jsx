import React from 'react'
import { Link } from "react-router-dom";
import MoviePoster from "./MoviePoster";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie movie--link">
      <figure className="movie__img--wrapper">
        <MoviePoster poster={movie.Poster} title={movie.Title} />
      </figure>
      <div className="movie__info">
        <h3 className="movie__title">{movie.Title}</h3>
        <div className="movie__year">Release: {movie.Year}</div>
      </div>
    </Link>
  );
}
