import "./Header.css";
import hackernewsLogo from "../../assets/hackernews1.svg";

const Header = () => {
  return (
    <div className="headerContainer">
      <img src={hackernewsLogo} alt="Logo" />
    </div>
  );
};

export default Header;
