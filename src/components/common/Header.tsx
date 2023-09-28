import React from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/nba_logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <header className="flex items-center h-16 px-12 bg-black">
      <div className="flex items-center w-8 h-full mr-5">
        <img src={logoImage} alt="ロゴ" className="h-8" />
      </div>
      <h1 className="text-2xl text-white mr-auto">NBA Stats Quiz</h1>
      <div className="w-30 h-full">
        <button
          onClick={handleHomeClick}
          className="w-full h-full px-0 text-2xl font-bold text-white bg-orange-500 hover:bg-orange-600"
        >
          HOME
        </button>
      </div>
    </header>
  );
};

export default Header;
