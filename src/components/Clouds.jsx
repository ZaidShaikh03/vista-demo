import React, { useEffect, useRef, useState } from "react";
import "./ImageMap.css";
import { useNavigate } from "react-router-dom";
// import {
//   MapContainer,
//   ImageOverlay,
//   Polygon,
//   Polyline,
//   Tooltip,
//   useMap,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import { format } from "date-fns";
import cloudImg1 from "../assets/clouds/cloud-1.webp";
import cloudImg2 from "../assets/clouds/cloud-2.webp";
import cloudImg4 from "../assets/clouds/cloud-4.webp";
import cloudImg5 from "../assets/clouds/cloud-5.webp";
import cloudImg6 from "../assets/clouds/cloud-6.webp";

const distance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
const Clouds = ({ scale }) => {
  // const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  const [parentHeight, setParentHeight] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const updateHeightAndScroll = () => {
      if (wrapperRef.current) {
        const parent = wrapperRef.current.parentElement;
        setParentHeight(parent.clientHeight);
        setScrollY(parent.scrollTop);
      }
    };

    // Initial calculation
    updateHeightAndScroll();

    // Add event listeners
    window.addEventListener("resize", updateHeightAndScroll);

    const parent = wrapperRef.current?.parentElement;
    if (parent) {
      parent.addEventListener("scroll", updateHeightAndScroll);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateHeightAndScroll);
      if (parent) {
        parent.removeEventListener("scroll", updateHeightAndScroll);
      }
    };
  }, []);

  const calculateCloudPosition = (basePosition) => {
    const ratio = parentHeight / 1000; // Assuming 1000px as a base height
    return basePosition * ratio + scrollY;
  };
  const minScale = 1;

  const today = new Date();

  const TodayDate = format(today, "EEE dd MMMM");

  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const TodayTime = today.toLocaleTimeString("en-US", options);

  const [value, setValue] = React.useState("All");

  // const zoomIn = () => {
  //   setScale((prevScale) => prevScale * 1.2);
  // };

  // const zoomOut = () => {
  //   setScale((prevScale) =>
  //     prevScale > minScale ? prevScale / 1.2 : prevScale
  //   );
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const calculateOpacity = (scale) => {
    return 1 - (scale - 1) / 2; // Linear interpolation from 1 to 0 as scale goes from 1 to 3
  };

  return (
    <>
      <div
        className="clouds-wrapper"
        style={{
          opacity: scale ? calculateOpacity(scale) : 0.7,
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <div
          className="cloud-item"
          style={{
            top: `${calculateCloudPosition(-120)}px`,
            // background: "red",
          }}
        >
          <div
            className="cloudBase"
            style={{
              opacity: 1,
              "--top": "-80px",
              "--from": "800px",
              "--to": "1536px",
              "--time": "140s",
            }}
          >
            <img src={cloudImg2} alt="cloud" />
          </div>
          <div
            className="cloudBase svelte-3q6oo9"
            style={{
              opacity: 1,
              "--top": "-150.284450566057986px",
              "--from": "400px",
              "--to": "1536px",
              "--time": "65s",
              // background: "red",
            }}
          >
            <img src={cloudImg1} alt="cloud" />
          </div>
          <div
            className="cloudBase"
            style={{
              opacity: 1,
              "--top": "-120.284450566057986px",
              "--from": "500px",
              "--to": "1536px",
              "--time": "110s",
            }}
          >
            <img src={cloudImg6} alt="cloud" />
          </div>
          <div
            className="cloudBase svelte-3q6oo9"
            style={{
              opacity: 1,
              "--top": "-140.284450566057986px",
              "--from": "400px",
              "--to": "1536px",
              "--time": "85s",
            }}
          >
            <img src={cloudImg1} alt="cloud" />
          </div>
          <div
            className="cloudBase"
            style={{
              opacity: 1,
              "--top": "-150.284450566057986px",
              "--from": "150px",
              "--to": "1536px",
              "--time": "62s",
            }}
          >
            <img src={cloudImg1} alt="cloud" />
          </div>
        </div>
        <div
          className="cloud-item"
          style={{ bottom: `${calculateCloudPosition(-170)}px` }}
        >
          <div
            className="cloudBase svelte-3q6oo9"
            style={{
              opacity: 1,
              "--top": "200.2195206312385265px",
              "--from": "0px",
              "--to": "1536px",
              "--time": "90s",
            }}
          >
            <img src={cloudImg6} alt="cloud" />
          </div>
          <div
            className="cloudBase"
            style={{
              opacity: 1,
              "--top": "200.2195206312385265px",
              "--from": "100px",
              "--to": "1536px",
              "--time": "88s",
            }}
          >
            <img src={cloudImg5} alt="cloud" />
          </div>
          <div
            className="cloudBase svelte-3q6oo9"
            style={{
              opacity: 1,
              "--top": "200.2195206312385265px",
              "--from": "120px",
              "--to": "1536px",
              "--time": "77s",
            }}
          >
            <img src={cloudImg1} alt="cloud" />
          </div>
          <div
            className="cloudBase svelte-3q6oo9"
            style={{
              opacity: 1,
              "--top": "160.2195206312385265px",
              "--from": "-200px",
              "--to": "1536px",
              "--time": "62s",
            }}
          >
            <img src={cloudImg4} alt="cloud" />
          </div>
          <div
            className="cloudBase svelte-3q6oo9"
            style={{
              opacity: 1,
              "--top": "160.669347573923243px",
              "--from": "100px",
              "--to": "1536px",
              "--time": "72s",
            }}
          >
            <img src={cloudImg6} alt="cloud" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clouds;
