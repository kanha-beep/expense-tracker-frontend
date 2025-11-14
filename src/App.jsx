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
export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [token]);
  const handleAdd = (expense) => setExpenses((prev) => [...prev, expense]);
  return (
    <div className="container-fluid">
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route
            path="/auth"
            element={<Auth isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracker" element={<TrackerList />} />
          <Route path="/tracker/new" element={<TrackerForm />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
        </Routes>
      </div>
    </div>
  );
}
