import React, { useEffect, useState } from "react";
import EachRow from "./EachRow";
import TitleRow from "./TitleRow";

const Mealdiv = ({
  setNutrients,
  nutrients,
  userCred,
  userDetails,
  currentData,
  setCurrentData,
  allEnteredData,
  setAllEnteredData,
  setMealsobj,
  mealsobj,
  mealnum,
}) => {
  let [rownum, setRownum] = useState(5);
  let [totalProtine, setTotalProtine] = useState(0);
  let [totalCarbs, setTotalCarbs] = useState(0);
  let [totalFats, setTotalFats] = useState(0);
  let [totalCal, setTotalCal] = useState(0);
  let [totalCalcium, setTotalCalcium] = useState(0);
  let [totalIron, setTotalIron] = useState(0);
  let [totalFibre, setTotalFibre] = useState(0);
  let [mealName, setMealName] = useState(null);
  let [ready, setReady] = useState(false);

  useEffect(() => {
    return setMealsobj({
      ...mealsobj,
      [mealnum]: {
        [mealName]: rownum,
      },
    });
  }, [rownum, setRownum]);

  const handleCheck = (meal) => {
    if (meal in currentData) {
      console.log("already exists");
      alert("Meal Name already exist, please enter a different name");
      setReady(false);
    } else if (meal !== null && meal.trim() !== "") {
      setReady(true);
      setMealsobj({
        ...mealsobj,
        [mealnum]: {
          [meal]: rownum,
        },
      });
    } else {
      setReady(false);
    }
  };

  return (
    <div className="w-4/5 mx-auto flex flex-col space-y-2 justify-center items-center">
      <div className="w-fit flex flex-row ">
        <div className="w-fit   flex flex-row space-x-5 px-5 items-center">
          <input
            type="text"
            placeholder="Enter Meal Name"
            disabled={ready}
            className="w-fit h-full border-b-2 text-xl border-black px-3 py-1 placeholder:font-semibold"
            onWheel={(e) => e.target.blur()}
            onChange={(e) => {
              setMealName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handleCheck(mealName);
            }}
            hidden={ready}
            className="w-fit bg-green-500 px-3 h-fit rounded-md py-1 font-bold hover:bg-green-400"
          >
            OK
          </button>
        </div>
      </div>
      {ready ? (
        <>
          <TitleRow />
          <hr className="w-full" />
          {[...Array(rownum)].map((e, i) => {
            return (
              <EachRow
                key={i}
                idnum={i + 1}
                setNutrients={setNutrients}
                nutrients={nutrients}
                userCred={userCred}
                userDetails={userDetails}
                currentData={currentData}
                setCurrentData={setCurrentData}
                setTotalProtine={setTotalProtine}
                setTotalCarbs={setTotalCarbs}
                setTotalFats={setTotalFats}
                setTotalCal={setTotalCal}
                setTotalCalcium={setTotalCalcium}
                setTotalIron={setTotalIron}
                setTotalFibre={setTotalFibre}
                allEnteredData={allEnteredData}
                setAllEnteredData={setAllEnteredData}
                mealName={mealName}
              />
            );
          })}
          <div className="w-4/5">
            <div className="w-full mx-auto  flex flex-row space-x-6 items-center">
              <div className="w-full">
                <p className="text-center font-bold">subTotal-</p>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Energy </p>
                <h1 className="text-center">{totalCal.toFixed(3)}</h1>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Protein </p>
                <h1 className="text-center">{totalProtine.toFixed(3)}</h1>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Carbs </p>
                <h1 className="text-center">{totalCarbs.toFixed(3)}</h1>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Fats</p>{" "}
                <h1 className="text-center">{totalFats.toFixed(3)}</h1>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Fibre</p>{" "}
                <h1 className="text-center">{totalFibre.toFixed(3)}</h1>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Calcium</p>{" "}
                <h1 className="text-center">{totalCalcium.toFixed(3)}</h1>
              </div>
              <div className="w-full">
                <p className="text-center font-semibold">Iron</p>{" "}
                <h1 className="text-center">{totalIron.toFixed(3)}</h1>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-center space-x-5 font-bold ">
            <button
              className="rounded-lg border-dotted border-2 border-black px-2"
              onClick={() => {
                setRownum(rownum + 1);
              }}
            >
              Add Row
            </button>
            <button
              className="rounded-lg border-dotted border-2 border-black px-2"
              onClick={() => {
                if (rownum > 0) {
                  let data = { ...currentData };
                  if (data[mealName]) {
                    if (data[mealName][rownum] !== undefined) {
                      delete data[mealName][rownum];
                      console.log(data);
                      setCurrentData(data);
                      let alld = {
                        ...allEnteredData,
                      };
                      delete alld[mealName + rownum];
                      setAllEnteredData(alld);
                    }
                  }
                  setRownum(rownum - 1);
                }
              }}
            >
              Delete Row
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-xl text-red-500">
            Please Enter Meal Name
          </h1>
        </>
      )}
    </div>
  );
};

export default Mealdiv;
