import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  SecondPageMapData,
  landMarkData,
} from "../utils/seconpagedatavalues.js";
// import ahmedabad from "../assets/Secondpage/sanand_low_new.jpg";
// import Bangalore from "../assets/Secondpage/bengaluru_2_5_dec.jpg";
// import Bangalore from "../assets/Secondpage/bengaluru_2_6_nov.jpg";
// import Bangalore from "../assets/Secondpage/bengaluru_2_20_jan.jpg";
import Bangalore from "../assets/Secondpage/bengaluru_2_Final_2.jpg";

import SatvaHeader from "./Headers/SatvaHeader.jsx";

import Rajankunte from ".././assets/logos/rajankuntesattavaimg.png";
import carImg from "../assets/Secondpage/carimage.png";
import Clouds from "./Clouds.jsx";
import Loader from "./Loader/loader.jsx";
import { RajankunteTag } from "./TagsComps/RajankunteTag.jsx";
import ImageLoader from "./Loader/ImageLoader.jsx";
import { animateScroll } from "react-scroll";
const getPolygonCenterPoint = (points) => {
  const polyPoints = points.split(",").map(Number);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let i = 0; i < polyPoints.length; i += 2) {
    const x = polyPoints[i];
    const y = polyPoints[i + 1];

    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  const centerX = minX + (maxX - minX) / 2;
  const centerY = minY + (maxY - minY) / 2;

  return `${centerX},${centerY}`;
};
const getClosestPointOnPolygon = (x, y, points) => {
  const polyPoints = points.split(",").map(Number);
  let minDistance = Infinity;
  let closestX, closestY;

  for (let i = 0; i < polyPoints.length; i += 2) {
    const px = polyPoints[i];
    const py = polyPoints[i + 1];
    const dist = distance(x, y, px, py);

    if (dist < minDistance) {
      minDistance = dist;
      closestX = px;
      closestY = py;
    }
  }

  return { x: closestX, y: closestY };
};
const distance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const Secondpage = () => {
  const navigate = useNavigate();
  const [activeArea, setActiveArea] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [activePinHouse, setActivePinHouse] = useState(null);
  const [scale, setScale] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [activeLandMark, setActiveLandMark] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [mapfiltervalue, setMapFilterValue] = React.useState(["landmarks"]);
  const [expand, setExpand] = useState(false);
  const [trackLoad, setTrackLoad] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function getScaledSize(baseSize) {
    return baseSize / scale;
  }

  const housenametagentermouse = (id, pin) => {
    setHoveredNameTag(id);
    setActivePin(pin.id);
    setExpand(true);
  };

  const houseNametaglevaemouse = () => {
    setHoveredNameTag(null), setActivePinHouse(null);
    setActivePin(null);
    setExpand(false);
  };

  const entermouse = (id) => {
    setHoveredPinLandMark(id);
  };

  const leavemouse = () => {
    setHoveredPinLandMark(null);
  };

  const maintagmouseenter = (id) => {
    if (scalePass) {
      setHoveredNameTag(id);
      setActivePinHouse(id);
    }
    setExpand(true);
  };

  const maintagmouseleave = () => {
    if (scalePass) {
      setHoveredNameTag(null);
      setActivePinHouse(null);
    }
    setExpand(false);
  };

  const navigatebluevalley = (id) => {
    setActiveArea(id);
    navigate("/sattvalumina");
  };

  const handleOverlayClick = () => {
    setActivePin(null);
  };

  // Callback function to receive data from child component
  const handleChildData = (dataFromChild) => {
    // Handle data received from child component
    setZoomData(dataFromChild);
  };

  const [value, setValue] = React.useState("All");
  const [isMapFiltersVisible, setIsMapFiltersVisible] = useState(false);
  const [scalePass, setScalePass] = useState(false);

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".pin") &&
      !event.target.closest("foreignObject")
    ) {
      setActivePin(null);
    }
  };
  const filteredLagoonsData = landMarkData.find((el) => {
    return el.parentId;
  });

  const handlePinClick = (pinId, pinBimg) => {
    setActivePin(pinId);
  };
  // const boxRef = useRef(null);
  // useEffect(() => {
  //   if (boxRef.current) {
  //     window.scrollTo({ top: 400, behavior: "instant" });
  //   }
  // }, []);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const scrollContainerRef = useRef(null);
  // useEffect(() => {
  //   if (scrollContainerRef.current) {
  //     // window.scrollTo(370, 300);
  //     // scrollContainerRef.current.scrollLeft = 250; // Set default scroll position to left
  //     window.scrollTo({ top: 300, behavior: "smooth" });
  //   }
  // }, [scrollContainerRef.current]);
  const options = {
    // Your options here, for example:
    duration: 1000,
    smooth: true,
    ignoreCancelEvents: true,
  };

  // Scroll to 100 pixels from the top of the page
  useEffect(() => {
    animateScroll.scrollTo(400, options);
  }, []);
  return (
    <>
      <ImageLoader imageLoaded={imageLoaded} />

      <Clouds />
      <Box
        sx={{
          position: "absolute",
          zIndex: isSmallScreen ? 1351 : 1,
        }}
      >
        <SatvaHeader
          onSendData={handleChildData}
          scale={1}
          setMapFilterValue={setMapFilterValue}
          mapfiltervalue={mapfiltervalue}
          landMarkData={landMarkData}
          activePin={activePin}
          setOpen={setOpen}
          open={open}
        />
      </Box>
      <Box
        sx={backgroundimagemainContainer}
        className="main-container"
        onClick={handleOutsideClick}
        ref={scrollContainerRef}
        // onLoad={() => {
        //   if (!trackLoad) {
        //     window.scrollTo({ top: 400, behavior: "instant" });
        //     setTrackLoad(true);
        //   }
        // }}
      >
        {activePin && (
          <div
            className="black-film-overlay"
            onClick={handleOverlayClick}
          ></div>
        )}
        <Box className="image-map-container">
          <Box
            component={"img"}
            src={Bangalore}
            alt="Image Map"
            className="image-map"
            sx={bgimg}
            onLoad={handleImageLoad}
          />

          <svg
            className="svg-overlay"
            viewBox="0 0 2048 2048"
            preserveAspectRatio="xMinYMin meet"
            style={svgxcss}
          >
            {SecondPageMapData?.map((el) => {
              const centerPoint = getPolygonCenterPoint(el.points);
              return (
                <g key={el.id}>
                  <Box
                    component={"polygon"}
                    points={el?.points}
                    title={el.title}
                    sx={{
                      ...mainbox,
                      stroke: "rgba(65, 197, 158, 1)",
                      // fill:
                      //   expand === true
                      //     ? "rgba(175,209,57, 0.25)"
                      //     : "rgba(175,209,57, 0.75)",
                      fill:
                        expand === true
                          ? "rgba(65, 197, 158, 0.4)"
                          : "rgba(65, 197, 158, 0.4)",
                      strokeWidth: el.scalePass ? 1 : 2,
                      opacity:
                        hoveredNameTag && hoveredNameTag !== el.id ? 0.7 : 1,
                    }}
                    onClick={() => {
                      navigatebluevalley(el.id);
                    }}
                    onMouseEnter={() => {
                      maintagmouseenter(el.id);
                    }}
                    onMouseLeave={() => {
                      maintagmouseleave();
                    }}
                  />{" "}
                  <RajankunteTag
                    area={el}
                    points={centerPoint}
                    position={el.position}
                    hoveredNameTag={hoveredNameTag}
                    onMouseEnter={() => {
                      housenametagentermouse(id, pin);
                    }}
                    onMouseLeave={() => {
                      houseNametaglevaemouse();
                    }}
                    currentScale={scale}
                    setActivePin={setActivePinHouse}
                    activePin={activePinHouse}
                    expand={expand}
                    setExpand={setExpand}
                  />
                </g>
              );
            })}

            {landMarkData
              .filter((landMark) => {
                if (mapfiltervalue.length === 0) {
                  return false;
                } else {
                  return mapfiltervalue.includes(landMark.type);
                }
              })
              .map((landMark) => {
                const [cx, cy] = landMark.points.split(",").map(Number);
                const [x, y, r] = landMark.points.split(",").map(Number);
                const SmallpinY = y - 60;

                const scaledR = getScaledSize(r);
                const pathLength = isSmallScreen
                  ? getScaledSize(36)
                  : getScaledSize(45);
                const foreignObjectRadius = isSmallScreen
                  ? getScaledSize(40)
                  : getScaledSize(38); // Radius of the foreignObject

                // Calculate end point of the path using trigonometry
                const angleInRadians = (landMark.angle * Math.PI) / 180;

                // Calculate the center of the foreignObject
                const centerX =
                  x +
                  (pathLength + foreignObjectRadius) * Math.sin(angleInRadians);
                const centerY =
                  y -
                  (pathLength + foreignObjectRadius) * Math.cos(angleInRadians);

                // Calculate the point on the border of the foreignObject
                const endX =
                  centerX - foreignObjectRadius * Math.sin(angleInRadians);
                const endY =
                  centerY + foreignObjectRadius * Math.cos(angleInRadians);

                const path = `M${x},${y} L${endX},${endY}`;

                // Calculate foreignObject position (remains the same)
                const foreignObjectX = centerX - foreignObjectRadius;
                const foreignObjectY = centerY - foreignObjectRadius;

                if (landMark.islandmark === true) {
                  const renderPathLine = () => {
                    const [px, py] = landMark.points
                      .split(",")
                      .slice(0, 2)
                      .map(Number);
                    const { x: closestX, y: closestY } =
                      getClosestPointOnPolygon(
                        px,
                        py,
                        filteredLagoonsData.points
                      );
                    const path = `M${closestX},${closestY} L${px},${py}`;

                    const points = landMark.pinLinePoints
                      .split(",")
                      .map(Number);
                    const length = points.length;
                    const midpoint = Math.floor(length / 2);

                    let center1, center2;
                    if (length % 2 === 0) {
                      center1 = points[midpoint - 1];
                      center2 = points[midpoint];
                    } else {
                      center1 = points[midpoint];
                      center2 = points[midpoint];
                    }

                    return (
                      <>
                        {landMark.nopath && (
                          <defs>
                            <marker
                              id="arrow"
                              markerWidth="4"
                              markerHeight="4"
                              refX="2"
                              refY="2"
                              orient="auto"
                              markerUnits="strokeWidth"
                              style={{ fill: "white" }}
                            >
                              <path d="M0,0 L0,4 L4,2 z" />
                            </marker>
                          </defs>
                        )}
                        <polyline
                          points={landMark.pinLinePoints}
                          stroke="white"
                          strokeWidth="5"
                          strokeLinecap="round"
                          className={"linepath"}
                          key={landMark.id}
                          markerEnd="url(#arrow)"
                        />
                        <image
                          xlinkHref={carImg}
                          x={landMark.statPoint}
                          y={landMark.endPoint - 180}
                          width="50"
                          height="50"
                          color="white"
                          style={{
                            pointerEvents: "none",
                          }}
                        />
                        <text
                          x={landMark.statPoint + 135}
                          y={landMark.endPoint - 155}
                          fill="white"
                          fontSize="20"
                          textAnchor="middle"
                          alignmentBaseline="middle"
                          fontWeight="700"
                        >
                          {landMark.eta} | {landMark.km}
                        </text>
                      </>
                    );
                  };

                  return (
                    <g
                      key={landMark.id}
                      onClick={() => {
                        setActivePin(landMark.id);
                      }}
                      onMouseEnter={() => {
                        if (!scalePass) {
                          setHoveredPin(landMark.id);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!scalePass) {
                          setHoveredPin(null);
                        }
                      }}
                      style={{
                        pointerEvents: "bounding-box",
                        cursor: "pointer",
                        opacity: hoveredNameTag ? 0.7 : 1,
                        transition: "all 0.5s",
                      }}
                    >
                      {landMark.id === activePin && renderPathLine()}

                      <path
                        d={path}
                        stroke={"white"}
                        strokeWidth={getScaledSize(2)}
                        style={{
                          strokeDasharray: getScaledSize(2),
                        }}
                        className={"path"}
                      />

                      <circle
                        cx={x}
                        cy={y}
                        r={scaledR}
                        fill="white"
                        className="pin"
                        title={landMark.title}
                      />
                      <foreignObject
                        x={foreignObjectX}
                        y={foreignObjectY}
                        width={
                          isSmallScreen ? getScaledSize(95) : getScaledSize(90)
                        }
                        height={
                          isSmallScreen ? getScaledSize(95) : getScaledSize(90)
                        }
                        scale={activePin === landMark.id ? 1.2 : 1}
                        style={{
                          transition: "all 0.2s",
                        }}
                        className="landMark"
                      >
                        <div
                          onClick={() =>
                            handlePinClick(landMark.id, landMark.bimg)
                          }
                          style={{
                            ...landmarkforeigncss,
                            opacity:
                              hoveredPin && hoveredPin !== landMark.id
                                ? 0.7
                                : 1,
                            height: isSmallScreen
                              ? getScaledSize(85)
                              : getScaledSize(80),
                            width: isSmallScreen
                              ? getScaledSize(85)
                              : getScaledSize(80),
                            backgroundColor:
                              activePin === landMark.id ? "white" : "#27272799",
                          }}
                        >
                          {/* <Box
                            component={"img"}
                            src={
                              activePin === landMark.id
                                ? landMark.bimg
                                : landMark.wimg
                            }
                            sx={{
                              ...pinbackImage,
                              color:
                                activePin === landMark.id ? "black" : "white",
                              opacity:
                                hoveredPin && hoveredPin !== landMark.id
                                  ? 0.7
                                  : 1,
                              fontSize: {
                                lg: getScaledSize(
                                  activePin === landMark.id ? 25 : 25
                                ),
                                md: getScaledSize(
                                  activePin === landMark.id ? 25 : 25
                                ),
                                sm: getScaledSize(
                                  activePin === landMark.id ? 45 : 45
                                ),
                                xs: getScaledSize(
                                  activePin === landMark.id ? 45 : 45
                                ),
                              },
                            }}
                          /> */}
                          <landMark.icon
                            fill={
                              activePin === landMark.id
                                ? "rgba(64, 64, 64, 1)"
                                : "#DADADA"
                            }
                            width={35}
                            height={35}
                            style={{
                              ...PinIconCss,
                              transition: "fill 0.1s ease, color 0.1s ease",
                              color:
                                activePin === landMark.id
                                  ? "rgba(64, 64, 64, 1)"
                                  : "white",
                              // width: {
                              //   lg: 20,
                              //   md: 20,
                              //   sm: 40,
                              //   xs: 40,
                              // },
                            }}
                          />
                          <Typography
                            sx={{
                              ...landmarktitleTypo(getScaledSize),
                              color:
                                activePin === landMark.id ? "black" : "white",
                            }}
                          >
                            {landMark.title}
                          </Typography>
                        </div>
                      </foreignObject>
                    </g>
                  );
                } else {
                  return (
                    <g
                      key={landMark.id}
                      style={maingelse}
                      onMouseEnter={() => entermouse(landMark.id)}
                      onMouseLeave={() => leavemouse(null)}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={12}
                        fill="white"
                        title={landMark.title}
                        className="landmark"
                      />

                      <image
                        xlinkHref={`${landMark.image}`}
                        x={cx - 12}
                        y={cy - 12}
                        width="25"
                        height="25"
                        style={{ pointerEvents: "none" }}
                      />
                      {hoveredPinLandMark === landMark.id ? (
                        <foreignObject
                          x={cx + 20}
                          y={cy - 50}
                          width={250}
                          height={100}
                          style={{
                            transition: "all 0.5s",
                            opacity:
                              activeLandMark === landMark.id ||
                              hoveredPinLandMark === landMark.id
                                ? 1
                                : 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                              animation:
                                hoveredPinLandMark === landMark.id
                                  ? "slideInFromRight 0.5s ease-out forwards"
                                  : "none",
                            }}
                          >
                            <Typography
                              sx={{
                                ...landmarktypotwo,
                                background: landMark.color,
                              }}
                            >
                              {" "}
                              {landMark.title}
                            </Typography>
                          </div>
                        </foreignObject>
                      ) : null}
                    </g>
                  );
                }
              })}
          </svg>
        </Box>
      </Box>
    </>
  );
};

