import React, { useState } from "react";
import UpdatePasswordModal from "./UpdatePasswordModal";

const UserInfo = ({
  userDetails,
  setIsSignedIn,
  setCurrentData,
  setAllEnteredData,
  userCred,
}) => {
  const [showModal, setShowModal] = useState(false);

  var t = new Date(Number(userCred.reloadUserInfo.lastLoginAt));

  let date = new Intl.DateTimeFormat("en-UK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(t);
  console.log(t);
  return (
    <div
      className="w-full bg-slate-300 h-screen flex justify-center relative items-center bg-no-repeat bg-cover shadow- drop-shadow-2xl"
      style={{
        backgroundImage: "url(assets/background.jpg)",
      }}
    >
      <div className="w-fit px-10 bg-white rounded-2xl h-2/4 flex justify-start items-center flex-col py-5">
        <img
          src={
            userDetails.gender === "Female"
              ? "/assets/profile.png"
              : "/assets/profile_male.png"
          }
          alt="Profile Pic"
          className="w-40 h-40 rounded-full object-contain border-2 border-black"
        />
        <h1 className="text-2xl" title="Username">
          {userDetails.name}
        </h1>
        <h1>Nutritionist</h1>
        {/* <hr className="w-full border-2 bg-black border-black mt-5" /> */}
        <h1 className="text-xs text-gray-500">
          Last Login:
          {" " + date}
        </h1>
        <h1 className="text-2xl mt-2" title="Email">
          {userDetails.email}
        </h1>
        <button
          className="mt-2.5 active:scale-95 focus:outline-none bg-[#ff4b2b] hover:bg-[#ff426b]"
          style={{
            borderRadius: "20px",
            border: "1px solid #ff4b2b",
            // backgroundColor: "#ff4b2b",
            color: "#000",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "12px 45px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "transform 80ms ease-in",
          }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Change Password
        </button>
      </div>
      {showModal && (
        <UpdatePasswordModal
          setShowModal={setShowModal}
          userDetails={userDetails}
        />
      )}
    </div>
  );
};

export default UserInfo;
