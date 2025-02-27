import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, IconButton, Button } from "@mui/material";
import { ArrowForward, ArrowBack, Close } from "@mui/icons-material";
import ahmedabad from "../assets/images/ahemdabad_lownew.jpg";
import Bangalore1 from "../assets/images/Bengaluru_low.jpg";
import Bangalore from "../assets/images/roseateMainIMG.svg";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Modal Component
const ImageModal = ({
  open,
  setOpen,
  onClose,
  images,
  names,
  currentIndex,
  selectedImage,
  setCurrentIndex,
  setSelectedImage,
}) => {
  if (!open) return null;

  // const goToNextImage = () => {
  //   if (currentIndex < images.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   } else {
  //     setCurrentIndex(0); // Loop back to first image
  //   }
  // };

  // const goToPrevImage = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   } else {
  //     setCurrentIndex(images.length - 1); // Loop back to last image
  //   }
  // };
  const goToNextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(images[currentIndex + 1]); // Update selectedImage to the next image
    } else {
      setCurrentIndex(0); // Loop back to the first image
      setSelectedImage(images[0]); // Set the selected image to the first
    }
  };

  const goToPrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(images[currentIndex - 1]); // Update selectedImage to the previous image
    } else {
      setCurrentIndex(images.length - 1); // Loop back to the last image
      setSelectedImage(images[images.length - 1]); // Set the selected image to the last
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  const goToImage = (index) => {
    setCurrentIndex(index); // Go to the clicked image
  };

  // Handle arrow key press for image navigation

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        goToNextImage();
      } else if (e.key === "ArrowLeft") {
        goToPrevImage();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, currentIndex, images.length]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        zIndex: 10,
        "& .MuiDialog-paper": {
          borderRadius: "16px",
        },
      }}
      PaperProps={{
        style: {
          maxHeight: "90vh",
          overflow: "visible",
          backgroundColor: "black",
        },
      }}
    >
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          padding: 0,
          height: "70vh",
          overflow: "visible",
        }}
      >
        {/* Previous Image Button */}
        <IconButton
          onClick={goToPrevImage}
          sx={{
            position: "absolute",
            left: { lg: "-50px", md: "-50px", sm: "-30px", xs: "-30px" },
            top: "50%",
            transform: "translateY(-50%)",
            ...styles.arrowButton,
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Image */}
        <img
          src={selectedImage || images[currentIndex]}
          defaultValue={selectedImage}
          alt="modal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            padding: "2px",
            backgroundColor: "black",
            borderRadius: "18px",
          }}
        />

        {/* Next Image Button */}
        <IconButton
          onClick={goToNextImage}
          sx={{
            position: "absolute",
            right: { lg: "-50px", md: "-50px", sm: "-30px", xs: "-30px" },
            top: "50%",
            transform: "translateY(-50%)",
            ...styles.arrowButton,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Name Button */}
        <div style={styles.nameButtonContainer}>
          <Button style={styles.nameButton}>
            {names.map((_, index) => (
              <span
                key={index}
                style={
                  {
                    //  backgroundColor: currentIndex === index ? "#fff" : "#bbb",
                  }
                }
              >
                {currentIndex === index && _}
              </span>
            ))}
          </Button>
        </div>

        {/* Close Button */}
        <div style={styles.closeButtonContainer}>
          <IconButton onClick={closeModal} style={styles.closeButton}>
            Close
          </IconButton>
        </div>

        {/* Navigation Dots */}
        <div style={styles.dotsContainer}>
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => goToImage(index)}
              style={{
                ...styles.dot,
                backgroundColor: currentIndex === index ? "#fff" : "#bbb",
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
const FloorPlanModal = ({
  open,
  setOpen,
  images,
  names,
  selectedImage,
  setSelectedImage,
}) => {
  // const images = [ahmedabad, Bangalore, Bangalore1];
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedImage) {
      const index = images.indexOf(selectedImage);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [selectedImage, images]);

  return (
    <div style={styles.container}>
      <ImageModal
        open={open}
        setOpen={setOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        names={names}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  arrowButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "30px",
    color: "white",
    cursor: "pointer",
  },
  closeButtonContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "-40px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    color: "white",
    zIndex: 1000,
  },
  nameButtonContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10000,
    overflow: "visible",
  },
  nameButton: {
    backgroundColor: "white",
    border: "none",
    fontSize: "12px",
    color: "black",
    zIndex: 1000,
    width: "fit-content",
    borderRadius: "20px",
    fontWeight: 600,
    fontFamily: "Roboto",
    textTransform: "capitalize",
    padding: "5px 20px",
  },
  dotsContainer: {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    bottom: "30px", // Adjust as needed
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    margin: "0 5px",
    cursor: "pointer",
  },
};

export default FloorPlanModal;
