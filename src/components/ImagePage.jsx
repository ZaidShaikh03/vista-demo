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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import BackButtonIcon from "../assets/BackButton.svg";

// import baskball from "../assets/sixtyimg/Baskball-Court_360_WM.jpg";
// import children from "../assets/sixtyimg/Kids-&-Kabbadi_wm.jpg";
// import pool from "../assets/sixtyimg/Swimming-Pool_WM.jpg";
// import reception from "../assets/sixtyimg/Top-Cam_WM.jpg";
// import dtc from "../assets/sixtyimg/Driveway-to-Clubhouse_WM.jpg";
// import play from "../assets/sixtyimg/Play-Area_WM.jpg";
// import steppedplaza from "../assets/sixtyimg/Stepped-Plaza_wm.jpg";
// import workingpods from "../assets/sixtyimg/Working-Pods_wm.jpg";
// import tabletanish from "../assets/sixtyimg/Table-Tennis-&-Billiards_wm.jpg";
import Loader from "../components/Loader/loader";

import WorkingPods from "../assets/Sattvalumina/small size/Working-Pods_wm.png";
import SteppedPlaza from "../assets/Sattvalumina/small size/Stepped-Plaza_wm.png";
import TopCam from "../assets/Sattvalumina/small size/Top-Cam_WM.png";
import KidsKabaddi from "../assets/Sattvalumina/small size/Kids-&-Kabbadi_wm.png";
import PlayArea from "../assets/Sattvalumina/small size/Play-Area_WM.png";
import DriveWayToClubHouse from "../assets/Sattvalumina/small size/Driveway-to-Clubhouse_WM.png";
import BasketBallCourt from "../assets/Sattvalumina/small size/Baskball-Court_360_WM.png";
import SwimmingPool from "../assets/Sattvalumina/small size/Swimming-Pool_WM.png";
import TableTennis from "../assets/Sattvalumina/small size/Table-Tennis-&-Billiards_wm.png";

import OfficeSpace from "../assets/Sattvalumina/small size/C-H-Office-Space_wm.png";
import SwimmingPool2 from "../assets/Sattvalumina/small size/Swimming-Pool_WM-1.png";
import TuitionRoom from "../assets/Sattvalumina/small size/Tuition-Room_WM.png";

