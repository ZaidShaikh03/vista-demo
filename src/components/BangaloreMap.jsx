import React, { useState, useRef, useMemo } from "react";
import "./styles.css";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapData, pinData, landMarkData } from "../utils/datavalues";
import { format } from "date-fns";
// import ahmedabad from "../assets/images/ahemdabad_lownew.jpg";
// import Bangalore from "../assets/images/Bengaluru_low.jpg";
import Bangalore from "../assets/images/roseateMainIMG.svg";

import TagLogo from "../assets/icons/TagLogo.svg";
import BlueTagLogo from "../assets/icons/BlueTagLogo.svg";
import SanandMarkerVector from "../assets/icons/SanandMarkerVector.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Header from "./Headers/Header";
import SatvaHeader from "./Headers/SatvaHeader";
import { fontSize, width } from "@mui/system";
import styles from "./styles";
import Clouds from "./Clouds";
import Loader from "./Loader/loader";
import LegacyVid from "./Loader/LegacyVid";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VistaStyles from "./vista.module.css";
// import HomeIcon from "@mui/icons-material/Home";
import HomeIcon from "../assets/homeIcon.svg";
import SatvaLogo from "../assets/logos/SatvaLogo.svg";
import {
  RajankunteTag,
  RajanKunteFirstTag,
} from "../components/TagsComps/RajankunteTag";
// const NameTag = ({
//   area,
//   points,
//   position,
//   hoveredNameTag,
//   currentScale,
//   setActiveArea,
//   zoomToElement,
//   activeArea,
// }) => {
//   const [cx, cy] = points.split(",").map(Number);
//   const [startX, startY] = area.startPoint.split(",").map(Number);
//   const getScaledSize = (baseSize) => baseSize / currentScale;
//   let tagX = startX;
//   let tagY = startY;
//   const scaledOffset = getScaledSize(70);
//   const scaledWidthOffset = getScaledSize(140);
//   const isSmallScreen = useMediaQuery("(max-width:700px)");

//   switch (position) {
//     case "top":
//       tagY -= scaledOffset;
//       break;
//     case "bottom":
//       tagY += scaledOffset;
//       break;
//     case "left":
//       tagX -= scaledWidthOffset;
//       break;
//     case "right":
//       tagX += scaledWidthOffset;
//       break;
//     default:
//       break;
//   }

//   const path = `M${startX},${startY} L${tagX},${tagY}`;

//   return (
//     <g
//       style={{
//         ...NameTagMainG,
//         opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.3 : 1,
//       }}
//       onClick={(e) => {
//         setActiveArea(area.id);
//         zoomToElement(e.target, 3);
//       }}
//     >
//       <path
//         d={path}
//         stroke="white"
//         // strokeWidth={getScaledSize(2)}
//         // strokeDasharray={`${getScaledSize(3)},${getScaledSize(6)}`}
//         fill="none"
//       />
//       {/*    <circle cx={startX} cy={startY} r={getScaledSize(10)} fill="white" /> */}
//       <foreignObject
//         x={isSmallScreen ? tagX - getScaledSize(100) : tagX - getScaledSize(50)}
//         y={isSmallScreen ? tagY - getScaledSize(40) : tagY - getScaledSize(20)}
//         width={getScaledSize(300)}
//         height={getScaledSize(100)}
//       >
//         <div style={NameTagMainDiv(getScaledSize)}>
//           <Typography sx={NameTagTitle(isSmallScreen, getScaledSize)}>
//             {area.title}
//           </Typography>
//           <Typography
//             sx={NameTagTitleAndSubtitle(isSmallScreen, getScaledSize)}
//           >
//             {area.subtitle || area.title}
//           </Typography>
//         </div>
//       </foreignObject>
//     </g>
//   );
// };

