import React, { useState, useEffect } from "react";
import SatvaHeader from "./Headers/SatvaHeader";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Loader from "./Loader/loader.jsx";
import FloorPlanModal from "./FloorPlanModal.jsx";
import floorimg from "../assets/Sattvalumina/Floor/pixelcut-export-(17).jpg";
import floorimg1 from "../assets/Sattvalumina/Floor/pixelcut-export-(16).jpg";
// import floorimg1 from "../assets/images/roseateMainIMG.svg";
// import floorimg from "../assets/images/roseateMainIMG.svg";
import onebhkexterior from "../assets/amenitiesGalleryImages/1bhkexterior.jpg";
import twobhkexterior from "../assets/amenitiesGalleryImages/2bhkexterior.jpg";
import Verandah from "../assets/amenitiesGalleryImages/Verandah.jpg";
import interiorview from "../assets/amenitiesGalleryImages/interiorview.jpg";
// Floor Plan Data
const floorPlans = [
  {
    id: 1,
    image: floorimg, // First floor plan image
    type: "1BHK",
    landmarks: [
      {
        id: 1,
        type: "Verandah",
        title: "Verandah",
        points: "264,436",
        image: Verandah,
      },
      {
        id: 2,
        type: "Kitchen & Dining",
        title: "Kitchen & Dining",
        points: "680,278",
        image: interiorview,
      },
      {
        id: 3,
        type: "Bedroom",
        title: "Bedroom",
        points: "437,314",
        image: "",
      },
      {
        id: 4,
        type: "Private Lawn",
        title: "Private Lawn",
        points: "1069,424",
        image: "",
      },
      {
        id: 5,
        type: "Living area",
        title: "Living area",
        points: "700,515",
        image: interiorview,
      },
      {
        id: 6,
        type: "Parking",
        title: "Parking",
        points: "604,774",
        image: onebhkexterior,
      },
    ],
    viewBox: "0 0 1599 925",
  },
  {
    id: 2,
    image: floorimg1, // Second floor plan image
    type: "2BHK",
    landmarks: [
      {
        id: 1,
        type: "Verandah",
        title: "Verandah",
        points: "231,515",
        image: Verandah,
      },
      {
        id: 2,
        type: "Kitchen & Dining",
        title: "Kitchen & Dining",
        points: "746,347",
        image: interiorview,
      },
      {
        id: 3,
        type: "Bedroom",
        title: "Bedroom1",
        points: "398,360",
        image: "",
      },
      {
        id: 4,
        type: "Private Lawn",
        title: "Private Lawn",
        points: "1198,428",
        image: "",
      },
      {
        id: 5,
        type: "Bedroom 2",
        title: "Bedroom2",
        points: "401,504",
        image: "",
      },
      {
        id: 6,
        type: "Living area",
        title: "Living area",
        points: "759,511",
        image: interiorview,
      },
      {
        id: 7,
        type: "Parking",
        title: "Parking",
        points: "604,770",
        image: twobhkexterior,
      },
    ],
    viewBox: "0 0 1599 925",
  },
];

