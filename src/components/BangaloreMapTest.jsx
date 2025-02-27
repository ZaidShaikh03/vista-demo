import React, { useState, useRef, useMemo } from "react";
import "./styles.css";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapData, pinData, landMarkData } from "../utils/datavalues";
import { format } from "date-fns";
// import ahmedabad from "../assets/images/ahemdabad_lownew.jpg";
// import Bangalore from "../assets/images/Bengaluru_low.jpg";
import Bangalore from "../assets/images/bengaluru_1_final.jpg";

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
import pin1 from "../assets/PinSVG/pin1.svg";
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
const pinPositions = [
  { id: 1, x: 500, y: 300, title: "Pin 1", icon: pin1 },
  { id: 2, x: 750, y: 500, title: "Pin 2", icon: pin1 },
  { id: 3, x: 1000, y: 400, title: "Pin 3", icon: pin1 },
];
const BangaloreMapTest = () => {
  const [activeArea, setActiveArea] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [activePinHouse, setActivePinHouse] = useState(null);
  const [scale, setScale] = useState(1.395);
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
      <Clouds scale={scale} />
      <Box
        sx={MainBox}
        className={VistaStyles.mainContainer}
        onClick={handleOutsideClick}
      >
        <Box sx={MainBoxChild(isSmallScreen)}>
          <Header
            open={open}
            setOpen={setOpen}
            setValue={setValue}
            value={value}
          />
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
          initialScale={1.395}
          minScale={1}
          maxScale={3}
          disablePadding={true}
          limitToBounds={true}
          initialPositionX={-200}
          initialPositionY={-600}
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
                    component={"img"}
                    src={Bangalore}
                    alt="Image Map"
                    className={VistaStyles.imageMap}
                    sx={backgroundImage}
                  />
                  {pinPositions.map((pin) => (
                    <Box
                      key={pin.id}
                      component="img"
                      src={pin.icon}
                      alt={pin.title}
                      sx={{
                        position: "absolute",
                        left: `${pin.x}px`,
                        top: `${pin.y}px`,
                        width: `${getScaledSize(100)}px`, // Adjust size dynamically
                        height: `${getScaledSize(100)}px`,
                        transform: "translate(-50%, -50%)", // Center the pin
                        pointerEvents: "auto", // Allow click events
                        cursor: "pointer",
                        zIndex: 1000,
                      }}
                      onClick={() => setActivePin(pin.id)}
                    />
                  ))}
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
      </Box>
    </>
  );
};

export default BangaloreMapTest;

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
