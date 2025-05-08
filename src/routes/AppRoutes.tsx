import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
// Import page components (to be created)
// import Home from '../pages/Home';
// import DragDrop from '../pages/DragDrop';
// import InfiniteScroll from '../pages/InfiniteScroll';

// Placeholder authentication check (replace with real logic)
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// PrivateRoute wrapper
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Private routes */}
    <Route
      path="/"
      element={
        <PrivateRoute>
          <div>Home Page</div>
        </PrivateRoute>
      }
    />
    <Route
      path="/drag-drop"
      element={
        <PrivateRoute>
          <div>Drag and Drop Page</div>
        </PrivateRoute>
      }
    />
    <Route
      path="/infinite-scroll"
      element={
        <PrivateRoute>
          <div>Infinite Scroll Page</div>
        </PrivateRoute>
      }
    />
    {/* Fallback route */}
    <Route path="*" element={<Navigate to={isAuthenticated() ? '/' : '/login'} />} />
  </Routes>
);

export default AppRoutes; 