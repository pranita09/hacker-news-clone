import "./Footer.css";
import hackerNewsLogo from "../../assets/hackernews2.svg";

const Footer = () => {
  return (
    <div className="footerContainer">
      <img src={hackerNewsLogo} alt="Logo" />
    </div>
  );
};

export default Footer;
