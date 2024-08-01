import { getTimeDifference } from "../../utils";
import "./Story.css";

const Story = ({ story }) => {
  const { title, description, time, descendants, url } = story;
  return (
    <div className="storyContainer">
      <p className="title">
        {" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </p>
      <p className="description">
        {description
          ? description
          : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.`}
      </p>
      <div className="metaData">
        <p>{getTimeDifference(time)}</p>
        <p>|</p>
        <p>{descendants} comments</p>
      </div>
    </div>
  );
};

export default Story;
