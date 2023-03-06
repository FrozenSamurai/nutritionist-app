import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { ClockLoader } from "react-spinners";

const History = ({ userDetails, userCred, setCurrentData, currentData }) => {
  const navigate = useNavigate();

  const [historyData, setHistoryData] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const tempRows = Object.keys(historyData).map((key, ind) => ({
      ...historyData[key],
      Uid: key,
    }));
    console.log(tempRows);
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
            setCurrentData(row);
            navigate("/history-recall");
          }}
        >
          View Recall
        </button>
      ),
      wrap: true,
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          className="w-fit px-3 py-1 bg-red-400 hover:bg-red-500 rounded-md font-bold"
          onClick={() => {
            console.log(row.Uid);
            setShowModal(!showModal);
            setCurrentData(row);
          }}
        >
          Delete
        </button>
      ),
      wrap: true,
    },
  ];

  useEffect(() => {
    const db = getDatabase();
    onValue(ref(db, `/${userDetails.name}`), (snapshot) => {
      const data2 = snapshot.val();
      console.log(data2);
      setHistoryData(data2);
      setLoading(false);
    });

    setTimeout(() => {
      setNoData(true);
    }, 10000);
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center mt-10">
      {rows.length > 0 ? (
        <>
          <h1 className="text-3xl font-semibold">History</h1>
          <div className="w-5/6">
            <DataTable
              columns={columns}
              data={rows}
              progressPending={loading}
            />
          </div>
        </>
      ) : noData ? (
        <>
          <h1 className="text-3xl font-semibold">History</h1>
          <h1 className="text-3xl font-semibold">No Data Found</h1>
        </>
      ) : (
        <ClockLoader color="#000" />
      )}
      {showModal && (
        <DeleteModal
          setShowModal={setShowModal}
          currentData={currentData}
          userDetails={userDetails}
        />
      )}
    </div>
  );
};

export default History;
