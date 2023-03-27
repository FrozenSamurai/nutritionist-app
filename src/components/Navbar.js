import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { GrTableAdd } from "react-icons/gr";
import { FiEdit3, FiHelpCircle } from "react-icons/fi";
import { MdOutlineArrowDropDown, MdLiveHelp } from "react-icons/md";

import { useState } from "react";

const NavBar = ({ setIsSignedIn, userDetails, userCred, setAddFoodItem }) => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [ishovered, setIsHovered] = useState(false);
  const auth = getAuth();

  const navigate = useNavigate();

  // const navbarClass = ` ${
  //   isScrolled ? "-top-20 w-full shadow-lg rounded-none px-10 sm:px-28" : ""
  // }`;
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
    <nav
      className={
        "transition-all fixed left-0 mx-auto right-0 bg-gradient-to-t from-red-500 via-red-600 to-red-700 duration-200 flex py-2 sm:py-4 items-center justify-between z-50 w-[80%] top-5 rounded-[100px] px-8 sm:px-14"
      }
    >
      <div className="w-fit hidden sm:flex items-center justify-between relative">
        <div
          className={`absolute ${
            ishovered ? "flex" : "hidden"
          } flex-col bg-red-400 whitespace-nowrap -bottom-24 left-[85px]`}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <h1
            className="hover:bg-red-500 px-3 py-3 cursor-pointer"
            onClick={() => {
              setAddFoodItem(true);
            }}
          >
            <GrTableAdd className="inline-block mr-2" />
            Add Nutrients
          </h1>
          <h1
            className="hover:bg-red-500 px-3 cursor-pointer py-3"
            onClick={() => {
              navigate("/edit-fooditems");
            }}
          >
            <FiEdit3 className="inline-block mr-2" />
            Edit Nutrients
          </h1>
        </div>
        <div className="text-lg font-semibold uppercase space-x-4">
          <h1
            className="cursor-pointer inline-block text-gray-200 hover:text-white "
            onClick={() => {
              navigate("/info");
            }}
          >
            Profile
          </h1>
          <span className="w-[1px] h-full border-[1px]" />
          <h1
            className="cursor-pointer inline-block text-gray-200 hover:text-white mr-4 justify-center items-center"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onClick={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            Nutrients{" "}
            <MdOutlineArrowDropDown className="inline-block" size={25} />
          </h1>
        </div>
        {/* <div className="block sm:hidden" /> */}
      </div>
      <div className=" flex flex-row h-fit sm:mx-auto text-center  text-white">
        <span className="font-semibold text-base justify-center whitespace-nowrap flex-row sm:text-2xl w-full tracking-tight flex gap-2 items-center text-[#F2D492]">
          Welcome Back, <span className="text-white">{userDetails.name}</span>
        </span>
      </div>
      <div>
        <button
          className="bg-[#F2D492] text-dmce-blue-dark font-semibold inline-block text-sm hover:bg-[#F2D492]-dark uppercase px-2 py-1 sm:px-4 sm:py-2 rounded hover:shadow-lg mr-2 ease-linear transition-all duration-150"
          onClick={() => {
            handleLogout();
          }}
        >
          LOGOUT
        </button>
        <button
          className="absolute top-0 bottom-0 right-5"
          onClick={() => {
            navigate("/help");
          }}
          title="Help"
        >
          <FiHelpCircle
            className="inline-flex text-blue-300 hover:text-blue-400"
            size={25}
          />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
