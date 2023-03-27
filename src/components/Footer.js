import React from "react";
import { FaHeartbeat } from "react-icons/fa";
import { RiCopyleftLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="w-full bg-white flex flex-row items-center justify-center">
      <div className="w-[80%] px-10 h-20 flex flex-row items-center justify-between    ">
        <h1 className="text-lg font-semibold flex justify-center items-center space-x-1">
          {" "}
          <RiCopyleftLine />
          2021 - All Lefts Reserved
        </h1>

        <h1 className="text-lg font-semibold flex justify-center items-center space-x-1">
          Made with <FaHeartbeat className="text-red-500 mx-1" /> by{" "}
          <a
            href="https://frozenSamurai.github.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 text-blue-700"
          >
            Raj Jadhav
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
