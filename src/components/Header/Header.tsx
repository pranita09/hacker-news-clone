import "./Header.css";
import hackernewsLogo from "../../assets/hackernews1.svg";
import React from "react";

const Header: React.FC = () => {
  return (
    <div className="headerContainer">
      <img src={hackernewsLogo} alt="Logo" />
    </div>
  );
};

export default Header;
