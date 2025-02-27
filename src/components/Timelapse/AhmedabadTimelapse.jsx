import React, { useState, useRef } from "react";
import TimeLapseHeader from "./TimelapseHeader";
import {
  Paper,
  Box,
  Button,
  Slider,
  Typography,
  Grid,
  Modal,
  useMediaQuery,
} from "@mui/material";
import landmark from "../../assets/Filtericon/landmark.svg";
import education from "../../assets/Filtericon/education.svg";
import PropertyIcon from "../../assets/goyalpropertyicon.svg";
import Health from "../../assets/Filtericon/Health.svg";
import { useNavigate } from "react-router-dom";
import BGIMG from "../../assets/timeplapse/timelapse.svg";
import arrow from "../../assets/timeplapse/backarrow.svg";
import cal from "../../assets/timeplapse/events.svg";
import analyst from "../../assets/timeplapse/analytics.svg";
import LineChart from "../LineChart";
import ahmedabad from "../../assets/images/ahmedabad.png";
import ahmedabad1970 from "../../assets/timelapse/ahmedabad_1970.svg";
import ahmedabad1980 from "../../assets/timelapse/ahmedabad_1980.svg";
import "../styles.css";
import "../ImageMap.css";
import Img1970 from "../../assets/timelapse/webpimgamd/1985.webp";
import Img1990 from "../../assets/timelapse/webpimgamd/1990.webp";
import Img2000 from "../../assets/timelapse/webpimgamd/2000.webp";
import Img2010 from "../../assets/timelapse/webpimgamd/2015.webp";
import Img2020 from "../../assets/timelapse/webpimgamd/2020.webp";
import Img2024 from "../../assets/timelapse/webpimgamd/2024.webp";

