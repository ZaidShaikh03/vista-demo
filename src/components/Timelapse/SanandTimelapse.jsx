import React, { useState, useRef } from "react";
import TimeLapseHeader from "./TimelapseHeader";
import {
  Paper,
  Box,
  Button,
  Slider,
  Grid,
  Typography,
  Modal,
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import demographyicon from "../../assets/timelapse/demography-icon.svg";
import economyicon from "../../assets/timelapse/economy-icon.svg";
import infrastructureicon from "../../assets/timelapse/infrastructure-icon.svg";
import Img2020 from "../../assets/timelapse/2020.png";
import Img1970 from "../../assets/timelapse/1985.jpg";
import LineChart from "../LineChart";
import ahmedabad from "../../assets/images/ahmedabad.png";
import ahmedabad1970 from "../../assets/timelapse/ahmedabad_1970.svg";
import ahmedabad1980 from "../../assets/timelapse/ahmedabad_1980.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import Sanand1970 from "../../assets/timelapse/webpimgsanand/1985Compress.webp";
import Sanand1990 from "../../assets/timelapse/webpimgsanand/1990Compress.webp";
import Sanand2000 from "../../assets/timelapse/webpimgsanand/2000Compress.webp";
import Sanand2010 from "../../assets/timelapse/webpimgsanand/2010Compress.webp";
import Sanand2020 from "../../assets/timelapse/webpimgsanand/2020Compress.webp";
import Sanand2024 from "../../assets/timelapse/webpimgsanand/2022Compress.webp";
import {
  SanandTimelapselandmarkPins,
  SanandTimelapselandmarkData,
} from "../../utils/timelapsedatavalues";
import "../styles.css";
import "../ImageMap.css";
import { motion } from "framer-motion";
import Loader from "../Loader/loader";
import { eventsData } from "../../utils/majorevents";
import brochureimg from "../../assets/Filtericon/brochure-icon.svg";
import Brochure from "../../assets/brochures/TheGrowthLand.pdf";
export default function SanandTimelapse() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openInfrastructure, setOpenInfrastructure] = React.useState(false);
  const [openMajorEvent, setOpenMajorEvent] = React.useState(false);
  const [openEconomy, setOpenEconomy] = React.useState(false);
  const [scale, setScale] = useState(1);
  const [activePin, setActivePin] = useState(null);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [activeLandMark, setActiveLandMark] = useState(null);
  const [svgKey, setSvgKey] = useState(0);
  const [newPins, setNewPins] = useState({
    amd: new Set(),
    landmark: new Set(),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenInfrastructure = () => {
    setOpenInfrastructure(true);
    handleClose();
  };

  const handleCloseInfrastructure = () => setOpenInfrastructure(false);

  const handleOpenMajorEvent = () => {
    setOpenMajorEvent(true);
    handleClose();
  };
  const handleCloseMajorEvent = () => setOpenMajorEvent(false);

  const handleOpenEconomy = () => {
    setOpenEconomy(true);
    handleClose();
  };
  const handleCloseEconomy = () => setOpenEconomy(false);

  const [sliderValue, setSliderValue] = React.useState(10);
  const [backgroundImage, setBackgroundImage] = React.useState(Sanand1970);

  function getScaledSize(baseSize) {
    return baseSize / scale;
  }

  const landmarkmouseenter = (id) => {
    setHoveredPinLandMark(id);
  };

  const landmarkleavemouse = () => {
    setHoveredPinLandMark(null);
  };

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

  const dataInvestment = [
    { name: "Micron Technology", value: "22500 Cr" },
    { name: "Tata Motors", value: "16000 Cr" },
    { name: "CG Power", value: "7600 Cr" },
    { name: "Coca-Cola", value: "3000 Cr" },
    { name: "P&G", value: "2000 Cr" },
    {
      name: "Terex India, Biogenomics Limited, Mehta Cad Cam Systems Private Limited, Mallcom India",
      value: "1500 Cr",
    },
    { name: "Simmtech", value: "1250 Cr" },
    { name: "KEI Industries", value: "900 Cr" },
    { name: "ESR Group", value: "400 Cr" },
  ];

  const Demographydata = [
    {
      title: 1970,
      polulationcount: "87,440",
      Households: "17,249",
      workingPopulation: "31,848",
      density: "108",
    },
    {
      title: 1980,
      polulationcount: "1,13,287",
      Households: "20,881",
      workingPopulation: "34,619",
      density: "142",
    },
    {
      title: 1990,
      polulationcount: "1,37,346",
      Households: "24,710",
      workingPopulation: "43,138",
      density: "174",
    },
    {
      title: 2000,
      polulationcount: "1,61,525",
      Households: "29,790",
      workingPopulation: "48,248",
      density: "204",
    },
    {
      title: 2010,
      polulationcount: "1,93,335",
      Households: "37,923",
      workingPopulation: "72,677",
      density: "260",
    },
    {
      title: 2020,
      polulationcount: "2,37,845",
      Households: "47,485",
      workingPopulation: "90,121",
      density: "379",
    },
    {
      title: 2024,
      polulationcount: "2,37,845",
      Households: "47,485",
      workingPopulation: "90,121",
      density: "379",
    },
  ];

  const [selectedData, setSelectedData] = useState(Demographydata[0]);

  const paperRef = React.useRef();

  React.useEffect(() => {
    switch (sliderValue) {
      case 10:
        setBackgroundImage(Sanand1970);
        break;
      case 20:
        setBackgroundImage(Sanand1970);
        break;
      case 30:
        setBackgroundImage(Sanand1990);
        break;
      case 40:
        setBackgroundImage(Sanand2000);
        break;
      case 50:
        setBackgroundImage(Sanand2010);
        break;
      case 60:
        setBackgroundImage(Sanand2020);
        break;
      case 70:
        setBackgroundImage(Sanand2024);
        break;
      default:
        setBackgroundImage(Sanand1970);
    }
  }, [sliderValue]);

  const handleSliderChange = (event, newValue) => {
    if (newValue <= 10) {
      setSliderValue(10);
    } else if (newValue >= 70) {
      setSliderValue(70);
    } else {
      setSliderValue(newValue);
    }

    const selectedMark = mark.find((markdata) => markdata.value === newValue);

    if (selectedMark && selectedMark.label) {
      const matchingData = Demographydata.find(
        (data) => data.title === selectedMark.label
      );
      if (matchingData) {
        setSelectedData(matchingData);
      }
    }

    // Determine newly added pins
    const selectedMarks = mark.filter((m) => m.value <= sliderValue);
    const newAmdPinSet = new Set(
      SanandTimelapselandmarkPins.filter((pin) =>
        selectedMarks.some(
          (selectedMark) =>
            selectedMark.label && pin.title === selectedMark.label.toString()
        )
      ).map((pin) => pin.id)
    );

    // Determine newly added Landmark pins
    const newLandmarkPinSet = new Set(
      SanandTimelapselandmarkData.filter((pin) =>
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
        valueLabelDisplay="off"
        onChange={handleSliderChange}
        variant="contained"
        animate={{ value: sliderValue }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      // <motion.div
      //   initial={{ opacity: 0, y: 10 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{
      //     duration: 1,
      //     ease: "easeInOut",
      //   }}
      // >
      //   <Slider
      //     sx={sliderStyles(sliderValue)}
      //     defaultValue={10}
      //     max={80}
      //     step={10}
      //     marks={mark}
      //     size="md"
      //     value={sliderValue}
      //     valueLabelDisplay="off"
      //     onChange={handleSliderChange}
      //     variant="contained"
      //   />
      // </motion.div>
    );
  };

  const [mapfiltervalue, setMapFilterValue] = React.useState([
    "Education",
    "Health",
    "Landmark",
    "2024",
  ]);

  const handleMapFilterChange = (filter) => {
    setMapFilterValue((prevFilters) => {
      if (prevFilters?.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  return (
    <>
      <Loader />

      <Box sx={{ height: "100vh", overflowY: "hidden" }}>
        <TimeLapseHeader />
        <Box
          sx={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
          }}
        >
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
                  textTransform: "none",
                  borderRadius: "0px 7px 7px 0px",
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
                <Box component={"img"} sx={SiderBtns} src={demographyicon} />
                <Box className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Demography{" "}
                  </Box>
                </Box>
              </Button>

              <Button onClick={handleOpenEconomy} sx={demographyBtn}>
                {" "}
                <Box component={"img"} sx={SiderBtns} src={economyicon} />
                <Box className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Economy
                  </Box>
                </Box>
              </Button>
              <Button onClick={handleOpenInfrastructure} sx={demographyBtn}>
                <Box
                  component={"img"}
                  sx={SiderBtns}
                  src={infrastructureicon}
                />
                <Box className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Infrastructure
                  </Box>
                </Box>
              </Button>
              <Button onClick={handleOpenMajorEvent} sx={demographyBtn}>
                {" "}
                <Box component={"img"} sx={SiderBtns} src={cal} />
                <Box className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Major events
                  </Box>
                </Box>
              </Button>
              <Button
                onClick={() => {
                  window.open(Brochure);
                }}
                sx={demographyBtn}
              >
                {" "}
                <Box
                  component={"img"}
                  width={"12px"}
                  height={"12px"}
                  src={brochureimg}
                />
                <Box className="button-text" sx={demographyText}>
                  <Box
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Brochure
                  </Box>
                </Box>
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
              Sanand Time lapse
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6} md="auto">
                  <Button
                    onClick={() => handleMapFilterChange("Landmark")}
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
                    onClick={() => handleMapFilterChange("Health")}
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
                    onClick={() => handleMapFilterChange("Education")}
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
                    onClick={() => handleMapFilterChange("2024")}
                    sx={{
                      ...filterButtoncss,
                      whiteSpace: "nowrap",
                      minWidth: "130px",
                      color: mapfiltervalue?.includes("2024")
                        ? "black"
                        : "#bdbdbd",
                      backgroundColor: mapfiltervalue?.includes("2024")
                        ? "#DADADA"
                        : "#595959",
                      "&:hover": {
                        color: mapfiltervalue?.includes("2024")
                          ? "black"
                          : "#bdbdbd",
                        background: mapfiltervalue?.includes("2024")
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
          }}
          className="main-container"
        >
          <Box
            className="image-map-container"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
          >
            {/* <Box
              component={"img"}
              src={backgroundImage}
              alt="Image Map"
              className="image-map-timelapse"
              sx={BackgroundImgMain}
            /> */}

            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0.5 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
              }}
            >
              <Box
                component={"img"}
                src={backgroundImage} // Dynamically set background image
                alt="Image Map"
                sx={BackgroundImgMain}
                className="image-map-timelapse"
              />
            </motion.div>

            <svg
              className="svg-overlay-timelapse"
              viewBox="0 0 8192 4320"
              preserveAspectRatio="xMidYMid slice"
              style={svgMain}
              key={svgKey}
            >
              {SanandTimelapselandmarkPins.filter((pinn) => {
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

                // Calculate the position of the foreignObject using trigonometry
                const foreignObjectRadius = isSmallScreen
                  ? getScaledSize(36)
                  : getScaledSize(30);
                const angleInRadians = (pin.angle * Math.PI) / 180;

                const centerX =
                  x +
                  (pathLength + foreignObjectRadius) * Math.sin(angleInRadians);
                const centerY =
                  y -
                  (pathLength + foreignObjectRadius) * Math.cos(angleInRadians);

                const endX =
                  centerX - foreignObjectRadius * Math.sin(angleInRadians);
                const endY =
                  centerY + foreignObjectRadius * Math.cos(angleInRadians);

                const path = `M${x},${y} L${endX},${endY}`;

                // Foreign object position
                const foreignObjectX = centerX - foreignObjectRadius;
                const foreignObjectY = centerY - foreignObjectRadius;

                return (
                  <g
                    key={pin.id}
                    onClick={() => setActivePin(pin.id)}
                    onMouseEnter={() => setHoveredPin(pin.id)}
                    onMouseLeave={() => setHoveredPin(null)}
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

              {SanandTimelapselandmarkData.filter((pinn) => {
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
          <Box sx={style}>
            <Box sx={InfraModalMain} className="majormodal">
              <Box sx={closebox}>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "17px",
                    fontWeight: 500,
                  }}
                >
                  Demography
                </Typography>
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </Box>
              </Box>
              <Box sx={InfraSubTitle}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      background: "rgba(98, 178, 253, 1)",
                      width: "7px",
                      height: "7px",
                    }}
                  ></Box>
                  <Typography sx={{ color: "rgba(220, 220, 220, 1)" }}>
                    Population count
                  </Typography>
                </Box>
                <Typography>{selectedData.polulationcount}</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      background: "rgba(155, 223, 196, 1)",
                      width: "7px",
                      height: "7px",
                    }}
                  ></Box>
                  <Typography sx={{ color: "rgba(220, 220, 220, 1)" }}>
                    No. of Households
                  </Typography>
                </Box>
                <Typography>{selectedData.Households}</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      background: "rgba(249, 155, 171, 1)",
                      width: "7px",
                      height: "7px",
                    }}
                  ></Box>
                  <Typography sx={{ color: "rgba(220, 220, 220, 1)" }}>
                    Working Population
                  </Typography>
                </Box>
                <Typography>{selectedData.workingPopulation}</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      background: "rgba(108, 96, 178, 1)",
                      width: "7px",
                      height: "7px",
                    }}
                  ></Box>
                  <Typography sx={{ color: "rgba(220, 220, 220, 1)" }}>
                    Density (/sq. km)
                  </Typography>
                </Box>
                <Typography>{selectedData.density}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openInfrastructure}
        onClose={handleCloseInfrastructure}
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
            <Box sx={InfraModalMain} className="majormodal">
              <Box sx={closebox}>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "17px",
                    fontWeight: 500,
                  }}
                >
                  Infrastructure
                </Typography>
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleCloseInfrastructure}
                >
                  <CloseIcon />
                </Box>
              </Box>

              <Box sx={InfraMainTitle}>
                <Typography>Road network (km)</Typography>
                <Typography>154</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>
                  Micron Technology
                </Typography>
                <Typography>22500 Cr</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>Tata Motors</Typography>
                <Typography>16000 Cr</Typography>
              </Box>
              <Typography
                sx={{
                  mt: 2,
                }}
              >
                Infrastructure projects{" "}
                <span style={{ color: "rgba(155, 223, 196, 1)" }}>
                  (Upcoming)
                </span>
              </Typography>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>ESIC Hospital</Typography>
                <Typography>2022</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>5 star hotel</Typography>
                <Typography>2023</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>
                  Vande Bharat & High Speed Rail
                </Typography>
                <Typography>2023</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>
                  Logistics Park
                </Typography>
                <Typography>2023</Typography>
              </Box>
              <Box sx={InfraSubTitle}>
                <Typography sx={{ color: "#DCDCDC" }}>
                  Urban infrastructure projects
                </Typography>
                <Typography>2024</Typography>
              </Box>
            </Box>
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

      <Modal
        open={openEconomy}
        onClose={handleCloseEconomy}
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
            <Box sx={InfraModalMain} className="majormodal">
              <Box sx={closebox}>
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "17px",
                    fontWeight: 500,
                  }}
                >
                  Economy
                </Typography>

                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleCloseEconomy}
                >
                  <CloseIcon />
                </Box>
              </Box>

              <Accordion sx={{ background: "#000000", color: "white" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{ p: 0 }}
                >
                  <Typography>Major companies present_</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "8px 16px 16px 0px",
                    display: "grid",
                    gap: "1rem",
                    height: "150px",
                    overflowY: "scroll",

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
                  <Typography
                    sx={{ fontSize: "16px", color: "rgba(98, 178, 253, 1)" }}
                  >
                    Automobile
                  </Typography>
                  <Box
                    sx={{ display: "grid", gap: "0.5rem", paddingLeft: "16px" }}
                  >
                    <Typography sx={EconomyData}>Tata Motors</Typography>
                    <Typography sx={EconomyData}>Maxxis Rubber</Typography>
                    <Typography sx={EconomyData}>
                      Yazaki India Private Limited
                    </Typography>
                    <Typography sx={EconomyData}>
                      Yanfeng India Automobiles Interiors Pvt Ltd
                    </Typography>
                  </Box>

                  <Typography
                    sx={{ fontSize: "16px", color: "rgba(155, 223, 196, 1)" }}
                  >
                    Pharmaceuticals
                  </Typography>
                  <Box
                    sx={{ display: "grid", gap: "0.5rem", paddingLeft: "16px" }}
                  >
                    <Typography sx={EconomyData}>
                      Sotac Healthcare Pvt. Ltd.
                    </Typography>
                    <Typography sx={EconomyData}>
                      Thermo Fisher Scientific
                    </Typography>
                    <Typography sx={EconomyData}>
                      Takemoto Yohki India Pvt. Ltd.
                    </Typography>
                  </Box>

                  <Typography
                    sx={{ fontSize: "16px", color: "rgba(249, 155, 171, 1)" }}
                  >
                    FMCG and Food Products
                  </Typography>
                  <Box
                    sx={{ display: "grid", gap: "0.5rem", paddingLeft: "16px" }}
                  >
                    <Typography sx={EconomyData}>Nestle</Typography>
                    <Typography sx={EconomyData}>Coca-Cola</Typography>
                    <Typography sx={EconomyData}>
                      Tong Garden Food Products India Pvt. Ltd.
                    </Typography>
                  </Box>
                  <Typography
                    sx={{ fontSize: "16px", color: "rgba(108, 96, 178, 1)" }}
                  >
                    Electronics and Chemicals
                  </Typography>
                  <Box
                    sx={{ display: "grid", gap: "0.5rem", paddingLeft: "16px" }}
                  >
                    <Typography sx={EconomyData}>Micron Technology</Typography>
                    <Typography sx={EconomyData}>
                      Teva Pharmaceuticals
                    </Typography>
                    <Typography sx={EconomyData}>
                      Food products India Pvt. Ltd.
                    </Typography>
                  </Box>
                </AccordionDetails>
              </Accordion>
              <hr />
              <Accordion sx={{ background: "#000000", color: "white" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{ p: 0 }}
                >
                  <Typography>Key Investments_</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "grid",
                    gap: "0.5rem",
                    padding: "8px 8px 16px 0px",
                    height: "150px",
                    overflowY: "scroll",

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
                  {dataInvestment.map((item, index) => (
                    <Box sx={InfraSubTitle} key={index}>
                      <Typography sx={{ color: "rgba(220, 220, 220, 1)" }}>
                        {item.name}
                      </Typography>
                      <Typography sx={{ whiteSpace: "nowrap" }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
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
  padding: "12px 10px !important",

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

const InfraModalMain = {
  background: "#000000",
  color: "white",
  width: { lg: "300px", md: "300px", sm: "300px", xs: "250px" },
  padding: 2,
  borderRadius: "10px",
  display: "grid",
  gap: "0.5rem",
};

const MajorEventsModalMain = {
  background: "#000000",
  color: "white",
  width: { lg: "300px", md: "300px", sm: "300px", xs: "250px" },
  borderRadius: "10px",
  display: "grid",
};

const InfraMainTitle = {
  display: "flex",
  justifyContent: "space-between",
  "& p": { fontSize: "16px" },

  mt: 1,
};

const InfraSubTitle = {
  display: "flex",
  justifyContent: "space-between",
  "& p": { fontSize: "13px" },
};

const MajorEventMainTitle = {
  display: "flex",
  "& p": { fontSize: "14px" },
  gap: "2rem",
  padding: "1rem 2rem",
  "& p:first-child": {
    display: "list-item",
    color: "rgba(255, 255, 255, 0.87)",
  },
  "& span": {
    color: "rgba(255, 255, 255, 0.6)",
  },
};

const SiderBtns = {
  width: "18px",
  height: "13px",
};

const EconomyData = {
  fontSize: "13px",
  color: "rgba(220, 220, 220, 1)",
  display: "list-item",
};

const closebox = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
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
  zIndex: 1,
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

const sliderStyles = (sliderValue) => ({
  color: "white",
  "& .MuiSlider-thumb": {
    backgroundColor: "white",
    width: 20,
    height: 20,
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.5)",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.6)",
    },
  },
  "& .MuiSlider-track": {
    backgroundColor: "white",
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
  gap: "0.5rem",
  pointerEvents: "all",
  flexDirection: "row",
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
