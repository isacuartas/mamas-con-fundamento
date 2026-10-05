import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BookDashboard from './pages/BookDashboard';
import Login from './pages/Login';
import SalesPage from './pages/SalesPage';
import './App.css';

// Componente para inicio directo de prueba gratuita
const TrialRoute = () => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("isPremium", "false");
  return <Navigate to="/book" replace />;
};

// Componente simple para proteger rutas
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/comprar" element={<SalesPage />} />
      <Route path="/prueba" element={<TrialRoute />} />
      <Route path="/book/*" element={
        <ProtectedRoute>
          <BookDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