const HouseNameTag = ({
  area,
  points,
  angle,
  onMouseEnter,
  onMouseLeave,
  hoveredNameTag,
  currentScale,
  setActivePin,
  isPolygonHovered,
  activePin,
}) => {
  const [cx, cy] = points.split(",").map(Number);
  const getScaledSize = (baseSize) => baseSize / currentScale;
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();

  const radius = area.isRajanKunte ? getScaledSize(0) : getScaledSize(10); // Radius of the circle

  // Calculate the offset distance for the tag position
  const offsetDistance = area.isSmall
    ? getScaledSize(70)
    : area.isLarge
    ? getScaledSize(160)
    : area.isExtraLarge
    ? getScaledSize(320)
    : getScaledSize(100);

  // Convert angle to radians
  const angleInRadians = (angle * Math.PI) / 180;

  // Adjust startX and startY to start from the edge of the circle
  const startX = cx + radius * Math.cos(angleInRadians);
  const startY = cy - radius * Math.sin(angleInRadians);

  // Calculate the new tag position based on the angle
  const tagX = startX + offsetDistance * Math.cos(angleInRadians);
  const tagY = startY - offsetDistance * Math.sin(angleInRadians);

  const path = `M${startX},${startY} L${tagX},${tagY}`;

  const foreignObjectX = isSmallScreen
    ? tagX - getScaledSize(100)
    : tagX - getScaledSize(50);
  const foreignObjectY = isSmallScreen
    ? tagY - getScaledSize(40)
    : tagY - getScaledSize(20);

  return (
    <g
      style={{
        pointerEvents: "none",
        opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.3 : 1,
      }}
    >
      <path
        d={path}
        stroke="white"
        fill="none"
        style={{
          // strokeDasharray: getScaledSize(2),
          // strokeWidth: getScaledSize(2),
          strokeWidth: getScaledSize(2),
          transition: "stroke-width 0.1s ease, stroke 0.1s ease",
        }}
      />
      <foreignObject
        x={foreignObjectX}
        y={foreignObjectY}
        width={getScaledSize(200)}
        height={getScaledSize(100)}
        style={{
          padding: `${getScaledSize(10)}px ${getScaledSize(15)}px`,
          pointerEvents: "none",
        }}
        onClick={() => area.isRajanKunte && navigate("/rajankunte")}
      >
        <Box
          sx={homeTagStyle(
            getScaledSize,
            area,
            isPolygonHovered,
            hoveredNameTag
          )}
          onMouseEnter={() => {
            onMouseEnter(area.id);
            setActivePin(area.id);
          }}
          onMouseLeave={onMouseLeave}
        >
          {area.isRajanKunte && (
            <Box
              component={"img"}
              src={area.isRajanKunte ? SatvaLogo : SatvaLogo}
              sx={{
                // fontSize: isSmallScreen ? getScaledSize(25) : getScaledSize(10),
                transition: "all 0.1s",
                width: getScaledSize(80),
                height: getScaledSize(40),
              }}
            />
          )}
          {!area.isRajanKunte && (
            <Typography sx={HouseNameTitle(area, isSmallScreen, getScaledSize)}>
              {area.title}
            </Typography>
          )}
        </Box>
      </foreignObject>
    </g>
  );
};

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

