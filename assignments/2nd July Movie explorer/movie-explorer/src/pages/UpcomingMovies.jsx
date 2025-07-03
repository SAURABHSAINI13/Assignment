import React, { useEffect, useState } from "react";
import { fetchUpcomingMovies } from "../api";
import MovieCard from "../components/MovieCard";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await fetchUpcomingMovies(pages);
      setMovies((prev) => [...prev, ...res.data.results]);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">🎬 Upcoming Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load More
        </button>
      </div>
      {loading && <p className="text-white text-center mt-4">Loading...</p>}
    </div>
  );
  console.log("Movies:", movies);

};

export default UpcomingMovies;
