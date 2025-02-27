import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, Button, IconButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";
import GokulDhamImg from "../../assets/InteractiveVid/gokuldham.jpg";
const Views360 = ({ image }) => {
  const [fade, setFade] = useState(false); // State for fade effect
  const [loading, setLoading] = useState(false); // State for loader
  const [isDragging, setIsDragging] = useState(false); // State for dragging
  const [startX, setStartX] = useState(0); // State for the starting X position when dragging
  const [scrollLeft, setScrollLeft] = useState(0); // State for the initial scroll position when dragging

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  //   const { floors, images } = selectedVilla;

  // Handle image change with fade effect
  const handleImageChange = (image) => {
    setFade(true); // Start fade out

    setTimeout(() => {
      setLoading(true); // Start loader
      setSelectedImage(image); // Change image

      setTimeout(() => {
        setLoading(false); // Stop loader
        setFade(false); // Start fade in
      }, 500); // Adjust the timeout to match the fade duration
    }, 300); // Adjust the timeout to match the fade duration
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

  const [selectedImage, setSelectedImage] = useState(GokulDhamImg);

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
              <CircularProgress color="inherit" /> {/* Loader */}
            </Box>
          )}
          <Canvas className={`canvas-div ${fade ? "fade-out" : "fade-in"}`}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <SphereComponent image={image} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              rotateSpeed={-1}
              dampingFactor={0.1}
            />
          </Canvas>
        </div>
      </div>
    </>
  );
};

const SphereComponent = ({ image }) => {
  const texture = useLoader(THREE.TextureLoader, image);

  // Flip the UVs of the sphere geometry
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // This inverts the geometry

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial map={texture} side={THREE.FrontSide} />
    </mesh>
  );
};

export default Views360;