const BangaloreMap = () => {
  const [activeArea, setActiveArea] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [activePinHouse, setActivePinHouse] = useState(null);
  const [scale, setScale] = useState(1);
  const [activeLandMark, setActiveLandMark] = useState(null);
  const navigate = useNavigate();
  const [hoveredPin, setHoveredPin] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const containerRef = useRef();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ZoomData, setZoomData] = useState("");
  const [isPolygonHovered, setIsPolygonHovered] = useState(false);

  const handlenavigate = (el) => {
    if (el?.isnav === "yelahanka") {
      navigate(`/${el?.isnav}`);
    } else if (el?.isnav === "yelahanka") {
      navigate(`/${el?.isnav}`);
    }
    setActiveArea(el.id);
    // zoomToElement(e.target, 3);
  };

  // Callback function to receive data from child component
  const handleChildData = (dataFromChild) => {
    // Handle data received from child component
    setZoomData(dataFromChild);
  };

  const [mapfiltervalue, setMapFilterValue] = React.useState(["landmarks"]);

  const today = new Date();

  const TodayDate = format(today, "dd MMMM");

  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  const TodayTime = today?.toLocaleTimeString("en-US", options);
  const time = TodayTime?.replace(/\s?(AM|PM)/i, "");
  const period = TodayTime?.match(/(AM|PM)/i)?.at(0);

  const [value, setValue] = React.useState("All");
  const [isMapFiltersVisible, setIsMapFiltersVisible] = useState(false);
  const [scalePass, setScalePass] = useState(false);

  function handleScaleChange(event) {
    console.log("Hello hiiii", event.instance.transformState.scale);
    setScale(event.instance.transformState.scale);

    if (event.instance.transformState.scale >= 3) {
      setScalePass(true);
    }
    if (event.instance.transformState.scale < 3) {
      setScalePass(false);
    }
    setHoveredNameTag(null);
    setActivePinHouse(null);
  }
  function getScaledSize(baseSize) {
    return baseSize / scale;
  }
  var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var d = new Date();
  var dayName = days[d.getDay()];

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".pin") &&
      !event.target.closest("foreignObject")
    ) {
      setActivePin(null);
    }
  };

  const handleMapClick = (event) => {
    if (!event.target.closest(".pin")) {
      setActivePin(null);
    }
  };

  const transformWrapperRef = useRef(null);
  const handleInit = () => {
    if (transformWrapperRef.current) {
      if (isSmallScreen) {
        transformWrapperRef.current.setTransform(0, 0, 1);
      } else {
        transformWrapperRef.current.setTransform(0, -400, 1);
      }
    }
  };

  const calculateCentroid = (points) => {
    let x = 0,
      y = 0,
      n = points.length;

    for (let i = 0; i < n; i++) {
      x += points[i][0];
      y += points[i][1];
    }

    return { x: x / n, y: y / n };
  };

  const landmarkmouseenter = (id) => {
    setHoveredPinLandMark(id);
  };

  const landmarkleavemouse = () => {
    setHoveredPinLandMark(null);
  };

  const handleMouseEnter = () => {
    setIsPolygonHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPolygonHovered(false);
  };

  const handleMouseEnterEvent = (el) => {
    if (scalePass) {
      setHoveredNameTag(el.id);
      setActivePinHouse(el.id);
    } else if (el.isBlueaValley) {
      setHoveredNameTag(el.id);
      setActivePinHouse(el.id);
      handleMouseEnter();
    }
  };

  const handleMouseLeaveEvent = (el) => {
    if (scalePass) {
      setHoveredNameTag(null);
      setActivePinHouse(null);
    } else if (el.isBlueaValley) {
      setHoveredNameTag(null);
      setActivePinHouse(null);
      handleMouseLeave();
    }
  };

  const filteredMapData = useMemo(() => {
    return MapData.filter((el) => {
      if (value === "All") {
        return scalePass ? el.scalePass === true : true;
      } else {
        return el.type === value && (scalePass ? el.scalePass === true : true);
      }
    });
  }, [MapData, value, scalePass]);
  const filteredPinData = useMemo(() => {
    return pinData
      ?.filter((el) => {
        if (scalePass) {
          return true;
        } else {
          return !el.scalePass;
        }
      })
      .filter((landMark) => {
        if (mapfiltervalue.length === 0) {
          return false;
        } else {
          return mapfiltervalue.includes(landMark.type);
        }
      });
  }, [pinData, scalePass, mapfiltervalue]);
  const filteredLandMarkData = useMemo(() => {
    return landMarkData.filter((landMark) => {
      if (mapfiltervalue.length === 0) {
        return false;
      } else {
        return mapfiltervalue.includes(landMark.type);
      }
    });
  }, [landMarkData, mapfiltervalue]);
  return (
    <>
      <Loader />
      {/* <LegacyVid /> */}
      {/* <Clouds scale={scale} /> */}
      <Box
        sx={MainBox}
        className={VistaStyles.mainContainer}
        onClick={handleOutsideClick}
      >
        <Box sx={MainBoxChild(isSmallScreen)}>
          {/* <Header
            open={open}
            setOpen={setOpen}
            setValue={setValue}
            value={value}
          /> */}
          <SatvaHeader
            onSendData={handleChildData}
            scale={scale}
            setMapFilterValue={setMapFilterValue}
            mapfiltervalue={mapfiltervalue}
            landMarkData={landMarkData}
            open={open}
            setOpen={setOpen}
          />

          {isSmallScreen && activePin !== null ? (
            <Box className="card-opacity" sx={styles.PinCard}>
              <Box
                component={"img"}
                src={pinData.find((pin) => pin.id === activePin)?.img}
                sx={styles.PinCardImg}
              />
              <Box sx={styles.PinCardTitleMain}>
                <Typography sx={styles.PinCardTitle}>
                  {pinData.find((pin) => pin.id === activePin)?.title}
                </Typography>
                <Typography sx={styles.PinCardDescription}>
                  {pinData.find((pin) => pin.id === activePin)?.description ||
                    `Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.`}
                </Typography>
              </Box>
            </Box>
          ) : activePin !== null ? (
            <Box
              className="card-opacity"
              sx={{
                ...styles.ActivePinCardMain,
                opacity: activePin ? 1 : 0,
              }}
            >
              <Box
                component={"img"}
                src={pinData.find((item) => item.id === activePin)?.img}
                sx={styles.ActivePinCardImg}
              />
              <Box sx={styles.PinCardTitleMain}>
                <Typography sx={styles.PinCardTitle}>
                  {pinData.find((pin) => pin.id === activePin)?.title}
                </Typography>
                <Typography sx={styles.PinCardDescription}>
                  {pinData.find((pin) => pin.id === activePin)?.description ||
                    `Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.`}
                </Typography>
              </Box>
            </Box>
          ) : activePinHouse !== null ? (
            <Box
              className="card-opacity"
              sx={{
                ...styles.ActivePinHouseMain,
                opacity: activePinHouse ? 1 : 0,
              }}
            >
              {/* <Box
                component={"img"}
                src={Bangalore}
                sx={styles.ActivePinHouseImg}
              /> */}
              <ApartmentIcon
                sx={{
                  color: "white",
                }}
              />
              <Box sx={styles.HousePinCardTitlemain}>
                <Typography sx={styles.PinCardTitle}>
                  {MapData.find((pin) => pin.id === activePinHouse)?.title ||
                    HouseData.find((pin) => pin.id === activePinHouse)?.title}
                </Typography>
                {/* <Typography sx={styles.PinHouseCardDescription}>
                  374 Units
                </Typography> */}
                <Typography sx={styles.PinHouseCardDescriptionSub}>
                  {MapData.find((pin) => pin.id === activePinHouse)?.type ||
                    HouseData.find((pin) => pin.id === activePinHouse)?.type}
                </Typography>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
        <TransformWrapper
          ref={transformWrapperRef}
          initialScale={1}
          minScale={1}
          maxScale={3}
          disablePadding={true}
          limitToBounds={true}
          initialPositionX={0}
          initialPositionY={0}
          minPositionX={0}
          minPositionY={0}
          onTransformed={(e) => handleScaleChange(e)}
          // onInit={handleInit}
        >
          {({
            zoomIn,
            zoomOut,
            resetTransform,
            zoomToElement,

            ...rest
          }) => {
            const zoomStep = 0.2;
            if (ZoomData === "ZoomOut") {
              zoomOut(zoomStep);
              setZoomData("");
            } else if (ZoomData === "ZoomIn") {
              zoomIn(zoomStep);
              setZoomData("");
            }

            return (
              <>
                <TransformComponent wrapperStyle={wrapperStylecss}>
                  <Box className={VistaStyles.imageMapContainer}>
                    <Box
                      component={"img"}
                      src={Bangalore}
                      alt="Image Map"
                      className={VistaStyles.imageMap}
                      sx={backgroundImage}
                    />

                    <svg
                      className={VistaStyles.svgOverlay}
                      viewBox="0 0 2048 2048"
                      preserveAspectRatio="xMinYMin meet"
                      style={Svgcss}
                    >
                      {/* Render map areas */}
                      {filteredMapData.map((el) => {
                        const centerPoint = getPolygonCenterPoint(el.points);

                        const pointsArray = el.points
                          .split(" ")
                          .map((point) => point.split(",").map(Number));
                        // Calculate the centroid
                        const centroid = calculateCentroid(pointsArray);
                        if (el.isDot) {
                          return (
                            <g key={el.id}>
                              <Box
                                component={"circle"}
                                cx={centroid.x}
                                cy={centroid.y}
                                // r={getScaledSize(10)}
                                fill="white"
                                title={el.title}
                                sx={{
                                  ...Mapdatamaingcss,
                                  opacity:
                                    hoveredNameTag && hoveredNameTag !== el.id
                                      ? 0.3
                                      : 1,
                                  r:
                                    hoveredNameTag && hoveredNameTag === el.id
                                      ? getScaledSize(12)
                                      : getScaledSize(10),
                                  transition: "r 0.2s",
                                  "&:hover": {
                                    r: getScaledSize(12),
                                    border: "1px solid #000",
                                  },
                                }}
                                onClick={(e) => {
                                  handlenavigate(el);
                                  zoomToElement(e.target, 3);
                                }}
                                onMouseEnter={() => handleMouseEnterEvent(el)}
                                onMouseLeave={() => handleMouseLeaveEvent(el)}
                              />
                              <Box
                                component="image"
                                xlinkHref={
                                  el.type === "Residential" ? HomeIcon : TagLogo
                                }
                                x={centroid.x - getScaledSize(8)}
                                y={centroid.y - getScaledSize(8)}
                                sx={{
                                  pointerEvents: "none",
                                  width: getScaledSize(16),
                                  height: getScaledSize(16),
                                  opacity:
                                    hoveredNameTag && hoveredNameTag !== el.id
                                      ? 0.3
                                      : 1,
                                }}
                              />
                              {el.scalePass === scalePass ? (
                                // el?.isHome ? (
                                <HouseNameTag
                                  angle={el?.angle ? el?.angle : 0}
                                  area={el}
                                  points={centerPoint}
                                  position={el.position}
                                  hoveredNameTag={hoveredNameTag}
                                  onMouseEnter={(id) => setHoveredNameTag(id)}
                                  onMouseLeave={() => {
                                    setHoveredNameTag(null),
                                      setActivePinHouse(null);
                                  }}
                                  currentScale={scale}
                                  setActivePin={setActivePinHouse}
                                  activePin={activePinHouse}
                                  isPolygonHovered={isPolygonHovered}
                                />
                              ) : // ) : (
                              //   <NameTag
                              //     area={el}
                              //     points={centerPoint}
                              //     position={el.position}
                              //     hoveredNameTag={hoveredNameTag}
                              //     currentScale={scale}
                              //     setActiveArea={setActiveArea}
                              //     zoomToElement={zoomToElement}
                              //     activeArea={activeArea}
                              //   />
                              // )
                              null}
                            </g>
                          );
                        } else {
                          return (
                            <g key={el.id}>
                              {/* Polygon shape */}
                              <Box
                                component={"polygon"}
                                points={el?.points}
                                title={el.title}
                                sx={{
                                  ...Mapdatamaingcss,
                                  fill: el.isRajanKunte
                                    ? "rgba(255, 255, 255, 0.3)"
                                    : "rgba(0, 0, 0, 0.1)",
                                  strokeWidth: el.scalePass ? 0.5 : 2,
                                  stroke: "white",
                                  strokeDasharray: el.isRajanKunte
                                    ? "0,0"
                                    : "4, 4",
                                  opacity:
                                    hoveredNameTag && hoveredNameTag !== el.id
                                      ? 0.3
                                      : 1,
                                }}
                                onClick={(e) => {
                                  handlenavigate(el);
                                  zoomToElement(e.target, 3);
                                }}
                                onMouseEnter={() => handleMouseEnterEvent(el)}
                                onMouseLeave={() => handleMouseLeaveEvent(el)}
                              />

                              {/* Add Yelahanka text */}
                              <text
                                x={870}
                                y={830}
                                fill="white"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={getScaledSize(20)}
                                style={{
                                  pointerEvents: "none",
                                  opacity:
                                    hoveredNameTag && hoveredNameTag !== el.id
                                      ? 0.3
                                      : 1,
                                }}
                              >
                                Yelahanka
                              </text>

                              {/* Additional code for NameTag component */}
                              {!el.scalePass ? (
                                <RajanKunteFirstTag
                                  angle={el?.angle ? el?.angle : 0}
                                  area={el}
                                  points={centerPoint}
                                  position={el.position}
                                  hoveredNameTag={hoveredNameTag}
                                  onMouseEnter={(id) => setHoveredNameTag(id)}
                                  onMouseLeave={() => {
                                    setHoveredNameTag(null);
                                    setActivePinHouse(null);
                                  }}
                                  currentScale={scale}
                                  setActivePin={setActivePinHouse}
                                  activePin={activePinHouse}
                                  isPolygonHovered={isPolygonHovered}
                                />
                              ) : null}
                            </g>
                          );
                        }
                      })}

                      {filteredPinData.map((pin) => {
                        const [x, y, r] = pin.points.split(",").map(Number);
                        const scaledR = getScaledSize(r);
                        const pathLength = isSmallScreen
                          ? getScaledSize(36)
                          : getScaledSize(30);
                        // getScaledSize(30);
                        // Length of the path
                        const foreignObjectRadius = isSmallScreen
                          ? getScaledSize(36)
                          : getScaledSize(30); // Radius of the foreignObject

                        // Calculate end point of the path using trigonometry
                        const angleInRadians = (pin.angle * Math.PI) / 180;

                        // Calculate the center of the foreignObject
                        const centerX =
                          x +
                          (pathLength + foreignObjectRadius) *
                            Math.sin(angleInRadians);
                        const centerY =
                          y -
                          (pathLength + foreignObjectRadius) *
                            Math.cos(angleInRadians);

                        // Calculate the point on the border of the foreignObject
                        const endX =
                          centerX -
                          foreignObjectRadius * Math.sin(angleInRadians);
                        const endY =
                          centerY +
                          foreignObjectRadius * Math.cos(angleInRadians);

                        const path = `M${x},${y} L${endX},${endY}`;

                        // Calculate foreignObject position (remains the same)
                        const foreignObjectX = centerX - foreignObjectRadius;
                        const foreignObjectY = centerY - foreignObjectRadius;

                        return (
                          <g
                            key={pin.id}
                            onClick={() => {
                              setActivePin(pin.id);
                            }}
                            onMouseEnter={() => {
                              if (!scalePass) {
                                setHoveredPin(pin.id);
                              }
                            }}
                            onMouseLeave={() => {
                              if (!scalePass) {
                                setHoveredPin(null);
                              }
                            }}
                            style={PinDatagcss(hoveredNameTag)}
                          >
                            <path
                              d={path}
                              stroke={"white"}
                              strokeWidth={getScaledSize(2)}
                              style={{
                                strokeDasharray: getScaledSize(2),
                                transition:
                                  "stroke-width 0.1s ease, stroke 0.1s ease",
                              }}
                              className={"path"}
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r={scaledR}
                              fill="white"
                              className="pin"
                              title={pin.title}
                            />
                            <foreignObject
                              x={foreignObjectX}
                              y={foreignObjectY}
                              width={
                                isSmallScreen
                                  ? getScaledSize(85)
                                  : getScaledSize(75)
                              }
                              height={
                                isSmallScreen
                                  ? getScaledSize(85)
                                  : getScaledSize(75)
                              }
                              scale={activePin === pin.id ? 1.2 : 1}
                              style={{
                                transition: "all 0.2s",
                              }}
                              className="pin"
                            >
                              <div
                                style={{
                                  ...PinIconDivcss,
                                  height: isSmallScreen
                                    ? getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 85
                                          : 75
                                      )
                                    : getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 65
                                          : 60
                                      ),
                                  width: isSmallScreen
                                    ? getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 85
                                          : 75
                                      )
                                    : getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 65
                                          : 60
                                      ),
                                  backgroundColor:
                                    activePin === pin.id
                                      ? "white"
                                      : "#27272799",
                                  transition:
                                    "background-color 0.1s ease, height 0.1s ease, width 0.1s ease",
                                }}
                              >
                                <pin.icon
                                  fill={
                                    activePin === pin.id
                                      ? "rgba(64, 64, 64, 1)"
                                      : "#DADADA"
                                  }
                                  width={getScaledSize(
                                    hoveredPin === pin.id ||
                                      activePin === pin.id
                                      ? 25
                                      : 25
                                  )}
                                  height={getScaledSize(
                                    hoveredPin === pin.id ||
                                      activePin === pin.id
                                      ? 25
                                      : 25
                                  )}
                                  style={{
                                    ...PinIconCss,
                                    transition:
                                      "fill 0.1s ease, color 0.1s ease",
                                    color:
                                      activePin === pin.id
                                        ? "rgba(64, 64, 64, 1)"
                                        : "white",
                                    width: {
                                      lg: getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 20
                                          : 20
                                      ),
                                      md: getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 20
                                          : 20
                                      ),
                                      sm: getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 40
                                          : 40
                                      ),
                                      xs: getScaledSize(
                                        hoveredPin === pin.id ||
                                          activePin === pin.id
                                          ? 40
                                          : 40
                                      ),
                                    },
                                  }}
                                />
                                {(hoveredPin === pin.id ||
                                  activePin === pin.id) && (
                                  <Typography
                                    sx={{
                                      ...HoverPincss(getScaledSize),
                                      color:
                                        activePin === pin.id
                                          ? "black"
                                          : "white",
                                      transition: "color 0.1s ease",
                                    }}
                                  >
                                    {pin.title}
                                  </Typography>
                                )}
                              </div>
                            </foreignObject>
                          </g>
                        );
                      })}
                    </svg>
                  </Box>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </Box>
    </>
  );
};

