import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api.js";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  console.log("isLogin Auth", isLogin);
  //auth
  const handleAuth = async (e) => {
    e.preventDefault();
    isLogin
      ? (async () => {
          try {
            console.log("login: ", data);
            const res = await api.post("/auth/login", data);
            console.log("login: ", res.data);
            localStorage.setItem("token", res.data.token);
            console.log("token set: ", res.data.token)
            navigate("/dashboard");
          } catch (e) {
            console.log(e.response?.data);
          }
        })()
      : (async () => {
          try {
            console.log("register: ", data);
            const res = await api.post("/auth/register", data);
            console.log(res.data);
          } catch (e) {
            console.log(e.response?.data || e.message);
            setIsLogin(true)
          }
        })();
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">
              <h3 className="card-title text-center mb-4">
                {isLogin ? "Login" : "Register"}
              </h3>
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
                  {isLogin ? "Login" : "Register"}
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
