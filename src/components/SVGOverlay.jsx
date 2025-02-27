import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HouseNameTag from "./HouseNameTag"; // Adjust import paths as needed
import NameTag from "./NameTag";
import SanandMarkerVector from "../assets/icons/SanandMarkerVector.svg";
import { MapData, pinData, landMarkData } from "../utils/datavalues";

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
const SVGOverlay = ({
  value,
  scalePass,
  mapfiltervalue,
  hoveredNameTag,
  scale,
  activePin,
  activeArea,
  hoveredPin,
  activeLandMark,
  hoveredPinLandMark,
  setActiveArea,
  zoomToElement,
  setHoveredNameTag,
  setActivePinHouse,
  setActivePin,
  setHoveredPin,
  setHoveredPinLandMark,
  isSmallScreen,
  getScaledSize,
  activePinHouse,
}) => {
  const navigate = useNavigate();

  return (
    <svg
      className="svg-overlay"
      viewBox="0 0 2048 2048"
      preserveAspectRatio="xMinYMin meet"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {MapData?.filter((el) => {
        if (value === "All") {
          return scalePass ? el.scalePass === true : true;
        } else {
          return (
            el.type === value && (scalePass ? el.scalePass === true : true)
          );
        }
      }).map((el) => {
        const centerPoint = getPolygonCenterPoint(el.points);
        const pointsArray = el.points
          .split(" ")
          .map((point) => point.split(",").map(Number));
        const centroid = calculateCentroid(pointsArray);

        return (
          <g key={el.id}>
            <Box
              component={"polygon"}
              points={el?.points}
              title={el.title}
              sx={{
                fill: el.scalePass
                  ? "rgba(255, 255, 255, 0.6)"
                  : el.isFill
                  ? "#D9D9D959"
                  : "rgba(0, 0, 0, 0.1)",
                transition: "all 1s",
                stroke: "white",
                strokeWidth: el.scalePass ? 0.5 : 2,
                pointerEvents: "all",
                cursor: "pointer",
                opacity: hoveredNameTag && hoveredNameTag !== el.id ? 0.4 : 1,
              }}
              onClick={(e) => {
                if (el?.isnav === "sanand") {
                  navigate(`/${el?.isnav}`);
                }
                setActiveArea(el.id);
                zoomToElement(e.target, 3);
              }}
              onMouseEnter={() => {
                if (scalePass) {
                  setHoveredNameTag(el.id);
                  setActivePinHouse(el.id);
                }
              }}
              onMouseLeave={() => {
                if (scalePass) {
                  setHoveredNameTag(null);
                  setActivePinHouse(null);
                }
              }}
            />
            {el.isMarker && (
              <image
                x={centroid.x - 30}
                y={centroid.y + 50}
                width={20}
                height={20}
                href={SanandMarkerVector}
                style={{ pointerEvents: "none" }}
              />
            )}
            {!el.scalePass || scalePass ? (
              el?.isHome ? (
                <HouseNameTag
                  angle={el?.angle ? el?.angle : 0}
                  area={el}
                  points={centerPoint}
                  position={el.position}
                  hoveredNameTag={hoveredNameTag}
                  onMouseEnter={(id) => setHoveredNameTag(id)}
                  onMouseLeave={() => {
                    setHoveredNameTag(null);
                    setActivePinHouse(null);
                  }}
                  currentScale={scale}
                  setActivePin={setActivePinHouse}
                  activePin={activePinHouse}
                />
              ) : (
                <NameTag
                  area={el}
                  points={centerPoint}
                  position={el.position}
                  hoveredNameTag={hoveredNameTag}
                  currentScale={scale}
                  setActiveArea={setActiveArea}
                  zoomToElement={zoomToElement}
                  activeArea={activeArea}
                />
              )
            ) : null}
          </g>
        );
      })}

      {pinData
        ?.filter((el) => (scalePass ? true : !el.scalePass))
        .filter((landMark) =>
          mapfiltervalue.length === 0
            ? false
            : mapfiltervalue.includes(landMark.type)
        )
        .map((pin) => {
          const [x, y, r] = pin.points.split(",").map(Number);
          const scaledR = getScaledSize(r);
          const pathLength = isSmallScreen
            ? getScaledSize(36)
            : getScaledSize(30);
          const foreignObjectRadius = isSmallScreen
            ? getScaledSize(36)
            : getScaledSize(30);
          const angleInRadians = (pin.angle * Math.PI) / 180;
          const centerX =
            x + (pathLength + foreignObjectRadius) * Math.sin(angleInRadians);
          const centerY =
            y - (pathLength + foreignObjectRadius) * Math.cos(angleInRadians);
          const endX = centerX - foreignObjectRadius * Math.sin(angleInRadians);
          const endY = centerY + foreignObjectRadius * Math.cos(angleInRadians);
          const path = `M${x},${y} L${endX},${endY}`;
          const foreignObjectX = centerX - foreignObjectRadius;
          const foreignObjectY = centerY - foreignObjectRadius;

          return (
            <g
              key={pin.id}
              onClick={() => setActivePin(pin.id)}
              onMouseEnter={() => !scalePass && setHoveredPin(pin.id)}
              onMouseLeave={() => !scalePass && setHoveredPin(null)}
              style={{
                pointerEvents: "bounding-box",
                cursor: "pointer",
                opacity: hoveredNameTag ? 0.4 : 1,
                transition: "all 0.5s",
              }}
            >
              <path
                d={path}
                stroke={"white"}
                strokeWidth={getScaledSize(2)}
                style={{
                  strokeDasharray: getScaledSize(2),
                }}
                className={"path"}
              />

              <circle
                cx={x}
                cy={y}
                r={scaledR}
                fill="white"
                className="pin"
                title={pin.title}
              />
              <foreignObject
                x={foreignObjectX}
                y={foreignObjectY}
                width={isSmallScreen ? getScaledSize(80) : getScaledSize(70)}
                height={isSmallScreen ? getScaledSize(80) : getScaledSize(70)}
                scale={activePin === pin.id ? 1.2 : 1}
                style={{
                  transition: "all 0.2s",
                }}
                className="pin"
              >
                <div
                  style={{
                    height: isSmallScreen
                      ? getScaledSize(
                          hoveredPin === pin.id || activePin === pin.id
                            ? 80
                            : 70
                        )
                      : getScaledSize(
                          hoveredPin === pin.id || activePin === pin.id
                            ? 70
                            : 65
                        ),
                    width: isSmallScreen
                      ? getScaledSize(
                          hoveredPin === pin.id || activePin === pin.id
                            ? 80
                            : 70
                        )
                      : getScaledSize(
                          hoveredPin === pin.id || activePin === pin.id
                            ? 70
                            : 65
                        ),
                    backgroundColor:
                      activePin === pin.id ? "white" : "#27272799",
                    textAlign: "center",
                    borderRadius: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    transition: "all 0.2s",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() =>
                    scalePass &&
                    setHoveredNameTag(pin.id) &&
                    setActivePinHouse(pin.id)
                  }
                  onMouseLeave={() =>
                    scalePass &&
                    setHoveredNameTag(null) &&
                    setActivePinHouse(null)
                  }
                >
                  <pin.icon
                    fill={
                      activePin === pin.id ? "rgba(64, 64, 64, 1)" : "#DADADA"
                    }
                    width={getScaledSize(25)}
                    height={getScaledSize(25)}
                    style={{
                      color:
                        activePin === pin.id ? "rgba(64, 64, 64, 1)" : "white",
                      marginY: "auto",
                      width: getScaledSize(25),
                      fontWeight: "bold",
                      fontFamily: "Segoeui",
                      gap: "-0.5rem",
                      transition: "all 0.2s",
                    }}
                  />
                  <Typography
                    sx={{
                      color: activePin === pin.id ? "black" : "white",
                      fontSize: {
                        lg: getScaledSize(9),
                        md: getScaledSize(9),
                        sm: getScaledSize(10),
                        xs: getScaledSize(10),
                      },
                      fontWeight: "bold",
                      fontFamily: "Segoeui",
                      gap: "-0.5rem",
                      transition: "all 0.2s",
                    }}
                    textAlign={"center"}
                  >
                    {pin.title}
                  </Typography>
                </div>
              </foreignObject>
            </g>
          );
        })}
    </svg>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(SVGOverlay);
