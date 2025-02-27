import React, { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";
import SatvaHeader from "./Headers/SatvaHeader";
import valley from "../assets/Sattvalumina/sattvalumina-new.svg";
import {
  bluevalleymapdata,
  Sattvaluminadata,
  Sattvaluminalandmark,
  sattvadataaminites,
} from "../utils/bluevalleydata.js";
import Loader from "./Loader/loader.jsx";
import { useNavigate } from "react-router-dom";
import ImageLoader from "./Loader/ImageLoader.jsx";

export default function Sattvalumina() {
  const [selectedName, setSelectedName] = useState([
    // "Snooker Rooms",
    // "Indoor Games",
    // "Lawn",
    // "Cricket Practice",
    // "Lawn",
    // "Pool",
    // "Water Feature",
    // "Water Garden",
    // "Gym",
    // "Bedminton court",
    // "Indoor Games",
    // "Play Area",
    // "Gaming Room",
  ]);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [mapfiltervalue, setMapFilterValue] = React.useState([
    "3BHK + 2T - Type 2",
    "2BHK + 2T - Type 3",
    "2BHK + 2T - Type 2",
    "3BHK + 2T - Type 3",
    "1BHK + 1T - Type 1",
    "1BHK + 1T - Type 2",
    "2BHK + 2T - Type 1",
    "3BHK + 2T - Type 1",
    "3BHK + 3T - Type 1",
    "3BHK + 3T - Type 2",
    "3BHK + 3T - Type 3",
    "2BHK + 2T - Type 4",
    "Studio Apartment",
  ]);

  const unitsPerFilterType = {
    "3BHK + 2T - Type 2": 31, //c      30
    "2BHK + 2T - Type 3": 30, // c
    "2BHK + 2T - Type 2": 30, // c
    "3BHK + 2T - Type 3": 30, // c
    "1BHK + 1T - Type 1": 272,
    "1BHK + 1T - Type 2": 1,
    "2BHK + 2T - Type 1": 30, //
    "3BHK + 2T - Type 1": 31, //
    "3BHK + 3T - Type 1": 31, //     30
    "3BHK + 3T - Type 2": 30, //
    "3BHK + 3T - Type 3": 28, //
    "2BHK + 2T - Type 4": 2, //
    "Studio Apartment": 216,
  };
  const [hoveredNameTag, setHoveredNameTag] = useState(null);
  const unitsPerFilterTypeC = {
    "3BHK + 2T - Type 2": 30, //c      30
    "2BHK + 2T - Type 3": 30, // c
    "2BHK + 2T - Type 2": 30, // c
    "3BHK + 2T - Type 3": 30, // c
    "1BHK + 1T - Type 1": 272,
    "1BHK + 1T - Type 2": 1,
    "2BHK + 2T - Type 1": 30, //
    "3BHK + 2T - Type 1": 31, //
    "3BHK + 3T - Type 1": 30, //     30
    "3BHK + 3T - Type 2": 30, //
    "3BHK + 3T - Type 3": 28, //
    "2BHK + 2T - Type 4": 2, //
    "Studio Apartment": 216,
  };

  const calculateUnitsForWing = (wing) => {
    let totalUnits = 0;

    if (wing.type === "wingc") {
      mapfiltervalue.forEach((activeFilter) => {
        if (wing.filterType.includes(activeFilter)) {
          totalUnits += unitsPerFilterTypeC[activeFilter] || 0;
        }
      });
    } else {
      mapfiltervalue.forEach((activeFilter) => {
        if (wing.filterType.includes(activeFilter)) {
          totalUnits += unitsPerFilterType[activeFilter] || 0;
        }
      });
    }

    return totalUnits;
  };

  const [activePin, setActivePin] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [activeLandMark, setActiveLandMark] = useState(null);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [scale, setScale] = useState(1);

  const [pricerange, setPriceRange] = useState([3970, 10860]);
  const [boxpricesqyard, setBoxPriceSqyard] = useState([6500, 9500]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  function getScaledSize(baseSize) {
    return baseSize / scale;
  }
  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".pin") &&
      !event.target.closest("foreignObject")
    ) {
      setActivePin(null);
    }
  };

  const filteredLagoon = Sattvaluminadata?.filter((landMark) => {
    if (mapfiltervalue.length === 0) {
      return false;
    }

    const typeMatch = mapfiltervalue.some((filterType) =>
      landMark?.filterType?.includes(filterType)
    );

    console.log("Type Match: ", typeMatch);

    const priceMatch =
      landMark.area >= pricerange[0] && landMark.area <= pricerange[1];

    return typeMatch && priceMatch;
  });

  const groupByParentId = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.parentId]) {
        acc[item.parentId] = [];
      }
      acc[item.parentId].push(item);
      return acc;
    }, {});
  };

  const groupedItems = groupByParentId(filteredLagoon);

  const navigate = useNavigate();

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleMouseMove = (event) => {
    if (hoveredItem) {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  function handleNavigation(navigate, item) {
    const wingName = item.type;
    const simplifiedWingName = wingName.replace("wing", "");

    navigate(`/sattvalumina/${simplifiedWingName}`, {
      state: {
        mapData: item,
      },
    });
  }

  const landmarkmouseenter = (id) => {
    setHoveredPinLandMark(id);
  };

  const landmarkleavemouse = () => {
    setHoveredPinLandMark(null);
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

  const formatType = (type) => {
    let formattedType = type
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, " ")
      .trim();

    if (formattedType.startsWith("WING") && formattedType.length > 4) {
      formattedType = "WING  " + formattedType.slice(4).trim();
    }

    return formattedType;
  };

  const handleIconClick = (landMark) => {
    const { icon, ...remainingPinData } = landMark;
    if (landMark?.route) {
      navigate("/clubimage");
    } else {
      if (landMark.img) {
        navigate("/image", { state: { landMark: remainingPinData } });
      } else {
        return;
      }
    }
  };
  const handleIconClickclub = (el) => {
    if (el.isnav) {
      const { icon, ...remainingPinData } = el;
      navigate(el.isnav, { state: { el: remainingPinData } });
    }
  };

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      // window.scrollTo(370, 300);
      scrollContainerRef.current.scrollLeft = 500; // Set default scroll position to left
      // window.scrollTo({ right: 500, behavior: "smooth" });
    }
  }, [scrollContainerRef.current]);
  return (
    <>
      <ImageLoader imageLoaded={imageLoaded} />

      <Box
        sx={{
          position: "absolute",
        }}
      >
        <SatvaHeader
          setMapFilterValue={setMapFilterValue}
          mapfiltervalue={mapfiltervalue}
          activePin={activePin}
          pricerange={pricerange}
          setPriceRange={setPriceRange}
          setBoxPriceSqyard={setBoxPriceSqyard}
          boxpricesqyard={boxpricesqyard}
          setOpen={setOpen}
          open={open}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />
      </Box>
      <Box
        sx={imgbgcss}
        className="main-container"
        onClick={handleOutsideClick}
        onMouseMove={handleMouseMove}
        ref={scrollContainerRef}
      >
        <Box className="image-map-container">
          <Box
            onLoad={() => {
              setImageLoaded(true);

              // window.scrollTo({ top: 200, behavior: "instant" });
            }}
            component={"img"}
            src={valley}
            alt="Image Map"
            className="image-map"
            sx={imgcss}
          />

          <svg
            className="svg-overlay"
            viewBox="0 0 1920 925"
            preserveAspectRatio="xMidYMid slice"
            style={svgcss}
          >
            <g
              transform={`translate(${430}, ${890})`}
              fill="rgba(47, 47, 47, 0.7)"
            >
              {" "}
              <polygon
                points="0,0 -10,-13 10,-13"
                // fill="#333"
                fill="rgba(47, 47, 47, 0.7)"
                // filter="url(#blur-filter)"
                stroke="#fff"
                strokeWidth="2"
                transform="translate(0, -5)"
                style={{
                  border: "2px solid #fff",
                }}
              />
              <foreignObject
                x={-50}
                y={-50}
                width={100}
                height={80}
                // fill="rgba(47, 47, 47, 0.7)"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(47, 47, 47, 0.7)",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "8px 4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "2px solid #fff",
                  }}
                >
                  Entrance
                </div>
              </foreignObject>
            </g>
            <defs>
              {/* Define the blur filter */}
              <filter
                id="blur-filter"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
              </filter>
            </defs>

            {sattvadataaminites?.map((el) => {
              const centerPoint = getPolygonCenterPoint(el.points);
              return (
                <g key={el.id}>
                  <Box
                    component={"polygon"}
                    points={el?.points}
                    title={el.title}
                    sx={{
                      ...mainbox(el),
                      fill: el.color,
                      strokeWidth: el.scalePass ? 1 : 3,
                      opacity:
                        hoveredNameTag && hoveredNameTag !== el.id ? 0.7 : 1,
                      stroke: el.borderStrokeColor,
                      cursor: el.isnav ? "pointer" : "default", // Set cursor conditionally
                    }}
                    onClick={() => handleIconClickclub(el)}
                  />
                </g>
              );
            })}

            {Object.keys(groupedItems).map((parentId) => {
              const group = groupedItems[parentId];
              return (
                <g key={parentId}>
                  {group.map((item, index) => {
                    const pointsArray = item.points
                      .split(" ")
                      .map((point) => point.split(",").map(Number));

                    const minY = Math.min(...pointsArray.map(([_, y]) => y));
                    const centroidX =
                      pointsArray.reduce((sum, [x]) => sum + x, 0) /
                      pointsArray.length;

                    const predefinedOffsets = {
                      winga: { x: 100, y: -10 },
                      wingb: { x: 40, y: -60 },
                      wingc: { x: 40, y: -60 },
                      wingd: { x: 10, y: -40 },
                      winge: { x: 10, y: -60 },
                      wingf: { x: 65, y: -80 },
                      wingh: { x: 65, y: -20 },
                      wingg: { x: 70, y: -70 },
                    };

                    const { x: offsetX, y: offsetY } = predefinedOffsets[
                      item.type
                    ] || { x: 0, y: 0 };

                    const finalX = centroidX + offsetX;
                    const finalY = minY + offsetY;

                    return (
                      <React.Fragment key={index}>
                        <polygon
                          points={item.points}
                          style={polycss(
                            hoveredItem === item,
                            item,
                            mapfiltervalue
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigation(navigate, item);
                          }}
                          onMouseEnter={(e) => handleMouseEnter(item, e)}
                          onMouseLeave={handleMouseLeave}
                        />

                        <g transform={`translate(${finalX}, ${finalY})`}>
                          <rect
                            x={-55}
                            y={0}
                            width={110}
                            height={50}
                            rx={10}
                            ry={10}
                            fill="rgba(47, 47, 47, 0.5)"
                            stroke="white"
                            strokeWidth={2}
                          />
                          <polygon
                            points="-10,50 10,50 0,65"
                            fill="rgba(47, 47, 47, 0.5)"
                            stroke="white"
                            strokeWidth={2}
                          />

                          <text
                            x={0}
                            y={20}
                            fill="#ffffff"
                            fontSize="12"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {formatType(item.type || "WING")}
                          </text>

                          <text
                            x={0}
                            y={35}
                            fill="#ffffff"
                            fontSize="10"
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            {calculateUnitsForWing(item)} Units
                          </text>
                        </g>
                      </React.Fragment>
                    );
                  })}
                </g>
              );
            })}

            {Sattvaluminalandmark
              // .filter((landMark) => {
              //   if (selectedName.length === 0) {
              //     return false;
              //   } else {
              //     return selectedName.includes(landMark.type);
              //   }
              // })
              .map((landMark) => {
                const [cx, cy] = landMark.points.split(",").map(Number);

                return (
                  <g
                    key={landMark.id}
                    style={LandmarkMapcssg}
                    onMouseEnter={() => landmarkmouseenter(landMark.id)}
                    onMouseLeave={() => landmarkleavemouse()}
                  >
                    <Box
                      component={"circle"}
                      cx={cx}
                      cy={cy}
                      r={
                        activeLandMark === landMark.id ||
                        hoveredPinLandMark === landMark.id
                          ? getScaledSize(11)
                          : getScaledSize(11)
                      }
                      fill={landMark.color}
                      title={landMark.title}
                      sx={{
                        "&:hover": {
                          r: getScaledSize(11),
                        },
                        transition: "all 0.2s",
                      }}
                    />
                    <image
                      onClick={() => handleIconClick(landMark)}
                      xlinkHref={`${landMark.image}`}
                      x={cx - getScaledSize(10)}
                      y={cy - getScaledSize(10)}
                      width={getScaledSize(20)}
                      height={getScaledSize(20)}
                      style={{ pointerEvents: "all" }}
                    />
                    {/* {(activeLandMark === landMark.id ||
                      hoveredPinLandMark === landMark.id) && ( */}
                    {(hoveredPinLandMark === landMark.id ||
                      selectedName.includes(landMark.type)) && (
                      <>
                        <foreignObject
                          x={cx + getScaledSize(15)}
                          y={cy - getScaledSize(50)} // Adjust y to center the foreignObject
                          width={getScaledSize(150)}
                          height={getScaledSize(100)}
                          style={{
                            ...Landmarkforeignobjectcss,
                            opacity:
                              // activeLandMark === landMark.id ||
                              // hoveredPinLandMark === landMark.id
                              1,
                            // backgroundColor: "red",
                            // : 0.3,
                          }}
                        >
                          <div
                            style={{
                              ...LandmarkmainDivcss,
                              animation:
                                hoveredPinLandMark === landMark.id &&
                                !selectedName.includes(landMark.type)
                                  ? "slideInFromRight 0.2s ease-out forwards"
                                  : "none",
                            }}
                          >
                            {/* {hoveredPinLandMark === landMark.id ? ( */}
                            <Typography
                              sx={hoverespinLandmarkcss(
                                getScaledSize,
                                landMark
                              )}
                              onClick={() => handleIconClick(landMark)}
                            >
                              {landMark.name}
                            </Typography>
                            {/* ) : (
                            ""
                          )} */}
                          </div>
                        </foreignObject>
                      </>
                    )}

                    {/* )} */}
                  </g>
                );
              })}
          </svg>
        </Box>

        {/* 
        {hoveredItem && hoveredItem.type !== "garden" && (
          <Box
            sx={{
              position: "fixed",
              top: tooltipPosition.y + 10,
              left: tooltipPosition.x + 10,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              pointerEvents: "none",
              zIndex: 1000,
            }}
          >
            {formatType(hoveredItem.type || "WING D")}
          </Box>
        )} */}
      </Box>
    </>
  );
}

