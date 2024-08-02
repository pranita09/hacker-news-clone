/* eslint-disable react-hooks/exhaustive-deps */
import "./Story.css";
import { useRef, useState, useEffect } from "react";
import {
  dummyDescription,
  dummyTitle,
  getTimeDifference,
  calculateVisibleWords,
} from "../../utils";
import clock from "../../assets/clock.svg";

const Story = ({ story }) => {
  const { title, text, time, descendants, url } = story;
  const textRef = useRef();
  const [visibleText, setVisibleText] = useState("");
  const textToTruncate = text ? text : dummyDescription;

  const updateVisibleText = () => {
    if (textRef.current) {
      const containerWidth = textRef.current.offsetWidth;
      console.log(containerWidth);
      setVisibleText(calculateVisibleWords(containerWidth, textToTruncate));
    }
  };

  useEffect(() => {
    updateVisibleText();
    window.addEventListener("resize", updateVisibleText);

    return () => {
      window.removeEventListener("resize", updateVisibleText);
    };
  }, []);

  return (
    <div className="storyContainer">
      <p className="title">
        {" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title ? title : dummyTitle}
        </a>
      </p>
      <p
        ref={textRef}
        className="description"
        dangerouslySetInnerHTML={{ __html: visibleText }}
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