export default Secondpage;

const titilename = {
  color: "#2F75A0",
  fontWeight: "bold",
  fontFamily: "Segoeui",
  transition: "all 0.5s",
  display: "flex",
  justifyContent: "ceter",
  alignItems: "center",
};

const bgimg = {
  objectFit: "cover",
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
};

const mainbox = {
  transition: "all 0.5s",
  pointerEvents: "all",
  cursor: "pointer",
  "&:hover": {
    fill: "rgba(47, 117, 160, 0.25)",
  },
};

const HouseNameTagMainBox = (area, getScaledSize, expand) => ({
  width: "fit-content",
  height: "fit-content",
  padding: `${getScaledSize(5)}px ${getScaledSize(10)}px`,
  backgroundColor: "white",
  borderRadius: getScaledSize(50),
  textAlign: "start",
  gap: `${getScaledSize("0.3")}rem`,
  justifyContent: "center",
  display: "flex",
  transform: expand ? "scale(1.05)" : "scale(1)",
  transition: "all 0.5s",
  border: area.isBlueaValley && "2px solid #2F75A0",
  "&:hover": {
    transform: "scale(1.05)",
  },
  pointerEvents: "all",
});

const backgroundimagemainContainer = {
  position: "relative",
  width: "100%",
  height: "99%",
  backgroundImage: `url(${Bangalore})`,
  padding: "0 0 0 0",
  zIndex: 0,
  overflow: {
    lg: "hidden",
    md: "hidden",
    sm: "scroll",
    xs: "scroll",
  },
};

const svgxcss = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const landmarktitleTypo = (getScaledSize) => ({
  fontSize: {
    lg: 9,
    md: 9,
    sm: 11,
    xs: 11,
  },
  fontWeight: "bold",
  fontFamily: "Segoeui",
  mb: 0.5,
  whiteSpace: "normal",
  wordWrap: "break-word",
  maxWidth: "80%",
});

const pinbackImage = {
  marginY: "auto",
  fontWeight: "bold",
  fontFamily: "Segoeui",
  gap: "-0.5rem",
  transition: "all 0.2s",
};

const landmarktypotwo = {
  color: "white",
  fontSize: "15px",
  fontWeight: "bold",
  fontFamily: "Segoeui",
  borderRadius: "16px",
  padding: "4px 10px",
  width: "fit-content",
};

const maingelse = {
  cursor: "pointer",
  pointerEvents: "bounding-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const landmarkforeigncss = {
  padding: "2px",
  textAlign: "center",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  transition: "all 0.2s",
  overflow: "hidden",
};
const PinIconCss = {
  fontWeight: "bold",
  fontFamily: "Segoeui",
  gap: "-0.5rem",
  marginY: "auto",
  transition: "all 0.2s",
};
