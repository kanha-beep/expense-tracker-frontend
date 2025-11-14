import React from "react";

export default function TotalIncome({ income }) {
  return (
    <div>
      <div className="card bg-success text-white">
        <div className="card-body">
          <h5 className="card-title">Total Income</h5>
          <h3 className="mb-0">Rs {income}</h3>
        </div>
      </div>
    </div>
  );
}
