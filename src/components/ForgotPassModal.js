import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { BeatLoader } from "react-spinners";

const ForgotPassModal = ({ setShowModal }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onReset = () => {
    setLoading(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert(
          "Email Sent Successfully\n" +
            "Please Check Your Email to Reset Your Password"
        );
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
  };

  return (
    <>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-2xl font-semibold">Forgot Password</h3>
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
                <h1 className=" text-xl text-center">
                  Please enter your Email Id{" "}
                </h1>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border-2 rounded-lg py-2 px-2 my-2"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

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
                    style={{
                      borderRadius: "20px",
                      border: "1px solid #ff4b2b",
                      // backgroundColor: "#ff4b2b",
                      // color: "#ffffff",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "10px 15px",
                      // letterSpacing: "1px",
                      textTransform: "uppercase",
                      transition: "transform 80ms ease-in",
                    }}
                    className="ghost hover:bg-slate-200"
                    onClick={() => {
                      onReset();
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

export default ForgotPassModal;
