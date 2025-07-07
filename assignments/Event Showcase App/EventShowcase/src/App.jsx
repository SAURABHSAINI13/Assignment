import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import MyComponent from "./components/MyComponent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventRegistration from "./pages/EventRegistration";
import EventDetails from "./components/EventDetails";
const API = import.meta.env.VITE_FAKE_PAYTM_API;

// ✅ ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // replace with real auth logic
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        {/* ✅ Navbar with dark mode toggle */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <main style={{ padding: "1rem" }}>
          <h1>Welcome to my app</h1>
          <MyComponent />

          {/* ✅ Routes */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register/:eventId"
              element={
                <ProtectedRoute>
                  <EventRegistration />
                </ProtectedRoute>
              }
            />
            <Route path="/event/:id" element={<EventDetails />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}
