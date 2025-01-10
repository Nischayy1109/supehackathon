// import React from "react";
import logoImg from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-[#f8f9fa] text-[#001f3f] inter-regular py-3 px-2 md:px-12 flex justify-between items-center shadow-md">
      <div
        className="text-black font-semibold flex justify-center items-center cursor-pointer"
      >
        <img
          src={logoImg}
          alt="Logo"
          className="inline-block h-[30px] md:h-10 mr-2 filter invert contrast-100"
        />
        <span className="sketch-text text-[18px] md:text-[1.7rem]">Langflow-App</span>
      </div>
      <div className="flex space-x-5 md:space-x-8 justify-center items-center">
        <Link to="/" className="text-gray-400 hover:text-gray-800 text-[16px] md:text-lg hidden md:block">
          Home
        </Link>
        <Link to="/chat" className="text-gray-400 hover:text-gray-800 text-[16px] md:text-lg">
          Chat
        </Link>
        <Link to="/contact-us" className="text-gray-400 hover:text-gray-800 text-[16px] md:text-lg">
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;



{/* <button
  onClick={() => {
    window.open("https://github.com/nischayy1109", "_blank");
  }}
  className="px-4 py-[1px] rounded-full relative bg-slate-700 text-white text-[16px] md:text-lg hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
>
  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
  <span className="relative z-20">Github</span>
</button> */}