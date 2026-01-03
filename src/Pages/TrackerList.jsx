import TrackerItems from "./TrackerItems.jsx";
import React, { useEffect, useState } from "react";
import api from "../utils/api.js";
import { Link } from "react-router-dom";
export default function TrackerList() {
  const [tracker, setTracker] = useState([]);
  useEffect(() => {
    const getAllTracker = async () => {
      try {
        const res = await api.get("/tracker");
        console.log("1. All Tracker:", res.data);
        setTracker(res.data.txn);
      } catch (e) {
        console.log(e?.response?.data?.message);
      }
    };
    getAllTracker();
  }, []);
  const handleFilter = async (category = "All") => {
    console.log("category send: ", category);
    try {
      const res = await api.get(`/tracker?category=${category}`);
      // console.log("res: ", res?.data?.);
      setTracker(res.data.txn);
    } catch (e) {
      console.log(e?.response?.data?.message);
    }
  };
  const handleDeleteFromUI = (i) => {
    setTracker((p) => p.filter((t) => t._id !== i));
  };
  useEffect(() => {
    handleFilter("All");
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Expense List</h2>
          <Link className="btn btn-success" to="/tracker/new">
            Add Expense
          </Link>
        </div>
        <div>
          <button onClick={() => handleFilter("all")}>All</button>
          <button onClick={() => handleFilter("fruits")}>Fruit</button>
          <button onClick={() => handleFilter("devices")}>Devices</button>
          <button onClick={() => handleFilter("groceries")}>Grocery</button>
        </div>
        <ul className="list-group">
          {tracker &&
            tracker.map((t) => (
              <TrackerItems
                key={t._id}
                amount={t}
                onDelete={handleDeleteFromUI}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
