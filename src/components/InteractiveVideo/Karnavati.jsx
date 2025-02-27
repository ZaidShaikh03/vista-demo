import React from "react";
import Views360 from "./Views360";
import KarnavtiImg from "../../assets/InteractiveVid/karnavati.jpg";
import { Box, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
const Karnavati = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Navigate back to the interactive video page, pass the state
    navigate("/interactive", {
      state: {
        resumeTime: location.state.resumeTime, // Pass back the time
        overlayType: "karnavati", // Preserve overlay state
        playbackSpeed: location.state.playbackSpeed,
      },
    });
  };

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 2,
          height: "40px",
          width: "40px",
          backgroundColor: "black",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 0 4px 0px black",
            transform: "scale(1.1)",
          },
        }}
        onClick={handleBack}
      >
        <ReplyIcon
          sx={{
            color: "white",
          }}
        />
      </Box>
      <Views360
        image={
          "https://arcus-greens.s3.ap-south-1.amazonaws.com/interactive/karnavati.jpg"
        }
      />
    </Box>
  );
};

export default Karnavati;
