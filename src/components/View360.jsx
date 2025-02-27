import React, { Suspense, useState, useRef, useEffect } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import floorimg from "../assets/Sattvalumina/Floor/floor.png";
import SatvaHeader from "./Headers/SatvaHeader";
import { Typography, Box, Button } from "@mui/material";
import "./View360.css";
import childrenPark from "../assets/Secondpage/childrenPlayArea.png";
// import Dummy1 from "../assets/Sattvalumina/C H Office Space_wm 1.png";
import Dummy2 from "../assets/Sattvalumina/Living_wm.png";
import Dummy3 from "../assets/Sattvalumina/Master Bedroom 1.png";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import { useLocation } from "react-router-dom";
import ExpandableBox from "./DropdownAnimation";
import Loader from "./Loader/loader";
import { getHouseNumber } from "../utils/HelperFunctions";
import { floornumberdata } from "../utils/floorpladata";
import { APARTMENTTYPESENUM } from "../utils/apartmentTypes";
import StudioBedroom from "../assets/Sattvalumina/small size/Studio-Apartment_1Bhk_Bedroom_wm.png";
import StudioLiving from "../assets/Sattvalumina/small size/Studio-Apartment_1BHK_Living_wm.png";
import oneBHKBedroom from "../assets/Sattvalumina/small size/Bedroom-1Bhk_wm.png";
import oneBHKLiving from "../assets/Sattvalumina/small size/Living-1BHK_1T_Type-1_WM.png";
import twoBHKBedRoom from "../assets/Sattvalumina/small size/Bedroom_2BHK_2T-Type2_B2_wm.png";
import twoBHKLiving from "../assets/Sattvalumina/small size/Living_2BHK_2T-Type2_B2_WM.png";
import threeBHKBedRoom from "../assets/Sattvalumina/small size/Bedroom-1Bhk_wm.png";
import threeBHKLiving from "../assets/Sattvalumina/small size/Living_wm.png";
import threeBHKMasterBedRoom from "../assets/Sattvalumina/small size/Master-Bedroom-1.png";
const images = [
  // {
  //   id: 1,
  //   title: "Box Cricket",
  //   img: Dummy1,
  //   defaultAngle: 0.01,
  // },
  {
    id: 2,
    title: "Hall",
    img: Dummy2,
    defaultAngle: -1.25,
  },
  {
    id: 3,
    title: "Bedroom",
    img: Dummy3,
    defaultAngle: -1.2,
  },
];
const imagesFilter = {
  Studio: [
    {
      id: 1,
      title: "Bedroom",
      img: StudioBedroom,
      defaultAngle: -1.25,
    },
    {
      id: 2,
      title: "Living Room",
      img: StudioLiving,
      defaultAngle: -1.2,
    },
  ],
  "1BHK": [
    {
      id: 1,
      title: "Living Room",
      img: oneBHKLiving,
      defaultAngle: -1.25,
    },
    {
      id: 2,
      title: "Bedroom",
      img: oneBHKBedroom,
      defaultAngle: -1.2,
    },
  ],
  "2BHK": [
    {
      id: 1,
      title: "Living Room",
      img: twoBHKLiving,
      defaultAngle: -1.25,
    },
    {
      id: 2,
      title: "Bedroom",
      img: twoBHKBedRoom,
      defaultAngle: -1.2,
    },
  ],
  "3BHK": [
    {
      id: 1,
      title: "Living Room",
      img: threeBHKLiving,
      defaultAngle: -1.25,
    },
    {
      id: 2,
      title: "Bedroom",
      img: threeBHKBedRoom,
      defaultAngle: -1.2,
    },
    {
      id: 3,
      title: "Master Bedroom",
      img: threeBHKMasterBedRoom,
      defaultAngle: -1.2,
    },
  ],
};

