import React from "react";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Tooltip,
  ThemeProvider,
  createTheme,
  Grid,
} from "@mui/material";
import { amenitiesData } from "../../utils/royceloneamenities.js";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import landmark from "../../assets/Filtericon/landmark.svg";
import retail from "../../assets/Filtericon/retail.svg";
import education from "../../assets/Filtericon/education.svg";
import hotels from "../../assets/Filtericon/hotels.svg";
import religious from "../../assets/Filtericon/religious.svg";
import fuel from "../../assets/Filtericon/fuel.svg";
import Health from "../../assets/Filtericon/Health.png";
import { lighten } from "@mui/system";
import Zoom from "@mui/material/Zoom";

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "white", // Text color
          fontSize: "14px", // Example: Adjust font size
        },
      },
    },
  },
});

function MapFilters({
  setMapFilterValue,
  mapfiltervalue,
  mapfilterstyled,
  pinPointsVisible,
  flattenedFilterValues,
  filteroneData,
  filtersfloorData,
  defaultFloor,
  roycedata,
  selectedName,
}) {
  const handleMapFilterChange = (filterType) => {
    setMapFilterValue((prev) =>
      prev.includes(filterType)
        ? prev.filter((item) => item !== filterType)
        : [...prev, filterType]
    );
  };

  const location = useLocation();

  const Location = location.pathname;

  // console.log(filtersfloorData, "filtersfloorData");

  const typeColors = {
    "1BHK + 1T - Type 1": "rgba(161, 185, 68, 1)",
    "1BHK + 1T - Type 2": "rgba(126, 200, 124, 1)",
    "2BHK + 2T - Type 1": "rgba(76, 208, 169, 1)",
    "2BHK + 2T - Type 2": "rgba(0, 206, 201, 1)",
    "2BHK + 2T - Type 3": "rgba(118, 175, 242, 1)",
    "2BHK + 2T - Type 4": "rgba(145, 119, 250, 1)",
    "3BHK + 2T - Type 3": "rgba(145, 119, 250, 1)",
    "3BHK + 2T - Type 1": "rgba(120, 97, 213, 1)",
    "3BHK + 2T - Type 2": "rgba(250, 119, 174, 1)",
    "3BHK + 3T - Type 1": "rgba(225, 110, 235, 1)",
    "3BHK + 3T - Type 2": "rgba(228, 105, 36, 1)",
    "3BHK + 3T - Type 3": "rgba(223, 194, 34, 1)",
    "Studio Apartment": "rgba(225, 174, 73, 1)",
  };

  return (
    <>
      <Box
        sx={{
          display: mapfilterstyled?.display,
          gap: mapfilterstyled?.gap,
          pointerEvents: "all",
          flexDirection: mapfilterstyled?.flexDirection,
          // justifyContent: "center",
          "& button": {
            textTransform: "capitalize",
            height: "fit-content",
            borderRadius: mapfilterstyled?.borderRadius,
            gap: "0.5rem",
            cursor: "pointer",
            width: mapfilterstyled?.width,
            display: "flex",
            justifyContent: "space-between",
            padding: mapfilterstyled?.padding || "3px 10px",
            ...textStyle(Location),
          },

          "& div:nth-child(1)": {
            borderRadius: mapfilterstyled?.borderRadiusForButton1,
            ...textStyle(Location),
          },
          "& div:last-child": {
            borderRadius: mapfilterstyled?.borderRadiusForButton3,
            ...textStyle(Location),
          },
          "& p": {
            fontSize: "12px",
            fontWeight: 500,
            fontFamily: mapfilterstyled?.fontFamily,
            ...textStyle(Location),
          },
        }}
      >
        {location.pathname.startsWith("/sattvalumina/") ||
        location.pathname === "/floorplan" ? (
          <>
            {location.pathname.startsWith("/sattvalumina/") ? (
              <>
                {filteroneData?.map((filterType, index) => {
                  // Extract a property from the object or convert it to a string
                  const displayText = filterType?.type;
                  const faceText = filterType?.face;
                  const backgroundColor =
                    typeColors[displayText] || mapfilterstyled.btnbg;

                  return (
                    <motion.div
                      key={displayText}
                      animate={{
                        filter: !mapfiltervalue.includes(displayText)
                          ? "grayscale(1)"
                          : "grayscale(0)",
                        backgroundColor: mapfiltervalue.includes(displayText)
                          ? backgroundColor
                          : mapfilterstyled.btnbg,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <ThemeProvider theme={theme}>
                        <Tooltip title={faceText} arrow placement="right-start">
                          <Button
                            onClick={() => handleMapFilterChange(displayText)}
                            sx={{
                              color: mapfiltervalue.includes(displayText)
                                ? "white"
                                : "#bdbdbd",
                              "&:hover": {
                                color: "white",
                                background: mapfiltervalue.includes(displayText)
                                  ? lighten(backgroundColor, 0.2)
                                  : "#616161",
                                borderRadius:
                                  index === 0
                                    ? mapfilterstyled.borderRadiusForButton1
                                    : index === filteroneData?.length - 1 || 0
                                    ? mapfilterstyled.borderRadiusForButton3
                                    : undefined,
                              },
                              ...textStyle(Location),
                            }}
                            disabled={
                              !pinPointsVisible && location?.pathname !== "/"
                            }
                          >
                            <Typography sx={textStyle(Location)}>
                              {displayText}
                            </Typography>
                          </Button>
                        </Tooltip>
                      </ThemeProvider>
                    </motion.div>
                  );
                })}
              </>
            ) : (
              <>
                {filtersfloorData?.map((filterType, index) => {
                  // Extract a property from the object or convert it to a string
                  const displayText = filterType?.type;
                  const faceText = filterType?.face;
                  const backgroundColor =
                    typeColors[displayText] || mapfilterstyled.btnbg;

                  return (
                    <motion.div
                      key={displayText}
                      animate={{
                        filter: !mapfiltervalue.includes(displayText)
                          ? "grayscale(1)"
                          : "grayscale(0)",
                        backgroundColor: mapfiltervalue.includes(displayText)
                          ? backgroundColor
                          : mapfilterstyled.btnbg,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {/* <Tooltip title={faceText} arrow placement="right-start"> */}
                      <Button
                        onClick={() => handleMapFilterChange(displayText)}
                        sx={{
                          color: mapfiltervalue.includes(displayText)
                            ? "white"
                            : "#bdbdbd",
                          "&:hover": {
                            color: "white",
                            background: mapfiltervalue.includes(displayText)
                              ? lighten(backgroundColor, 0.2)
                              : "#616161",
                            borderRadius:
                              index === 0
                                ? mapfilterstyled.borderRadiusForButton1
                                : index === filtersfloorData?.length - 1 || 0
                                ? mapfilterstyled.borderRadiusForButton3
                                : undefined,
                          },
                          ...textStyle(Location),
                        }}
                        disabled={
                          !pinPointsVisible && location?.pathname !== "/"
                        }
                      >
                        <Typography sx={textStyle(Location)}>
                          {displayText}
                        </Typography>
                      </Button>
                      {/* </Tooltip> */}
                    </motion.div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <>
            {location.pathname === "/sattvalumina" ? (
              <>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("1BHK + 1T - Type 1")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "1BHK + 1T - Type 1"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("1BHK + 1T - Type 1")}
                    sx={{
                      color: mapfiltervalue?.includes("1BHK + 1T - Type 1")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "1BHK + 1T - Type 1"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton1,
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      1BHK + 1T - Type 1
                    </Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("1BHK + 1T - Type 2")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "1BHK + 1T - Type 2"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("1BHK + 1T - Type 2")}
                    sx={{
                      color: mapfiltervalue?.includes("1BHK + 1T - Type 2")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "1BHK + 1T - Type 2"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      1BHK + 1T - Type 2
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("2BHK + 2T - Type 1")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "2BHK + 2T - Type 1"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("2BHK + 2T - Type 1")}
                    sx={{
                      color: mapfiltervalue?.includes("2BHK + 2T - Type 1")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "2BHK + 2T - Type 1"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      2BHK + 2T - Type 1
                    </Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("2BHK + 2T - Type 2")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "2BHK + 2T - Type 2"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("2BHK + 2T - Type 2")}
                    sx={{
                      color: mapfiltervalue?.includes("2BHK + 2T - Type 2")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "2BHK + 2T - Type 2"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      2BHK + 2T - Type 2
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("2BHK + 2T - Type 3")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "2BHK + 2T - Type 3"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("2BHK + 2T - Type 3")}
                    sx={{
                      color: mapfiltervalue?.includes("2BHK + 2T - Type 3")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "2BHK + 2T - Type 3"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      2BHK + 2T - Type 3
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("3BHK + 2T - Type 1")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "3BHK + 2T - Type 1"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("3BHK + 2T - Type 1")}
                    sx={{
                      color: mapfiltervalue?.includes("3BHK + 2T - Type 1")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "3BHK + 2T - Type 1"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      3BHK + 2T - Type 1
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("3BHK + 2T - Type 2")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "3BHK + 2T - Type 2"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("3BHK + 2T - Type 2")}
                    sx={{
                      color: mapfiltervalue?.includes("3BHK + 2T - Type 2")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "3BHK + 2T - Type 2"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      3BHK + 2T - Type 2
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("3BHK + 2T - Type 3")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "3BHK + 2T - Type 3"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("3BHK + 2T - Type 3")}
                    sx={{
                      color: mapfiltervalue?.includes("3BHK + 2T - Type 3")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "3BHK + 2T - Type 3"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      3BHK + 2T - Type 3
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("3BHK + 3T - Type 1")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "3BHK + 3T - Type 1"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("3BHK + 3T - Type 1")}
                    sx={{
                      color: mapfiltervalue?.includes("3BHK + 3T - Type 1")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "3BHK + 3T - Type 1"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      3BHK + 3T - Type 1
                    </Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("3BHK + 3T - Type 2")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "3BHK + 3T - Type 2"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("3BHK + 3T - Type 2")}
                    sx={{
                      color: mapfiltervalue?.includes("3BHK + 3T - Type 2")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "3BHK + 3T - Type 2"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      3BHK + 3T - Type 2
                    </Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("3BHK + 3T - Type 3")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "3BHK + 3T - Type 3"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("3BHK + 3T - Type 3")}
                    sx={{
                      color: mapfiltervalue?.includes("3BHK + 3T - Type 3")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "3BHK + 3T - Type 3"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      3BHK + 3T - Type 3
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("2BHK + 2T - Type 4")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "2BHK + 2T - Type 4"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("2BHK + 2T - Type 4")}
                    sx={{
                      color: mapfiltervalue?.includes("2BHK + 2T - Type 4")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes(
                          "2BHK + 2T - Type 4"
                        )
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      2BHK + 2T - Type 4
                    </Typography>
                  </Button>
                </motion.div>

                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("Studio Apartment")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes(
                      "Studio Apartment"
                    )
                      ? "rgba(65, 197, 158, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("Studio Apartment")}
                    sx={{
                      color: mapfiltervalue?.includes("Studio Apartment")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes("Studio Apartment")
                          ? lighten("rgba(65, 197, 158, 1)", 0.3)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton3,
                      },
                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      Studio Apartment
                    </Typography>
                  </Button>
                </motion.div>
              </>
            ) : location.pathname === "/roycelone" ||
              location.pathname === "/roycefloorplan" ? (
              <>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("simplex")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes("simplex")
                      ? "rgba(226, 190, 116, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("simplex")}
                    sx={{
                      color: mapfiltervalue?.includes("simplex")
                        ? "black"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "black",

                        background: mapfiltervalue?.includes("simplex")
                          ? lighten("rgba(226, 190, 116, 1)", 0.2)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton1,
                      },
                      transition: "all 0.5s",

                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      Skyview Suite (5BHK)
                    </Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("duplex")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes("duplex")
                      ? "rgba(226, 190, 116, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("duplex")}
                    sx={{
                      color: mapfiltervalue?.includes("duplex")
                        ? "black"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "black",

                        background: mapfiltervalue?.includes("duplex")
                          ? lighten("rgba(226, 190, 116, 1)", 0.2)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton1,
                      },
                      transition: "all 0.5s",

                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      Panoramic Duplex (6BHK)
                    </Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("triplex")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes("triplex")
                      ? "rgba(226, 190, 116, 1)"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("triplex")}
                    sx={{
                      color: mapfiltervalue?.includes("triplex")
                        ? "black"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "black",
                        background: mapfiltervalue?.includes("triplex")
                          ? lighten("rgba(226, 190, 116, 1)", 0.2)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton3,
                      },

                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>
                      Penthouse Triplex (6BHK)
                    </Typography>
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("plc")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes("plc")
                      ? "#4CD0A9"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("plc")}
                    sx={{
                      color: mapfiltervalue?.includes("plc")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",

                        background: mapfiltervalue?.includes("plc")
                          ? lighten("#4CD0A9", 0.2)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton1,
                      },
                      transition: "all 0.5s",

                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>PLC</Typography>
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: !mapfiltervalue?.includes("nonplc")
                      ? "grayscale(1)"
                      : "grayscale(0)",
                    backgroundColor: mapfiltervalue?.includes("nonplc")
                      ? "#6AA5EB"
                      : mapfilterstyled?.btnbg,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Button
                    onClick={() => handleMapFilterChange("nonplc")}
                    sx={{
                      color: mapfiltervalue?.includes("nonplc")
                        ? "white"
                        : "#bdbdbd",
                      "&:hover": {
                        color: "white",
                        background: mapfiltervalue?.includes("nonplc")
                          ? lighten("#6AA5EB", 0.2)
                          : "#616161",
                        borderRadius: mapfilterstyled?.borderRadiusForButton3,
                      },

                      ...textStyle(Location),
                    }}
                    disabled={!pinPointsVisible && location?.pathname !== "/"}
                  >
                    <Typography sx={textStyle(Location)}>Non PLC</Typography>
                  </Button>
                </motion.div>
                {/* <motion.div
                animate={{
                  filter: !mapfiltervalue?.includes("education")
                    ? "grayscale(1)"
                    : "grayscale(0)",
                  backgroundColor: mapfiltervalue?.includes("education")
                    ? "#DADADA"
                    : mapfilterstyled?.btnbg,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Button
                  onClick={() => handleMapFilterChange("education")}
                  sx={{
                    color: mapfiltervalue?.includes("education")
                      ? "black"
                      : "#bdbdbd",
                    "&:hover": {
                      color: mapfiltervalue?.includes("education")
                        ? "black"
                        : "#bdbdbd",
                      background: mapfiltervalue?.includes("education")
                        ? "white"
                        : "#606060",
                    },

                    ...textStyle(Location),
                  }}
                  disabled={!pinPointsVisible && location?.pathname !== "/"}
                >
                  <Typography sx={{ ...textStyle(Location) }}>
                    Education
                  </Typography>

                  <Box component={"img"} src={education} />
                </Button>
              </motion.div>

              <motion.div
                animate={{
                  filter: !mapfiltervalue?.includes("health")
                    ? "grayscale(1)"
                    : "grayscale(0)",
                  backgroundColor: mapfiltervalue?.includes("health")
                    ? "#DADADA"
                    : mapfilterstyled?.btnbg,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Button
                  onClick={() => handleMapFilterChange("health")}
                  sx={{
                    color: mapfiltervalue?.includes("health")
                      ? "black"
                      : "#bdbdbd",
                    "&:hover": {
                      color: mapfiltervalue?.includes("health")
                        ? "black"
                        : "#bdbdbd",
                      background: mapfiltervalue?.includes("health")
                        ? "white"
                        : "#606060",
                      borderRadius: mapfilterstyled?.borderRadiusForButton3,
                    },

                    ...textStyle(Location),
                  }}
                  disabled={!pinPointsVisible && location?.pathname !== "/"}
                >
                  <Typography sx={{ ...textStyle(Location) }}>
                    Hospital
                  </Typography>

                  <Box component={"img"} src={Health} />
                </Button>
              </motion.div> */}
              </>
            )}
          </>
        )}
      </Box>
      <Box sx={mainboxwalkand360}>
        <Box sx={mainboxwalkand360child2}>
          {roycedata && (
            <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={mainboxwalkand360child2box}>
                  <Box sx={mainboxwalkand360child2box2}>
                    {amenitiesData.map((data, index) => (
                      <Button
                        key={index}
                        onClick={() => handleMapFilterChange(data.type)}
                        sx={{
                          ...AmenitiesBox,
                          backgroundColor: mapfiltervalue?.includes(data.type)
                            ? "rgba(228, 105, 36, 1)"
                            : "black",
                          color: mapfiltervalue?.includes(data.type)
                            ? "white"
                            : "white",
                          "&:hover": {
                            backgroundColor: mapfiltervalue?.includes(data.type)
                              ? lighten("rgba(228, 105, 36, 1)", 0.5)
                              : lighten("rgba(0, 0, 0, 0.5)", 0.5),
                            color: mapfiltervalue?.includes(data.type)
                              ? "black"
                              : "white",
                          },
                        }}
                      >
                        {data.name}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}

export default MapFilters;
const textStyle = (Location) => ({
  fontFamily: "Roboto",
  textTransform: "capitalize",
  fontWeight: 400,
  justifyContent:
    Location === "/sattvalumina" ||
    Location.startsWith("/sattvalumina/") ||
    Location === "/floorplan"
      ? "center"
      : "space-between",
  transition: "backgroundColor 0.3s ease-in-out",
  whiteSpace: "nowrap",
  fontSize: "13px",
});

const mainboxwalkand360child2box = {
  display: "flex",
  flexDirection: "row",
  width: "max-content",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  animation: "slideInFromBottom 0.5s ease-out forwards",
  // "&::-webkit-scrollbar": {
  //   display: "none",
  // },
};

const mainboxwalkand360child2box2 = {
  display: "flex",
  justifyContent: {
    xl: "end",
    lg: "end",
    md: "flex-start",
    sm: "flex-start",
    xs: "flex-start",
  },
  gap: {
    xl: "10px",
    lg: "10px",
    md: "30px",
    sm: "30px",
    xs: "30px",
  },
  maxWidth: {
    xl: "100%",
    lg: "100%",
    md: "400px",
    sm: "400px",
    xs: "400px",
  },
  overflowX: "scroll",
  pointerEvents: "all",
  flexWrap: {
    xl: "wrap",
    lg: "wrap",
    md: "nowrap",
    sm: "nowrap",
    xs: "nowrap",
  },
};

const AmenitiesBox = {
  background: "black",
  color: "#BDBDBD",
  padding: "8px 10px",
  pointerEvents: "all",
  whiteSpace: "nowrap",
  minWidth: {
    xl: "auto",
    lg: "auto",
    md: "120px",
    sm: "120px",
    xs: "120px",
  },
  fontFamily: "Roboto",
  fontSize: {
    xl: "10px",
    lg: "10px",
    md: "12px",
    sm: "12px",
    xs: "12px",
  },
  textTransform: "capitalize",
  gap: "5px",
  borderRadius: "8px",
  "&:hover": {
    background: "white",
    color: "black",
  },
};

const mainboxwalkand360child2 = {
  position: "absolute",
  mb: "20%",
  right: "0%",
};

const mainboxwalkand360 = {
  position: "absolute",
  // bottom: (showmapfilters && data1) || data1 ? 55 : 0,
  bottom: 100,
  right: "15.3px",
};
