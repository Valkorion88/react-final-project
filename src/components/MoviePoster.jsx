import { useState } from "react";

export default function MoviePoster({ poster, title }) {
  const [failedPoster, setFailedPoster] = useState(null);

  if (!poster || poster === "N/A" || poster === failedPoster) {
    return (
      <div
        className="movie-card__poster-placeholder"
        role="img"
        aria-label={`Poster unavailable for ${title}`}
      >
        <span className="movie-card__poster-placeholder-label">Poster unavailable</span>
        <span className="movie-card__poster-placeholder-title">{title}</span>
      </div>
    );
  }

  return (
    <img
      className="movie__img"
      src={poster}
      alt={`${title} poster`}
      loading="lazy"
      onError={() => setFailedPoster(poster)}
    />
  );
}
