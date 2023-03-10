import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import { BeatLoader } from "react-spinners";

const EditFoodItemModal = ({ setShowModal, itemData }) => {
  const [name, setName] = useState(itemData.name);
  const [amount, setAmount] = useState(itemData.amount);
  const [energy, setEnergy] = useState(itemData.energy);
  const [protein, setProtein] = useState(itemData.protein);
  const [carbs, setCarbs] = useState(itemData.carbs);
  const [fats, setFats] = useState(itemData.fats);
  const [calcium, setCalcium] = useState(itemData.calcium);
  const [fibre, setFibre] = useState(itemData.fibre);
  const [iron, setIron] = useState(itemData.iron);

  const [loading, setLoading] = useState(false);

  const db = getDatabase();

  const SaveNewItem = () => {
    const nutrientsRef = ref(db, `nutrients/${name}`);
    const newItem = {
      amount: amount ?? 0,
      energy: energy ?? 0,
      protein: protein ?? 0,
      carbs: carbs ?? 0,
      fats: fats ?? 0,
      calcium: calcium ?? 0,
      fibre: fibre ?? 0,
      iron: iron ?? 0,
    };
    console.log(newItem);
    set(nutrientsRef, {
      ...newItem,
    }).then(() => {
      setShowModal(false);
      alert("Item Added Successfully");
    });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold"> Edit Food Item</h3>
              <button
                className="p-1 w-fit h-fit ml-auto bg-white border-0 text-black hover:text-red-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setShowModal(false);
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
                    value={itemData.name}
                    disabled
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
                    value={amount}
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
                    value={energy}
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
                    value={protein}
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
                    value={carbs}
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
                    value={fats}
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
                    value={fibre}
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
                    value={calcium}
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
                    value={iron}
                    id="iron"
                    placeholder="Iron"
                    className="w-50 h-10 border-2 border-slate-200 rounded-lg p-2 "
                    onChange={(e) => {
                      setIron(e.target.value);
                    }}
                  />
                </div>
                {!loading ? (
                  <button
                    className="bg-green-500 w-fit px-5 py-1 rounded-md hover:bg-green-600 font-semibold "
                    onClick={() => {
                      setLoading(true);
                      SaveNewItem();
                    }}
                  >
                    Save Changes
                  </button>
                ) : (
                  <BeatLoader color="#000" />
                )}
                <button
                  className="bg-red-500 w-fit px-5 py-1 rounded-md hover:bg-red-600 font-semibold "
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
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

export default EditFoodItemModal;
