import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import ForgotPassModal from "./ForgotPassModal";

const SignIn = ({ setUserDetails, setUserCred, setIsSignedIn }) => {
  const navigate = useNavigate();

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const NewUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        setUserCred(user);
        setIsSignedIn(true);
        const db = getDatabase();
        onValue(ref(db, `/users/${user.uid}`), (snapshot) => {
          const data = snapshot.val();
          console.log(data);
          setUserDetails(data);
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        setIsLoading(false);
      });
  };
  return (
    <div
      className="w-screen h-screen flex justify-center items-center font-firaCode bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url(assets/background.jpg)",
      }}
    >
      <div className="lg:w-1/3 h-fit md:w-1/2 w-full border-4 rounded-xl shadow-2xl py-10 px-5 bg-slate-200 bg-opacity-80">
        <h1 className="text-4xl font-extrabold mb-5">SignIn</h1>
        <hr className="mb-5 border-t-2 border-black" />
        <div className="flex flex-col space-y-5 justify-center items-center">
          <input
            type="email"
            placeholder="Email"
            className="w-full border-2  py-2 px-2 my-2"
            onChange={(e) => {
              setEmail(e.target.value.trim());
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border-2  py-2 px-2 my-2"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {!isLoading ? (
          <>
            <div className="w-full flex flex-col justify-center items-center">
              <button
                className=" bg-purple-500 text-white rounded-lg py-2 px-2 w-60 mt-10"
                onClick={() => {
                  setIsLoading(true);
                  NewUser(email, password);
                  console.log(email, password);
                }}
              >
                SignIn
              </button>
            </div>
            <h1
              className="text-center cursor-pointer mt-2 hover:text-red-400"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Forgot Password
            </h1>
          </>
        ) : (
          <div className="w-full py-2 px-2 flex flex-col justify-center items-center mt-10">
            <ClimbingBoxLoader color="rgb(168 85 247)" className="mx-auto" />
            <h1 className="font-bold text-lg">LOADING...</h1>
          </div>
        )}
      </div>

      {showModal && <ForgotPassModal setShowModal={setShowModal} />}
    </div>
  );
};

export default SignIn;
