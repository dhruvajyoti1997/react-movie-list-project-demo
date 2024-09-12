import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  //state is to manage components data
  // const [movies, setMovies] = useState([]); //moved the logic to App.js for the routes concept
  const [searchTerm, setSearchTerm] = useState([]);

  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleFilterMovieSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSetGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleSetRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;

      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;

      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="search movies..."
        value={searchTerm}
        onChange={handleFilterMovieSearch}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={setGenre}
            onChange={handleSetGenre}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={setRating}
            onChange={handleSetRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {
          filteredMovies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.id}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={watchlist.includes(movie.id)}
            ></MovieCard>
          ))
          //movies.length
        }
      </div>
    </div>
  );
}
