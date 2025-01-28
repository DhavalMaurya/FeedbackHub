import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/User";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState(false);
  const { token, userData } = useContext(UserContext);

  return (
    <div className="w-full h-16 bg-[#1d3557] shadow-lg relative">
      <nav className="w-full h-full flex items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl">
          FeedBackHub
        </h1>

        {/* Menu Icon */}
        <div className="sm:hidden">
          <IoMdMenu
            onClick={() => setActiveNav(true)}
            className={`size-8 text-white cursor-pointer ${
              activeNav === true ? "hidden" : "block"
            }`}
          />
          <IoMdClose
            onClick={() => setActiveNav(false)}
            className={`size-8 text-white cursor-pointer ${
              activeNav === true ? "block" : "hidden"
            }`}
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex sm:gap-4 lg:gap-6 items-center">
          <Link
            to="/"
            className="text-white text-sm lg:text-base font-semibold hover:text-[#a8dadc] transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            className="text-white text-sm lg:text-base font-semibold hover:text-[#a8dadc] transition duration-300"
          >
            About
          </Link>
          <Link
            to={token ? "/feedback-form" : "/login"}
            className="text-white text-sm lg:text-base font-semibold hover:text-[#a8dadc] transition duration-300"
          >
            Feedback
          </Link>
          {userData?.role === "Admin" ? (
            <Link
              to="/dashboard"
              className="text-white text-sm lg:text-base font-semibold hover:text-[#a8dadc] transition duration-300"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}

          {!token ? (
            <Link
              to="/login"
              className="text-[#1d3557] bg-[#a8dadc] px-4 py-1.5 rounded-lg text-sm lg:text-base font-semibold hover:bg-[#457b9d] hover:text-white transition duration-300"
            >
              Login
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute z-10 w-full flex flex-col items-center bg-[#457b9d] text-white text-sm font-semibold border-y transition-all duration-300 ${
          activeNav === true ? "block" : "hidden"
        }`}
      >
        <Link
          to="/"
          className="w-full py-2 border-b text-center hover:bg-[#1d3557] transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/aboutus"
          className="w-full py-2 border-b text-center hover:bg-[#1d3557] transition duration-300"
        >
          About
        </Link>
        <Link
         to={token ? "/feedback-form" : "/login"}
          className="w-full py-2 border-b text-center hover:bg-[#1d3557] transition duration-300"
        >
          Feedback
        </Link>

        {userData?.role === "Admin" ? (
          <Link
            to="/dashboard"
            className="w-full py-2 border-b text-center hover:bg-[#1d3557] transition duration-300"
          >
            Dashboard
          </Link>
        ) : (
          ""
        )}

        <Link
          to="/login"
          className="w-full py-2 text-center bg-[#a8dadc] text-[#1d3557] hover:bg-[#1d3557] hover:text-white transition duration-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
