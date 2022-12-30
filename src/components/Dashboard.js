import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import AddFoodItem from "./AddFoodItem";

const Dashboard = ({
  userDetails,
  setIsSignedIn,
  setCurrentData,
  setAllEnteredData,
}) => {
  const [addFoodItem, setAddFoodItem] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    setCurrentData({});
    setAllEnteredData({});
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setIsSignedIn(false);
        navigate("/signin");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };
  return (
    <div className="w-full bg-slate-300 h-screen flex justify-center relative items-center">
      <div className="flex w-3/4 border-white shadow-slate-900 shadow-xl bg-white rounded-3xl h-5/6 flex-col justify-start items-center px-10">
        <div className=" w-full h-fit flex flex-col justify-center items-center relative">
          <h1 className="text-center mt-10 text-3xl text-blue-500 ">
            Welcome Back, {userDetails.name}
          </h1>
          <div className="absolute top-12 right-5">
            <button
              className="px-3 py-1 bg-red-300 hover:bg-red-400 rounded-md hover:scale-110 font-semibold"
              onClick={() => {
                handleLogout();
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>
        <hr className="w-full border-2 bg-black border-black mt-5" />
        <div>
          <h1 className="text-3xl font-semibold md:mt-5">
            What you wish to do today
          </h1>
        </div>
        <div className="w-full h-3/5 py-5 relative flex flex-row justify-center space-x-5 px-10 items-center">
          <div
            className="w-1/3 shadow-lg h-full border-2 rounded-2xl cursor-pointer hover:scale-105 hover:bg-slate-100 flex flex-col justify-center items-center"
            onClick={() => {
              navigate("/main");
              setCurrentData({});
              setAllEnteredData({});
            }}
          >
            <img src="/assets/meals.png" alt="meals" className="w-full" />
            <h1 className="text-2xl font-firaCode mt-5 text-center font-semibold">
              Create 24 Hrs
              <br /> Diet Recall
            </h1>
          </div>
          <div className="h-full border-2 bg-gray-200"></div>
          <div
            className="w-1/3 shadow-lg h-full border-2 rounded-2xl cursor-pointer hover:scale-105 hover:bg-slate-100 flex flex-col justify-center items-center space-y-3"
            onClick={() => {
              navigate("/history");
              setCurrentData({});
              setAllEnteredData({});
            }}
          >
            <FaHistory size={220} />
            <h1 className="text-2xl text-center font-firaCode mt-5 font-semibold">
              Check Diet Recalls History
            </h1>
          </div>
          <button
            className="px-2 py-1 absolute bg-blue-400 hover:bg-blue-300 -bottom-7 rounded-md hover:scale-105"
            onClick={() => {
              setAddFoodItem(true);
            }}
          >
            Add New Food Item
          </button>
        </div>
      </div>
      {addFoodItem ? <AddFoodItem setAddFoodItem={setAddFoodItem} /> : <></>}
    </div>
  );
};

export default Dashboard;
