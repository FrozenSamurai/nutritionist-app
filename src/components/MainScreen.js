/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Mealdiv from "./Mealdiv";
import { MdPostAdd, MdDelete } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import SaveModal from "./SaveModal";
import { getDatabase, ref, onValue } from "firebase/database";
import AddFoodItem from "./AddFoodItem";

const MainScreen = ({
  setNutrients,
  nutrients,
  userCred,
  userDetails,
  currentData,
  setCurrentData,
  allEnteredData,
  setAllEnteredData,
}) => {
  let [mealnum, setMealnum] = useState(0);
  let [grandCal, setGrandCal] = useState(0);
  let [grandPro, setGrandPro] = useState(0);
  let [grandCarb, setGrandCarb] = useState(0);
  let [grandFat, setGrandFat] = useState(0);
  let [grandCalcium, setGrandCalcium] = useState(0);
  let [grandIron, setGrandIron] = useState(0);
  let [grandFibre, setGrandFibre] = useState(0);
  let [mealsobj, setMealsobj] = useState({});
  let [showModal, setShowModal] = useState(false);
  let [allUIDs, setAllUIDs] = useState([]);
  let [uid, setUid] = useState("");
  let [age, setAge] = useState(0);
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState(0);
  let [gender, setGender] = useState("");
  let [errors, setErrors] = useState();
  const [addFoodItem, setAddFoodItem] = useState(false);

  const HandleGrandTotals = () => {
    let cal = 0;
    let pro = 0;
    let carb = 0;
    let fat = 0;
    let calcium = 0;
    let iron = 0;
    let fibre = 0;

    Object.keys(allEnteredData).map((e) => {
      cal += parseFloat(allEnteredData[e]["energy"]);
      pro += parseFloat(allEnteredData[e]["protein"]);
      carb += parseFloat(allEnteredData[e]["carbs"]);
      fat += parseFloat(allEnteredData[e]["fats"]);
      calcium += parseFloat(allEnteredData[e]["calcium"]);
      iron += parseFloat(allEnteredData[e]["iron"]);
      fibre += parseFloat(allEnteredData[e]["fibre"]);
      return 0;
    });
    setGrandCal(cal.toFixed(3));
    setGrandPro(pro.toFixed(3));
    setGrandCarb(carb.toFixed(3));
    setGrandFat(fat.toFixed(3));
    setGrandCalcium(calcium.toFixed(3));
    setGrandIron(iron.toFixed(3));
    setGrandFibre(fibre.toFixed(3));
  };

  useEffect(() => {
    const db = getDatabase();
    const UIDsRef = ref(db, `UIDs`);
    onValue(UIDsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      const arrayOfUIDs = [];
      Object.keys(data).map((e) => {
        arrayOfUIDs.push(data[e]);
        return 0;
      });
      setAllUIDs(arrayOfUIDs);
    });
  }, []);

  useEffect(() => {
    HandleGrandTotals();
  }, [allEnteredData, setAllEnteredData]);

  const HandleDeleteMeal = () => {
    let mealname = Object.keys(mealsobj[mealnum]);
    let numofrows = mealsobj[mealnum][mealname];
    let temp = allEnteredData;
    Object.keys(temp).map((e) => {
      [...Array(numofrows)].map((i, j) => {
        // console.log(temp[mealname + (j + 1)], mealname + (j + 1));
        delete temp[mealname + (j + 1)];
        return 0;
      });
      return 0;
    });
    // console.log(temp);
    setAllEnteredData(temp);
    setMealnum(mealnum - 1);
    HandleGrandTotals();
    const currTemp = currentData;
    delete currTemp[mealname];
    setCurrentData(currTemp);
    let temper = mealsobj;
    delete temper[mealnum];
    setMealsobj(temper);
    // setMealnum(mealnum - 1);
  };

  const HandleSave = () => {
    if (uid !== "" && age > 0 && height !== "" && weight > 0 && gender !== "") {
      setErrors(null);
      setShowModal(true);
    } else {
      setShowModal(false);
      let err = "Please check ";
      if (uid === "") {
        err += "Unique ID. ";
      }
      if (age === 0 || age === null) {
        err += "Age. ";
      }
      if (height === "") {
        err += "Height. ";
      }
      if (weight === "") {
        err += "Weight. ";
      }
      if (gender === "") {
        err += "Gender. ";
      }
      setErrors(err);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-10 relative pb-10">
      <div className="w-full flex flex-col items-center space-y-5 mb-5">
        <h1 className="text-3xl w-full text-center font-semibold">
          Nutrition Tracker
        </h1>
        <div className="w-fit flex-wrap space-x-2 flex text-lg">
          <div className="w-fit flex-row flex pr-2 border-r-2">
            <h1 className="cursor-default font-semibold">
              Unique ID
              <span title="Compulsory" className="text-red-500">
                *
              </span>
              :
            </h1>
            <input
              type="text"
              className="border-b-2 w-32 text-center border-black px-2 ml-2"
              onChange={(e) => {
                setUid(e.target.value.trim());
              }}
              onBlur={(e) => {
                console.log("allUIDs", allUIDs);
                if (allUIDs.includes(e.target.value.trim())) {
                  alert("This ID already exists. Please enter a new one.");
                  setUid("");
                  e.target.value = "";
                  e.target.focus();
                }
              }}
            />
          </div>
          <div className="w-fit flex-row flex pr-2 border-r-2">
            <h1 className="cursor-default font-semibold">
              Age
              <span title="Compulsory" className="text-red-500">
                *
              </span>
              :
            </h1>
            <input
              type="number"
              className="border-b-2 w-20 text-center border-black px-2 ml-2"
              onWheel={(e) => {
                e.target.blur();
              }}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div>
          <div className="w-fit flex-row flex pr-2 border-r-2">
            <h1 className="cursor-default font-semibold">
              Height
              <span title="Compulsory" className="text-red-500">
                *
              </span>
              :
            </h1>
            <input
              type="text"
              className="border-b-2 w-20 text-center border-black px-2 ml-2"
              onChange={(e) => {
                setHeight(e.target.value.trim());
              }}
            />
          </div>
          <div className="w-fit flex-row flex pr-2 border-r-2">
            <h1 className="cursor-default font-semibold">
              Weight
              <span title="Compulsory" className="text-red-500">
                *
              </span>
              :
            </h1>
            <input
              type="number"
              className="border-b-2 w-20 text-center border-black px-2 ml-2"
              onWheel={(e) => {
                e.target.blur();
              }}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
            <h1>Kgs.</h1>
          </div>
          <div className="w-fit flex-row flex ">
            <h1 className="cursor-default font-semibold">
              Gender
              <span title="Compulsory" className="text-red-500">
                *
              </span>
              :
            </h1>
            <input
              type="text"
              className="border-b-2 w-20 text-center border-black px-2 ml-2"
              onChange={(e) => {
                setGender(e.target.value.trim());
              }}
            />
          </div>
        </div>
        {errors ? <h1 className="text-red-500">{errors}</h1> : null}
      </div>
      <hr className="w-5/6 border-t-2 border-gray-300 mb-5" />
      <div className="w-full flex flex-col space-y-5">
        {[...Array(mealnum)].map((e, i) => {
          return (
            <>
              <Mealdiv
                key={i}
                mealnum={mealnum}
                setMealsobj={setMealsobj}
                mealsobj={mealsobj}
                nutrients={nutrients}
                setNutrients={setNutrients}
                userDetails={userDetails}
                userCred={userCred}
                setCurrentData={setCurrentData}
                currentData={currentData}
                allEnteredData={allEnteredData}
                setAllEnteredData={setAllEnteredData}
              />
            </>
          );
        })}
      </div>
      {Object.keys(mealsobj).length > 0 ? (
        <div className="flex flex-row items-center space-x-5 border-2 border-black px-5 mt-5 font-semibold ">
          <h1>Grand Total -</h1>
          <div className="flex flex-row space-x-5 ">
            <div className="flex flex-col justify-center items-center">
              <h1>Calories</h1>
              <h1>{grandCal}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Protein</h1>
              <h1>{grandPro}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Carbs</h1>
              <h1>{grandCarb}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Fats</h1>
              <h1>{grandFat}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Fibre</h1>
              <h1>{grandFibre}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Calcium</h1>
              <h1>{grandCalcium}</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1>Iron</h1>
              <h1>{grandIron}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold  font-firaCode underline">
            Click on {"~>"} Add New Meal
          </h1>
        </div>
      )}
      <div className="mt-5 w-fit flex flex-col space-y-3 jus">
        <button
          onClick={() => setMealnum(mealnum + 1)}
          className={`w-full text-xl border-2 px-3 py-1 bg-green-500 hover:bg-green-600 flex flex-row items-center space-x-1 rounded-md ${
            Object.keys(mealsobj).length === 0
              ? "animate-pulse hover:animate-none"
              : ""
          }`}
        >
          <MdPostAdd size={25} />
          <h1>Add New Meal</h1>
        </button>
        {Object.keys(mealsobj).length > 0 && (
          <button
            onClick={() => (mealnum > 0 ? HandleDeleteMeal() : null)}
            className="w-fit text-xl border-2 px-3  py-1 bg-red-500 flex flex-row items-center justify-center  space-x-1 hover:bg-red-600 rounded-md"
          >
            <MdDelete size={20} />
            <h1>Delete Recent Meal</h1>
          </button>
        )}
      </div>

      {Object.keys(currentData).length > 0 ? (
        <div>
          <button
            onClick={() => {
              HandleSave();
            }}
            className="w-full text-xl border-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 flex flex-row items-center space-x-1 rounded-md"
            title="Save"
          >
            <TfiSave size={25} />
            <h1>Save Data</h1>
          </button>
        </div>
      ) : null}
      {showModal ? (
        <SaveModal
          setShowModal={setShowModal}
          currentData={currentData}
          uid={uid}
          height={height}
          weight={weight}
          age={age}
          gender={gender}
        />
      ) : null}
      <button
        className="px-2 py-1 absolute bg-blue-400 hover:bg-blue-300 top-0 left-20 rounded-md hover:scale-105"
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

export default MainScreen;
