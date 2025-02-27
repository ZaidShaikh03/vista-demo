import React, { useState } from "react";
import { Slider, Box, Typography } from "@mui/material";

const backgroundImages = [
  "https://via.placeholder.com/800x600/FF0000/FFFFFF?text=Image+1", // Red
  "https://via.placeholder.com/800x600/00FF00/FFFFFF?text=Image+2", // Green
  "https://via.placeholder.com/800x600/0000FF/FFFFFF?text=Image+3", // Blue
];

const ImageChange = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${backgroundImages[value]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.5s ease-in-out",
          position: "absolute",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Typography gutterBottom>Background Image</Typography>
        <Slider
          value={value}
          onChange={handleChange}
          min={0}
          max={backgroundImages.length - 1}
          step={1}
          marks
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
};

export default ImageChange;
