import React, { useState } from "react";
import { getDatabase, ref, set, child, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const SaveModal2 = ({
  setCurrentData,
  setAllEnteredData,
  setShowModal,
  currentData,
  uid,
  height,
  weight,
  age,
  gender,
  userCred,
  userDetails,
}) => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const db = getDatabase();

  const HandleSave = () => {
    if (check) {
      setError(false);
      const dataToPush = {
        Height: height,
        Weight: weight,
        Age: age,
        Gender: gender,
        TimeStamp: Date.now(),
        Recall: { ...currentData },
      };

      set(ref(db, `${userDetails.name}/${uid}`), {
        ...dataToPush,
      }).then(() => {
        setLoading(false);
      });

      //once everything is completed navigate
      // const UIDsuid = push(child(ref(db), "UIDs")).key;
      // set(ref(db, `UIDs/${UIDsuid}`), uid);
      navigate("/history-recall");

      // setAllEnteredData({});
      setCurrentData({ ...dataToPush, Uid: uid });
      alert("Data Saved Successfully.");
    } else {
      setError(true);
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
              <h3 className="text-3xl font-semibold">Save Changes</h3>
              <button
                className="p-1 w-fit h-fit ml-auto bg-white border-0 text-black hover:text-red-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  !loading ? setShowModal(false) : setShowModal(true);
                }}
              >
                <span className="bg-white   h-6 w-6 text-3xl outline-none focus:outline-none">
                  x
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-col flex w-full items-center justify-center space-x-5">
              <h1 className="mb-5 text-xl text-center">
                Please select people who want to save this data in their
                database
              </h1>
              <div className="flex flex-row w-full  items-center justify-center space-x-5">
                <div className="flex flex-row items-center justify-center">
                  <input
                    type="checkbox"
                    name="confirm"
                    value="confirm"
                    id="confirm"
                    className="cursor-pointer"
                    onChange={(e) => {
                      setCheck(e.target.checked);
                    }}
                  />
                  <label
                    htmlFor="confirm"
                    className="font-bold cursor-pointer ml-0.5"
                  >
                    This is the <strong>Final Recall</strong> and{" "}
                    <span className="text-red-500">
                      there are no Changes further
                    </span>
                    .
                  </label>
                </div>
              </div>
              {error ? (
                <h1 className="text-sm text-red-500">Please Confirm first</h1>
              ) : (
                <></>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  !loading ? setShowModal(false) : setShowModal(true);
                }}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  HandleSave();
                  setLoading(true);
                }}
              >
                Save as pdf
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default SaveModal2;
