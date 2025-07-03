import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p>📅 {movie.release_date}</p>
        <p>🌐 {movie.original_language.toUpperCase()}</p>
        <p>⭐ {movie.vote_average}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
