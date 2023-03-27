import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
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
      width: "100px",
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
      center: true,
      wrap: true,
    },
    // {
    //   name: "Edit",
    //   selector: (row) => (
    //     <button
    //       className="w-fit px-3 py-1 bg-green-400 hover:bg-green-500 rounded-md font-bold"
    //       onClick={() => {
    //         navigate("/edit-recall");
    //         setCurrentData(row);
    //       }}
    //     >
    //       Edit Data
    //     </button>
    //   ),
    //   center: true,
    //   wrap: true,
    // },
  ];

  useEffect(() => {
    if (userDetails.role === "friend") {
      const db = getDatabase();
      onValue(ref(db, `/${userDetails.name}`), (snapshot) => {
        const data2 = snapshot.val();
        // console.log(data2);
        setHistoryData(data2);
        setLoading(false);
      });
    } else {
      setHistoryData({});
      setLoading(false);
      setNoData(true);
    }
    setTimeout(() => {
      setNoData(true);
    }, 5000);
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      {rows.length > 0 ? (
        <>
          <h1 className="text-3xl font-semibold mt-10">History</h1>
          <div className="">
            <DataTableExtensions
              columns={columns}
              data={rows}
              exportHeaders={false}
              export={false}
              print={false}
              filterPlaceholder="Search"
            >
              <DataTable
                columns={columns}
                data={rows}
                progressPending={loading}
                highlightOnHover
              />
            </DataTableExtensions>
          </div>
        </>
      ) : noData ? (
        <>
          <h1 className="text-3xl font-semibold">History</h1>
          <h1 className="text-3xl font-semibold">No Data Found</h1>
          <h1>
            Please Write an Email to{" "}
            <a
              href={`mailto:rajjdhv2001@gmail.com?subject=Nutritionist App Subscription.&body=Need History of my Recalls. Username: ${userDetails.name}`}
            >
              <span className="text-blue-500">rajjdhv2001@gmail.com</span>
            </a>{" "}
            to Get History.
          </h1>
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
