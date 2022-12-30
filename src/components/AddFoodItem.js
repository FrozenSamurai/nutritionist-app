import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";

const AddFoodItem = ({ setAddFoodItem }) => {
  const [nutrients, setNutrients] = useState(null);

  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [protein, setProtein] = useState(null);
  const [carbs, setCarbs] = useState(null);

  const [fats, setFats] = useState(null);
  const [calcium, setCalcium] = useState(null);
  const [fibre, setFibre] = useState(null);
  const [iron, setIron] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const nutrientsRef = ref(db, "nutrients");
    onValue(nutrientsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setNutrients(data);
      //   const array = [];
      //   Object.keys(data).map((key) => {
      //     array.push({ value: key, label: key });
      //   });
      // console.log(array);
    });
  }, []);

  const SaveNewItem = () => {
    if (name in nutrients) {
      alert("Item Name already exists");
      return;
    } else if (name) {
      const db = getDatabase();
      const nutrientsRef = ref(db, `nutrients/${name}`);
      const newItem = {
        amount: amount,
        energy: energy,
        protein: protein,
        carbs: carbs,
        fats: fats,
        calcium: calcium,
        fibre: fibre,
        iron: iron,
      };
      console.log(newItem);
      set(nutrientsRef, {
        ...newItem,
      }).then(() => {
        setAddFoodItem(false);
        alert("Item Added Successfully");
      });
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold"> ADD New Item</h3>
              <button
                className="p-1 w-fit h-fit ml-auto bg-white border-0 text-black hover:text-red-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setAddFoodItem(false);
                }}
              >
                <span className="bg-white   h-6 w-6 text-3xl outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-col flex w-full items-center justify-center space-x-5">
              <div className="flex flex-col space-y-2 w-80 items-center justify-center">
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Name:</h1>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Amount:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="amount"
                    id="amount"
                    placeholder="Std. Amount"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Energy:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="energy"
                    id="energy"
                    placeholder="Energy"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setEnergy(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Protine:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="protein"
                    id="protein"
                    placeholder="Protein"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setProtein(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Carbs:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="carbs"
                    id="carbs"
                    placeholder="Carbs"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setCarbs(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Fats:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="fats"
                    id="fats"
                    placeholder="Fats"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setFats(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Fibre:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="fibre"
                    id="fibre"
                    placeholder="Fibre"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setFibre(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Calcium:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="calcium"
                    id="calcium"
                    placeholder="Calcium"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setCalcium(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-row text-lg font-semibold items-center justify-between space-x-1">
                  <h1>Iron:</h1>
                  <input
                    type="number"
                    onWheel={(e) => {
                      e.preventDefault();
                    }}
                    name="iron"
                    id="iron"
                    placeholder="Iron"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setIron(e.target.value);
                    }}
                  />
                </div>
                <button
                  className="bg-green-500 w-fit px-5 py-1 rounded-md hover:bg-green-600 font-semibold "
                  onClick={() => {
                    SaveNewItem();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default AddFoodItem;
