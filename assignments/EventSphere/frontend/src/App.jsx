import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './Events';
import EventDetails from './pages/EventDetails';
import GetTicket from './pages/GetTicket';
import TicketDetails from './pages/TicketDetails';
import AuthPage from './pages/AuthPage';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import TicketRegistration from './pages/TicketRegistration';
import TicketConfirmation from './pages/TicketConfirmation';
import CreateEvent from './pages/CreateEvent';
import MakeAdmin from './pages/MakeAdmin';
import EventRegistration from './pages/EventRegistration'; // ✅ FIXED import
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Navbar />
          <main style={{ minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register-event" element={<EventRegistration />} /> {/* ✅ FIXED */}
              <Route path="/events" element={<Events />} />
              <Route path="/events/:eventId" element={<EventDetails />} />
              <Route path="/get-ticket" element={<GetTicket />} />
              <Route
                path="/ticket-details/:bookingId"
                element={
                  <ProtectedRoute>
                    <TicketDetails />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<AboutUs />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ticket-registration"
                element={
                  <ProtectedRoute>
                    <TicketRegistration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ticket-confirmation/:bookingId"
                element={
                  <ProtectedRoute>
                    <TicketConfirmation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-event"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/make-admin"
                element={
                  <ProtectedRoute>
                    <MakeAdmin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
};

export default App;
