import React, { useState, useRef, useMemo } from "react";
import "./styles.css";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapData, pinData, landMarkData } from "../utils/datavalues";
import { format } from "date-fns";
// import ahmedabad from "../assets/images/ahemdabad_lownew.jpg";
// import Bangalore from "../assets/images/Bengaluru_low.jpg";
import Bangalore from "../assets/images/roseateMainIMG.jpg";

import TagLogo from "../assets/icons/TagLogo.svg";
import BlueTagLogo from "../assets/icons/BlueTagLogo.svg";
import SanandMarkerVector from "../assets/icons/SanandMarkerVector.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Header from "./Headers/Header";
import SatvaHeader from "./Headers/SatvaHeader";
import FloorPlanModal from "./FloorPlanModal";
import { roseateAmenetiesImagessData } from "../utils/roseAteData.js";

import {
  border,
  borderRadius,
  fontFamily,
  fontSize,
  padding,
  width,
} from "@mui/system";
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
import {
  filterTypeColors,
  roseateAmenetiesPointsData,
  roseateDetailMapData,
} from "../utils/roseAteData";
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

const Roseate = () => {
  const [activeArea, setActiveArea] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [activePinHouse, setActivePinHouse] = useState(null);
  const [scale, setScale] = useState(1);
  const [activeLandMark, setActiveLandMark] = useState(null);
  const navigate = useNavigate();
  const [hoveredPin, setHoveredPin] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalImages, setModalImages] = useState([]); // State to hold sorted images
  const [modalNames, setModalNames] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const containerRef = useRef();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ZoomData, setZoomData] = useState("");
  const [isPolygonHovered, setIsPolygonHovered] = useState(false);
  const [pricerange, setPriceRange] = useState([434, 2720]);
  const [boxpricesqyard, setBoxPriceSqyard] = useState([6500, 9500]);
  const [mapfiltervaluefiltertwo, setMapFilterValuefiltertwo] = React.useState([
    "reconnectpark",
    "rejoiceclub",
    "revivezone",
    "zengarden",
  ]);
  const [ParentId, setParentId] = useState(501);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(null);

  console.log("JJJJJJJJJJJJ", selectedItem);

  const [selectedItemTooltipPosition, setSelectedItemTooltipPosition] =
    useState({ x: 0, y: 0 });
  const [selectedBHK, setSelectedBHK] = useState("1BHK");
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

  const [mapfiltervalue, setMapFilterValue] = React.useState(["nonplc", "plc"]);

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

  const filterroseateDetailMapData = roseateDetailMapData?.filter(
    (landMark) => {
      if (mapfiltervalue.length === 0 && mapfiltervaluefiltertwo.length === 0) {
        return false;
      }

      const matchesFirstFilter =
        mapfiltervalue.length > 0 &&
        mapfiltervalue.includes(landMark.filtertype);
      const matchesSecondFilter =
        mapfiltervaluefiltertwo.length > 0 &&
        mapfiltervaluefiltertwo.includes(landMark.filtertype);

      const priceMatch =
        landMark.area >= pricerange[0] && landMark.area <= pricerange[1];

      return (matchesFirstFilter && priceMatch) || matchesSecondFilter;
    }
  );
  const handleMouseEnterVilla = (item, event) => {
    setHoveredItem(item);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeaveVilla = () => {
    setHoveredItem(null);
  };

  const handleMouseMove = (event) => {
    if (selectedItem === null) {
      if (hoveredItem) {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      }
    }
  };

  const handleFloorClick = (Type) => {
    setSelectedBHK(Type);
    navigate("/floorplan", { state: { type: Type, plotdata: selectedItem } });
  };

  // const matchingImages = roseateAmenetiesImagessData
  //   .filter((item) => item.parentID === ParentId)
  //   .map((item) => item.image);

  // const matchingNames = roseateAmenetiesImagessData
  //   .filter((item) => item.parentID === ParentId)
  //   .map((item) => item.name);

  // console.log("hoveredItem", hoveredItem);
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
            setBoxPriceSqyard={setBoxPriceSqyard}
            boxpricesqyard={boxpricesqyard}
            mapfiltervaluefiltertwo={mapfiltervaluefiltertwo}
            setMapFilterValuefiltertwo={setMapFilterValuefiltertwo}
            pricerange={pricerange}
            setPriceRange={setPriceRange}
            ParentId={ParentId}
            selectedItem={selectedItem}
          />
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
                  <Box
                    className={VistaStyles.imageMapContainer}
                    onMouseMove={handleMouseMove}
                    onDoubleClick={() => {
                      // console.log("here hit 1...");
                      if (scale === 3) {
                        resetTransform();
                      }
                      // resetTransform();
                    }}
                  >
                    <Box
                      component={"img"}
                      src={Bangalore}
                      alt="Image Map"
                      className={VistaStyles.imageMap}
                      sx={backgroundImage}
                    />

                    <svg
                      className={VistaStyles.svgOverlay}
                      viewBox="0 0 1920 925"
                      preserveAspectRatio="xMidYMid slice"
                      style={Svgcss}
                    >
                      {/* Render map areas */}
                      {/* white part for regenta hotels */}
                      <Box
                        component="polygon"
                        points="549,110,708,163,718,166,722,173,720,180,471,435,466,439,461,440,188,283,201,273,283,213,328,186,489,86,537,58,542,54,547,54,554,58,564,63,567,69,564,78,549,90,542,97,542,103"
                        fill="transparent"
                        stroke="white"
                        strokeWidth="5"
                        sx={{
                          pointerEvents: "none",
                        }}
                      />
                      {filterroseateDetailMapData.map((el) => {
                        // const centerPoint = getPolygonCenterPoint(el.points);
                        const { color, strokecolor } =
                          filterTypeColors[el.filtertype] ||
                          filterTypeColors.default;
                        if (scale !== 3) {
                          return (
                            <g key={el.id}>
                              <Box
                                component={"polygon"}
                                points={el?.points}
                                title={el.title}
                                sx={{
                                  ...mainbox,
                                  fill: color,
                                  stroke: strokecolor,
                                  strokeWidth: el.scalePass ? 1 : 2,
                                  opacity: 1,
                                  pointerEvents: "all",
                                }}
                                onClick={(e) => {
                                  const target = e.target;
                                  if (typeof hoveredItem?.plot !== "string") {
                                    if (selectedItem === null) {
                                      // console.log("here hit 1...");
                                      setSelectedItem(el);
                                      setSelectedItemTooltipPosition({
                                        x: e.clientX,
                                        y: e.clientY,
                                      });
                                    } else if (selectedItem?.id === el.id) {
                                      // console.log("here hit 1...");
                                      setSelectedItem(null);
                                    } else {
                                      // console.log("here hit 1...");
                                      setSelectedItem(el);
                                      setSelectedItemTooltipPosition({
                                        x: e.clientX,
                                        y: e.clientY,
                                      });
                                    }
                                  } else if (el.plot === "Ameneties") {
                                    zoomToElement(target, 5);
                                    setParentId(el.id);
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  if (selectedItem === null) {
                                    handleMouseEnterVilla(el, e);
                                  }
                                }}
                                onMouseLeave={handleMouseLeaveVilla}
                              />
                            </g>
                          );
                        }
                      })}
                      {roseateAmenetiesPointsData.map((el) => {
                        const [x, y] = el.points.split(",").map(Number);

                        if (scale === 3) {
                          // Function to measure text width dynamically
                          const getTextWidth = (text, font = "10px Arial") => {
                            const canvas = document.createElement("canvas");
                            const context = canvas.getContext("2d");
                            context.font = font;
                            return context.measureText(text).width - 9; // Adding padding
                          };

                          const textWidth = getTextWidth(el.name);
                          const textHeight = 13; // Fixed height

                          const matchingImages = roseateAmenetiesImagessData
                            .filter((item) => item.parentID === ParentId)
                            .map((item) => item.image);
                          const matchingNames = roseateAmenetiesImagessData
                            .filter((item) => item.parentID === ParentId)
                            .map((item) => item.name);

                          const hasMatch = matchingNames.includes(el.name);

                          return (
                            <>
                              <foreignObject
                                key={el.id}
                                x={x - 7}
                                y={y - 10}
                                width={80}
                                height={14}
                              >
                                <div
                                  style={{
                                    position: "relative",
                                    width: "fit-content",
                                    height: "100%",
                                    padding: "2px 8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    pointerEvents: hasMatch ? "all" : "none",
                                    cursor: hasMatch
                                      ? "pointer"
                                      : "not-allowed",
                                  }}
                                  onClick={() => {
                                    if (hasMatch) {
                                      const sortedImages = matchingImages.sort(
                                        (a, b) => {
                                          const nameA =
                                            matchingNames[
                                              matchingImages.indexOf(a)
                                            ];
                                          const nameB =
                                            matchingNames[
                                              matchingImages.indexOf(b)
                                            ];
                                          return nameA === el.name
                                            ? -1
                                            : nameB === el.name
                                            ? 1
                                            : 0;
                                        }
                                      );

                                      const sortedNames = matchingNames.sort(
                                        (a, b) =>
                                          a === el.name
                                            ? -1
                                            : b === el.name
                                            ? 1
                                            : 0
                                      );

                                      setOpenModal(true);
                                      setModalImages(sortedImages);
                                      setModalNames(sortedNames);
                                    }
                                  }}
                                >
                                  {/* Background Box with Blur */}
                                  <div
                                    style={{
                                      position: "absolute", // Ensures it doesn't affect text
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent
                                      borderRadius: "20px",
                                      backdropFilter: "blur(2px)", // Background blur effect
                                      WebkitBackdropFilter: "blur(2px)", // Safari compatibility
                                    }}
                                  />

                                  {/* Sharp Text (Above Blur) */}
                                  <span
                                    style={{
                                      position: "relative", // Ensures it's above the blurred box
                                      zIndex: 1, // Keeps text sharp and clear
                                      color: "rgba(255, 255, 255, 1)",
                                      fontSize: "5px",
                                      textTransform: "capitalize",
                                      fontFamily: "Roboto",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {el.name}
                                  </span>
                                </div>
                              </foreignObject>
                            </>
                          );
                        }
                      })}
                    </svg>
                  </Box>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>

        {selectedItem === null && scale === 1 && (
          <div>
            {/* Buttons should only be visible when hovering over non-PLC items */}
            {hoveredItem &&
              hoveredItem.filtertype !== "nonplc" &&
              typeof hoveredItem?.plot !== "string" && (
                <Box
                  sx={{
                    position: "fixed",
                    top: tooltipPosition.y - 75, // Positioned above the tooltip
                    left: tooltipPosition.x - 50,
                    display: "flex",
                    gap: "5px",
                    zIndex: 1100, // Ensure it's above the tooltip
                  }}
                >
                  <Box
                    onClick={() => setSelectedBHK("1BHK")}
                    sx={{
                      pointerEvents: "auto",
                      cursor: "pointer",
                      background: "white",
                      color: "black",
                      padding: "5px 10px",
                      fontSize: "10px",
                      borderRadius: "15px 5px 5px 15px",
                      fontFamily: "Roboto",
                      fontWeight: 500,
                    }}
                  >
                    1BHK
                  </Box>
                  <Box
                    onClick={() => setSelectedBHK("2BHK")}
                    sx={{
                      pointerEvents: "auto",
                      cursor: "pointer",
                      background: "black",
                      color: "white",
                      padding: "5px 10px",
                      fontSize: "10px",
                      borderRadius: "5px 15px 15px 5px",
                      fontFamily: "Roboto",
                      fontWeight: 500,
                    }}
                  >
                    2BHK
                  </Box>
                </Box>
              )}

            {/* Tooltip Box (Always Visible) */}
            {hoveredItem && typeof hoveredItem?.plot !== "string" ? (
              <Box
                sx={{
                  position: "fixed",
                  top: tooltipPosition.y - 50, // Adjusted for spacing
                  left: tooltipPosition.x - 50,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "5px 30px",
                  borderRadius: "10px",
                  pointerEvents: "none",
                  border: "1px solid white",
                  fontSize: "12px",
                  zIndex: 1000,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "8px solid rgba(255, 255, 255, 0.1)",
                    filter: "blur(1px)",
                  },
                  "::before": {
                    content: '""',
                    position: "absolute",
                    bottom: "-9px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "9px solid white",
                  },
                }}
              >
                {/* Unit Number (Always Visible) */}
                {`Unit ${hoveredItem.plot}`}
              </Box>
            ) : null}
          </div>
        )}

        {scale === 1 && (
          <div>
            {/* Buttons should only be visible when hovering over non-PLC items */}
            {selectedItem &&
              selectedItem.filtertype !== "nonplc" &&
              typeof selectedItem?.plot !== "string" && (
                <Box
                  sx={{
                    position: "fixed",
                    top: selectedItemTooltipPosition.y - 75, // Positioned above the tooltip
                    left: selectedItemTooltipPosition.x - 50,
                    display: "flex",
                    gap: "5px",
                    zIndex: 1100, // Ensure it's above the tooltip
                  }}
                >
                  <Box
                    onClick={() => handleFloorClick("1BHK")}
                    sx={{
                      pointerEvents: "auto",
                      cursor: "pointer",
                      background: "white",
                      color: "black",
                      padding: "5px 10px",
                      fontSize: "10px",
                      borderRadius: "15px 5px 5px 15px",
                      fontFamily: "Roboto",
                      fontWeight: 500,
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    1BHK
                  </Box>
                  <Box
                    onClick={() => handleFloorClick("2BHK")}
                    sx={{
                      pointerEvents: "auto",
                      cursor: "pointer",
                      background: "black",
                      color: "white",
                      padding: "5px 10px",
                      fontSize: "10px",
                      borderRadius: "5px 15px 15px 5px",
                      fontFamily: "Roboto",
                      fontWeight: 500,
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    2BHK
                  </Box>
                </Box>
              )}

            {/* Tooltip Box (Always Visible) */}
            {selectedItem && typeof selectedItem?.plot !== "string" ? (
              <Box
                sx={{
                  position: "fixed",
                  top: selectedItemTooltipPosition.y - 50, // Adjusted for spacing
                  left: selectedItemTooltipPosition.x - 50,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "5px 30px",
                  borderRadius: "10px",
                  pointerEvents: "none",
                  border: "1px solid white",
                  fontSize: "12px",
                  zIndex: 1000,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  "::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "8px solid rgba(255, 255, 255, 0.1)",
                    filter: "blur(1px)",
                  },
                  "::before": {
                    content: '""',
                    position: "absolute",
                    bottom: "-9px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: "9px solid white",
                  },
                }}
              >
                {/* Unit Number (Always Visible) */}
                {`Unit ${selectedItem.plot}`}
              </Box>
            ) : null}
          </div>
        )}
      </Box>

      {openModal && (
        <FloorPlanModal
          open={openModal}
          setOpen={setOpenModal}
          images={modalImages} // Use the sorted images
          names={modalNames}
        />
      )}
    </>
  );
};

export default Roseate;

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
const mainbox = {
  transition: "all 0.5s",
  pointerEvents: "all",
  cursor: "pointer",
  "&:hover": {
    fill: "rgba(47, 117, 160, 0.25)",
  },
};
