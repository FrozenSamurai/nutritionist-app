import { onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import DataTable from "react-data-table-component";
import EditFoodItemModal from "./EditFoodItemModal";
import { ClockLoader } from "react-spinners";
import AddFoodItem from "./AddFoodItem";

const EditFoodItems = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addFoodItem, setAddFoodItem] = useState(false);
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    const db = getDatabase();
    let nutrients = {};
    onValue(ref(db, `/nutrients`), (snapshot) => {
      const data = snapshot.val();
      nutrients = { ...data };
      const arr = Object.keys(nutrients).map((key, ind) => ({
        ...nutrients[key],
        name: key,
      }));

      console.log(arr);
      setRows(arr);
    });
    // console.log(nutrients);
  }, []);

  const columns = [
    // {
    //   name: <h1 className="text-lg">Id</h1>,

    //   selector: (row) => row.Uid,
    //   sortable: true,
    //   width: "30px",
    //   compact: true,
    //   center: true,
    //   style: {
    //     fontSize: 18,
    //   },
    // },
    {
      name: <h1 className="text-lg">Name</h1>,
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      width: "350px",
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Quantity</h1>,
      selector: (row) => row.amount,
      sortable: true,
      width: "100px",
      center: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Energy</h1>,
      selector: (row) => row.energy,
      sortable: true,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Protein</h1>,
      selector: (row) => row.protein,
      sortable: true,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Carbs</h1>,
      selector: (row) => row.carbs,
      sortable: true,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Fats</h1>,
      selector: (row) => row.fats,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Fibre</h1>,
      selector: (row) => row.fibre,
      sortable: true,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Calcium</h1>,
      selector: (row) => row.calcium,
      sortable: true,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Iron</h1>,
      selector: (row) => row.iron,
      sortable: true,
      width: "80px",
      right: true,
      compact: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Edit</h1>,
      selector: (row) => (
        <button
          className="w-fit px-3 py-1 bg-blue-400 hover:bg-blue-500 rounded-md font-bold"
          onClick={() => {
            setShowModal(!showModal);
            setItemData(row);
          }}
        >
          Edit
        </button>
      ),
      width: "120px",
      center: true,
      wrap: true,
      style: {
        fontSize: 18,
      },
    },
  ];

  return (
    <div className="w-full min-h-screen relative flex justify-center items-center">
      <div className="h-full w-fit">
        {rows.length === 0 ? (
          <ClockLoader color="#000" />
        ) : (
          <>
            <div className="w-full flex my-2">
              <span className="text-2xl w-full underline     text-center font-bold">
                Edit Food Items
              </span>
            </div>
            <DataTable columns={columns} data={rows} />
          </>
        )}
      </div>
      {showModal && (
        <EditFoodItemModal itemData={itemData} setShowModal={setShowModal} />
      )}
      <button
        className="px-2 py-1 fixed bg-blue-400 hover:bg-blue-300 top-3 left-10 rounded-md hover:scale-105"
        onClick={() => {
          setAddFoodItem(true);
        }}
      >
        Add New Food Item
      </button>
      {addFoodItem ? <AddFoodItem setAddFoodItem={setAddFoodItem} /> : <></>}
    </div>
  );
};

export default EditFoodItems;
