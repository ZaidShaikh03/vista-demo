import React, { useState, useRef, memo, useCallback } from "react";
import "./styles.css";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapData, pinData, landMarkData } from "../utils/datavalues";
// import "leaflet/dist/leaflet.css";
import { format } from "date-fns";
import ahmedabad from "../assets/images/ahemdabad_low.jpg";
import TagLogo from "../assets/icons/TagLogo.svg";
import BlueTagLogo from "../assets/icons/BlueTagLogo.svg";
import SanandMarkerVector from "../assets/icons/SanandMarkerVector.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Header from "./Header";
import GoyalHeader from "./GoyalHeader";
import { fontSize, width } from "@mui/system";
import styles from "./styles";
import Clouds from "./Clouds";

const NameTag = memo(
  ({
    area,
    points,
    position,
    hoveredNameTag,
    currentScale,
    setActiveArea,
    zoomToElement,
    activeArea,
  }) => {
    const [cx, cy] = points.split(",").map(Number);
    const [startX, startY] = area.startPoint.split(",").map(Number);
    const getScaledSize = useCallback(
      (baseSize) => baseSize / currentScale,
      [currentScale]
    );
    let tagX = startX;
    let tagY = startY;
    const scaledOffset = getScaledSize(70);
    const scaledWidthOffset = getScaledSize(140);
    const isSmallScreen = useMediaQuery("(max-width:700px)");

    switch (position) {
      case "top":
        tagY -= scaledOffset;
        break;
      case "bottom":
        tagY += scaledOffset;
        break;
      case "left":
        tagX -= scaledWidthOffset;
        break;
      case "right":
        tagX += scaledWidthOffset;
        break;
      default:
        break;
    }

    const path = `M${startX},${startY} L${tagX},${tagY}`;

    const handleClick = useCallback(
      (e) => {
        setActiveArea(area.id);
        zoomToElement(e.target, 3);
      },
      [area.id, setActiveArea, zoomToElement]
    );

    return (
      <g
        style={{
          cursor: "pointer",
          pointerEvents: "bounding-box",
          opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.4 : 1,
        }}
        onClick={handleClick}
      >
        <path
          d={path}
          stroke="white"
          strokeWidth={getScaledSize(2)}
          strokeDasharray={`${getScaledSize(3)},${getScaledSize(6)}`}
          fill="none"
        />
        <foreignObject
          x={
            isSmallScreen ? tagX - getScaledSize(100) : tagX - getScaledSize(50)
          }
          y={
            isSmallScreen ? tagY - getScaledSize(40) : tagY - getScaledSize(20)
          }
          width={getScaledSize(300)}
          height={getScaledSize(100)}
        >
          <div
            style={{
              width: "fit-content",
              height: "fit-content",
              padding: `${getScaledSize(5)}px ${getScaledSize(20)}px`,
              backgroundColor: "white",
              borderRadius: getScaledSize(50),
              textAlign: "start",
            }}
          >
            <Typography sx={NameTagTitle(isSmallScreen, getScaledSize)}>
              {area.title}
            </Typography>
            <Typography
              sx={{
                fontSize: isSmallScreen ? getScaledSize(15) : getScaledSize(12),
                color: "gray",
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              {area.subtitle || area.title}
            </Typography>
          </div>
        </foreignObject>
      </g>
    );
  }
);

const HouseNameTag = memo(
  ({
    area,
    points,
    angle,
    onMouseEnter,
    onMouseLeave,
    hoveredNameTag,
    currentScale,
    setActivePin,
    activePin,
  }) => {
    const [cx, cy] = points.split(",").map(Number);
    const [startX, startY] = area.startPoint.split(",").map(Number);
    const getScaledSize = useCallback(
      (baseSize) => baseSize / currentScale,
      [currentScale]
    );
    const isSmallScreen = useMediaQuery("(max-width:700px)");

    // Calculate the offset distance
    const offsetDistance = useCallback(() => {
      if (area.isSmall) return getScaledSize(70);
      if (area.isLarge) return getScaledSize(160);
      if (area.isExtraLarge) return getScaledSize(320);
      return getScaledSize(100);
    }, [area, getScaledSize]);

    // Convert angle to radians
    const angleInRadians = (angle * Math.PI) / 180;

    // Calculate the new tag position based on the angle
    const tagX = startX + offsetDistance() * Math.cos(angleInRadians);
    const tagY = startY - offsetDistance() * Math.sin(angleInRadians);

    const path = `M${startX},${startY} L${tagX},${tagY}`;

    // Determine the foreignObject position
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
          opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.4 : 1,
        }}
      >
        <path
          d={path}
          stroke="white"
          strokeWidth={getScaledSize(2)}
          strokeDasharray={`${getScaledSize(3)},${getScaledSize(6)}`}
          fill="none"
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
        >
          <Box
            sx={homeTagStyle(getScaledSize, area)}
            onMouseEnter={() => {
              onMouseEnter(area.id);
              setActivePin(area.id);
            }}
            onMouseLeave={onMouseLeave}
          >
            <Box
              component={"img"}
              src={area.isBlueaValley ? BlueTagLogo : TagLogo}
              sx={{
                fontSize: isSmallScreen ? getScaledSize(25) : getScaledSize(10),
                transition: "all 0.1s",
                width: getScaledSize(22),
                height: getScaledSize(22),
              }}
            />
            <Typography sx={HouseNameTitle(area, isSmallScreen, getScaledSize)}>
              {area.title}
            </Typography>
          </Box>
        </foreignObject>
      </g>
    );
  }
);

export { NameTag, HouseNameTag };
const homeTagStyle = (getScaledSize, area) => ({
  width: "fit-content",
  height: "fit-content",
  padding: `${getScaledSize(5)}px ${getScaledSize(10)}px`,
  backgroundColor: "white",
  borderRadius: getScaledSize(50),
  textAlign: "start",
  gap: `${getScaledSize("0.3")}rem`,
  justifyContent: "center",
  display: "flex",
  transform: "scale(1)",
  "&:hover": {
    transform: "scale(1.05)",
  },
  cursor: "pointer",
  pointerEvents: "fill",
  transition: "all 0.1s",
  border: area.isBlueaValley ? "2px solid #2F75A0" : undefined,
  alignItems: "center",
});

const NameTagTitle = (isSmallScreen, getScaledSize) => ({
  color: "black",
  fontSize: isSmallScreen ? getScaledSize(20) : getScaledSize(15),
  fontWeight: "bold",
  fontFamily: "Roboto",
});

const HouseNameTitle = (area, isSmallScreen, getScaledSize) => ({
  color: area.isBlueaValley ? "#2F75A0" : "black",
  fontSize: isSmallScreen
    ? getScaledSize(20)
    : area.isBlueaValley
    ? getScaledSize(23)
    : getScaledSize(12),
  fontWeight: "bold",
  fontFamily: "Roboto",
  transition: "all 0.1s",
});
