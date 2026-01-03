import { useState } from "react";
import React, { useEffect } from "react";
import api from "../utils/api";

export default function Profile({ user, setUser }) {
  console.log("user: ", user)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((p) => ({ ...p, [name]: value }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("clock ho ghya");
    try {
      const res = await api.patch("/api/auth/me/edit", user);
      console.log("user details: ", res.data);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("error user: ", error?.response?.data?.error);
    }
  };
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">User Profile</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 text-center mb-3">
                  {/* photo */}
                  <div
                    className="bg-secondary rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "center",
                    }}
                  >
                    <i className="text-white" style={{ fontSize: "3rem" }}>
                      👤
                    </i>
                  </div>
                  <button className="btn btn-outline-primary btn-sm">
                    Change Photo
                  </button>
                </div>
                <div className="col-md-8">
                  {/* form */}
                  <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={user?.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={user?.email}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        value={user.password}
                      />
                    </div> */}
                    <button className="btn btn-primary" type="submit">
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
