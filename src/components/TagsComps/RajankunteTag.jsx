import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rajankunte from "../../assets/logos/rajankuntesattavaimg.png";

export const RajankunteTag = ({
  area,
  points,
  position,
  onMouseEnter,
  onMouseLeave,
  hoveredNameTag,
  currentScale,
  setActivePin,
  activePin,
  setExpand,
  expand,
}) => {
  const [cx, cy] = points.split(",").map(Number);
  const [startX, startY] = area.startPoint.split(",").map(Number);
  const getScaledSize = (baseSize) => baseSize / currentScale;
  let tagX = startX;
  let tagY = startY;
  const scaledOffset = getScaledSize(70);
  const scaledWidthOffset = getScaledSize(140);
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();

  const housenametagentermouse = (id) => {
    setActivePin(id);
    setExpand(true);
  };

  const housenametagleavemouse = () => {
    setExpand(false);
  };

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
        opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.7 : 1,
      }}
    >
      <path
        d={path}
        stroke="white"
        strokeWidth={getScaledSize(3)}
        fill="none"
      />
      <foreignObject
        x={isSmallScreen ? tagX - getScaledSize(100) : tagX - getScaledSize(50)}
        y={isSmallScreen ? tagY - getScaledSize(40) : tagY - getScaledSize(20)}
        width={getScaledSize(500)}
        height={getScaledSize(200)}
        style={{
          padding: `${getScaledSize(10)}px ${getScaledSize(15)}px`,
        }}
      >
        <Box
          sx={HouseNameTagMainBox(area, getScaledSize, expand)}
          onMouseEnter={() => {
            housenametagentermouse(area.id);
          }}
          onMouseLeave={() => {
            housenametagleavemouse();
          }}
          onClick={() => navigate("/roseate")}
        >
          {" "}
          <Box
            component={"img"}
            src={Rajankunte}
            sx={{
              fontSize: isSmallScreen ? getScaledSize(25) : getScaledSize(15),
              transition: "all 0.2s",
              mixBlendMode: "multiply",
              p: 1,
            }}
          />
          {/*  <Typography
              sx={{
                ...titilename,
                fontSize: isSmallScreen ? getScaledSize(25) : getScaledSize(20),
              }}
            >
              {area.title}
            </Typography> */}
        </Box>
      </foreignObject>
    </g>
  );
};
const HouseNameTagMainBox = (area, getScaledSize, expand) => ({
  width: "fit-content",
  height: "fit-content",
  padding: `${getScaledSize(5)}px ${getScaledSize(10)}px`,
  backgroundColor: "white",
  borderRadius: getScaledSize(3),
  textAlign: "start",
  gap: `${getScaledSize("0.3")}rem`,
  justifyContent: "center",
  display: "flex",
  transform: expand ? "scale(1.05)" : "scale(1)",
  transition: "all 0.5s",
  border: area.isBlueaValley && "2px solid #2F75A0",
  "&:hover": {
    transform: "scale(1.05)",
  },
  pointerEvents: "all",
});

export const RajanKunteFirstTag = ({
  area,
  points,
  angle,
  onMouseEnter,
  onMouseLeave,
  hoveredNameTag,
  currentScale,
  setActivePin,
  isPolygonHovered,
  activePin,
}) => {
  const [cx, cy] = points.split(",").map(Number);
  const [startPointX, startPointY] = area.startPoint.split(",").map(Number);
  const getScaledSize = (baseSize) => baseSize / currentScale;
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const navigate = useNavigate();

  const radius = area.isRajanKunte ? getScaledSize(0) : getScaledSize(10); // Radius of the circle

  // Calculate the offset distance for the tag position
  const offsetDistance = area.isSmall
    ? getScaledSize(70)
    : area.isLarge
    ? getScaledSize(160)
    : area.isExtraLarge
    ? getScaledSize(320)
    : getScaledSize(100);

  // Convert angle to radians
  const angleInRadians = (angle * Math.PI) / 180;

  // Adjust startX and startY to start from the edge of the circle
  const startX = startPointX + radius * Math.cos(angleInRadians);
  const startY = startPointY - radius * Math.sin(angleInRadians);

  // Calculate the new tag position based on the angle
  const tagX = startX + offsetDistance * Math.cos(angleInRadians);
  const tagY = startY - offsetDistance * Math.sin(angleInRadians);

  const path = `M${startX},${startY} L${tagX},${tagY}`;

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
        opacity: hoveredNameTag && hoveredNameTag !== area.id ? 0.3 : 1,
      }}
    >
      <path d={path} stroke="white" fill="none" />
      <circle cx={startX} cy={startY} r={getScaledSize(10)} fill="white" />

      <foreignObject
        x={foreignObjectX}
        y={foreignObjectY}
        width={getScaledSize(200)}
        height={getScaledSize(100)}
        style={{
          padding: `${getScaledSize(10)}px ${getScaledSize(15)}px`,
          pointerEvents: "none",
        }}
        onClick={() => area.isRajanKunte && navigate("/yelahanka")}
      >
        <Box
          sx={homeTagStyle(getScaledSize, area, isPolygonHovered)}
          onMouseEnter={() => {
            onMouseEnter(area.id);
            setActivePin(area.id);
          }}
          onMouseLeave={onMouseLeave}
        >
          {area.isRajanKunte && (
            <Box
              component={"img"}
              src={area.isRajanKunte ? Rajankunte : Rajankunte}
              sx={{
                // fontSize: isSmallScreen ? getScaledSize(25) : getScaledSize(10),
                transition: "all 0.1s",
                width: getScaledSize(80),
                height: getScaledSize(40),
              }}
            />
          )}
          {!area.isRajanKunte && (
            <Typography sx={HouseNameTitle(area, isSmallScreen, getScaledSize)}>
              {area.title}
            </Typography>
          )}
        </Box>
      </foreignObject>
    </g>
  );
};
const homeTagStyle = (getScaledSize, area, isPolygonHovered) => ({
  width: "fit-content",
  height: "fit-content",
  padding: `${getScaledSize(15)}px ${getScaledSize(10)}px`,
  backgroundColor: "white",
  borderRadius: getScaledSize(4),
  textAlign: "start",
  gap: `${getScaledSize("0.3")}rem`,
  justifyContent: "center",
  display: "flex",
  transform: isPolygonHovered && area.isRajanKunte ? "scale(1.05)" : "scale(1)",
  "&:hover": {
    transform: "scale(1.05)",
  },
  cursor: "pointer",
  pointerEvents: "fill",
  transition: "all 1s",
  // border: area.isRajanKunte ? "2px solid #2F75A0" : undefined,
  alignItems: "center",
});
