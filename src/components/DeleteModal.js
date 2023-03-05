import React, { useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";

const DeleteModal = ({ setShowModal, currentData }) => {
  const db = getDatabase();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [delbutton, setDelbutton] = useState(false);

  const HandleDelete = () => {
    setError(false);
    setLoading(true);
    //delete from database
    set(ref(db, `Shweta/${currentData.Uid}`), null);
    set(ref(db, `Niyati/${currentData.Uid}`), null);
    set(ref(db, `Sakshi/${currentData.Uid}`), null);
    //delete from UIDs
    let allUIDs = {};
    onValue(ref(db, `/UIDs`), (snapshot) => {
      const data = snapshot.val();
      allUIDs = { ...data };
    });
    const uidKey = Object.keys(allUIDs).find(
      (key) => allUIDs[key] === currentData.Uid
    );
    set(ref(db, `UIDs/${uidKey}`), null);
    //once everything is completed navigate
    setLoading(false);
    setShowModal(false);
    alert("Data Deleted Successfully.");
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">Delete Recall</h3>
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
                  Are you sure you want to delete Recall
                </h1>
                <div className="flex flex-row w-full items-center justify-center ">
                  <input
                    id="delete"
                    type="checkbox"
                    name="delete"
                    value={delbutton}
                    className="w-5 h-5 cursor-pointer"
                    onChange={(e) => {
                      setDelbutton(e.target.checked);
                    }}
                  />
                  <label
                    htmlFor="delete"
                    className="px-2 text-xl font-semibold cursor-pointer"
                  >
                    Delete recall for Id:{" "}
                    <span className="text-red-700">{currentData.Uid}</span>
                  </label>
                </div>

                {delbutton && (
                  <h1 className="text-sm text-red-500 mt-2">
                    *Data of this Id will be deleted from everyone's record.
                  </h1>
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
                  className={`${
                    delbutton
                      ? "bg-red-500 shadow hover:shadow-lg hover:bg-red-600"
                      : "bg-red-300"
                  } text-white  font-bold uppercase text-sm px-6 py-3 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear `}
                  // type="button"
                  disabled={!delbutton}
                  onClick={() => {
                    HandleDelete();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};

export default DeleteModal;
