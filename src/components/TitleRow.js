import React from "react";
import Select from "react-select";
const TitleRow = () => {
  return (
    <div className="w-full  mx-auto flex flex-row space-x-2 items-center">
      <div className="w-fit h-full flex flex-row items-center ">
        <h1 className="text-sm font-bold w-fit h-fit text-center">id</h1>
      </div>
      <div className="w-1/5">
        <Select isDisabled />
      </div>
      <div className="w-24">
        <input
          type="text"
          placeholder="Quantity"
          disabled
          className="w-full text-center h-full border-2 placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
        />
      </div>
      <div className="w-fit flex flex-row">
        <input
          type="text"
          placeholder="Energy"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Protein"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Carbs"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Fats"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Fibre"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Calcium"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Iron"
          disabled
          className="w-2/5 h-full border-2 text-center placeholder:text-black placeholder:font-semibold"
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default TitleRow;
