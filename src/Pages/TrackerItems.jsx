import React, { useEffect, useState } from "react";
import api from "../utils/api";
export default function ExpenseItem({ amount, onDelete }) {
  const [color, setColor] = useState(true);
  useEffect(() => {
    if (amount.type === "expense") setColor(false);
  }, []);
  const handleDelete = async (i) => {
    const res = await api.delete(`/api/tracker/${i}`);
    console.log("deleted: ", res?.data);
    onDelete(i);
  };
  return (
    <>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>{amount.title}</strong> - {amount.category}
        </div>
        {/* <span className="badge bg-primary rounded-pill" style={{backgroundColor:"red"}}>₹ {amount.amount}</span> */}
        <span
          className="p-1 rounded-pill"
          style={{ backgroundColor: color ? "lightgreen" : "red" }}
        >
          ₹ {amount.amount}
        </span>
        <div className="d-flex bg-dark ms-2">
          <button>Edit</button>
          <button onClick={() => handleDelete(amount._id)}>Delete</button>
        </div>
      </li>
    </>
  );
}
