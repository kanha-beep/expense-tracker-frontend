import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function MonthlyReport() {
  const [AllTxn, setAllTxn] = useState([]);
  const [report, setReport] = useState({});
  // get all txn list
  useEffect(() => {
    const getAllTxn = async () => {
      try {
        const res = await api.get("/api/tracker");
        console.log("all txn for report: ", res?.data?.report);
        setAllTxn(res.data?.txn);
        setReport(res.data?.report);
      } catch (e) {
        console.log("error in report: ", e.response?.data?.error);
      }
    };
    getAllTxn();
  }, []);
  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Month,Title,Type,Amount,Date\n";
    Object.keys(report).forEach((month) => {
      report[month]?.entries?.forEach((t) => {
        // each row has one txn
        const row = [month, t.title, t.type, t.amount, t.date].join(",");
        csvContent += row + "\n";
      });
    });
    // create url from string
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    // the link to which a tag will point
    link.setAttribute("href", encodedUri);
    // don't navigate just download with name
    link.setAttribute("download", "monthly_report.csv");
    // add click remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Monthly Report</h2>
            <button onClick={downloadCSV}>Download</button>
          </div>
        </div>
        {Object.keys(report).map((month) => (
          <div key={month} className="mb-4">
            <h3>{month}</h3>
            <p>
              Total Income: <b>{report[month]?.income ?? 0}</b>
            </p>
            <p>
              Total Expense: <b>{report[month]?.expense ?? 0}</b>
            </p>
            <div
              className="d-grid"
              style={{
                gridTemplateColumns: "50px 150px 100px 100px 150px",
                gap: "10px",
                fontWeight: "bold",
              }}
            >
              <div>#</div>
              <div>Title</div>
              <div>Type</div>
              <div>Amount</div>
              <div>Date</div>
              {report[month]?.entries?.map((t, i) => (
                <React.Fragment key={t._id}>
                  <div>{i + 1}</div>
                  <div>{t.title}</div>
                  <div>{t.type}</div>
                  <div>{t.amount}</div>
                  <div>{t.date}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
