import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/nba_logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center h-20 px-12 bg-gradient-to-r from-blue-900 to-black">
      <h1 className="text-3xl font-semibold text-white mr-auto">
        アポログ
      </h1>
      <div className="w-36 h-full">
        <button
          onClick={handleHomeClick}
          className="flex items-center justify-center w-full h-full px-4 py-2 text-2xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          HOME
        </button>
      </div>
    </header>
  );
};

export default Header;
