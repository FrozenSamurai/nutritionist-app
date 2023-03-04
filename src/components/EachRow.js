/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { getDatabase, ref, onValue } from "firebase/database";

const EachRow = ({
  idnum = 1,
  setNutrients,
  nutrients,
  userCred,
  userDetails,
  currentData,
  setCurrentData,
  setTotalCarbs,
  setTotalCal,
  setTotalFats,
  setTotalProtine,
  setTotalCalcium,
  setTotalIron,
  setTotalFibre,
  allEnteredData,
  setAllEnteredData,
  mealName,
}) => {
  const [selected, setSelected] = useState(null);
  const [volume, setVolume] = useState(null);
  const [options, setOptions] = useState([]);
  const [proteinval, setProteinval] = useState(null);
  const [carbval, setCarbval] = useState(null);
  const [fatsval, setFatsval] = useState(null);
  const [calval, setCalval] = useState(null);
  const [calcival, setCalcival] = useState(null);
  const [fibval, setFibval] = useState(null);
  const [ironval, setIronVal] = useState(null);

  const Updatetotal = (Data) => {
    let totalpro = 0;
    let totalcal = 0;
    let totalcarbs = 0;
    let totalfats = 0;
    let totalfib = 0;
    let totalcalcium = 0;
    let totaliron = 0;

    // console.log(Data);
    Object.keys(Data).map((key) => {
      if (key !== "total") {
        totalpro += parseFloat(Data[key]["protein"]);
        totalcal += parseFloat(Data[key]["energy"]);
        totalcarbs += parseFloat(Data[key]["carbs"]);
        totalfats += parseFloat(Data[key]["fats"]);
        totalfib += parseFloat(Data[key]["fibre"]);
        totalcalcium += parseFloat(Data[key]["calcium"]);
        totaliron += parseFloat(Data[key]["iron"]);
      }
    });
    setTotalProtine(totalpro);
    setTotalCal(totalcal);
    setTotalCarbs(totalcarbs);
    setTotalFats(totalfats);
    setTotalCalcium(totalcalcium);
    setTotalIron(totaliron);
    setTotalFibre(totalfib);
    // const data = {
    //   ...currentData[mealName],
    //   total: {
    //     protein: totalpro,
    //     energy: totalcal,
    //     carbs: totalcarbs,
    //     fats: totalfats,
    //   },
    // };
    // setCurrentData({ ...currentData, [mealName]: data });
  };

  const handleChange = (select = selected, vol) => {
    if (vol === null || select === null) {
      return;
    } else {
      const vals = nutrients[select];
      let pro = ((vals["protein"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setProteinval(pro);
      let carb = ((vals["carbs"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setCarbval(carb);
      let fats = ((vals["fats"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setFatsval(fats);
      let energy = ((vals["energy"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setCalval(energy);
      let calcium = ((vals["calcium"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setCalcival(calcium);
      let fibre = ((vals["fibre"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setFibval(fibre);
      let iron = ((vals["iron"] ?? 0 * vol) / vals["amount"]).toFixed(2);
      setIronVal(iron);
      let alldata = {
        ...allEnteredData,
        [mealName + idnum]: {
          name: select,
          volume: vol,
          protein: pro,
          carbs: carb,
          fats: fats,
          energy: energy,
          calcium: calcium,
          fibre: fibre,
          iron: iron,
        },
      };
      setAllEnteredData(alldata);
      let Data = {
        ...currentData[mealName],
        [idnum]: {
          name: select,
          volume: vol,
          protein: pro,
          carbs: carb,
          fats: fats,
          energy: energy,
          calcium: calcium,
          fibre: fibre,
          iron: iron,
        },
      };
      console.log(Data);
      setCurrentData({ ...currentData, [mealName]: { ...Data } });

      Updatetotal(Data);
    }
  };
  useEffect(() => {
    Updatetotal(currentData[mealName] ?? {});
  }, [currentData, setCurrentData]);
  useEffect(() => {
    const db = getDatabase();
    const nutrientsRef = ref(db, "nutrients");
    onValue(nutrientsRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      setNutrients(data);
      const array = [];
      Object.keys(data).map((key) => {
        array.push({ value: key, label: key });
      });
      setOptions(array);
      // console.log(array);
    });
  }, []);

  return (
    <div className="w-full mx-auto flex flex-row space-x-2">
      <div>
        <h1 className="text-2xl font-bold">{idnum}</h1>
      </div>
      <div className="w-1/5">
        <Select
          options={options}
          onChange={(ValueType, ActionTypes) => {
            setSelected(ValueType["value"]);
            console.log(ValueType["value"]);
            handleChange(ValueType["value"], volume);
          }}
        />
      </div>
      <div className="w-24">
        <input
          type="number"
          placeholder="g/ml"
          className="w-full text-center h-full border-2"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            setVolume(e.target.value);
            handleChange(selected, e.target.value);
          }}
        />
      </div>
      <div className="w-fit flex flex-row">
        <input
          type="number"
          placeholder="--"
          defaultValue={calval}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="--"
          defaultValue={proteinval}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="--"
          defaultValue={carbval}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="--"
          defaultValue={fatsval}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="--"
          defaultValue={fibval}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="--"
          defaultValue={calcival}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="--"
          defaultValue={ironval}
          className="w-2/5 h-full border-2 text-center"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default EachRow;