export default BangaloreMap;

const homeTagStyle = (
  getScaledSize,
  area,
  isPolygonHovered,
  hoveredNameTag
) => ({
  width: "fit-content",
  height: "fit-content",
  padding: `${getScaledSize(5)}px ${getScaledSize(10)}px`,
  backgroundColor: "white",
  borderRadius: getScaledSize(50),
  textAlign: "start",
  gap: `${getScaledSize("0.3")}rem`,
  justifyContent: "center",
  display: "flex",
  transform:
    hoveredNameTag && hoveredNameTag === area.id ? "scale(1.05)" : "scale(1)",
  "&:hover": {
    transform: "scale(1.05)",
  },
  cursor: "pointer",
  pointerEvents: "fill",
  transition: "all 0.5s",
  border: area.isRajanKunte ? "2px solid #2F75A0" : undefined,
  alignItems: "center",
});

const NameTagTitle = (isSmallScreen, getScaledSize) => ({
  color: "black",
  fontSize: isSmallScreen ? getScaledSize(20) : getScaledSize(13),
  fontWeight: "bold",
  fontFamily: "Roboto",
});

const HouseNameTitle = (area, isSmallScreen, getScaledSize) => ({
  color: area.isRajanKunte ? "#2F75A0" : "black",
  fontSize: isSmallScreen
    ? getScaledSize(20)
    : area.isRajanKunte
    ? getScaledSize(23)
    : getScaledSize(13),
  fontWeight: "bold",
  fontFamily: "Roboto",
  transition: "all 0.1s",
});

