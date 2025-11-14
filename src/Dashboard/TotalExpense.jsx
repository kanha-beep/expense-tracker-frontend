import React from "react";

export default function TotalExpense({ expense }) {
  return (
    <div>
      <div className="card bg-danger text-white">
        <div className="card-body">
          <h5 className="card-title">Total Expenses</h5>
          <h3 className="mb-0">Rs {expense}</h3>
        </div>
      </div>
    </div>
  );
}
