import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Navbar({ isLogin }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // console.log("isLogin navbar: ", isLogin)
  const handleLogout = async () => {
    try {
      console.log("starts");
      const res = await api.post("/api/auth/logout");
      console.log(res?.data);
      navigate("/auth", { replace: true });
      setIsOpen(false);
    } catch (err) {
      console.log(err?.response?.data);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Expense Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <div className="navbar-nav ms-auto">
            {isLogin ? (
              <>
                <Link
                  className="nav-link"
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  className="nav-link"
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                className="nav-link"
                to="/auth"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