import {
  AmdTimelapsepinData,
  AmdTimelapselandmarkData,
} from "../../utils/timelapsedatavalues";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Loader/loader";
import { eventsData } from "../../utils/majorevents";
import brochureimg from "../../assets/Filtericon/brochure-icon.svg";
import Brochure from "../../assets/brochures/TheGrowthLand.pdf";
export default function AhmdDummy() {
  const navigate = useNavigate();
  const [openMajorEvent, setOpenMajorEvent] = React.useState(false);

  const [newPins, setNewPins] = useState({
    amd: new Set(),
    landmark: new Set(),
  });

  const [activeArea, setActiveArea] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [activePinHouse, setActivePinHouse] = useState(null);
  const [scale, setScale] = useState(1);
  const [activeLandMark, setActiveLandMark] = useState(null);
  const maxScale = 5;
  const minScale = 1;
  const [svgKey, setSvgKey] = useState(0);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const containerRef = useRef();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ZoomData, setZoomData] = useState("");
  const [isPolygonHovered, setIsPolygonHovered] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenMajorEvent = () => {
    setOpenMajorEvent(true);
    handleClose();
  };
  const handleCloseMajorEvent = () => setOpenMajorEvent(false);
  function getScaledSize(baseSize) {
    return baseSize / scale;
  }
  const [sliderValue, setSliderValue] = React.useState(10);
  const [backgroundImage, setBackgroundImage] = React.useState(Img1970);

  const mark = [
    { value: 0 },
    { value: 10, label: 1970 },
    { value: 20, label: 1980 },
    { value: 30, label: 1990 },
    { value: 40, label: 2000 },
    { value: 50, label: 2010 },
    { value: 60, label: 2020 },
    { value: 70, label: 2024 },
    { value: 80 },
  ];
  const paperRef = React.useRef();

  const landmarkmouseenter = (id) => {
    setHoveredPinLandMark(id);
  };

  const landmarkleavemouse = () => {
    setHoveredPinLandMark(null);
  };

  React.useEffect(() => {
    switch (sliderValue) {
      case 10:
        setBackgroundImage(Img1970);
        break;
      case 20:
        setBackgroundImage(Img1970);
        break;
      case 30:
        setBackgroundImage(Img1990);
        break;
      case 40:
        setBackgroundImage(Img2000);
        break;
      case 50:
        setBackgroundImage(Img2010);
        break;
      case 60:
        setBackgroundImage(Img2020);
        break;
      case 70:
        setBackgroundImage(Img2024);
        break;
      default:
        setBackgroundImage(Img1970);
    }
  }, [sliderValue]);

  const selectedArea = mark.find((room) => room.value === sliderValue);

  const handleSliderChange = (event, newValue) => {
    if (newValue <= 10) {
      setSliderValue(10);
    } else if (newValue >= 70) {
      setSliderValue(70);
    } else {
      setSliderValue(newValue);
    }

    // Determine newly added pins
    const selectedMarks = mark.filter((m) => m.value <= sliderValue);

    const newAmdPinSet = new Set(
      AmdTimelapsepinData.filter((pin) =>
        selectedMarks.some(
          (selectedMark) =>
            selectedMark.label && pin.title === selectedMark.label.toString()
        )
      ).map((pin) => pin.id)
    );

    // Determine newly added Landmark pins
    const newLandmarkPinSet = new Set(
      AmdTimelapselandmarkData.filter((pin) =>
        selectedMarks.some(
          (selectedMark) =>
            selectedMark.label && pin.type === selectedMark.label.toString()
        )
      ).map((pin) => pin.id)
    );

    setNewPins({ amd: newAmdPinSet, landmark: newLandmarkPinSet });

    setSvgKey((prevKey) => prevKey + 1);
  };

  const MotionSlider = motion(Slider);
  const SmoothSlider = () => {
    return (
      <MotionSlider
        sx={sliderStyles(sliderValue)}
        defaultValue={10}
        max={80}
        step={10}
        marks={mark}
        size="md"
        value={sliderValue}
        // valueLabelDisplay="off"
        onChange={handleSliderChange}
        animate={{ value: sliderValue }}
        variant="contained"
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    );
  };

  const [mapfiltervalue, setMapFilterValue] = React.useState([
    "Education",
    "Health",
    "Landmark",
    "1970",
    "1980",
    "1990",
    "2000",
    "2010",
    "2020",
    "2024",
  ]);

  const handleMapFilterChange = (filters) => {
    setMapFilterValue((prevFilters) => {
      const allYearsSelected = filters.every((year) =>
        prevFilters.includes(year)
      );

      if (allYearsSelected) {
        return prevFilters.filter((filter) => !filters.includes(filter));
      } else {
        return [
          ...prevFilters,
          ...filters.filter((filter) => !prevFilters.includes(filter)),
        ];
      }
    });
  };

  const yearsSelected = (years) => {
    return years.some((year) => mapfiltervalue.includes(year));
  };

  return (
    <>
      <Loader />

      <Box sx={{ height: "100vh", overflowY: "hidden" }}>
        <TimeLapseHeader />
        <Box sx={TimelapseMain}>
          <Box sx={MainHeaderBox}>
            <Box>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                sx={{
                  background: "black",
                  display: "flex",
                  gap: "10px",
                  flexDirection: "row",
                  PointerEvent: "all",
                  color: "white",
                  borderRadius: "0px 7px 7px 0px",

                  textTransform: "none",
                  ":hover": {
                    backgroundColor: "black",
                  },
                }}
              >
                <Box component={"img"} src={arrow} />
                Back
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Button onClick={handleOpen} sx={demographyBtn}>
                {" "}
                <Box
                  component={"img"}
                  width={"20px"}
                  height={"20px"}
                  src={analyst}
                />
                <Typography className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    {" "}
                    Demography{" "}
                  </Box>
                </Typography>
              </Button>

              <Button onClick={handleOpenMajorEvent} sx={demographyBtn}>
                {" "}
                <Box
                  component={"img"}
                  width={"20px"}
                  height={"20px"}
                  src={cal}
                />
                <Typography className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    {" "}
                    Major events{" "}
                  </Box>
                </Typography>
              </Button>
              <Button
                // component="a"
                // target="_blank"
                onClick={() => {
                  window.open(Brochure);
                }}
                sx={demographyBtn}
              >
                {" "}
                <Box
                  component={"img"}
                  width={"18px"}
                  height={"18px"}
                  src={brochureimg}
                />
                <Typography className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Brochure{" "}
                  </Box>
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box sx={SliderMainBox}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography gutterBottom sx={{ color: "white", fontSize: "16px" }}>
              Ahmedabad Time lapse
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md="auto">
                  <Button
                    onClick={() => handleMapFilterChange(["Landmark"])}
                    sx={{
                      ...filterButtoncss,
                      color: mapfiltervalue?.includes("Landmark")
                        ? "black"
                        : "#bdbdbd",
                      backgroundColor: mapfiltervalue?.includes("Landmark")
                        ? "#DADADA"
                        : "#595959",
                      "&:hover": {
                        color: mapfiltervalue?.includes("Landmark")
                          ? "black"
                          : "#bdbdbd",
                        background: mapfiltervalue?.includes("Landmark")
                          ? "white"
                          : "#606060",
                      },
                    }}
                  >
                    <Typography sx={filtertext}>Landmarks</Typography>
                    <Box component={"img"} src={landmark} />
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} md="auto">
                  <Button
                    onClick={() => handleMapFilterChange(["Health"])}
                    sx={{
                      ...filterButtoncss,
                      color: mapfiltervalue?.includes("Health")
                        ? "black"
                        : "#bdbdbd",
                      backgroundColor: mapfiltervalue?.includes("Health")
                        ? "#DADADA"
                        : "#595959",
                      "&:hover": {
                        color: mapfiltervalue?.includes("Health")
                          ? "black"
                          : "#bdbdbd",
                        background: mapfiltervalue?.includes("Health")
                          ? "white"
                          : "#606060",
                      },
                    }}
                  >
                    <Typography sx={filtertext}>Health</Typography>
                    <Box component={"img"} src={Health} />
                  </Button>
                </Grid>

                <Grid item xs={6} sm={6} md="auto">
                  <Button
                    onClick={() => handleMapFilterChange(["Education"])}
                    sx={{
                      ...filterButtoncss,
                      color: mapfiltervalue?.includes("Education")
                        ? "black"
                        : "#bdbdbd",
                      backgroundColor: mapfiltervalue?.includes("Education")
                        ? "#DADADA"
                        : "#595959",
                      "&:hover": {
                        color: mapfiltervalue?.includes("Education")
                          ? "black"
                          : "#bdbdbd",
                        background: mapfiltervalue?.includes("Education")
                          ? "white"
                          : "#606060",
                      },
                    }}
                  >
                    <Typography sx={filtertext}>Education</Typography>
                    <Box component={"img"} src={education} />
                  </Button>
                </Grid>
                <Grid item xs={6} sm={6} md="auto">
                  <Button
                    onClick={() =>
                      handleMapFilterChange([
                        "1970",
                        "1980",
                        "1990",
                        "2000",
                        "2010",
                        "2020",
                        "2024",
                      ])
                    }
                    sx={{
                      ...filterButtoncss,
                      whiteSpace: "nowrap",
                      minWidth: "130px",
                      color: yearsSelected([
                        "1970",
                        "1980",
                        "1990",
                        "2000",
                        "2010",
                        "2020",
                        "2024",
                      ])
                        ? "black"
                        : "#bdbdbd",
                      backgroundColor: yearsSelected([
                        "1970",
                        "1980",
                        "1990",
                        "2000",
                        "2010",
                        "2020",
                        "2024",
                      ])
                        ? "#DADADA"
                        : "#595959",
                      "&:hover": {
                        color: yearsSelected([
                          "1970",
                          "1980",
                          "1990",
                          "2000",
                          "2010",
                          "2020",
                          "2024",
                        ])
                          ? "black"
                          : "#bdbdbd",
                        background: yearsSelected([
                          "1970",
                          "1980",
                          "1990",
                          "2000",
                          "2010",
                          "2020",
                          "2024",
                        ])
                          ? "white"
                          : "#606060",
                      },
                    }}
                  >
                    <Typography sx={filtertext}>Goyal Properties</Typography>
                    <Box
                      component={"img"}
                      src={PropertyIcon}
                      sx={{
                        borderRadius: "50%",
                        backgroundColor: "rgb(39, 39, 39)",
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <SmoothSlider />
        </Box>

        <Box
          sx={{
            position: "relative",
            width: "100vw",
            overflow: {
              lg: "hidden",
              md: "hidden",
              sm: "scroll",
              xs: "scroll",
            },
            height: "100vh",
            backgroundImage: `url(${backgroundImage})`,
          }}
          className="main-container"
        >
          <Box
            // className="image-map-container"
            className="image-map-container"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <Box
              component={"img"}
              src={backgroundImage}
              alt="Image Map"
              className="image-map-timelapse"
              sx={BackgroundImgMain}
            />

            <svg
              className="svg-overlay-timelapse"
              viewBox="0 0 8192 4320"
              preserveAspectRatio="xMidYMid slice"
              style={svgMain}
              key={svgKey}
            >
              {AmdTimelapsepinData.filter((pinn) => {
                const isTitleFiltered = mapfiltervalue.includes(pinn.title);

                if (isTitleFiltered) {
                  const selectedMarks = mark.filter(
                    (m) => m.value <= sliderValue
                  );

                  return selectedMarks.some(
                    (selectedMark) =>
                      selectedMark.label &&
                      pinn.title === selectedMark.label.toString()
                  );
                }

                // If the title is not in mapfiltervalue, return false
                return false;
              }).map((pin) => {
                const [x, y, r] = pin.points.split(",").map(Number);
                const scaledR = getScaledSize(r);
                const pathLength = isSmallScreen
                  ? getScaledSize(36)
                  : getScaledSize(30);
                // Length of the path
                const foreignObjectRadius = isSmallScreen
                  ? getScaledSize(36)
                  : getScaledSize(30); // Radius of the foreignObject

                // Calculate end point of the path using trigonometry
                const angleInRadians = (pin.angle * Math.PI) / 180;

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

                return (
                  <g
                    key={pin.id}
                    onClick={() => {
                      setActivePin(pin.id);
                    }}
                    onMouseEnter={() => {
                      setHoveredPin(pin.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredPin(null);
                    }}
                    style={{
                      pointerEvents: "bounding-box",
                      cursor: "pointer",
                      opacity: hoveredNameTag ? 0.4 : 1,
                      transition: "all 0.2s",
                    }}
                  >
                    <foreignObject
                      x={x - 40}
                      y={y - 50}
                      width={
                        isSmallScreen ? getScaledSize(140) : getScaledSize(130)
                      }
                      height={
                        isSmallScreen ? getScaledSize(140) : getScaledSize(130)
                      }
                      scale={activePin === pin.id ? 1.2 : 1}
                      style={{
                        // opacity: activePin === pin.id ? 1 : 0.5,
                        transition: "all 0.2s",
                      }}
                      className={`pin ${
                        newPins.amd.has(pin.id) ? "" : "pin-new-amd"
                      }`}
                    >
                      <div
                        style={{
                          ...PinStyles,
                          backgroundColor:
                            activePin === pin.id
                              ? "white"
                              : "rgba(39, 39, 39, 1)",
                          height: isSmallScreen
                            ? getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 140
                                  : 130
                              )
                            : getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 130
                                  : 120
                              ),
                          width: isSmallScreen
                            ? getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 140
                                  : 130
                              )
                            : getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 130
                                  : 120
                              ),
                        }}
                      >
                        <pin.icon
                          fill={
                            activePin === pin.id
                              ? "rgba(64, 64, 64, 1)"
                              : "#DADADA"
                          }
                          width={getScaledSize(
                            hoveredPin === pin.id || activePin === pin.id
                              ? 130
                              : 120
                          )}
                          height={getScaledSize(
                            hoveredPin === pin.id || activePin === pin.id
                              ? 130
                              : 120
                          )}
                          style={{
                            color:
                              activePin === pin.id
                                ? "rgba(64, 64, 64, 1)"
                                : "white",
                            marginY: "auto",
                            width: {
                              lg: getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 25
                                  : 25
                              ),
                              md: getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 25
                                  : 25
                              ),
                              sm: getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 45
                                  : 45
                              ),
                              xs: getScaledSize(
                                hoveredPin === pin.id || activePin === pin.id
                                  ? 45
                                  : 45
                              ),
                            },

                            fontWeight: "bold",
                            fontFamily: "Segoeui",
                            gap: "-0.5rem",
                            transition: "all 0.2s",
                          }}
                        />

                        {/* <Typography
                        sx={{
                          // ...PinsTitle,
                          color: activePin === pin.id ? "black" : "white",
                          fontSize: {
                            lg: getScaledSize(9),
                            md: getScaledSize(9),
                            sm: getScaledSize(12),
                            xs: getScaledSize(12),
                          },
                          mb: getScaledSize(1.2),
                          ml: getScaledSize(0.8),
                          mr: getScaledSize(0.8),
                        }}
                      >
                        {pin.title}
                      </Typography> */}
                      </div>
                    </foreignObject>
                  </g>
                );
              })}

              {AmdTimelapselandmarkData.filter((pinn) => {
                const selectedMarks = mark.filter(
                  (m) => m.value <= sliderValue
                );

                // Return true if the pin's title matches any of the selected marks' labels
                const isSelectedMark = selectedMarks.some(
                  (selectedMark) =>
                    selectedMark.label &&
                    pinn.type === selectedMark.label.toString()
                );

                // Add the new condition for mapfiltervalue
                if (mapfiltervalue.length === 0) {
                  return false; // If the map filter is empty, hide everything
                } else {
                  return isSelectedMark && mapfiltervalue.includes(pinn.title); // Show only if it's in mapfiltervalue
                }
              }).map((landMark) => {
                const [cx, cy] = landMark.points.split(",").map(Number);

                return (
                  <g
                    key={landMark.id}
                    style={LandmarkMapcssg}
                    className={`pin ${
                      newPins.landmark.has(landMark.id)
                        ? ""
                        : "pin-new-landmark"
                    }`}
                  >
                    <Box
                      component={"circle"}
                      cx={cx}
                      cy={cy}
                      r={
                        activeLandMark === landMark.id ||
                        hoveredPinLandMark === landMark.id
                          ? getScaledSize(55)
                          : getScaledSize(45)
                      }
                      fill={landMark.color}
                      title={landMark.title}
                      sx={{
                        "&:hover": {
                          r: getScaledSize(55),
                        },
                        transition: "all 0.5s",
                      }}
                      onMouseEnter={() => landmarkmouseenter(landMark.id)}
                      onMouseLeave={() => landmarkleavemouse()}
                    />
                    {/* {(activeLandMark === landMark.id ||
                    hoveredPinLandMark === landMark.id) && ( */}
                    <>
                      <image
                        xlinkHref={`${landMark.image}`}
                        x={cx - getScaledSize(30)}
                        y={cy - getScaledSize(30)}
                        width={getScaledSize(60)}
                        height={getScaledSize(60)}
                        style={{ pointerEvents: "none" }}
                      />
                      <foreignObject
                        x={cx + getScaledSize(75)}
                        y={cy - getScaledSize(100)} // Adjust y to center the foreignObject
                        width={getScaledSize(400)}
                        height={getScaledSize(200)}
                        style={{
                          ...Landmarkforeignobjectcss,
                          opacity:
                            activeLandMark === landMark.id ||
                            hoveredPinLandMark === landMark.id
                              ? 1
                              : 0.3,
                        }}
                      >
                        <div
                          style={{
                            ...LandmarkmainDivcss,
                            animation:
                              hoveredPinLandMark === landMark.id
                                ? "slideInFromRight 0.5s ease-out forwards"
                                : "none",
                          }}
                        >
                          {hoveredPinLandMark === landMark.id ? (
                            <Typography
                              sx={hoverespinLandmarkcss(
                                getScaledSize,
                                landMark
                              )}
                            >
                              {landMark.title}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </div>
                      </foreignObject>
                    </>
                    {/* )} */}
                  </g>
                );
              })}
            </svg>
          </Box>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
            pointerEvents: "none",
          },
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            ...style,
            pointerEvents: "auto",
          }}
        >
          <Box sx={style} className="majormodal">
            <LineChart
              handleClose={handleClose}
              selectedArea={selectedArea.label}
            />
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openMajorEvent}
        onClose={handleCloseMajorEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box sx={style}>
          <Box sx={style}>
            <Box sx={MajorEventsModalMain} className="majormodal">
              <Box sx={closebox}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    padding: 2,
                    color: "rgba(255, 255, 255, 0.87)",
                  }}
                >
                  Major Events of Ahmedabad
                </Typography>
                <Box
                  sx={{
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={handleCloseMajorEvent}
                >
                  <CloseIcon />
                </Box>
              </Box>

              <Box
                sx={{
                  height: "450px",
                  overflowY: "scroll",
                  "& div:nth-child(even)": {
                    backgroundColor: "rgba(29, 29, 29, 1)",
                  },

                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(100, 100, 100, 0.8)",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "rgba(150, 150, 150, 1)",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "rgba(29, 29, 29, 0.3)",
                    borderRadius: "4px",
                  },
                }}
              >
                {eventsData.map((eventItem, index) => (
                  <Box key={index} sx={MajorEventMainTitle}>
                    <Typography>{eventItem.year}</Typography>
                    <Typography>
                      {eventItem.beforeSpan}
                      <span>{eventItem.spanContent}</span>
                      {eventItem.afterSpan}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  right: 0,
  m: { lg: "35px 40px", md: "35px 40px", sm: "35px 3px", xs: "35px 3px" },
};

const MainBox = {
  height: "100vh",
  width: "100%",
  backgroundSize: "cover",
};

const MainHeaderBox = {
  width: "98%",
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",
  mt: 2,
  position: "absolute",
  zIndex: 1,
};

const demographyBtn = {
  background: "black",
  borderRadius: "10px",
  minWidth: "0px",
  ":hover": {
    backgroundColor: "black",
  },
  "&:hover .button-text": {
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-80%)",
    animation: "slideInFromRight 0.5s ease-out forwards",
  },
};

const demographyText = {
  visibility: "hidden",
  opacity: 0,
  position: "absolute",
  marginRight: "10px",
  right: "100%",
  transform: "translateX(-80%)",
  backgroundColor: "rgba(0,0,0,0.8)",
  color: "white",
  padding: "3px 8px",
  borderRadius: "4px",
  whiteSpace: "nowrap",
  zIndex: 1,
  transition: "visibility 0s, opacity 0.5s ease-out, transform 0.5s ease-out",
  animation: "none",
  textTransform: "capitalize",
};

const SliderMainBox = {
  position: "absolute",
  bottom: 20,
  width: { lg: "60%", md: "60%", sm: "80%", xs: "80%" },
  margin: { lg: "auto 20%", md: "auto 20%", sm: "auto 10%", xs: "auto 10%" },

  zIndex: 1,
};

const BackgroundImgMain = {
  objectFit: "cover",
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  overflow: "hidden",
};

const svgMain = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const PinStyles = {
  textAlign: "center",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-evenly",
  transition: "all 0.2s",
  overflow: "hidden",
};

const PinsTitle = {
  fontWeight: "bold",
  fontFamily: "Segoeui",
  whiteSpace: "normal",
  wordWrap: "break-word",
  maxWidth: "100%",
  lineHeight: "normal",
};

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
  pointerEvents: "none",
};

const LandmarkmainDivcss = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  pointerEvents: "none",
};

