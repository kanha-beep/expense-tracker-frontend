import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
export default function Auth({ setIsLoggedIn, checkAuth, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  console.log("isLogin Auth", isLogin);
  //auth
  const handleAuth = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (isLogin) {
      try {
        console.log("login: ", data);
        const res = await api.post("/api/auth/login", data);
        console.log("login: ", res.data);
        await checkAuth();
        navigate("/dashboard", { replace: true });
        setLoading(false);
        setIsLoggedIn(true);
      } catch (e) {
        if (e?.status === 500) {
          console.log("go to register");
          alert(e?.response?.data?.error);
          setIsLoggedIn(false);
        }
        console.log(e.status);
        setIsLogin(false);
        setLoading(false);
        setIsLoggedIn(false);
        setUser(false);
      }
    } else {
      try {
        setLoading(true);
        console.log("register: ", data);
        const res = await api.post("/api/auth/register", data);
        console.log(res.data);
        await checkAuth();
        navigate("/dashboard", { replace: true });
        setIsLoggedIn(true);
      } catch (e) {
        console.log(e.response?.data || e.message);
        setIsLogin(false);
        setLoading(false);
        setIsLoggedIn(false);
        setUser(false);
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="d-flex justify-content-evenly my-2">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="btn btn-outline-primary"
                  disabled={isLogin}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="btn btn-outline-primary"
                  disabled={!isLogin}
                >
                  Sign Up
                </button>
              </div>

              {/* form */}
              <form onSubmit={handleAuth}>
                {!isLogin && (
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={data.name}
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={data.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-primary w-100 mb-3" type="submit">
                  {isLogin ? (
                    <>
                      {loading ? (
                        <>
                          <div className="spinner-border spinner-border-sm" />
                          "Login..."
                        </>
                      ) : (
                        "Login"
                      )}
                    </>
                  ) : (
                    <>
                      {loading ? (
                        <>
                          <div className="spinner-border spinner-border-sm" />
                          "Register..."
                        </>
                      ) : (
                        "Register"
                      )}
                    </>
                  )}
                </button>
              </form>
              <div className="text-center">
                <button
                  className="btn btn-link p-0"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? "Need an account? Register"
                    : "Have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
