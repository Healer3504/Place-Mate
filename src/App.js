import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Preparation from "./pages/Preparation";
import Timeline from "./pages/Timeline";
import Resources from "./pages/Resources";
import Achievements from "./pages/Achievements";

import MainLayout from "./layout/MainLayout";
import { useAuth } from "./context/AuthContext";

// 🔒 Protect routes so only logged-in users can access them
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Applications />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/preparation"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Preparation />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Timeline />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Resources />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Achievements />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
