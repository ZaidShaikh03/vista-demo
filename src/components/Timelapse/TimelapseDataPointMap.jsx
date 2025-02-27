import React, { useState } from "react";
import { MapDataValues } from "../../utils/timelapsedatavalues";
import ahmedabad1970 from "../../assets/timelapse/ahmedabad_1970.svg";
import { Box, Typography } from "@mui/material";

const TimelapseDataPointMap = () => {
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [activeLandMark, setActiveLandMark] = useState(null);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        position: "relative",
        transition: "all 0.5s",
      }}
      onLoad={() => {
        window.scrollTo({ top: 400, behavior: "instant" });
      }}
    >
      <Box className="image-map-container" id="centered-component">
        <Box
          component={"img"}
          src={ahmedabad1970}
          alt="Image Map"
          className="image-map"
          //className="black-film-overlay"
          sx={{
            objectFit: "cover",
            userSelect: "none",

            pointerEvents: "none",
            WebkitUserDrag: "none",
            WebkitTouchCallout: "none",
            MozUserSelect: "none",
          }}
        />
        <svg
          className="svg-overlay"
          viewBox="0 0 1920 1920"
          preserveAspectRatio="xMinYMin meet"
          style={{
            position: "absolute",
            // transform: scale(${scale}),
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {MapDataValues.map((landMark) => {
            const [cx, cy] = landMark.points.split(",").map(Number);
            const [x, y, r] = landMark.points.split(",").map(Number);
            const SmallpinY = y - 60;

            return (
              <g
                key={landMark.id}
                style={{
                  cursor: "pointer",
                  pointerEvents: "bounding-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={() => setHoveredPinLandMark(landMark.id)}
                onMouseLeave={() => setHoveredPinLandMark(null)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={12}
                  fill={landMark.color}
                  title={landMark.title}
                  className="landmark"
                />

                <image
                  xlinkHref={`${landMark.image}`}
                  x={cx - 12}
                  y={cy - 12}
                  width="25"
                  height="25"
                  style={{ pointerEvents: "none" }}
                />
                {hoveredPinLandMark === landMark.id ? (
                  <foreignObject
                    x={cx + 20}
                    y={cy - 50}
                    width={250}
                    height={100}
                    style={{
                      transition: "all 0.5s",
                      opacity:
                        activeLandMark === landMark.id ||
                        hoveredPinLandMark === landMark.id
                          ? 1
                          : 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "center", // Center content horizontally
                        height: "100%", // Ensure div takes full height of foreignObject
                        animation:
                          hoveredPinLandMark === landMark.id
                            ? "slideInFromRight 0.5s ease-out forwards"
                            : "none",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "15px",
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          background: landMark.color,
                          borderRadius: "16px",
                          padding: "4px 10px",
                          width: "fit-content",
                        }}
                      >
                        {" "}
                        {landMark.title}
                      </Typography>
                    </div>
                  </foreignObject>
                ) : null}
              </g>
            );
          })}
        </svg>
      </Box>
    </Box>
  );
};

export default TimelapseDataPointMap;
