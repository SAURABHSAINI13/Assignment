import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MovieCard from './components/MovieCard.jsx';
import UpcomingMovies from "./pages/UpcomingMovies";

function App() {
  return (
<BrowserRouter>
<ul>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="/UpcomingMovies">UpcomingMovies</NavLink></li>
  <li><NavLink to="/MovieCard">MovieCard</NavLink></li>
</ul>

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/movies/upcoming" />} />
        <Route path="/movies/upcoming" element={<UpcomingMovies />} />
      </Routes>
    </Router>
    </BrowserRouter>
  );
}

export default App;