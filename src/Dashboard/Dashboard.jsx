import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import TotalIncome from "./TotalIncome";
import TotalExpense from "./TotalExpense";
import TotalBalance from "./TotalBalance";

export default function Dashboard({ isLogin, setIsLogin }) {
  const [txn, setTxn] = useState([]);
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [balance, setBalance] = useState("");
  // console.log("isLogin Dashboard: ", isLogin);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("/tracker");
        console.log("all txns: ", res.data);
        setIncome(res.data.totalIncome);
        setExpense(res.data.totalExpense);
        setBalance(res.data.totalBalance);
        setTxn(res.data.recent);
      } catch (error) {
        console.log("error: ", error?.response?.data?.error);
      }
    };
    getData();
  }, []);
  console.log("txn: ", txn);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLogin(true);
  }, []);
  return (
    <div className="container mt-4">
      {isLogin === false ? (
        <div className="alert alert-danger" role="alert">
          Please login to access the dashboard.
        </div>
      ) : (
        <>
          {/* head */}
          <div className="row">
            <div className="col-12">
              <h2 className="mb-4">Dashboard</h2>
            </div>
          </div>

          <>
            <div className="row mb-4">
              {/* income */}
              <div className="col-md-4 mb-3">
                <TotalIncome income={income} />
              </div>
              {/* expense */}
              <div className="col-md-4 mb-3">
                <TotalExpense expense={expense} />
              </div>
              {/* balance */}
              <div className="col-md-4 mb-3">
                <TotalBalance balance={balance} />
              </div>
            </div>
          </>
          {/* recent txn box */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Recent Transactions</h5>
                  <Link className="btn btn-sm btn-primary" to="/tracker">
                    View All
                  </Link>
                </div>
                {txn.map((t) => (
                  <div key={t._id}>
                    <div className="card-body">
                      <div className="list-group list-group-flush">
                        <div className="list-group-item d-flex justify-content-between">
                          <span>{t.title}</span>
                          <span
                            className={
                              t.type === "income"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {t.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* quick actions box */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link className="btn btn-success" to="/tracker/new">
                      Add Transaction
                    </Link>
                    <Link className="btn btn-info" to="/monthly-report">
                      Monthly Report
                    </Link>
                    <Link className="btn btn-warning" to="/profile">
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
