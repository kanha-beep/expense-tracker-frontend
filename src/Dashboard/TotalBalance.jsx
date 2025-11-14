import React from "react";

export default function TotalBalance({ balance }) {
  return (
    <div>
      <div className="card bg-info text-white">
        <div className="card-body">
          <h5 className="card-title">Total Balance</h5>
          <h3 className="mb-0">{balance}</h3>
        </div>
      </div>
    </div>
  );
}
