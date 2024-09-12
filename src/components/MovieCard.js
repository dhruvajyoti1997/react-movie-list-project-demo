import React from "react";
import "../styles.css";

//props are used to pass data, event handlers and functions to components.
//we can pass props to nested components "prop drilling"
export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRating = (rating) => {
    if (rating > 8) {
      return "rating-good";
    }
    if (rating >= 5 && rating < 8) {
      return "rating-ok";
    } else {
      return "rating-bad";
    }
  };
  return (
    <div key={movie.id} className="movie-card">
      <img
        src={`images/${movie.image}`}
        alt={movie.title}
        onError={handleError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-genre">{movie.genre}</p>
        <p className={`movie-card-rating ${getRating(movie.rating)}`}>
          {movie.rating}
        </p>
      </div>
      <label className="switch">
        <input
          type="checkbox"
          checked={isWatchlisted}
          onChange={() => toggleWatchlist(movie.id)}
        ></input>

        <span className="slider">
          <span className="slider-label">
            {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
          </span>
        </span>
      </label>
    </div>
  );
}