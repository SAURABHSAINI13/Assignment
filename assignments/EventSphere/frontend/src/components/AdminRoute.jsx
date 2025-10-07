import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoadingContainer.css';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if authenticated but not an admin
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Return children if provided, otherwise use Outlet for nested routes
  return children ? children : <Outlet />;
};

export default AdminRoute;