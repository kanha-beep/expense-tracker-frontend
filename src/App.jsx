// import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { useEffect, useState } from "react";
import TrackerForm from "./Pages/TrackerForm.jsx";
import TrackerList from "./Pages/TrackerList.jsx";
import Auth from "./Pages/Auth.jsx";
import Profile from "./Pages/Profile.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Home from "./Pages/Home.jsx";
import MonthlyReport from "./Pages/MonthlyReport.jsx";
import api from "./utils/api.js";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const checkAuth = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setUser(res?.data);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e?.response?.data?.message);
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className="container-fluid">
      <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/auth"
            element={
              <Auth
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                checkAuth={checkAuth}
                setUser={setUser}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
          <Route path="/tracker" element={<TrackerList />} />
          <Route path="/tracker/new" element={<TrackerForm />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
        </Routes>
      </div>
    </div>
  );
}