const imgcss = {
  objectFit: "cover",
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
};

const imgbgcss = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${valley})`,
  padding: "0 0 0 0",
  zIndex: 0,
  overflow: {
    lg: "hidden",
    md: "hidden",
    sm: "scroll",
    xs: "scroll",
  },
};

const svgcss = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

{
  /* 
  const polycss = (isHovered, item, mapfiltervalue) => ({
  opacity: isHovered ? 0.7 : 0.4,
  fill: isHovered
    ? "rgba(255, 255, 255, 0)"
    : mapfiltervalue.length === 1 &&
      mapfiltervalue.includes("garden") &&
      item.isGardenAround
    ? "yellow"
    : item.color,
  stroke: item?.strokborder || "black", // Fallback for stroke
  strokeWidth: "2.5",
  pointerEvents: "all",
  cursor: "pointer",
  transition: "opacity 0.3s ease, fill 0.3s ease, stroke 0.3s ease",
});
  */
}

const polycss = (isHovered, item, mapfiltervalue) => ({
  fill: isHovered ? item?.hovercolor : item.color,
  stroke: item?.strokborder || "black",
  strokeWidth: "2.5",
  pointerEvents: "all",
  cursor: "pointer",
  transition: "opacity 0.3s ease, fill 0.2s ease",
});

const LandmarkMapcssg = {
  cursor: "pointer",
  pointerEvents: "all",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.5s",
};

const LandmarkmainDivcss = {
  display: "flex",
  alignItems: "center",
  height: "100%",
};

const Landmarkforeignobjectcss = {
  transition: "all 0.5s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
const mainbox = (el) => ({
  transition: "all 0.5s",
  stroke: "white",
  pointerEvents: "all",
  cursor: el.isnav ? "pointer" : "default",
  "&:hover": {
    fill: el.hoveredColor,
  },
});
