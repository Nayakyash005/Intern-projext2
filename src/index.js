import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./components/Login";
import { AuthProvider } from "./components/Authcontext";
import CreateProfile from "./components/CreateProfile";
import PrivateRoute from "./PrivateRoute";
import Profile from "./components/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createProfile" element={<CreateProfile />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
      </Routes>
    </Router>
  </AuthProvider>
);
