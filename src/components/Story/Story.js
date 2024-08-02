import {
  dummyDescription,
  dummyTitle,
  getTimeDifference,
  truncateText,
} from "../../utils";
import clock from "../../assets/clock.svg";
import "./Story.css";

const Story = ({ story }) => {
  const { title, text, time, descendants, url } = story;
  const truncatedText = truncateText(text ? text : dummyDescription);

  return (
    <div className="storyContainer">
      <p className="title">
        {" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title ? title : dummyTitle}
        </a>
      </p>
      <p
        className="description"
        dangerouslySetInnerHTML={{ __html: truncatedText }}
      ></p>
      <div className="metaData">
        <p className="time">
          <img src={clock} alt="ClockIcon" /> {getTimeDifference(time)}
        </p>
        <p>|</p>
        <p>{descendants} comments</p>
      </div>
    </div>
  );
};

export default Story;
