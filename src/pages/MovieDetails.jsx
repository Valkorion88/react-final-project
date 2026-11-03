import React from 'react'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieById } from "../services/omdbApi";
import MoviePoster from "../components/MoviePoster";

function getSentences(text) {
  if (typeof Intl.Segmenter === "function") {
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: "sentence" }).segment(text),
      ({ segment }) => segment.trim(),
    ).filter(Boolean);
  }

  return (text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [text])
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlotId, setExpandedPlotId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchMovieById(id)
      .then((data) => {
        if (!isMounted) return;
        if (data.Response === "False") {
          setError(data.Error || "Movie details not found.");
        } else {
          setMovie(data);
        }
      })
      .catch(() => {
        if (isMounted) setError("Failed to fetch movie details.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container movie-detail--center">
        <i className="fas fa-spinner fa-spin spinner-lg"></i>
        <p>Loading full movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container movie-detail--center">
        <p className="error">{error || "Movie not found."}</p>
        <button className="btn btn--back" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
      </div>
    );
  }

  const metadata = [
    ["Released", movie.Released],
    ["Director", movie.Director],
    ["Writer", movie.Writer],
    ["Cast", movie.Actors],
    ["Language", movie.Language],
    ["Country", movie.Country],
    ["Awards", movie.Awards],
    ["Box Office", movie.BoxOffice],
  ].filter(([, value]) => value && value !== "N/A");
  const plotSentences = getSentences(movie.Plot || "");
  const hasMorePlot = plotSentences.length > 2;
  const isPlotExpanded = expandedPlotId === id;
  const plotPreview = isPlotExpanded
    ? plotSentences
    : plotSentences.slice(0, 2);

  return (
    <main className="container movie-detail">
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr; Back to Results
      </button>

      <article className="movie-detail__grid">
        <figure className="movie-detail__poster">
          <MoviePoster poster={movie.Poster} title={movie.Title} />
        </figure>

        <div className="movie-detail__content">
          <header className="movie-detail__header">
            <p className="movie-detail__eyebrow">
              {movie.Type ? movie.Type : "Movie"}
              {movie.Year && ` · ${movie.Year}`}
            </p>
            <h1>{movie.Title}</h1>

            <div className="movie-detail__badges">
              {movie.Rated && movie.Rated !== "N/A" && (
                <span className="badge">{movie.Rated}</span>
              )}
              {movie.Runtime && movie.Runtime !== "N/A" && (
                <span className="badge">{movie.Runtime}</span>
              )}
              {movie.Genre && movie.Genre !== "N/A" && (
                <span className="badge">{movie.Genre}</span>
              )}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <span className="badge badge--rating">
                  ★ {movie.imdbRating} / 10
                </span>
              )}
            </div>
          </header>

          {movie.Plot && movie.Plot !== "N/A" && (
            <section className="movie-detail__overview">
              <h2>Overview</h2>
              <p id="movie-plot">{plotPreview.join(" ")}</p>
              {hasMorePlot && (
                <button
                  type="button"
                  className="movie-detail__plot-toggle"
                  aria-expanded={isPlotExpanded}
                  aria-controls="movie-plot"
                  onClick={() =>
                    setExpandedPlotId(isPlotExpanded ? null : id)
                  }
                >
                  {isPlotExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </section>
          )}

          {metadata.length > 0 && (
            <dl className="movie-detail__meta">
              {metadata.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </article>
    </main>
  );
}
