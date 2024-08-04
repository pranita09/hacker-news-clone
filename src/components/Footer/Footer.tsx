import "./Footer.css";
import hackerNewsLogo from "../../assets/hackernews2.svg";
import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="footerContainer">
      <img src={hackerNewsLogo} alt="Logo" />
    </div>
  );
};

export default Footer;
