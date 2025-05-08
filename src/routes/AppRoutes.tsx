import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import PrivateLayout from '../layouts/PrivateLayout';
import Home from '../pages/Home';
import InfiniteScroll from '../pages/InfiniteScroll';
import DragDrop from '../pages/DragDrop';
// Import page components (to be created)
// import DragDrop from '../pages/DragDrop';

// Placeholder authentication check (replace with real logic)
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// PrivateRoute wrapper
//const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  //return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
//};

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    {/* Private routes */}
    <Route element={<PrivateLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/drag-drop" element={<DragDrop />} />
      <Route path="/infinite-scroll" element={<InfiniteScroll />} />
    </Route>
    {/* Fallback route */}
    <Route path="*" element={<Navigate to={isAuthenticated() ? '/' : '/login'} />} />
  </Routes>
);

export default AppRoutes; 