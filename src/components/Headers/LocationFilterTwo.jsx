import React from "react";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { lighten } from "@mui/system";
function MapFilters({
  mapfiltervaluefiltertwo,
  setMapFilterValuefiltertwo,
  mapfilterstyled,
  pinPointsVisible,
}) {
  const handleMapFilterChange = (filter) => {
    setMapFilterValuefiltertwo((prevFilters) => {
      if (prevFilters?.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  console.log("666666666666666666666", mapfiltervaluefiltertwo);

  // const handleMapFilterChange = (filter) => {
  //   setMapFilterValuefiltertwo((prev) =>
  //     prev.includes(filter)
  //       ? prev.filter((item) => item !== filter)
  //       : [...prev, filter]
  //   );
  // };

  const location = useLocation();
  const Location = location.pathname;

  console.log(Location, "Location");

  return (
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
          padding: mapfilterstyled?.padding || "2px 10px",
          ...textStyle,
        },

        "& div:nth-child(1)": {
          borderRadius: mapfilterstyled?.borderRadiusForButton1,
          ...textStyle,
        },

        "& div:last-child": {
          borderRadius: mapfilterstyled?.borderRadiusForButton3,
          ...textStyle,
        },
        "& p": {
          fontSize: "12px",
          fontWeight: 500,
          fontFamily: mapfilterstyled?.fontFamily,
          ...textStyle,
        },
      }}
    >
      <>
        <motion.div
          animate={{
            filter: !mapfiltervaluefiltertwo?.includes("reconnectpark")
              ? "grayscale(1)"
              : "grayscale(0)",
            backgroundColor: mapfiltervaluefiltertwo?.includes("reconnectpark")
              ? "#7158D5"
              : mapfilterstyled?.btnbg,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Button
            onClick={() => handleMapFilterChange("reconnectpark")}
            sx={{
              color: mapfiltervaluefiltertwo?.includes("reconnectpark")
                ? "white"
                : "#bdbdbd",
              "&:hover": {
                color: "white",
                background: mapfiltervaluefiltertwo?.includes("reconnectpark")
                  ? lighten("#7158D5", 0.2)
                  : "#616161",
                borderRadius: mapfilterstyled?.borderRadiusForButton1,
              },
              ...textStyle,
            }}
            disabled={!pinPointsVisible && location?.pathname !== "/"}
          >
            <Typography sx={textStyle}>Reconnect Park</Typography>
          </Button>
        </motion.div>
        <motion.div
          animate={{
            filter: !mapfiltervaluefiltertwo?.includes("rejoiceclub")
              ? "grayscale(1)"
              : "grayscale(0)",
            backgroundColor: mapfiltervaluefiltertwo?.includes("rejoiceclub")
              ? "#C357F5"
              : mapfilterstyled?.btnbg,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Button
            onClick={() => handleMapFilterChange("rejoiceclub")}
            sx={{
              color: mapfiltervaluefiltertwo?.includes("rejoiceclub")
                ? "white"
                : "#bdbdbd",
              "&:hover": {
                color: "white",

                background: mapfiltervaluefiltertwo?.includes("rejoiceclub")
                  ? lighten("#C357F5", 0.2)
                  : "#616161",
              },

              ...textStyle,
            }}
            disabled={!pinPointsVisible && location?.pathname !== "/"}
          >
            <Typography sx={textStyle}>Rejoice Club</Typography>
          </Button>
        </motion.div>
        <motion.div
          animate={{
            filter: !mapfiltervaluefiltertwo?.includes("revivezone")
              ? "grayscale(1)"
              : "grayscale(0)",
            backgroundColor: mapfiltervaluefiltertwo?.includes("revivezone")
              ? "#FA77AE"
              : mapfilterstyled?.btnbg,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Button
            onClick={() => handleMapFilterChange("revivezone")}
            sx={{
              color: mapfiltervaluefiltertwo?.includes("revivezone")
                ? "white"
                : "#bdbdbd",
              "&:hover": {
                color: "white",

                background: mapfiltervaluefiltertwo?.includes("revivezone")
                  ? lighten("#FA77AE", 0.2)
                  : "#616161",
              },

              ...textStyle,
            }}
            disabled={!pinPointsVisible && location?.pathname !== "/"}
          >
            <Typography sx={{ ...textStyle }}>Revive Zone</Typography>
          </Button>
        </motion.div>
        <motion.div
          animate={{
            filter: !mapfiltervaluefiltertwo?.includes("zengarden")
              ? "grayscale(1)"
              : "grayscale(0)",
            backgroundColor: mapfiltervaluefiltertwo?.includes("zengarden")
              ? "#E46924"
              : mapfilterstyled?.btnbg,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Button
            onClick={() => handleMapFilterChange("zengarden")}
            sx={{
              color: mapfiltervaluefiltertwo?.includes("zengarden")
                ? "white"
                : "#bdbdbd",
              "&:hover": {
                color: "white",

                background: mapfiltervaluefiltertwo?.includes("zengarden")
                  ? lighten("#E46924", 0.2)
                  : "#616161",
                borderRadius: mapfilterstyled?.borderRadiusForButton3,
              },

              ...textStyle,
            }}
            disabled={!pinPointsVisible && location?.pathname !== "/"}
          >
            <Typography sx={{ ...textStyle }}>Zen Garden</Typography>
          </Button>
        </motion.div>
      </>
    </Box>
  );
}

export default MapFilters;
const textStyle = {
  fontFamily: "Roboto",
  textTransform: "capitalize",
  fontWeight: 400,
  fontSize: "12px",
  transition: "backgroundColor 0.3s ease-in-out",
  whiteSpace: "nowrap",
};
