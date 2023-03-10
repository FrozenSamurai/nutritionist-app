import React, { useState } from "react";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";

const UpdatePasswordModal = ({ setShowModal, userDetails }) => {
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [checkPass, setCheckPass] = useState("");
  const [error, setError] = useState(false);
  const [credential, setCredential] = useState(null);

  const onUpdate = () => {
    setLoading(true);
    const auth = getAuth();

    const user = auth.currentUser;
    if (pass === checkPass) {
      const cred = EmailAuthProvider.credential(userDetails.email, credential);
      reauthenticateWithCredential(user, cred)
        .then(() => {
          // User re-authenticated.
          updatePassword(user, pass)
            .then(() => {
              // Password reset email sent!
              alert("Password Changed Successfully");
              // ..
              setLoading(false);
              setShowModal(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              alert(errorCode, errorMessage);
              setLoading(false);
              setShowModal(false);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert(errorCode, errorMessage);
          setLoading(false);
          setShowModal(false);
        });
    } else {
      setCheckPass("");
      setPass("");
      setError(true);
      setLoading(false);
    }
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
                <h3 className="text-3xl font-semibold">Update Password</h3>
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
              <div className="relative p-6 flex-col flex w-full items-center justify-center px-10">
                {/* input Credintials */}
                <input
                  type="password"
                  placeholder="Old Password"
                  value={credential}
                  className="w-full border-2 rounded-lg py-2 px-2 my-2"
                  onChange={(e) => {
                    setCredential(e.target.value);
                    // setError(false);
                  }}
                />
                <h1 className=" text-xl text-center">
                  Please enter your new password{" "}
                </h1>
                <input
                  type="password"
                  placeholder="New Password"
                  value={pass}
                  className="w-full border-2 rounded-lg py-2 px-2 my-2"
                  onChange={(e) => {
                    setPass(e.target.value);
                    setError(false);
                  }}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={checkPass}
                  className="w-full border-2 rounded-lg py-2 px-2 my-2"
                  onChange={(e) => {
                    setCheckPass(e.target.value);
                    setError(false);
                  }}
                />
                {error && (
                  <h1 className="text-sm text-red-500">
                    Passwords does not match
                  </h1>
                )}
                <div className="flex flex-row w-full items-center justify-start "></div>
                <div className="flex flex-row w-full items-center justify-start "></div>
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
                {loading ? (
                  <BeatLoader color="#36d7b7" />
                ) : (
                  <button
                    className="bg-yellow-400 rounded-lg hover:bg-yellow-500 font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    disabled={!pass && !checkPass}
                    onClick={() => {
                      //   onReset();
                      onUpdate();
                    }}
                  >
                    Reset Password
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
      </>
    </>
  );
};

export default UpdatePasswordModal;
