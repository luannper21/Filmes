// src/App.jsx

import { useState } from 'react';
import './index.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const fetchMovie = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&t=${query}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovie(data);
        setError('');
      } else {
        setMovie(null);
        setError(data.Error);
      }
    } catch (error) {
      setError('An error occurred while fetching the movie.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovie();
  };

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      )}
    </div>
  );
};

export default App;
