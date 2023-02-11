/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import Table from "./Table";
import { useReactToPrint } from "react-to-print";
// import Pdf from "react-to-pdf";

const HistoryRecall = ({ setCurrentData, currentData }) => {
  let [totalProtine, setTotalProtine] = useState(0);
  let [totalCarbs, setTotalCarbs] = useState(0);
  let [totalFats, setTotalFats] = useState(0);
  let [totalCal, setTotalCal] = useState(0);
  let [totalCalcium, setTotalCalcium] = useState(0);
  let [totalIron, setTotalIron] = useState(0);
  let [totalFibre, setTotalFibre] = useState(0);
  let [print, setPrint] = useState(false);

  const printref = useRef();

  useEffect(() => {
    let cal = 0,
      pro = 0,
      carb = 0,
      fat = 0,
      fib = 0,
      calc = 0,
      iro = 0;
    Object.keys(currentData.Recall).map((key) => {
      Object.keys(currentData.Recall[key]).map((key2) => {
        cal = cal + parseFloat(currentData.Recall[key][key2].energy);
        carb = carb + parseFloat(currentData.Recall[key][key2].carbs);
        pro = pro + parseFloat(currentData.Recall[key][key2].protein);
        fat = fat + parseFloat(currentData.Recall[key][key2].fats);
        calc = calc + parseFloat(currentData.Recall[key][key2].calcium);
        iro = iro + parseFloat(currentData.Recall[key][key2].iron);
        fib = fib + parseFloat(currentData.Recall[key][key2].fibre);
      });
    });
    setTotalCal(cal);
    setTotalCalcium(calc);
    setTotalCarbs(carb);
    setTotalFats(fat);
    setTotalFibre(fib);
    setTotalIron(iro);
    setTotalProtine(pro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printref.current,
  });
  useEffect(() => {
    if (print) handlePrint();
  }, [print, handlePrint]);
  // const options = {
  //   orientation: "landscape",
  //   // unit: "in",
  //   // format: [4, 2],
  // };
  return (
    <>
      {/* <Pdf
        targetRef={printref}
        filename={`${currentData.Uid}.pdf`}
        options={options}
        x={0.5}
        y={0.5}
        scale={0.8}
      >
        {({ toPdf }) => (
          <button onClick={toPdf} className="fixed z-50">
            Generate pdf
          </button>
        )}
      </Pdf> */}
      <div
        className="w-full h-full  overflow-x-hidden relative flex flex-col space-y-5 py-4 justify-center items-center"
        ref={printref}
      >
        {!print && (
          <button
            className="absolute top-10 right-10 bg-red-500 rounded-md p-2 px-5 text-white font-bold hover:bg-red-400 hover:text-black md:block hidden"
            onClick={() => {
              setPrint(true);
              setTimeout(() => {
                setPrint(false);
              }, 2000);
              // handlePrint();
            }}
          >
            Save
          </button>
        )}
        <div className="w-full flex justify-center items-center mt-5 flex-row space-x-10">
          <h1 className="text-3xl text-center font-semibold ">
            Unique Id:{" "}
            <span className="border-2 border-black px-5 rounded-md">
              {currentData.Uid}
            </span>
          </h1>
          <h1 className="text-3xl text-center font-semibold ">
            Age:{" "}
            <span className="border-2 border-black px-5 rounded-md">
              {currentData.Age}
            </span>
          </h1>
          <h1 className="text-3xl text-center font-semibold ">
            Height:{" "}
            <span className="border-2 border-black px-5 rounded-md">
              {currentData.Height}
            </span>
          </h1>
          <h1 className="text-3xl text-center font-semibold ">
            Weight:{" "}
            <span className="border-2 border-black px-5 rounded-md">
              {currentData.Weight}
            </span>
          </h1>
          <h1 className="text-3xl text-center font-semibold ">
            Gender:{" "}
            <span className="border-2 border-black px-5 rounded-md">
              {currentData.Gender}
            </span>
          </h1>
        </div>
        <hr className="border-slate-200 border-2 bg-slate-200  w-full  px-10" />
        <div className="w-4/5 flex flex-col space-y-5 ">
          {Object.keys(currentData.Recall).map((key, ind) => {
            return (
              <div className="w-full flex flex-col justify-center items-center overflow-x-hidden">
                <div className="w-fit">
                  <h1 className="text-2xl font-bold">{key}</h1>
                  <hr className="border-t-2 w-full border-black" />
                </div>
                <div className="w-fit">
                  <Table recall={currentData.Recall[key]} />
                </div>
                <hr className="border-t-2 border-black w-full mt-5"></hr>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row items-center space-x-5 border-2 border-black px-5 mt-5 mb-5 font-semibold ">
          <h1>Grand Total -</h1>
          <div className="flex flex-row space-x-5 ">
            <div className="flex flex-col justify-center items-center">
              <h1>Calories</h1>
              <h1>{totalCal.toFixed(3)}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Protein</h1>
              <h1>{totalProtine.toFixed(3)}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Carbs</h1>
              <h1>{totalCarbs.toFixed(3)}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Fats</h1>
              <h1>{totalFats.toFixed(3)}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Fibre</h1>
              <h1>{totalFibre.toFixed(3)}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Calcium</h1>
              <h1>{totalCalcium.toFixed(3)}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Iron</h1>
              <h1>{totalIron.toFixed(3)}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryRecall;
