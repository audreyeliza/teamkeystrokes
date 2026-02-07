import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./routes/LandingPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import SearchTutors from "./routes/SearchTutors";
import TutorDashboard from "./routes/TutorDashboard";
import StudentDashboard from "./routes/StudentDashboard";
import TutorProfilePage from "./routes/TutorProfilePage";
import MatchChatPage from "./routes/MatchChatPage";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/search"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <SearchTutors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tutor/profile"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/matches/:matchId/chat"
          element={
            <ProtectedRoute allowedRoles={["tutor", "student"]}>
              <MatchChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
