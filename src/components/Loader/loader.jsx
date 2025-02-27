import React, { useState, useEffect } from "react";
import "./loader.css";

const Loader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1000); // Adjust the duration as needed (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

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

export default Loader;