function View360() {
  const [fade, setFade] = useState(false); // State for fade effect
  const [loading, setLoading] = useState(false);
  const [defaultAngle, setDefaultAngle] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false); // State for dragging
  const [startX, setStartX] = useState(0); // State for the starting X position when dragging
  const [scrollLeft, setScrollLeft] = useState(0); // State for the initial scroll position when dragging
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev); // Toggle the isExpanded state
  };

  const location = useLocation();
  const mapData = location.state?.mapData;
  const wing = mapData?.type;
  console.log(location?.state?.data, "location hell0");
  const aptData = location?.state?.data;
  const floorNumber = location?.state?.currentFloor;
  const wingType = location?.state?.wingType;
  const aptType = aptData.filterType.split(" ")[0];
  console.log("wingType", "wingType", aptType);
  const [selectedImage, setSelectedImage] = useState(
    imagesFilter[aptType].at(0)?.img
  ); // Start with the first image
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const SphereComponent = ({ image }) => {
    const texture = useLoader(THREE.TextureLoader, image);

    texture.anisotropy = 16;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    const geometry = new THREE.SphereGeometry(500, 120, 80);
    geometry.scale(-1, 1, 1);
    return (
      <mesh geometry={geometry}>
        <meshBasicMaterial
          map={texture}
          side={THREE.FrontSide}
          toneMapped={false}
        />
      </mesh>
    );
  };

  const CustomOrbitControls = ({ defaultAngle, resetTrigger, onDragStart }) => {
    const controlsRef = useRef(null);
    const cameraRef = useRef(null);

    useEffect(() => {
      if (controlsRef.current) {
        controlsRef.current.reset();
        controlsRef.current.setAzimuthalAngle(-defaultAngle);
        controlsRef.current.update();

        controlsRef.current.addEventListener("start", onDragStart);
      }
    }, [defaultAngle, resetTrigger, onDragStart]);
    useFrame(() => {
      if (controlsRef.current) {
        const azimuthalAngle = controlsRef.current.getAzimuthalAngle();

        // console.log("Polar Angle:", polarAngle * 100);
      }
    });

    return (
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        rotateSpeed={-1}
        dampingFactor={0.1}
      />
    );
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // The multiplier can be adjusted for faster/slower scrolling
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftFunc = () => {
    scrollContainerRef.current.scrollBy({
      left: -100, // Scroll left by 100px
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  const scrollRightFunc = () => {
    scrollContainerRef.current.scrollBy({
      left: 100, // Scroll right by 100px
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  const handleImageChange = (image, angle) => {
    setFade(true); // Start fade out

    setTimeout(() => {
      //  setLoading(true); // Start loader
      setSelectedImage(image); // Change image

      setDefaultAngle(angle);
      setResetTrigger((prev) => prev + 1);
      setTimeout(() => {
        // setLoading(false); // Stop loader
        setFade(false); // Start fade in
      }, 50); // Adjust the timeout to match the fade duration
    }, 10); // Adjust the timeout to match the fade duration
  };

  const handleDragStart = () => {
    setFade(true);
  };
  function getHouseNumber(apartmentNum, currentFloor, floornumberdata) {
    // Find the apartment data based on apartmentNum
    // console.log("wing Hellofloornumberdata", floornumberdata);
    const apartment = floornumberdata?.find(
      (apartment) => apartment?.apartmentNum === apartmentNum
    );

    if (!apartment) {
      return `${apartmentNum}`;
    }

    // Get the wing letter from the type (e.g., "winga" => "A")
    const wing = wingType?.replace("wing", "")?.toLowerCase();
    // console.log("wing Hello", wing, apartment?.type, apartment);

    // Format the floor and apartmentNum into 2-digit values
    const floorString = String(currentFloor)?.padStart(2, "0");
    const apartmentNumString = String(apartmentNum)?.padStart(2, "0");

    // Construct and return the house number
    return `${wing?.toUpperCase()}${floorString}${apartmentNumString}`;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Loader />
      <SatvaHeader />

      <div style={{ flex: 1, position: "relative" }}>
        <Canvas
          className={`canvas-div ${fade ? "fade-out" : "fade-in"}`}
          camera={{
            // far: 500/0,
            fov: 90,
          }}
        >
          <ambientLight intensity={Math.PI / 2} />

          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <SphereComponent
              image={selectedImage}
              defaultAngle={defaultAngle}
            />
          </Suspense>
          <CustomOrbitControls
            defaultAngle={defaultAngle}
            resetTrigger={resetTrigger}
            onDragStart={handleDragStart}
          />
        </Canvas>
      </div>

      {!fade && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            overflow: "hidden",
            flexDirection: "column",
            pointerEvents: "none",
          }}
        >
          <div class="outer-circle">
            <div class="inner-circle">
              <div class="text">
                <h1>360Â°</h1>
                <p>Use your cursor to move around </p>
                <p>the room</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "35%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          ref={scrollContainerRef}
          sx={{
            overflowX: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0",
            cursor: isDragging ? "grabbing" : "grab",
            flex: 1,
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255, 255, 255, 0.50)",
              borderRadius: "4px",
            },
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "2rem" }}>
            {imagesFilter[aptType]?.map((image, idx) => (
              // {[...Array(6)].map((data, idx) => (
              <Box
                key={idx}
                sx={{ ...mappeddatabox }}
                onClick={() => handleImageChange(image.img, image.defaultAngle)}
              >
                <Box
                  component="img"
                  src={image.img}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Make sure the image fills the box properly
                    position: "absolute", // Ensure it stays behind the text and icon
                    top: 0,
                    left: 0,
                    borderRadius: "8px",
                    border:
                      image.img === selectedImage ? "2px solid white" : "none",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute", // Centered on top of the image
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                  }}
                >
                  <ThreeSixtyIcon />
                  <Typography sx={{ fontSize: "11px", whiteSpace: "nowrap" }}>
                    {image.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </div>
        </Box>
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          right: 10,
          padding: "5px 15px",
          borderRadius: "5px",
          zIndex: 1,
        }}
      >
        <ExpandableBox isExpanded={isExpanded}>
          <Box
            sx={{
              mt: "-10px",
            }}
          >
            <Box
              sx={{
                background: "rgba(0, 0, 0, 0.14)",
                color: "white",
                borderRadius: "10px",
                textAlign: "center",
                padding: "15px",
                width: "fit-content",
                pointerEvents: "all",
                height: "fit-content",
              }}
            >
              <Typography sx={{ textAlign: "left", fontSize: "13px" }}>
                UNIT{" "}
                {getHouseNumber(
                  aptData.apartmentNum,
                  floorNumber,
                  floornumberdata
                )}
              </Typography>
              {/* <Typography sx={{ textAlign: "left", fontSize: "13px" }}>
                001
              </Typography> */}
              <Box
                sx={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  gap: "2rem",
                  justifyContent: "space-between",
                  color: "rgba(165, 165, 165, 1)",
                  fontSize: "12px",
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>| Suit Area</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {aptData?.saleable} Sq. M.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  gap: "2rem",
                  justifyContent: "space-between",
                  color: "rgba(165, 165, 165, 1)",
                  fontSize: "12px",
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>
                  | Balcony Area
                </Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {" "}
                  {aptData?.balcony} Sq. M.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  gap: "2rem",
                  justifyContent: "space-between",
                  color: "rgba(165, 165, 165, 1)",
                  fontSize: "12px",
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>| Carpet Area</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {" "}
                  {aptData?.carpet} Sq. M.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  whiteSpace: "nowrap",
                  gap: "2rem",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: "12px" }}>Total Area</Typography>
                <Typography sx={{ fontSize: "12px" }}>
                  {(
                    aptData?.carpet +
                    aptData?.balcony +
                    aptData?.saleable
                  ).toFixed(2)}{" "}
                  Sq.M
                </Typography>
              </Box>
            </Box>
          </Box>
        </ExpandableBox>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isExpanded ? (
            <Typography onClick={handleToggle} sx={ToogleBtn}>
              hide details
            </Typography>
          ) : (
            <Typography onClick={handleToggle} sx={ToogleBtn}>
              show details
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default View360;

const mappeddatabox = {
  pointerEvents: "all",
  height: {
    xl: "70px",
    lg: "70px",
    md: "70px",
    sm: "60px",
    xs: "70px",
  },
  width: {
    xl: "140px",
    lg: "140px",
    md: "140px",
    sm: "130px",
    xs: "130px",
  },
  zIndex: 1000,
  transition: "all 0.6s",
  borderRadius: "12px",
  cursor: "pointer",
  position: "relative",
};

const ToogleBtn = {
  cursor: "pointer",
  zIndex: 2,
  padding: "5px 20px",
  fontFamily: "Roboto",
  backgroundColor: "rgba(221, 221, 221, 0.32)",
  borderRadius: "8px",
  marginBottom: "5px",
  textAlign: "center",
  textTransform: "capitalize",
  fontSize: "12px",
  fontWeight: 400,
  width: "fit-content",
  color: "rgba(255, 255, 255, 0.9)",
  textShadow: "2px 2px 4px #000000",
};

const view360detailname = {
  fontSize: "13px",
  fontWeight: 500,
  fontFamily: "Roboto",
  flex: "0 1 auto",
  textAlign: "end",
  whiteSpace: "nowrap",
  minWidth: "180px",
  lineHeight: "20px",
};

const view360detailval = {
  fontSize: "13px",
  fontFamily: "Roboto",

  fontWeight: 700,
  flex: "0 1 auto",
  textAlign: "start",
  whiteSpace: "nowrap",
  lineHeight: "20px",
  minWidth: "80px",
};