const ImageSwitcher = () => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false); // State for dragging
  const [startX, setStartX] = useState(0); // State for the starting X position when dragging
  const [scrollLeft, setScrollLeft] = useState(0); // State for the initial scroll position when dragging
  const navigate = useNavigate();

  // Define the array of images with their titles
  // const images = [
  //   {
  //     id: 1,
  //     title: "Box Cricket",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/Villa_+A01/CRICKET_PICKLEBALL_CAM%2B07.jpg",
  //     defaultAngle: 0.01,
  //   },
  //   {
  //     id: 2,
  //     title: "Reception",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/CAM+05.jpg",
  //     defaultAngle: -0.01,
  //   },
  //   {
  //     id: 3,
  //     title: "Indoor Games",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/INDOOR_CAM+11.jpg",
  //     defaultAngle: -1.57,
  //   },
  //   {
  //     id: 4,
  //     title: "Multipurpose hall",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/HALL_CAM+10.jpg",
  //     defaultAngle: -1.6,
  //   },
  //   {
  //     id: 5,
  //     title: "Mini Movie Theater",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/THEATRE_CAM+12.jpg",
  //     defaultAngle: -1.55,
  //   },
  //   {
  //     id: 6,
  //     title: "Pickle Ball",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/CRICKET_PICKLEBALL_CAM+07.jpg",
  //     defaultAngle: -3.1,
  //   },
  //   {
  //     id: 7,
  //     title: "Gazebo",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/Cam_16_gazebo.webp",
  //     defaultAngle: -1.56,
  //   },
  //   {
  //     id: 8,
  //     title: "Kids Play Area",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images_new/club/Kids_Play_Area.jpg",
  //     defaultAngle: -1.93,
  //   },
  //   {
  //     id: 9,
  //     title: "Swimming Pool",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/POOL_CAM+08.jpg",
  //     defaultAngle: -1.55,
  //   },
  //   {
  //     id: 10,
  //     title: "Change rooms",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/Cam_17_change_rooms.webp",
  //     defaultAngle: -1.55,
  //   },

  //   {
  //     id: 11,
  //     title: "Yoga Deck",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/CAM+15.jpg",
  //     defaultAngle: -1.5,
  //   },
  //   {
  //     id: 12,
  //     title: "Gymnasium",
  //     img: "https://arcus-greens.s3.ap-south-1.amazonaws.com/villa_images/club/GYM_CAM+14.jpg",
  //     defaultAngle: -1.56,
  //   },

  //   // Add more images as needed
  // ];

  const images = [
    {
      id: 1,
      type: "Tuition Room",
      name: "Tuition Room",
      color: "black",
      points: "289,722",
      img: TuitionRoom,
      defaultAngle: 0.01,
    },
    {
      id: 2,
      type: "Office Space",
      name: "Office Space",
      color: "black",
      points: "317,767",
      img: OfficeSpace,
      defaultAngle: 0.01,
    },
    // {
    //   id: 3,
    //   type: "Lawn",
    //   name: "Lawn",
    //   color: "black",
    //   points: "676,654",
    //   img: steppedplaza,
    //   defaultAngle: 0.01,
    // },
    // {
    //   id: 4,
    //   type: "Cricket Practice",
    //   name: "Cricket Practice",
    //   color: "black",
    //   points: "706,826",
    //   img: reception,
    //   defaultAngle: 0.01,
    // },
    // {
    //   id: 5,
    //   type: "Cricket Practice",
    //   name: "Cricket Practice",
    //   color: "black",
    //   points: "706,826",
    //   img: tennis,
    //   defaultAngle: 0.01,
    // },
    {
      id: 6,
      type: "Pool",
      name: "Pool",
      color: "black",
      points: "754,688",
      img: SwimmingPool,
      defaultAngle: 0.01,
    },
    {
      id: 7,
      type: "Water Feature",
      name: "Water Feature",
      color: "black",
      points: "781,688",
      img: SwimmingPool2,
      defaultAngle: 0.01,
    },
    {
      id: 8,
      type: "Water Garden",
      name: "Water Garden",
      color: "black",
      points: "783,744",
      img: WorkingPods,
      defaultAngle: 0.01,
    },
    // {
    //   id: 9,
    //   type: "Gym",
    //   name: "Gym",
    //   color: "black",
    //   points: "1049,424",
    //   img: tabletanish,
    //   defaultAngle: 0.01,
    // },
    {
      id: 10,
      type: "Bedminton court",
      name: "Bedminton court",
      color: "black",
      points: "1033,400",
      img: BasketBallCourt,
      defaultAngle: 0.01,
    },
    {
      id: 11,
      type: "Indoor Games",
      name: "Indoor Games",
      color: "black",
      points: "1044,370 ",
      img: TableTennis,
      defaultAngle: 0.01,
    },
    // {
    //   id: 12,
    //   type: "Indoor Games",
    //   name: "Indoor Games",
    //   color: "black",
    //   points: "1372,424",
    //   img: pool,
    //   defaultAngle: 0.01,
    // },
    {
      id: 13,
      type: "Play Area",
      name: "Play Area",
      color: "black",
      points: "1366,392",
      img: PlayArea,
      defaultAngle: 0.01,
    },

    {
      id: 14,
      type: "Top Cam",
      name: "Top Cam",
      color: "black",
      points: "1366,392",
      img: TopCam,
      defaultAngle: 0.01,
    },

    {
      id: 15,
      type: "Driveway-to-Clubhouse",
      name: "Driveway-to-Clubhouse",
      color: "black",
      points: "1366,392",
      img: DriveWayToClubHouse,
      defaultAngle: 0.01,
    },

    {
      id: 16,
      type: "PlayArea",
      name: "PlayArea",
      color: "black",
      points: "1366,392",
      img: KidsKabaddi,
      defaultAngle: 0.01,
    },

    {
      id: 17,
      type: "Stepped Plaza",
      name: "Stepped Plaza",
      color: "black",
      points: "1366,392",
      img: SteppedPlaza,
      defaultAngle: 0.01,
    },

    // {
    //   id: 14,
    //   type: "Cricket Practice",
    //   name: "Cricket Practice",
    //   color: "black",
    //   points: "1469,382",
    //   img: tennis,
    //   defaultAngle: 0.01,
    // },
    // {
    //   id: 15,
    //   type: "Play Area",
    //   name: "Play Area",
    //   color: "black",
    //   points: "596,877",
    //   img: play,
    //   defaultAngle: 0.01,
    // },
  ];

  const location = useLocation();
  const { landMark } = location.state || {};

  // const [firstImage] = images;
  // const restImages = images.slice(1);
  const restImages = images;

  // State to keep track of selected image
  const [selectedImage, setSelectedImage] = useState(landMark.img); // Start with the first image
  const [fade, setFade] = useState(false); // State for fade effect
  const [loading, setLoading] = useState(false);
  const [defaultAngle, setDefaultAngle] = useState(landMark.angle || 0);
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

  // const buttonRefs = useRef([]);

  // useEffect(() => {
  //   const selectedIndex = restImages.findIndex(
  //     (image) => image.img === selectedImage
  //   );
  //   if (buttonRefs.current[selectedIndex]) {
  //     buttonRefs.current[selectedIndex].scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //       inline: "center",
  //     });
  //   }
  // }, [selectedImage, restImages]);

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
              // backgroundColor: "#2F574B",
              // transform: "scale(1.1)", // Optionally, you can add this to scale the entire box on hover
              "& div": {
                transform: "scale(1.1)",
                // background:
                //   "linear-gradient(180deg, #2F574B 0%, #395E45 28.47%, #4A683B 66.97%, #758321 100%)",

                // Increase the size of the icon
              },
              // "& img": {
              //   transform: "scale(1.2)", // Increase the size of the icon
              // },
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
            {/* Render the first image first */}
            {/*   <Button
              onClick={() => handleImageChange(landMark.img)}
              sx={{
                background:
                  selectedImage === landMark.img
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(35, 35, 35, 0.5)",
                color: selectedImage === landMark.img ? "black" : "white",
                padding: "5px 20px",
                alignSelf: "center",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
                fontSize: "0.7rem",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                fontWeight: selectedImage === landMark.img ? 600 : 400,
                width: "fit-content",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  background:
                    selectedImage === landMark.img
                      ? "rgba(255, 255, 255, 0.85)"
                      : "rgba(35, 35, 35, 0.9)",
                  color:
                    selectedImage === landMark.img
                      ? "black"
                      : "rgba(255, 255, 255, 1)",
                },
              }}
            >
              {landMark.title}
            </Button> */}

            {/* Render the rest of the images */}
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

const ToogleBtn = {
  cursor: "pointer",
  zIndex: 2,
  padding: "5px 20px",
  fontFamily: "Montserrat",
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

const View360Details = {
  color: "white",
  "& div": {
    display: "flex",
    gap: "1rem",
    justifyContent: "space-between",
  },
};
