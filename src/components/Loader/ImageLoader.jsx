import React, { useState, useEffect } from "react";
import "./loader.css";

const ImageLoader = ({ imageLoaded }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Set a timer for the minimum 1 second duration
    const timer = setTimeout(() => {
      setMinTimeElapsed(true); // After 1 second, set the timer state
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer when component unmounts
  }, []);

  useEffect(() => {
    if (minTimeElapsed && imageLoaded) {
      setFadeOut(true);
    }
  }, [minTimeElapsed, imageLoaded]);

  return (
    <div className={`main ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default ImageLoader;