export default function FloorPlanRajyash() {
  const navigate = useNavigate();
  const location = useLocation();
  const mapData = location.state.type;
  const plotData = location.state.plotdata;
  const [selectedFloorNum, setselectedFloorNum] = useState(mapData);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(
    selectedFloorNum === "1BHK" ? floorPlans[0] : floorPlans[1]
  );

  const floorplangalleryimages = [
    onebhkexterior,
    twobhkexterior,
    Verandah,
    interiorview,
  ];

  const floorplangalleryname = [
    "1 BHK Exterior",
    "2 BHK Exterior",
    "Verandah",
    "Interior View",
  ];

  const handleLandmarkClick = (landMark) => {
    setSelectedImage(landMark.image); // Assuming `landMark.image` contains the correct image
    setOpenModal(true);
  };

  const isSmallScreen = useMediaQuery("(max-width:729px)");

  console.log("*******", selectedFloorNum, "*11111111", selectedPlan);
  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  console.log(mapData, "mapData");

  const [activeLandMark, setActiveLandMark] = useState(null);
  const [hoveredPinLandMark, setHoveredPinLandMark] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [zoomInFunc, setZoomInFunc] = useState(null);
  const [zoomOutFunc, setZoomOutFunc] = useState(null);

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

  // function handleNavigation(landMark) {
  //   navigate(`/360view`, {
  //     state: {
  //       mapData: landMark,
  //     },
  //   });
  // }

  useEffect(() => {
    // Update `selectedPlan` whenever `selectedFloorNum` changes
    if (selectedFloorNum === "1BHK") {
      setSelectedPlan(floorPlans[0]);
    } else {
      setSelectedPlan(floorPlans[1]);
    }
  }, [selectedFloorNum]);

  return (
    <>
      <Loader />
      <Box sx={mainbox}>
        <SatvaHeader
          zoomIn={zoomInFunc}
          zoomOut={zoomOutFunc}
          selectedFloor={mapData}
          setselectedFloorNum={setselectedFloorNum}
          plotData={plotData}
        />

        {/* Floor Plan Selection */}
        {/* <Box sx={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
          {floorPlans.map((plan) => (
            <Button
              key={plan.id}
              onClick={() => handlePlanChange(plan)}
              variant={selectedPlan.id === plan.id ? "contained" : "outlined"}
              sx={{ margin: 1 }}
            >
              Floor {plan.id}
            </Button>
          ))}
        </Box> */}

        {/* Floor Plan Image & SVG Overlay */}

        <Box
          sx={imgbgcss}
          className="main-container"
          onClick={handleOutsideClick}
        >
          {/* <TransformWrapper
            initialScale={1}
            minScale={1}
            maxScale={4}
            centerOnInit={true} // Center content on initial load
            wheel={{ step: 0.1 }}
            onTransformed={(e) => setScale(e.instance.transformState.scale)}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => {
              if (!zoomInFunc || !zoomOutFunc) {
                setZoomInFunc(() => zoomIn);
                setZoomOutFunc(() => zoomOut);
              }
              return (
                <TransformComponent
                  wrapperStyle={{
                    height: "100vh",
                    width: "100vw",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                > */}
          <Box className="image-map-container">
            <Box
              component={"img"}
              src={selectedPlan.image}
              alt="Floor Plan"
              className="image-map"
              sx={imgcss(isSmallScreen)}
            />
            <svg
              className="svg-overlay"
              viewBox={selectedPlan.viewBox}
              preserveAspectRatio={
                isSmallScreen ? "xMidYMid slice" : "xMaxYMid meet"
              }
              style={svgcss}
            >
              {selectedPlan.landmarks.map((landMark) => {
                const [cx, cy] = landMark.points.split(",").map(Number);
                const isPointer = landMark.image !== "";

                console.log("*********8", isPointer);

                return (
                  <g key={landMark.id} style={LandmarkMapcssg}>
                    <foreignObject
                      x={cx}
                      y={cy}
                      width={140}
                      height={40}
                      style={{
                        ...Landmarkforeignobjectcss,
                        cursor: isPointer ? "pointer" : "context-menu",
                        pointerEvents: isPointer ? "all" : "none",
                      }}
                    >
                      <div
                        style={{
                          ...LandmarkmainDivcss,
                          cursor: isPointer ? "pointer" : "context-menu",
                          pointerEvents: isPointer ? "all" : "none",
                        }}
                        onClick={() => handleLandmarkClick(landMark)}
                      >
                        <Typography sx={hoverespinLandmarkcss}>
                          {landMark.title}
                        </Typography>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </Box>
          {/* </TransformComponent>
              );
            }} */}
          {/* </TransformWrapper> */}
        </Box>
      </Box>

      {openModal && (
        <FloorPlanModal
          open={openModal}
          setOpen={setOpenModal}
          images={floorplangalleryimages} // Use the sorted images
          names={floorplangalleryname}
          selectedImage={selectedImage}
        />
      )}
    </>
  );
}

// Styling
const mainbox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  background: "#F3EFE6",
  overflow: "hidden",
};

const imgcss = (isSmallScreen) => ({
  objectFit: isSmallScreen ? "contain" : "contain",
  userSelect: "none",
  pointerEvents: "none",
  //   width: "auto",
  //   height: "100%",
  //   mx: "auto",
  objectPosition: "right center",
});

const svgcss = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "80%",
  //   height: "auto",
  //   maxWidth: "1200px",
  //   maxHeight: "80vh",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const LandmarkMapcssg = {
  cursor: "pointer",
  pointerEvents: "all",
};

const Landmarkforeignobjectcss = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const LandmarkmainDivcss = {
  display: "flex",
  alignItems: "center",
  height: "100%",
};

const hoverespinLandmarkcss = {
  fontFamily: "Roboto",
  fontSize: "15px",
  fontWeight: 700,
  textAlign: "center",
  color: "#FFF",
  background: "#817567",
  border: "1px solid white",
  borderRadius: "16px",
  padding: "4px 10px",
  whiteSpace: "nowrap",
};

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
