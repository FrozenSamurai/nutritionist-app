import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Table = ({ recall }) => {
  const [rows, setRows] = useState([]);
  const [cal, setCal] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [fibre, setFibre] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [iron, setIron] = useState(0);

  useEffect(() => {
    console.log(recall, "recall");
    const arr = Object.keys(recall).map((key, ind) => ({
      ...recall[key],
      Uid: key,
    }));

    console.log(arr);
    setRows(arr);

    let cal = 0,
      pro = 0,
      carb = 0,
      fat = 0,
      fib = 0,
      calc = 0,
      iro = 0;

    Object.keys(recall).map((key) => {
      cal = cal + parseFloat(recall[key].energy);
      carb = carb + parseFloat(recall[key].carbs);
      pro = pro + parseFloat(recall[key].protein);
      fat = fat + parseFloat(recall[key].fats);
      calc = calc + parseFloat(recall[key].calcium);
      iro = iro + parseFloat(recall[key].iron);
      fib = fib + parseFloat(recall[key].fibre);
    });

    setCal(cal);
    setCalcium(calc);
    setCarbs(carb);
    setFats(fat);
    setProtein(pro);
    setFibre(fib);
    setIron(iro);
  }, []);

  const columns = [
    {
      name: <h1 className="text-lg">Id</h1>,

      selector: (row) => row.Uid,
      sortable: true,
      width: "30px",
      compact: true,
      center: true,
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Name</h1>,
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
      width: "150px",
      style: {
        fontSize: 18,
      },
    },
    {
      name: <h1 className="text-lg">Quantity</h1>,
      selector: (row) => row.volume,
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
  ];

  return (
    <>
      <DataTable columns={columns} data={rows} />
      <div className="w-full mx-auto mt-5 border-2 flex flex-row space-x-6 items-center">
        <div className="w-full">
          <p className="text-center font-bold">subTotal-</p>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Energy </p>
          <h1 className="text-center">{cal.toFixed(3)}</h1>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Protein </p>
          <h1 className="text-center">{protein.toFixed(3)}</h1>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Carbs </p>
          <h1 className="text-center">{carbs.toFixed(3)}</h1>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Fats</p>{" "}
          <h1 className="text-center">{fats.toFixed(3)}</h1>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Fibre</p>{" "}
          <h1 className="text-center">{fibre.toFixed(3)}</h1>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Calcium</p>{" "}
          <h1 className="text-center">{calcium.toFixed(3)}</h1>
        </div>
        <div className="w-full">
          <p className="text-center font-semibold">Iron</p>{" "}
          <h1 className="text-center">{iron}</h1>
        </div>
      </div>
    </>
  );
};

export default Table;
