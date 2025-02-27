import React, { useState, useRef, useEffect } from "react";
import SatvaHeader from "./Headers/SatvaHeader";
import FloorBg from "../assets/Sattvalumina/Floor/Rectangle 154.png";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import floorimg from "../assets/Sattvalumina/Floor/floor.png";
import { useNavigate, useLocation } from "react-router-dom";
import { floornumberdata } from "../utils/floorpladata.js";
import Loader from "./Loader/loader";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Sattvaluminawingsubdatafloors } from "../utils/sattvaluminawingsdata";

export default function FloorPlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const mapData = location.state?.mapData;
  const filtersfloorData = location.state?.filtersData;
  const floorssss = location.state?.Flooor;
  const floorimage = location.state?.FloorImage;
  const wingType = location.state?.wingType;
  // const idsss = location.state.id;
  const [ZoomData, setZoomData] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const defaultFloor = Math?.min(Math?.max(1, Math.ceil(floorssss)), floorssss);

  const [currentFloor, setCurrentFloor] = useState(defaultFloor);

  const currentFloorData = Sattvaluminawingsubdatafloors.find(
    (floor) => floor.floor === currentFloor && floor.type === wingType
  );

  // console.log(
  //   "*******8",
  //   currentFloorData?.floorplanimg,
  //   currentFloorData?.floor
  // );

  const handleFloorChange = (floorNumber) => {
    setCurrentFloor(floorNumber);
  };

  // console.log(location, "location");

  // first
  // const allTypes = filtersData.flatMap((floor) =>
  //   floor.apartmentDistribution.map((apartment) => apartment.type)
  // );

  // second
  // const allFloorTypes = filtersData.flatMap((floor) =>
  //   floor.apartmentDistribution.map((apartment) => apartment.type)
  // );
  // const uniqueFloorTypes = [...new Set(allFloorTypes)];
  // console.log(allFloorTypes);
  // console.log(uniqueFloorTypes);

  // third
  // const floorWiseTypes = filtersData.map((floor) => ({
  //   floor: floor.floor,
  //   types: floor.apartmentDistribution.map((apartment) => apartment.type),
  // }));
  // console.log(floorWiseTypes, "data");

  const [activeLandMark, setActiveLandMark] = useState(null);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);

  const polygonRef = useRef(null);
  const svgRef = useRef(null);

  // const flattenedFilterValues = mapData?.filterType.flat();

  const [flattenedFilterValues, setFlattenedFilterValues] = React.useState([]);
  const [mapfiltervalue, setMapFilterValue] = React.useState([]);

  React.useEffect(() => {
    const mapData = location?.state?.mapData;
    if (mapData?.filterType) {
      const flattenedValues = mapData.filterType.flat();
      setFlattenedFilterValues(flattenedValues);
      setMapFilterValue(flattenedValues);
      localStorage.setItem("mapData", JSON.stringify(mapData));
    }
  }, [location?.state?.mapData]);

  // const filteredData = floornumberdata?.filter((landMark) => {
  //   if (mapfiltervalue.length === 0) {
  //     return false;
  //   }

  //   const typeMatch = mapfiltervalue.includes(landMark.filterType);

  //   // const wingTypeMatch = wingType === landMark.type;
  //   const wing = wingType?.replace("wing", "")?.toLowerCase();
  //   const wingTypeMatch = landMark.wing.includes(wing);
  //   // console.log("wingtypeeeeee", wingType, wing);

  //   // const wingfloornumber = floorssss === landMark.floor;
  //   const wingfloornumber = landMark.floor.includes(currentFloor);

  //   // console.log(
  //   //   "@@@@@@@@@@@22",
  //   //   floorssss,
  //   //   "@@@@@@@@@2222222222",
  //   //   landMark.floor
  //   // );

  //   return typeMatch && wingTypeMatch && wingfloornumber;
  // });
  const filteredData = floornumberdata?.filter((landMark) => {
    if (mapfiltervalue.length === 0) {
      return false;
    }

    const typeMatch = mapfiltervalue.includes(landMark.filterType);

    const wing = wingType?.replace("wing", "")?.toLowerCase();

    // Check if the wing exists and if the current floor is in its floors array
    const wingAndFloorMatch = landMark?.wingsAndFloors?.some(
      (wingAndFloor) =>
        wingAndFloor?.wing?.toLowerCase() === wing &&
        wingAndFloor?.floors?.includes(currentFloor)
    );

    return typeMatch && wingAndFloorMatch;
  });

  const transformWrapperRef = useRef(null);
  const handleInit = () => {
    if (transformWrapperRef.current) {
      if (isSmallScreen) {
        transformWrapperRef.current.setTransform(0, 0, 1);
      } else {
        transformWrapperRef.current.setTransform(0, 0, 1);
      }
    }
  };
  const [scale, setScale] = useState(1);

  function getScaledSize(baseSize) {
    return baseSize / scale;
  }

  const landmarkleavemouse = () => {
    setHoveredPinLandMark(null);
  };

  const landmarkmouseenter = (id) => {
    setHoveredPinLandMark(id);
  };

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".pin") &&
      !event.target.closest("foreignObject")
    ) {
      setActivePin(null);
    }
  };
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
  }

  const handlePolygonClick = (el, scale) => {
    // Reset styles for all polygons
    document.querySelectorAll("polygon").forEach((polygon) => {
      polygon.style.stroke = ""; // Reset stroke
      polygon.style.fill = ""; // Reset fill
    });

    // Get the clicked polygon by ID
    const polygon = document.getElementById(`polygon-${el.id}`);
    if (polygon) {
      if (scale === 2) {
        // Set fill and stroke to none when scale === 3
        polygon.style.stroke = "none";
        polygon.style.fill = "none";
      } else {
        // Apply other styles
        polygon.style.stroke = el.strokborder || "transparent";
        polygon.style.fill = el.color || "transparent";
      }
    }

    // Handle the selection state
    if (selectedPolygon && selectedPolygon.id === el.id) {
      setSelectedPolygon(null);
    } else {
      setSelectedPolygon(el);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (svgRef.current && !svgRef.current.contains(event.target)) {
        setSelectedPolygon(null);
      }
    };

    if (selectedPolygon) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedPolygon]);

  // console.log(
  //   "0000000000000",
  //   floorimg,
  //   "1211111",
  //   floorimage,
  //   "22222222",
  //   currentFloorData?.floorplanimg
  // );
  function getHouseNumber(apartmentNum, currentFloor) {
    // Find the apartment data based on apartmentNum
    // console.log("wing Hellofloornumberdata", floornumberdata);
    const apartment = floornumberdata?.find(
      (apartment) => apartment?.apartmentNum === apartmentNum
    );

    if (!apartment) {
      return `${apartmentNum}`;
    }

    // Get the wing letter from the type (e.g., "winga" => "A")
    const wing = wingType?.replace("wing", "")?.toLowerCase();
    // console.log("wing Hello", wing, apartment?.type, apartment);

    // Format the floor and apartmentNum into 2-digit values
    const floorString = String(currentFloor)?.padStart(2, "0");
    const apartmentNumString = String(apartmentNum)?.padStart(2, "0");

    // Construct and return the house number
    return `${wing?.toUpperCase()}${floorString}${apartmentNumString}`;
  }
  return (
    <>
      <Loader />

      <Box sx={mainbox}>
        <SatvaHeader
          setMapFilterValue={setMapFilterValue}
          mapfiltervalue={mapfiltervalue}
          activePin={activePin}
          setOpen={setOpen}
          open={open}
          flattenedFilterValues={flattenedFilterValues}
          filtersfloorData={filtersfloorData}
          floorssss={floorssss}
          currentFloor={currentFloor}
          // totalFloors={Sattvaluminawingsubdatafloors.length}
          // onFloorChange={handleFloorChange}

          setCurrentFloor={setCurrentFloor}
        />

        <Typography
          sx={{
            position: "absolute",
            top: isSmallScreen ? "2%" : "5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: isSmallScreen ? "16px" : "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          N
        </Typography>

        {/* South */}
        <Typography
          sx={{
            position: "absolute",
            bottom: isSmallScreen ? "2%" : "5%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: isSmallScreen ? "16px" : "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          S
        </Typography>

        {/* West */}
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: isSmallScreen ? "10%" : "20%",
            transform: "translateY(-50%)",
            fontSize: isSmallScreen ? "16px" : "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          W
        </Typography>

        {/* East */}
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            right: isSmallScreen ? "10%" : "20%",
            transform: "translateY(-50%)",
            fontSize: isSmallScreen ? "16px" : "20px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          E
        </Typography>

        <TransformWrapper
          ref={transformWrapperRef}
          initialScale={1}
          minScale={1}
          maxScale={6}
          disablePadding={true}
          limitToBounds={true}
          initialPositionX={0}
          initialPositionY={0}
          minPositionX={0}
          minPositionY={0}
          onTransformed={(e) => handleScaleChange(e)}
          onInit={handleInit}
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

            const handleOutsideClick = (e) => {
              const svgElement = document.querySelector(".svg-overlay");
              const clickTarget = e.target;

              if (svgElement && !svgElement.contains(clickTarget)) {
                resetTransform(); // Reset zoom and position
              }
            };

            return (
              <>
                <TransformComponent wrapperStyle={wrapperStylecss}>
                  <Box
                    sx={{
                      ...imgbgcss,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="main-container"
                    onClick={handleOutsideClick}
                  >
                    <Box
                      className="image-map-container"
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box
                        component={"img"}
                        // src={
                        //   currentFloorData?.floorplanimg || floorimage
                        //     ? floorimage
                        //     : floorimg
                        // }
                        src={
                          currentFloorData?.floorplanimg ||
                          // floorimage ||
                          floorimg
                        }
                        alt="Foreground"
                        className="image-map"
                        sx={{ ...imgcss, height: "100%", width: "100%" }}
                      />

                      <svg
                        className="svg-overlay"
                        viewBox="0 0 3371 3071"
                        preserveAspectRatio="xMidYMid meet"
                        style={svgcss}
                        ref={svgRef}
                      >
                        {filteredData?.map((el) => {
                          const [centerX, centerY] = el.centerPoint
                            ?.split(",")
                            ?.map(Number);

                          let total = el.carpet + el.balcony + el.saleable;

                          return (
                            <g key={el.id}>
                              {scale === 2 &&
                              selectedPolygon &&
                              selectedPolygon.id === el.id ? (
                                <>
                                  {el.subAreas?.map((area, index) => {
                                    const [cx, cy] = area.points
                                      ?.split(",")
                                      ?.map(Number); // Extract subArea points

                                    return (
                                      <>
                                        {/* <text
                                        key={index}
                                        x={cx}
                                        y={cy}
                                        style={{
                                          fontFamily: "Roboto",
                                          fontSize: {
                                            xl: `${getScaledSize(15)}px`,
                                            lg: `${getScaledSize(15)}px`,
                                            md: `${getScaledSize(15)}px`,
                                            sm: `${getScaledSize(25)}px`,
                                            xs: `${getScaledSize(25)}px`,
                                          },
                                          fontWeight: 700,
                                          letterSpacing: "0.04em",
                                          textAlign: "center",
                                          p: 0.5,
                                          textUnderlinePosition: "from-font",
                                          textDecorationSkipInk: "none",
                                          color: "rgba(255, 255, 255, 0.5)",
                                          background: "#817567",
                                          border: "1px solid white",
                                          borderRadius: `${getScaledSize(
                                            16
                                          )}px`,
                                          padding: `${getScaledSize(
                                            4
                                          )}px ${getScaledSize(10)}px`,
                                          width: "fit-content",
                                          pointerEvents: "all",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                          navigate(`/view360`);
                                        }}
                                      >
                                        {area.title}
                                      </text> */}

                                        <foreignObject
                                          x={cx}
                                          y={cy}
                                          width={getScaledSize(250)} // Adjust as per the desired dimensions
                                          height={getScaledSize(50)}
                                          style={{
                                            ...Landmarkforeignobjectcss,
                                            opacity: 1, // Ensure it's fully visible
                                          }}
                                        >
                                          <div
                                            style={{
                                              fontFamily: "Roboto",
                                              fontSize: `${getScaledSize(
                                                13
                                              )}px`,
                                              fontWeight: 500,
                                              letterSpacing: "0.04em",
                                              textAlign: "center",
                                              background: "#817567",
                                              border: "1px solid white",
                                              borderRadius: `${getScaledSize(
                                                16
                                              )}px`,
                                              padding: `${getScaledSize(
                                                4
                                              )}px ${getScaledSize(10)}px`,
                                              width: "fit-content",
                                              color: "white",
                                              cursor: "pointer",
                                              pointerEvents: "all",
                                            }}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              navigate(`/view360`);
                                            }}
                                          >
                                            {area.title}
                                          </div>
                                        </foreignObject>
                                      </>
                                    );
                                  })}
                                  );
                                </>
                              ) : (
                                <>
                                  <Box
                                    component={"polygon"}
                                    id={`polygon-${el.id}`}
                                    points={el.points}
                                    title={el.title}
                                    sx={{
                                      ...mainboxs(el),
                                      fill: el.color,
                                      strokeWidth: el.scalePass ? 1 : 3,
                                      opacity:
                                        hoveredNameTag &&
                                        hoveredNameTag !== el.id
                                          ? 0.7
                                          : 1,
                                      stroke: el.strokborder,

                                      zIndex: 10,
                                    }}
                                    onClick={() => {
                                      // Get the clicked polygon by ID
                                      const polygon = document.getElementById(
                                        `polygon-${el.id}`
                                      );
                                      const button = document.getElementById(
                                        `button-${el.id}`
                                      ); // Assuming the button has an ID

                                      if (polygon) {
                                        if (scale === 2) {
                                          // Hide stroke and fill when scale === 3
                                          polygon.style.stroke = "none";
                                          polygon.style.fill = "none";

                                          // Optionally hide the button if scale === 3
                                          if (button) {
                                            button.style.display = "none";
                                          }
                                        } else {
                                          // Apply normal styles for other scales
                                          polygon.style.stroke =
                                            el.strokborder || "";
                                          polygon.style.fill = el.color || "";

                                          // Ensure the button is visible for other scales
                                          if (button) {
                                            button.style.display = "";
                                          }
                                        }
                                      }
                                    }}
                                  />

                                  {scale === 2 &&
                                  selectedPolygon &&
                                  selectedPolygon.id === el.id ? (
                                    ""
                                  ) : (
                                    <>
                                      {scale === 2 &&
                                      selectedPolygon &&
                                      selectedPolygon.id === el.id ? (
                                        ""
                                      ) : (
                                        <>
                                          <rect
                                            x={centerX - 50}
                                            y={centerY - 15}
                                            width={150}
                                            height={65}
                                            rx={20}
                                            ry={20}
                                            fill="rgba(47, 47, 47, 0.7)"
                                            stroke="white"
                                            pointerEvents="all"
                                            cursor="pointer"
                                            zIndex={10}
                                            strokeWidth={1}
                                            onClick={() => {
                                              handlePolygonClick(el, scale);

                                              const polygon =
                                                document.getElementById(
                                                  `polygon-${el.id}`
                                                );
                                              if (polygon) {
                                                polygon.style.stroke =
                                                  el.strokborder;
                                                polygon.style.fill = el.color;
                                              }
                                            }}
                                          />
                                          <text
                                            x={centerX + 20}
                                            y={centerY + 20}
                                            textAnchor="middle"
                                            alignmentBaseline="middle"
                                            fill="white"
                                            fontSize="35"
                                            fontWeight={700}
                                            style={{
                                              pointerEvents: "none",
                                            }}
                                          >
                                            {/* {el.title} */}
                                            {getHouseNumber(
                                              el.apartmentNum,
                                              currentFloor,
                                              currentFloorData?.apartments
                                            )}
                                          </text>{" "}
                                        </>
                                      )}

                                      {selectedPolygon &&
                                        selectedPolygon.id === el.id && (
                                          <foreignObject
                                            x={centerX - 70}
                                            y={centerY + 60}
                                            width={700}
                                            height={500}
                                            sx={{
                                              zIndex: 100,
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "1rem",
                                                borderRadius: "10px",
                                                zIndex: 100,
                                              }}
                                              className="floorhoveredCard"
                                            >
                                              <Box
                                                sx={{
                                                  display: "flex",
                                                  gap: "1rem",
                                                  justifyContent:
                                                    "space-between",
                                                  width:
                                                    scale === 5
                                                      ? "300px"
                                                      : "700px",
                                                }}
                                              >
                                                <Button
                                                  sx={{
                                                    borderRadius: "9px",
                                                    background: "white",
                                                    color: "rgba(0, 0, 0, 1)",
                                                    textTransform: "capitalize",
                                                    width:
                                                      scale === 5
                                                        ? "fit-content"
                                                        : "250px",
                                                    pointerEvents: "all",
                                                    "&:hover": {
                                                      background: "white",
                                                    },

                                                    fontSize:
                                                      scale === 5
                                                        ? "15px"
                                                        : "30px",
                                                  }}
                                                  onClick={(e) => {
                                                    zoomToElement(e.target, 5);

                                                    const polygon =
                                                      document.getElementById(
                                                        `polygon-${el.id}`
                                                      );
                                                    if (polygon) {
                                                      // Check if scale === 3
                                                      if (scale === 2) {
                                                        polygon.style.display =
                                                          "none"; // Hide the polygon
                                                      } else {
                                                        // Reset or apply other styles if needed
                                                        polygon.style.stroke =
                                                          "none";
                                                        polygon.style.fill =
                                                          "none";
                                                        polygon.style.display =
                                                          ""; // Ensure it is visible for other scales
                                                      }
                                                    }
                                                  }}
                                                >
                                                  Explore Plan
                                                </Button>

                                                <Button
                                                  sx={{
                                                    borderRadius: "9px",
                                                    background:
                                                      "rgba(0, 0, 0, 1)",
                                                    color:
                                                      "rgba(217, 217, 217, 1)",
                                                    textTransform: "capitalize",
                                                    pointerEvents: "all",
                                                    width:
                                                      scale === 5
                                                        ? "fit-content"
                                                        : "250px",
                                                    "&:hover": {
                                                      background:
                                                        "rgba(0, 0, 0, 1)",
                                                    },
                                                    fontSize:
                                                      scale === 5
                                                        ? "15px"
                                                        : "30px",
                                                  }}
                                                  onClick={() =>
                                                    navigate(`/view360`, {
                                                      state: {
                                                        data: el,
                                                        currentFloor:
                                                          currentFloor,
                                                        wingType: wingType,
                                                      },
                                                    })
                                                  }
                                                >
                                                  Enter VR
                                                </Button>
                                              </Box>
                                              <Box
                                                sx={{
                                                  backgroundColor:
                                                    "rgba(0, 0, 0, 0.78)",
                                                  color: "white",
                                                  borderRadius: "10px",
                                                  textAlign: "center",
                                                  padding: "20px",
                                                  width:
                                                    scale === 5
                                                      ? "300px"
                                                      : "700px",

                                                  pointerEvents: "all",
                                                  height:
                                                    scale === 5
                                                      ? "fit-content"
                                                      : "350px",
                                                  display: "grid",
                                                  gap: "0.2rem",
                                                }}
                                              >
                                                <Typography
                                                  sx={{
                                                    textAlign: "left",
                                                    fontSize:
                                                      scale === 5
                                                        ? "20px"
                                                        : "40px",
                                                  }}
                                                >
                                                  UNIT{" "}
                                                  {getHouseNumber(
                                                    el.apartmentNum,
                                                    currentFloor,
                                                    currentFloorData?.apartments
                                                  )}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    textAlign: "left",
                                                    fontSize:
                                                      scale === 5
                                                        ? "20px"
                                                        : "40px",
                                                  }}
                                                >
                                                  {selectedPolygon?.title}
                                                </Typography>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    whiteSpace: "nowrap",
                                                    gap: "2rem",
                                                    justifyContent:
                                                      "space-between",
                                                    color:
                                                      "rgba(165, 165, 165, 1)",
                                                    "& p": {
                                                      fontSize:
                                                        scale === 5
                                                          ? "15px"
                                                          : "35px",
                                                    },
                                                  }}
                                                >
                                                  <Typography>
                                                    Suit Area
                                                  </Typography>
                                                  <Typography>
                                                    {el.saleable} Sq. Ft.
                                                  </Typography>
                                                </Box>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    whiteSpace: "nowrap",
                                                    gap: "2rem",
                                                    justifyContent:
                                                      "space-between",
                                                    color:
                                                      "rgba(165, 165, 165, 1)",
                                                    "& p": {
                                                      fontSize:
                                                        scale === 5
                                                          ? "15px"
                                                          : "35px",
                                                    },
                                                  }}
                                                >
                                                  <Typography>
                                                    Balcony Area
                                                  </Typography>
                                                  <Typography>
                                                    {el.balcony} Sq. Ft.
                                                  </Typography>
                                                </Box>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    whiteSpace: "nowrap",
                                                    gap: "2rem",
                                                    justifyContent:
                                                      "space-between",
                                                    color:
                                                      "rgba(165, 165, 165, 1)",
                                                    "& p": {
                                                      fontSize:
                                                        scale === 5
                                                          ? "15px"
                                                          : "35px",
                                                    },
                                                  }}
                                                >
                                                  <Typography>
                                                    Carpet Area
                                                  </Typography>
                                                  <Typography>
                                                    {el.carpet} Sq. Ft.
                                                  </Typography>
                                                </Box>
                                                {/* <Box
                                                  sx={{
                                                    display: "flex",
                                                    whiteSpace: "nowrap",
                                                    gap: "2rem",
                                                    justifyContent:
                                                      "space-between",
                                                    "& p": {
                                                      fontSize:
                                                        scale === 5
                                                          ? "15px"
                                                          : "35px",
                                                    },
                                                  }}
                                                >
                                                  <Typography>
                                                    Total Area
                                                  </Typography>
                                                  <Typography>
                                                    {total.toFixed(2)} {""}Sq.
                                                    Ft
                                                  </Typography>
                                                </Box> */}
                                              </Box>
                                            </Box>
                                          </foreignObject>
                                        )}
                                    </>
                                  )}
                                </>
                              )}
                            </g>
                          );
                        })}
                      </svg>
                    </Box>
                  </Box>
                </TransformComponent>
              </>
            );
          }}
        </TransformWrapper>
        {/* <Button
          onClick={
            // () => navigate("/view360")
            () => {
              navigate(`/view360`, {
                state: {
                  mapData: mapData,
                },
              });
            }
          }
        >
          360 Page
        </Button> */}
      </Box>
    </>
  );
}