const MajorEventsModalMain = {
  background: "#000000",
  color: "white",
  width: { lg: "300px", md: "300px", sm: "300px", xs: "250px" },
  borderRadius: "10px",
  display: "grid",
};

const closebox = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
};

const MajorEventMainTitle = {
  display: "flex",
  "& p": { fontSize: "14px" },
  gap: "2rem",
  padding: "1rem 2rem",
  "& p:first-child": {
    display: "list-item",
  },
  "& span": {
    color: "rgba(255, 255, 255, 0.6)",
  },
};

const hoverespinLandmarkcss = (getScaledSize, landMark) => ({
  color: "white",
  fontSize: `${getScaledSize(45)}px`,
  fontWeight: "bold",
  fontFamily: "Segoeui",
  background: landMark.color,
  borderRadius: `${getScaledSize(16)}px`,
  padding: `${getScaledSize(14)}px ${getScaledSize(40)}px`,
  width: "fit-content",
  pointerEvents: "none",
});

const TimelapseMain = {
  position: "absolute",
  zIndex: 1,
  width: "100%",
};

const sliderStyles = (sliderValue) => ({
  color: "white",
  "& .MuiSlider-thumb": {
    backgroundColor: "white",
    width: 24,
    height: 24,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.5)",
    transition: "transform 0.2s ease",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.6)",
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: "white",
    transition: "width 3s ease", // Animate the width change
  },
  "& .MuiSlider-rail": {
    backgroundColor: "white",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "white",
  },
  "& .MuiSlider-markLabel": {
    color: "white",
    fontSize: { lg: "15px", md: "15px", sm: "15px", xs: "8px" },
    fontWeight: 500,
  },
  '& .MuiSlider-markLabel[data-index="1"]': {
    fontSize: sliderValue === 10 && "18px",
    fontWeight: sliderValue === 10 && 700,
  },
  '& .MuiSlider-markLabel[data-index="2"]': {
    fontSize: sliderValue === 20 && "18px",
    fontWeight: sliderValue === 20 && 700,
  },
  '& .MuiSlider-markLabel[data-index="3"]': {
    fontSize: sliderValue === 30 && "18px",
    fontWeight: sliderValue === 30 && 700,
  },
  '& .MuiSlider-markLabel[data-index="4"]': {
    fontSize: sliderValue === 40 && "18px",
    fontWeight: sliderValue === 40 && 700,
  },
  '& .MuiSlider-markLabel[data-index="5"]': {
    fontSize: sliderValue === 50 && "18px",
    fontWeight: sliderValue === 50 && 700,
  },
  '& .MuiSlider-markLabel[data-index="6"]': {
    fontSize: sliderValue === 60 && "18px",
    fontWeight: sliderValue === 60 && 700,
  },
  '& .MuiSlider-markLabel[data-index="7"]': {
    fontSize: sliderValue === 70 && "18px",
    fontWeight: sliderValue === 70 && 700,
  },
  '& .MuiSlider-markLabel[data-index="8"]': {
    fontSize: sliderValue === 80 && "18px",
    fontWeight: sliderValue === 80 && 700,
  },
});

