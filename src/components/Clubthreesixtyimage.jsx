import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, Button, IconButton, Typography } from "@mui/material"; // Assuming you're using Material UI
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import View360Canvas from "./View360Canvas";
import BackButtonIcon from "../assets/BackButton.svg";
import Loader from "../components/Loader/loader";
import clubhouse from "../../src/assets/Sattvalumina/small size/Swimming-Pool_WM-1.png";
import swiming from "../../src/assets/Sattvalumina/small size/Swimming-Pool_WM.png";
import stution from "../../src/assets/Sattvalumina/small size/Tuition-Room_WM.png";
import tabeltennis from "../../src/assets/Sattvalumina/small size/Table-Tennis-&-Billiards_wm.png";
import office from "../../src/assets/Sattvalumina/small size/C-H-Office-Space_wm.png";
import indoor from "../../src/assets/Sattvalumina/small size/Indoor-Game_wm.png";
import cafeandreception from "../../src/assets/Sattvalumina/small size/Cafe-&-Reception_WM.png";
import vrgame from "../../src/assets/Sattvalumina/small size/VR-Game-Room_WM.png";
import yogadesk from "../../src/assets/Sattvalumina/small size/Yoga_WM.jpg";
import partyHall from "../assets/Sattvalumina/small size/Party-Hall_WM.jpg";
import creche from "../assets/Sattvalumina/small size/Creche_wm.jpg";
const ImageSwitcher = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false); // State for dragging
  const [startX, setStartX] = useState(0); // State for the starting X position when dragging
  const [scrollLeft, setScrollLeft] = useState(0); // State for the initial scroll position when dragging
  const navigate = useNavigate();

  const images = [
    {
      id: 1,
      type: "Club House",
      name: "Club House",
      img: clubhouse,
      defaultAngle: 0.01,
    },
    {
      id: 2,
      type: "Swimming Pool",
      name: "Swimming Pool",
      img: swiming,
      defaultAngle: 0.01,
    },
    {
      id: 3,
      type: "tuition room",
      name: "tuition room",
      img: stution,
      defaultAngle: 0.01,
    },
    {
      id: 4,
      type: "Table Tennis & Billiards",
      name: "Table Tennis & Billiards",
      img: tabeltennis,
      defaultAngle: 0.01,
    },
    {
      id: 5,
      type: "office space",
      name: "office space",
      img: office,
      defaultAngle: 0.01,
    },
    {
      id: 6,
      type: "indoor games",
      name: "indoor games",
      img: indoor,
      defaultAngle: 0.01,
    },
    {
      id: 7,
      type: "cafe and reception",
      name: "cafe and reception",
      img: cafeandreception,
      defaultAngle: 0.01,
    },
    {
      id: 8,
      type: "VR game room",
      name: "VR game room",
      img: vrgame,
      defaultAngle: 0.01,
    },
    {
      id: 9,
      type: "Yoga Room",
      name: "Yoga Room",
      img: yogadesk,
      defaultAngle: 0.01,
    },
    {
      id: 10,
      type: "Party Hall",
      name: "Party Hall",
      img: partyHall,
      defaultAngle: 0.01,
    },
    {
      id: 11,
      type: "Creche",
      name: "Creche",
      img: creche,
      defaultAngle: 0.01,
    },
  ];

  const location = useLocation();
  const { el } = location.state || {};

  console.log(el?.img, "dffknfnklfdlknfdkln");

  // const [firstImage] = images;
  // const restImages = images.slice(1);
  const restImages = images;

  // State to keep track of selected image
  const [selectedImage, setSelectedImage] = useState(
    el?.img || images?.at(0)?.img
  ); // Start with the first image
  const [fade, setFade] = useState(false); // State for fade effect
  const [loading, setLoading] = useState(false);
  const [defaultAngle, setDefaultAngle] = useState(
    el?.angle || images?.at(0)?.defaultAngle
  );
  const [resetTrigger, setResetTrigger] = useState(0);

  // Function to handle image change on button click

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

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev); // Toggle the isExpanded state
  };

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
      <div
        onClick={() => navigate(-1)}
        style={{
          cursor: "pointer",
          pointerEvents: "all",
          position: "fixed",
          top: 10,
          left: 10,
          padding: "5px 15px",
          borderRadius: "5px",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            height: "60px",
            width: "60px",
            backgroundColor: "white",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            pointerEvents: "all",
            transition: "all 0.2s",
            boxShadow:
              "inset 0px 10px 10px rgba(0, 0, 0, 0.2), inset 5px 5px 15px rgba(0, 0, 0, 0.1)", // Uneven inner shadow
            "& img": {
              transition: "all 0.2s",
            },
            "& div": {
              background: "rgba(47, 87, 75, 1)",
              transition: "all 0.2s",
            },
            "&:hover": {
              "& div": {
                transform: "scale(1.1)",
              },
            },
          }}
        >
          <Box
            sx={{
              height: "70%",
              width: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <Box component="img" src={BackButtonIcon} />
          </Box>
        </Box>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CircularProgress color="inherit" />
            {/* Loader */}
          </Box>
        )}
        <View360Canvas
          selectedImage={selectedImage}
          defaultAngle={defaultAngle}
          resetTrigger={resetTrigger}
        />
      </div>
      <Box
        sx={{
          position: "fixed",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 2,
        }}
      >
        <IconButton
          onClick={scrollLeftFunc}
          sx={{
            marginRight: "20px",
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </IconButton>

        <Box
          ref={scrollContainerRef}
          sx={{
            overflowX: "auto",
            display: "flex",
            justifyContent: "flex-start",
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
          <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
            {restImages.map((image, index) => (
              <Button
                key={index}
                onClick={() => handleImageChange(image.img, image.defaultAngle)}
                sx={{
                  background:
                    selectedImage === image.img
                      ? "rgba(255, 255, 255, 0.85)"
                      : "rgba(35, 35, 35, 0.5)",
                  color: selectedImage === image.img ? "black" : "white",
                  padding: "5px 20px",
                  alignSelf: "center",
                  textTransform: "capitalize",
                  fontFamily: "Roboto",
                  fontSize: "0.7rem",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  fontWeight: selectedImage === image.img ? 600 : 400,
                  width: "fit-content",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    background:
                      selectedImage === image.img
                        ? "rgba(255, 255, 255, 0.85)"
                        : "rgba(35, 35, 35, 0.9)",
                    color:
                      selectedImage === image.img
                        ? "black"
                        : "rgba(255, 255, 255, 1)",
                  },
                }}
              >
                {image.type}
              </Button>
            ))}
          </div>
        </Box>
        <IconButton
          onClick={scrollRightFunc}
          sx={{
            marginRight: "20px",
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
    </div>
  );
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

export default ImageSwitcher;