const mainbox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${FloorBg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
  transition: "all 0.5s",
  position: "relative",
};

const imgcss = {
  objectFit: "contain",
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  // width: "auto",
  // height: {
  //   xl: "100vh",
  //   lg: "100vh",
  //   md: "60vh",
  //   sm: "60vh",
  //   xs: "60vh",
  // },
  // mx: "auto",
};

const svgcss = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
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
};

const LandmarkmainDivcss = {
  display: "flex",
  alignItems: "center",
  height: "100%",
};

const hoverespinLandmarkcss = (getScaledSize, landMark) => ({
  color: "white",
  fontSize: `${getScaledSize(8)}px`,
  fontWeight: "bold",
  fontFamily: "Segoeui",
  background: landMark.color,
  borderRadius: `${getScaledSize(16)}px`,
  padding: `${getScaledSize(4)}px ${getScaledSize(10)}px`,
  width: "fit-content",
  pointerEvents: "all",
});

const imgbgcss = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  padding: "0 0 0 0",
  zIndex: 0,
  overflow: {
    lg: "hidden",
    md: "hidden",
    sm: "scroll",
    xs: "scroll",
  },
};

const wrapperStylecss = {
  flex: 1,
  justifyContent: "start",
  alignItems: "start",
};

const mainboxs = (el) => ({
  transition: "all 0.5s",
  stroke: "white",
  pointerEvents: "all",
  cursor: "pointer",
  "&:hover": {
    fill: el.hoveredColor,
  },
});
