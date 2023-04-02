import React, { useEffect, useState } from "react";
import { FaHistory, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddFoodItem from "./AddFoodItem";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Dashboard = ({
  userDetails,
  setIsSignedIn,
  setCurrentData,
  setAllEnteredData,
  userCred,
}) => {
  const [addFoodItem, setAddFoodItem] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentData({});
    setAllEnteredData({});
  }, []);

  return (
    <div className="before:w-full before:h-[120vh] before:min-h-fit before:blur-[2px] before:-z-[1000] h-screen min-h-fit  flex flex-col  before:bg-background before:brightness-[60%] before:absolute	 relative items-center  before:bg-cover">
      {/* <div className=" w-4/5 top-7 fixed"> */}
      <Navbar
        userDetails={userDetails}
        setIsSignedIn={setIsSignedIn}
        userCred={userCred}
        setAddFoodItem={setAddFoodItem}
      />
      {/* </div> */}
      <div className="text-white min-h-fit h-fit flex flex-row w-[80%] pt-10 mt-16 px-10">
        <div className="flex flex-col w-[50%]">
          <h1 className="text-5xl font-sans font-[350]">
            Welcome to Nutri-Recall
          </h1>
          <p className=" mt-5 text-xl font-light">
            Nutri-Recall is an open-source application that automates the
            nutrient calculation process for 24-hour diet recalls, saving
            valuable time for nutritionists and nutritionist students. With the
            premium version, users can also save dietary data for future
            reference, providing a comprehensive tool for managing clients'
            nutritional intake.
          </p>
          <div className="flex">
            {/* button for create new recall */}
            <button
              className="mt-10 hover:bg-green-600 rounded-md p-2 px-5 animate- hover:text-white font-bold bg-green-400 text-black  flex flex-row justify-center items-center"
              onClick={() => {
                navigate("/new");
              }}
            >
              <FaPlus className="inline-block mr-2" />
              Create New Recall
            </button>
            <button
              className="mt-10 bg-yellow-400 rounded-md p-2 px-5 hover:text-white font-bold hover:bg-yellow-400 text-black ml-5 flex flex-row justify-center items-center"
              onClick={() => {
                navigate("/history");
              }}
            >
              <FaHistory className="inline-block mr-2" />
              History
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex justify-center mt-5">
        <div className="w-[80%] px-10 p-10 flex flex-col space-y-3">
          <h1 className="text-3xl font-thin">Summary</h1>
          <p className="w-[80%] text-base">
            Welcome to our web app designed specifically for nutritionists and
            nutritionist students! <br />
            <br />
            As a nutritionist or nutritionist student, you understand the
            importance of taking 24-hour diet recalls of your subjects. However,
            the task of manually calculating the nutrient values of the recalled
            foods can be time-consuming and tedious.
            <br />
            <br /> Our web app streamlines this process by automating the
            nutrient calculation part, saving you valuable time and effort.
            Simply input the recalled foods into the app, and it will provide
            you with the nutrient values for each food item, as well as the
            total nutrient intake for the day.
            <br />
            <br /> In addition to automating nutrient calculations, our app
            allows you to download your work for easy access and sharing. This
            feature enables you to organize and keep track of your clients'
            dietary information with ease, as well as share your work with
            colleagues and supervisors.
            <br />
            <br /> Overall, our web app is a must-have tool for nutritionists
            and nutritionist students who want to simplify the nutrient
            calculation process and enhance their work efficiency. Try it today
            and experience the benefits for yourself!
          </p>
          <h1 className="text-3xl font-thin pt-3">Premium Features</h1>
          <p className="w-[80%] text-base">
            Our premium version of the web app offers an additional feature that
            will make the lives of nutritionists and nutritionist students even
            easier - the ability to save 24-hour diet recalls for future
            reference.
            <br />
            <br /> With this feature, you can save the nutrient values of a
            client's dietary intake in the app, enabling you to access it at any
            time in the future. This means that you will no longer need to
            re-enter the recalled foods each time you need to calculate the
            nutrient values, as the app will have already stored the information
            for you.
            <br />
            <br /> This feature is particularly useful for nutritionists and
            nutritionist students who work with clients over extended periods or
            have clients with ongoing dietary issues. By having access to
            historical dietary data, you can monitor the progress of your
            clients' nutritional intake over time and identify trends or
            patterns that could impact their overall health and wellbeing.
            <br />
            <br />
            Additionally, the ability to save 24-hour diet recalls also helps
            you to maintain accurate records and compliance with legal and
            ethical requirements, such as data protection laws.
            <br />
            <br /> Overall, our premium version of the app provides an efficient
            and convenient way to manage your clients' dietary data, enabling
            you to focus on providing the best possible nutritional advice and
            support. Try it out today and see how it can transform your
            workflow!
          </p>
        </div>
      </div>
      <hr />
      <Footer />
      {addFoodItem ? <AddFoodItem setAddFoodItem={setAddFoodItem} /> : <></>}
    </div>
  );
};

export default Dashboard;
