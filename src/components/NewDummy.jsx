import React, { useEffect, useRef, useState } from "react";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Sattvalumina from "../assets/Sattvalumina/Sattvaluminaimg.svg";
import RoycelOneBuilding from "../assets/roycelone/roycelonebuilding.png";
import SatvaHeader from "./Headers/SatvaHeader";
import DummyImage from "../assets/dummy-image.png";
import Dummy2 from "../assets/dummy-2.png";
import { Box, useMediaQuery, Typography, Button } from "@mui/material";
import Backimg from "../assets/Sattvalumina/backimg.svg";
import {
  Sattvaluminasubdata,
  Sattvaluminasubdatafloors,
} from "../utils/satvaluminadatavalues";
import "./WingDetail.css";
import ImageLoader from "./Loader/ImageLoader";
import { pageFlowData } from "../utils/pageFlowData";

import { DummyData, SubDummyData } from "../utils/royceoneDatavalues";

export default function NewDummy() {
  //   const { wing } = useParams();
  const wing = "royce";
  const location = useLocation();
  const mapData = location.state?.mapData;
  // console.log("zzzzzzzzzzzzx ", mapData);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scale, setScale] = useState(1);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [svgVisible, setSvgVisible] = useState(false);
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

  function getScaledSize(baseSize) {
    return baseSize / scale;
  }
  const WingData = pageFlowData.find((item) => item.wing === wing);
  const navigate = useNavigate();
  // console.log("Wing Details", wing, WingData.floorData);

  const floorsWithDistributions = WingData.floorData.map((item) => ({
    floor: item.floor,
  }));

  const floorNumbers = WingData.floorData.map((item) => item.floor);

  // console.log("PPPPPPPPP", floorNumbers);

  // console.log("LLLLLLLLLL", floorsWithDistributions);

  // const flattenedFilterValues = [
  //   ...new Set(Sattvaluminasubdata.flatMap((data) => data.filterType)),
  // ];

  const [flattenedFilterValues, setFlattenedFilterValues] = React.useState([]);
  const [mapfiltervalue, setMapFilterValue] = React.useState([
    ...WingData.apartMentTypes,
  ]);

  console.log("VVVVVVVVVVVVVVVVVVVVVVVV", mapfiltervalue);

  React.useEffect(() => {
    const mapData = location?.state?.mapData;
    if (mapData?.filterType) {
      const flattenedValues = mapData.filterType.flat();
      setFlattenedFilterValues(flattenedValues);
      setMapFilterValue(flattenedValues);
      localStorage.setItem("mapData", JSON.stringify(mapData));
    }
  }, [location?.state?.mapData]);

  const [activePin, setActivePin] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [view, setView] = useState("front");
  const imageToShow =
    view === "front" ? WingData?.frontImage : WingData?.backImage;

  const groupByParentId = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.parentId]) {
        acc[item.parentId] = [];
      }
      acc[item.parentId].push(item);
      return acc;
    }, {});
  };

  const wingType = mapData?.type;

  const filteredData = DummyData?.filter((landMark) => {
    if (mapfiltervalue.length === 0) {
      return false;
    }

    const typeMatch = mapfiltervalue.includes(landMark.filterType);

    // console.log("landmakr", landMark.isFront, "L", landMark.isBack);

    // console.log("Type Match: ", typeMatch);

    return typeMatch;
  });

  //   const groupedItems = groupByParentId(filteredData);
  const groupedItems = groupByParentId(filteredData);

  // const groupedItemsFloors = groupByParentId(
  //   Sattvaluminasubdatafloors.filter(
  //     (item) =>
  //       item.type === wingType &&
  //       (view === "front" ? item.isFront : item.isBack)
  //   )
  // );

  const filteredSubData = WingData.polygonsubdata?.filter((landMark) => {
    const wingname = "wing";

    const resultwing = `royce`;

    // console.log("result", resultwing);
    const wingTypeMatch = resultwing === landMark.type;

    if (view === "front" && !landMark.isFront) {
      return false; // Exclude items not mapped to the front
    }
    if (view === "back" && !landMark.isBack) {
      return false; // Exclude items not mapped to the back
    }

    return wingTypeMatch;
  });

  const groupedItemsFloors = groupByParentId(SubDummyData);

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".pin") &&
      !event.target.closest("foreignObject")
    ) {
      setActivePin(null);
    }
  };

  const [hoveredFloor, setHoveredFloor] = useState(null);

  const [currentParentId, setCurrentParentId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuCenterOffset, setMenuCenterOffset] = useState(0);

  const calculateCenterOffset = (floors, hoveredFloor) => {
    const hoveredIndex = floors.indexOf(hoveredFloor);
    const totalFloors = Math.min(floors.length, 5);
    const menuHeight = getScaledSize(36) * totalFloors;
    const hoveredFloorPosition = getScaledSize(36) * hoveredIndex;

    return hoveredFloorPosition - menuHeight / 2 + getScaledSize(16);
  };

  const getVisibleFloors = (hoveredFloor, allFloors) => {
    const index = allFloors.indexOf(hoveredFloor);
    const visibleFloors = [];

    // console.log("+++++++++++", allFloors);

    // Determine how many floors to show above and below the hovered floor
    let start = 0;
    let end = 0;

    if (index === -1) {
      start = 0;
      end = Math.min(0 + 4, allFloors.length - 1);
    }
    if (index === 0) {
      // If hovered floor is the first, show 4 floors below
      start = index;
      end = Math.min(index + 4, allFloors.length - 1);
    } else if (index === allFloors.length - 1) {
      // If hovered floor is the last, show 4 floors above
      start = Math.max(index - 4, 0);
      end = index;
    } else {
      // Normal case: show 2 floors above and 2 below
      start = Math.max(index - 2, 0);
      end = Math.min(index + 2, allFloors.length - 1);
    }

    // Fill the visible floors array
    for (let i = start; i <= end; i++) {
      visibleFloors.push(allFloors[i]);
    }

    //return visibleFloors;
    return visibleFloors.reverse();
  };

  const landmarkMouseEnter = (floor, parentId, cx, cy, floors) => {
    setHoveredFloor(floor);
    setCurrentParentId(parentId);

    const hoveredIndex = floors.indexOf(floor);

    const floorHeight = 26;

    const visibleFloors = getVisibleFloors(floor, floors);

    const visibleIndex = visibleFloors.indexOf(floor);

    const menuHeight = visibleFloors.length * floorHeight;
    const polygonCenterY = cy;

    const menuOffsetY =
      polygonCenterY - visibleIndex * floorHeight - menuHeight / 2;

    // console.log("hoveredIndex", hoveredIndex);

    const menuOffsetYMain =
      hoveredIndex === floors.length - 1
        ? menuOffsetY + 110
        : hoveredIndex === floors.length - 2
        ? menuOffsetY + 65
        : hoveredIndex === 0
        ? menuOffsetY + 10
        : hoveredIndex === 1
        ? menuOffsetY + 55
        : menuOffsetY + 100;

    setMenuPosition({ x: cx, y: menuOffsetYMain });
  };

  const landmarkMouseLeave = () => {
    setHoveredFloor(null);
  };

  const [Flooor, setFlooor] = useState();

  // console.log(Flooor, "heyFlooor");

  const handleNavigation = (floorId, floorImage, floorType) => {
    navigate(`/roycefloorplan`, {
      state: {
        mapData: mapData,
        filtersData: WingData.apartMentTypes,
        Flooor: floorId,
        FloorImage: floorImage,
        wingType: floorType,
      },
    });
  };
  const NumText = {
    winga: [
      {
        numText: "Road View",
        numSubText: "Kids Play Area, Party Lawn, Trellis Walkway, Outdoor Gym",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Garden View",
        numSubText:
          "Seating Plaza, Trellis Walkway, Outdoor Gym, Obstacle Park, Hammock Lawn",
        isBack: true,
        isFront: false,
      },
    ],
    wingb: [
      {
        numText: "Lake View",
        // numSubText: "Kids Play Area, Party Lawn, Trellis Walkway, Outdoor Gym",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Road View",
        numSubText: "Kids Play Area, Party Lawn, Trellis Walkway, Outdoor Gym",
        isBack: true,
        isFront: false,
      },
    ],
    wingc: [
      {
        numText: "Garden View",
        numSubText: "Walkway, Club House",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Lake View",
        numSubText:
          "Seating Plaza, Trellis Walkway, Outdoor Gym, Obstacle Park, Hammock Lawn",
        isBack: true,
        isFront: false,
      },
    ],
    wingd: [
      {
        numText: "Garden View",
        numSubText: "Nature Walkway",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Lake View",
        numSubText:
          "Trellis Walkway, Outdoor Gym, Hammock Lawn, Tennis Court, Volleyball Court",
        isBack: true,
        isFront: false,
      },
    ],
    winge: [
      {
        numText: "Garden View",
        // numSubText: "Nature Walkway",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Lake View",
        numSubText:
          "Giant Ludo, Nine Square, Outdoor Chess, Snakes & Ladders, Mini Golf",
        isBack: true,
        isFront: false,
      },
    ],
    wingf: [
      {
        numText: "Garden View",
        numSubText: "Volleyball Court, MultiPurpose Court",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Lake View",
        numSubText: "Cricket Nets, Kids Zip Line, Skating Rink",
        isBack: true,
        isFront: false,
      },
    ],
    wingg: [
      {
        numText: "Road View",
        numSubText: "Cricket Nets, Pet Park",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Amenities View",
        numSubText:
          "Kids Play Area, Outdoor Gym, MultiPurpose Court, Musical Garden, Working Pods",
        isBack: true,
        isFront: false,
      },
    ],
    wingh: [
      {
        numText: "Lake View",
        // numSubText: "Cricket Nets, Pet Park",
        isFront: true,
        isBack: false,
      },
      {
        numText: "Amenities View",
        numSubText: "Kids Play Area, Outdoor Gym",
        isBack: true,
        isFront: false,
      },
    ],
  };

  const handleViewChange = (newView) => {
    setImageLoaded(false);
    setSvgVisible(false);

    setView(newView);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);

    setTimeout(() => {
      setSvgVisible(true);
    }, 200);
  };
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      // window.scrollTo(370, 300);
      scrollContainerRef.current.scrollLeft = 600; // Set default scroll position to left
      // window.scrollTo({ right: 500, behavior: "smooth" });
    }
  }, [scrollContainerRef.current]);
  return (
    <>
      <ImageLoader imageLoaded={imageLoaded} />

      <div
        style={{
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
          }}
        >
          <SatvaHeader
            setMapFilterValue={setMapFilterValue}
            mapfiltervalue={mapfiltervalue}
            flattenedFilterValues={flattenedFilterValues}
            activePin={activePin}
            setOpen={setOpen}
            open={open}
            filtersData={WingData.apartMentTypes}
            selectedName={selectedName}
            setSelectedName={setSelectedName}
          />
        </Box>

        <Box
          sx={imgbgcss(RoycelOneBuilding)}
          className="main-container"
          onClick={handleOutsideClick}
          ref={scrollContainerRef}
        >
          <Box className="image-map-container">
            <Box
              // onLoad={() => {
              //   setImageLoaded(true);
              // }}
              onLoad={handleImageLoad}
              component={"img"}
              src={Dummy2}
              alt="Image Map"
              className="image-map"
              sx={imgcss}
            />
            {imageLoaded && (
              <svg
                className="svg-overlay"
                viewBox="0 0 1472 720"
                preserveAspectRatio="xMidYMid slice"
                style={svgcss(svgVisible)}
              >
                {/* Render polygons for groupedItems first */}
                {Object.keys(groupedItems).map((parentId) => {
                  const group = groupedItems[parentId];
                  return (
                    <g key={parentId}>
                      {group.map((item, index) => {
                        const [cx, cy] = item.points.split(",").map(Number);

                        return (
                          <polygon
                            key={index}
                            points={item.points}
                            style={polycss(
                              hoveredItem === item,
                              item,
                              mapfiltervalue
                            )}
                            // onClick={(e) => {
                            //   e.preventDefault();
                            //   handleNavigation();
                            // }}
                          />
                        );
                      })}
                    </g>
                  );
                })}

                {/* Render polygons for groupedItemsFloors */}
                {Object.keys(groupedItemsFloors).map((parentId) => {
                  const group = groupedItemsFloors[parentId];
                  const groupdata = groupedItems[parentId];

                  return (
                    <g key={parentId}>
                      {group.map((item, index) => {
                        const [cx, cy] = item.points.split(",").map(Number);
                        const parentidfloors =
                          groupdata && groupdata[item.parentid - 1];

                        return (
                          <polygon
                            key={index}
                            points={item.points}
                            style={polycssforfloors(
                              hoveredFloor === item.floor,
                              item,
                              mapfiltervalue,
                              parentidfloors?.strokborder,
                              parentidfloors?.hoveredcolor
                            )}
                            onClick={(e) => {
                              if (groupdata && parentidfloors) {
                                e.preventDefault();
                                setFlooor(item.floor);
                                handleNavigation(
                                  item.floor,
                                  item.floorplanimg,
                                  item.type
                                );
                              }
                            }}
                            onMouseEnter={() => {
                              if (groupdata && parentidfloors) {
                                landmarkMouseEnter(
                                  item.floor,
                                  item.parentid,
                                  cx,
                                  cy,
                                  parentidfloors.floors
                                );
                              }
                            }}
                            onMouseLeave={landmarkMouseLeave}
                          />
                        );
                      })}
                    </g>
                  );
                })}

                {/* Render foreignObjects for groupedItems on top of all polygons */}
                {Object.keys(groupedItems).map((parentId) => {
                  const group = groupedItems[parentId];
                  return (
                    <g key={parentId}>
                      {group.map((item, index) => {
                        // console.log(item, "item");
                        const [cx, cy] = item.points.split(",").map(Number);
                        return (
                          <foreignObject
                            key={index}
                            x={cx + getScaledSize(750)}
                            y={
                              hoveredFloor
                                ? menuPosition.y - 40
                                : cy + getScaledSize(120)
                            }
                            width={
                              item.polygonone
                                ? getScaledSize(170)
                                : getScaledSize(250)
                            }
                            height={getScaledSize(500)}
                            style={{
                              ...Landmarkforeignobjectcss,
                              opacity: 1,
                              zIndex: 10,
                            }}
                            onMouseEnter={() => {
                              setFlooor(item);
                            }}
                          >
                            <div
                              style={{
                                ...LandmarkmainDivcss,
                                animation:
                                  "slideInFromRight 0.2s ease-out forwards",
                                flexDirection: "column",
                                gap: "1rem",
                                transform: `translateY(${menuCenterOffset}px)`,
                              }}
                            >
                              {/* {hoveredFloor && currentParentId === item.id
                              ? getVisibleFloors(
                                  hoveredFloor,
                                  floorNumbers
                                ).map((number) => (
                                  <Box
                                    key={number}
                                    className={`box ${
                                      hoveredFloor === number &&
                                      currentParentId === item.id
                                        ? "box-with-arrow"
                                        : ""
                                    }`}
                                    sx={{
                                      "::before": {
                                        borderRightColor:
                                          hoveredFloor === number &&
                                          currentParentId === item.id
                                            ? item.strokborder
                                            : "rgba(0, 0, 0, 1)",
                                      },
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...hoverespinLandmarkcss(
                                          getScaledSize,
                                          item
                                        ),
                                        backgroundColor:
                                          hoveredFloor === number &&
                                          currentParentId === item.id
                                            ? item.strokborder
                                            : "rgba(0, 0, 0, 1)",
                                        pointerEvents: "all",
                                      }}
                                      onClick={() => {
                                        handleNavigation(item.floor);
                                      }}
                                    >
                                      {number}
                                    </Typography>
                                  </Box>
                                ))
                              : null} */}
                            </div>
                          </foreignObject>
                        );
                      })}
                    </g>
                  );
                })}

                {/* Render foreignObjects for groupedItemsFloors on top of all polygons */}
                {Object.keys(groupedItemsFloors).map((parentId) => {
                  const group = groupedItemsFloors[parentId];
                  const groupdata = groupedItems[parentId];

                  return (
                    <g key={parentId}>
                      {group.map((item, index) => {
                        const [cx, cy] = item.points.split(",").map(Number);
                        const parentidfloors =
                          groupdata && groupdata[item.parentid - 1];

                        const parentIsNear =
                          parentidfloors && parentidfloors.type === item.type
                            ? parentidfloors?.isNear
                            : false;

                        // console.log("1111", parentidfloors?.isNear);

                        // console.log("000000000", item?.type === "wingb");
                        const numEle = NumText[item?.type]?.find(
                          (el) => el?.isFront === item?.isFront
                        );
                        // .find(
                        //   (el) =>
                        //     item.isFront === el.isFront ||
                        //     item.isBack === el.isBack
                        // );
                        // console.log("numEle", numEle);
                        return (
                          hoveredFloor === item.floor && (
                            <>
                              <foreignObject
                                key={index}
                                // x={
                                //   item.isNear === true
                                //     ? cx + getScaledSize(600)
                                //     : cx + getScaledSize(800)
                                // }
                                x={
                                  // cx + getScaledSize(parentIsNear) ||
                                  cx - getScaledSize(180)
                                }
                                y={
                                  hoveredFloor >= 0
                                    ? menuPosition.y - 80
                                    : cy + getScaledSize(120)
                                }
                                width={
                                  item.polygonone
                                    ? getScaledSize(170)
                                    : getScaledSize(250)
                                }
                                height={getScaledSize(500)}
                                style={{
                                  ...Landmarkforeignobjectcss,
                                  opacity: 1,
                                  zIndex: 10,
                                }}
                                onMouseEnter={() => {
                                  setFlooor(item);
                                }}
                              >
                                <div
                                  style={{
                                    ...LandmarkmainDivcss,
                                    animation:
                                      "slideInFromRight 0.2s ease-out forwards",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    transform: `translateY(${menuCenterOffset}px)`,
                                  }}
                                >
                                  {hoveredFloor >= 0
                                    ? getVisibleFloors(
                                        hoveredFloor,
                                        floorNumbers
                                      ).map((number) => (
                                        <Box
                                          key={number}
                                          className={`box ${
                                            hoveredFloor === number
                                              ? "box-with-arrow"
                                              : ""
                                          }`}
                                          sx={{
                                            "::before": {
                                              borderLeftColor:
                                                hoveredFloor === number
                                                  ? "#E2BE74"
                                                  : "rgba(0, 0, 0, 0.7)",
                                            },
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              ...hoverespinLandmarkcss(
                                                getScaledSize,
                                                item
                                              ),
                                              backgroundColor:
                                                hoveredFloor === number
                                                  ? "#E2BE74"
                                                  : "rgba(0, 0, 0, 0.7)",
                                              color:
                                                hoveredFloor === number
                                                  ? "rgba(0, 0, 0, 0.7)"
                                                  : "#E2BE74",
                                              pointerEvents: "all",
                                            }}
                                            onClick={() => {
                                              handleNavigation(
                                                item.floor,
                                                item.floorplanimg,
                                                item.type
                                              );
                                            }}
                                          >
                                            {number}
                                          </Typography>
                                        </Box>
                                      ))
                                    : null}
                                </div>
                              </foreignObject>
                              <foreignObject
                                key={index}
                                x={cx - getScaledSize(230)}
                                y={menuPosition.y - 100}
                                width={125}
                                height={50}
                                style={{
                                  overflow: "visible",
                                  zIndex: 10,
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#2B2B2B",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    color: "white",
                                    position: "relative",
                                    zIndex: 7,
                                    pointerEvents: "all",
                                    marginTop: "90px",
                                    // display: "grid",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "0.5rem",
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      left: "-10px",
                                      top: "50%",
                                    }}
                                  />

                                  <Typography
                                    variant="body2"
                                    sx={{ fontSize: "11px" }}
                                  >
                                    2 Units Total
                                  </Typography>
                                  <Button
                                    sx={{
                                      background: "#E2BE74",
                                      color: "black",
                                      width: "100%",
                                      borderRadius: "10px",
                                      fontSize: "10px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Explore
                                  </Button>
                                </div>
                              </foreignObject>
                            </>
                          )
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            )}
          </Box>
        </Box>

        {/* <Box
        component={"img"}
        src={imageToShow}
        alt={`${wing} Map`}
        className="image-map"
        sx={imgcss(view)}
      /> */}
      </div>
    </>
  );
}

const imgcss = (view) => ({
  objectFit: "cover",
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  WebkitTransform: view === "front" && "scaleX(-1)",
  transform: view === "front" && "scaleX(-1)",
  //  opacity: imageLoaded ? 1 : 0,
  //  transition: "opacity 0.5s ease-in-out",
});

const imgbgcss = (RoycelOneBuilding) => ({
  position: "relative",
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${RoycelOneBuilding})`,
  padding: "0 0 0 0",
  zIndex: 0,
  overflow: {
    lg: "hidden",
    md: "hidden",
    sm: "scroll",
    xs: "scroll",
  },
});

const svgcss = (svgVisible) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: svgVisible ? 1 : 0,
  transition: "opacity 0.5s ease-in-out",
});

const polycss = (isHovered, item, mapfiltervalue) => ({
  opacity: isHovered ? 0.9 : 0.8,
  fill: isHovered ? "rgba(255, 255, 255, 0)" : item.color,
  stroke: item?.strokborder || "black", // Fallback for stroke
  strokeWidth: "2.5",
  pointerEvents: "all",
  cursor: "pointer",
  // transition: "opacity 0.3s ease, fill 0.3s ease, stroke 0.3s ease",
});

const polycssforfloors = (
  isHovered,
  item,
  mapfiltervalue,
  strokeborderparent,
  parentcolor
) => ({
  opacity: isHovered ? 0.9 : 0.8,
  fill: isHovered ? "rgba(214, 192, 162, 0.6)" : "rgba(255, 255, 255, 0)",
  stroke: strokeborderparent,
  strokeWidth: "0.2",
  pointerEvents: "all",
  cursor: isHovered ? "pointer" : "auto",
  transition: "opacity 0.3s ease, fill 0.3s ease, stroke 0.3s ease",
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

const hoverespinLandmarkcss = (getScaledSize, item) => ({
  color: "white",
  fontSize: `17px`,
  fontWeight: "bold",
  fontFamily: "Segoeui",
  background: item.color,
  borderRadius: `${getScaledSize(8)}px`,
  padding: `${getScaledSize(2)}px ${getScaledSize(11)}px`,
  width: "fit-content",
});
