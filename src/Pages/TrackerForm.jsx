import { useState } from "react";
import React from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
export default function TrackerForm({ onAdd }) {
  const navigate = useNavigate();
  //state
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "",
  });
  //handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((p) => ({
      ...p,
      [name]: value,
    }));
  };
  //handle Submit
  const handleAmount = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/tracker/new", data);
      console.log("added expense: ", res.data);
      setData({
        title: "",
        amount: "",
        category: "",
        type: "",
      });
      navigate("/tracker");
    } catch (e) {
      console.log("error while adding: ", e?.response?.data?.error);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form onSubmit={handleAmount} className="card p-4">
          <div className="mb-3">
            <input
              className="form-control"
              value={data.title}
              name="title"
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              name="category"
              value={data.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="fruits">Fruits</option>
              <option value="devices">Devices</option>
              <option value="groceries">Groceries</option>
              <option value="stationary">Stationary</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-control"
              name="type"
              value={data.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