const NameTagMainG = {
  cursor: "pointer",
  pointerEvents: "bounding-box",
};

const NameTagMainDiv = (getScaledSize) => ({
  width: "fit-content",
  height: "fit-content",
  padding: `${getScaledSize(5)}px ${getScaledSize(20)}px`,
  backgroundColor: "white",
  borderRadius: getScaledSize(50),
  textAlign: "start",
});

const NameTagTitleAndSubtitle = (isSmallScreen, getScaledSize) => ({
  fontSize: isSmallScreen ? getScaledSize(15) : getScaledSize(13),
  color: "gray",
  fontFamily: "Roboto",
  textAlign: "left",
});

const MainBox = {
  position: "relative",
  width: "100vw",
  overflow: "hidden",
  display: "flex",
  height: "100vh",
};

const MainBoxChild = (isSmallScreen) => ({
  position: "absolute",
  zIndex: isSmallScreen ? 1351 : 1,
});

const wrapperStylecss = {
  flex: 1,
  justifyContent: "start",
  alignItems: "start",
};

const backgroundImage = {
  objectFit: "cover",
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
};

const Svgcss = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const Mapdatamaingcss = {
  pointerEvents: "all",
  cursor: "pointer",
  // transition: "all 1s",
  stroke: "white",
};

const PinDatagcss = (hoveredNameTag) => ({
  pointerEvents: "bounding-box",
  cursor: "pointer",
  opacity: hoveredNameTag ? 0.3 : 1,
  transition: "all 0.5s",
});

