import React from "react";
import { useMediaQuery, Typography } from "@mui/material";
import "./styles.css";
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
const NameTag = React.memo(
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
    const getScaledSize = (baseSize) => baseSize / currentScale;
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

    return (
      <g
        style={{
          cursor: "pointer",
          pointerEvents: "bounding-box",
          opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.4 : 1,
        }}
        onClick={(e) => {
          setActiveArea(area.id);
          zoomToElement(e.target, 3);
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
            <Typography
              sx={{
                color: "black",
                fontSize: isSmallScreen ? getScaledSize(25) : getScaledSize(15),
                fontWeight: "bold",
                fontFamily: "Segoeui",
              }}
            >
              {area.title}
            </Typography>
            <Typography
              sx={{
                fontSize: isSmallScreen ? getScaledSize(15) : getScaledSize(12),
                color: "gray",
                fontFamily: "Segoeui",
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

export default NameTag;