const MapFilterMainStyle = {
  backgroundColor: "rgba(0,0,0,1)",
  color: "white",
  borderRadius: "0px 10px 10px 0px",
  // borderRadius: "10px",
  textAlign: "center",
  height: "fit-content",
  padding: "15px 10px 15px 8px",
  transition: "all 0.3s",
  margin: "10px 0px 0px 0px",
  // margin: "10px 0px 0px 10px",

  width: "150px",
};

const ButtonInfoContainer = {
  display: "flex",
  gap: "0.1rem",
  pointerEvents: "all",
  flexDirection: "column",
  justifyContent: "center",
  "& button": {
    textTransform: "capitalize",
    background: "#606060",
    height: "fit-content",
    borderRadius: "0px",
    gap: "0.5rem",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 10px",
  },
  "& button:hover": {
    background: "#606060",
  },
  "& button:nth-child(1)": {
    borderRadius: "10px 10px 0px 0px",
  },
  "& button:last-child": {
    borderRadius: "0px 0px 10px 10px",
  },
  "& p": {
    fontSize: "11px",
    fontWeight: 500,
    color: "white",
  },
};

const filtertext = {
  fontSize: "13px",
};

const filterButtoncss = {
  fontSize: "13px",
  textTransform: "capitalize",
  height: "fit-content",
  borderRadius: "12px",
  gap: "0.5rem",
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 10px",
};