const PinIconDivcss = {
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

const HoverPincss = (getScaledSize) => ({
  fontSize: {
    lg: getScaledSize(7),
    md: getScaledSize(8),
    sm: getScaledSize(11),
    xs: getScaledSize(11),
  },
  fontWeight: "bold",
  fontFamily: "Segoeui",
  mb: getScaledSize(1.2),
  ml: getScaledSize(0.8),
  mr: getScaledSize(0.8),
  whiteSpace: "normal",
  wordWrap: "break-word",
  maxWidth: "100%",
  lineHeight: "normal",
  width: getScaledSize("30px"),
});

const LandmarkMapcssg = {
  cursor: "pointer",
  pointerEvents: "all",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.5s",
};

const Landmarkforeignobjectcss = {
  transition: "all 0.5s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const LandmarkmainDivcss = {
  display: "flex",
  alignItems: "center",
  height: "100%",
};

const hoverespinLandmarkcss = (getScaledSize, landMark) => ({
  color: "white",
  fontSize: `${getScaledSize(12)}px`,
  fontWeight: "bold",
  fontFamily: "Segoeui",
  background: landMark.color,
  borderRadius: `${getScaledSize(16)}px`,
  padding: `${getScaledSize(4)}px ${getScaledSize(10)}px`,
  width: "fit-content",
});
