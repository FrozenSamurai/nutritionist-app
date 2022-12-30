import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const History = ({ userDetails, userCred }) => {
  const navigate = useNavigate();

  const [historyData, setHistoryData] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempRows = Object.keys(historyData).map((key, ind) => ({
      ...historyData[key],
      Uid: key,
    }));

    setRows(tempRows);

    return () => {};
  }, [historyData, setHistoryData]);

  const columns = [
    {
      name: "UID",
      selector: (row) => row.Uid,
      sortable: true,
      wrap: true,
    },
    {
      name: "Time Stamp",
      selector: (row) =>
        new Date(row.TimeStamp ?? Date.now() * 1000).toLocaleString(),
      sortable: true,
      wrap: true,
    },
    {
      name: "Age",
      selector: (row) => row.Age,
      sortable: true,
      wrap: true,
    },
    {
      name: "Gender",
      selector: (row) => row.Gender,
      sortable: true,
      wrap: true,
    },
    {
      name: "Weight",
      selector: (row) => row.Weight,
      sortable: true,
      wrap: true,
    },
    {
      name: "Height",
      selector: (row) => row.Height,
      sortable: true,
      wrap: true,
    },
    {
      name: "View Recall",
      selector: (row) => (
        <button
          className="w-fit px-3 py-1 bg-blue-500 hover:bg-blue-400 rounded-md font-bold"
          onClick={() => {
            console.log(row.Recall);
            navigate("/history-recall");
          }}
        >
          View Recall
        </button>
      ),
      wrap: true,
    },
  ];

  useEffect(() => {
    const db = getDatabase();
    onValue(
      ref(db, `/${userDetails.name}`),
      (snapshot) => {
        const data2 = snapshot.val();
        console.log(data2);
        setHistoryData(data2);
        setLoading(false);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);
  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h1 className="text-3xl font-semibold">History</h1>
      {rows.length > 0 ? (
        <div className="w-5/6">
          <DataTable columns={columns} data={rows} progressPending={loading} />
        </div>
      ) : (
        <h1 className="text-2xl text-center w-full">No Data</h1>
      )}
    </div>
  );
};

export default History;
