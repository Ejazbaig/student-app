import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Auth/Registration";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import Faqs from "./pages/Faqs";
import CourseList from "./pages/CourseSection/CourseList";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <CourseList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faqs"
          element={
            <ProtectedRoute>
              <Faqs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
