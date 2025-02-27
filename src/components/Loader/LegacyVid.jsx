import { Box, Typography, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./loader.css";

const LegacyVid = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);

  // Play/Pause function
  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Mute/Unmute function
  const handleMuteUnmute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Skip function to stop the video and unmount
  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
      videoRef.current.currentTime = 0; // Reset the video playback to the start (optional)
    }
    setIsPlaying(false);
    setFadeOut(true); // Trigger fade out or removal
  };

  return (
    <div className={`legacy ${fadeOut ? "fade-out" : ""}`}>
      {/* Conditionally render the video only if fadeOut is false */}
      {!fadeOut && (
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted} // Controls mute state dynamically
          loop
          // controls
          playsInline
          style={videotag}
          poster={
            "https://arcus-greens.s3.ap-south-1.amazonaws.com/ourlagacyvideo.mp4"
          }
          onTimeUpdate={() => {
            if (videoRef.current.currentTime >= 123) {
              handleSkip(); // Call the skip function after 5 seconds
            }
          }} // Call the skip function when the video ends
        >
          <source
            src={
              "https://arcus-greens.s3.ap-south-1.amazonaws.com/ourlagacyvideo.mp4"
            }
            type="video/mp4"
          />
        </video>
      )}

      {/* Custom Controls */}
      {!fadeOut && (
        <Box
          sx={{
            position: "absolute",
            bottom: 20, // Position controls upwards
            left: 10,
            display: "flex",
            gap: 2, // Add space between control buttons
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background for better visibility
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {/* Play/Pause Button */}
          <IconButton sx={{ color: "white" }} onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          {/* Mute/Unmute Button */}
          <IconButton sx={{ color: "white" }} onClick={handleMuteUnmute}>
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Box>
      )}

      {/* Skip Button */}
      <Box
        sx={{
          position: "absolute",
          bottom: 35, // Position the skip button
          right: 10,
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontFamily: "Segoeui",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleSkip} // Call the skip function
        >
          Skip <KeyboardDoubleArrowRightIcon />
        </Typography>
      </Box>
    </div>
  );
};

export default LegacyVid;

const videotag = {
  width: "100%",
  height: "100%",
  //   objectFit: "cover",
};
