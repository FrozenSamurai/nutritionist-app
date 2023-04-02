import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const Help = () => {
  const [inview, setInview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const navigationPannel = {
    "Create New Recall": (
      <iframe
        src="https://scribehow.com/embed/How_to_create_new_24_Hour_Diet_recall_using_NutriRecall__50DOYuCSSsKVn7jV8egZXg"
        width="100%"
        height="640"
        allowfullscreen
        frameborder="0"
        title="Create New Recall"
        onLoad={() => {
          setLoading(false);
        }}
      >
        Loading
      </iframe>
    ),
    "Add New Food Item": (
      <iframe
        src="https://scribehow.com/embed/Add_a_New_Food_Item_with_its_nutrients__BVjQnNE-Q2CG6Xlay8Eb7Q"
        width="100%"
        height="640"
        allowfullscreen
        frameborder="0"
        title="Add New Food Item"
        onLoad={() => {
          setLoading(false);
        }}
      >
        Loading
      </iframe>
    ),
    "Change Password": (
      <iframe
        src="https://scribehow.com/embed/How_to_change_your_Login_Password__JuLR9WbSQg-nOxFWPnVFxg"
        width="100%"
        height="640"
        allowfullscreen
        frameborder="0"
        title="Change Login Password"
        onLoad={() => {
          setLoading(false);
        }}
      >
        Loading
      </iframe>
    ),
  };
  return (
    <div className="w-full min-h-screen h-full flex">
      <div className="w-1/5 min-h-[640px] h-screen overflow-hidden flex  items-center whitespace-nowrap flex-col bg-slate-200 ">
        <div className="w-full pb-5 h-fit bg-transparent  flex flex-col justify-center items-center">
          <div className="w-fit flex flex-col justify-center items-center">
            <img
              src="/main.png"
              className="w-20 h-20 mx-auto mt-5"
              alt="logo"
            />
            <h1 className="text-3xl font-semibold">Nutri-Recall</h1>
            <h1 className="text-center text-sm">The Nutritionist App</h1>
          </div>
          <div className="w-full"></div>
        </div>
        <hr className="w-full border-t-white border-[1px] mx-3" />

        {Object.keys(navigationPannel).map((key) => {
          return (
            <>
              <div
                className={`w-full ${
                  key === inview ? "bg-white" : "bg-transparent"
                } h-fit  cursor-pointer hover:bg-slate-100 ?? "bg-white":active:bg-slate-50`}
                onClick={() => {
                  setInview(key);
                  if (key !== inview) {
                    setLoading(true);
                    // setTimeout(() => {
                    //   setLoading(false);
                    // }, 4000);
                  }
                }}
              >
                <h1 className="px-5 py-3 font-semibold">{key}</h1>
              </div>
              <hr className="w-full border-t-white border-[1px] mx-3" />
            </>
          );
        })}
        <button
          className="px-3 py-2 rounded-lg bg-red-400 font-semibold w-fit mt-20"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Go back
        </button>
      </div>
      <div className="w-4/5 h-fit flex min-h-screen overflow-y-auto relative">
        {inview ? (
          navigationPannel[inview]
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-xl">Select a topic from the left panel</h1>
          </div>
        )}
        {loading && (
          <div className="absolute z-[1000] w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
            <MoonLoader color="#fff" />
            <h1 className="text-2xl text-white font-semibold">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
