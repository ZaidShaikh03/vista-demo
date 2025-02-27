import { Box, Button, Slider, Typography } from "@mui/material";
import React, { useRef, useState, useEffect, useCallback } from "react";
// import GoyalVid from "../../assets/InteractiveVid/GOYAL_FILM_1.mp4";
import { useNavigate, useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import arrow from "../../assets/timeplapse/backarrow.svg";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import chillMusic from "../../assets/InteractiveVid/Chill.mp3";
const InteractiveVid = () => {
  const GoyalVid =
    "https://arcus-greens.s3.ap-south-1.amazonaws.com/GOYAL_FILM.mp4";
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [videoMute, setVideoMute] = useState(true);

  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState(null);
  const [resumeTime, setResumeTime] = useState(0);
  const [reset, setReset] = useState(false);

  const [lastOverlayTime, setLastOverlayTime] = useState(null);
  const [showControls, setShowControls] = useState(true);

  let inactivityTimeout = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
      audioRef.current.pause(); // Pause music when video is paused
    } else {
      videoRef.current.play();
      audioRef.current.play(); // Play music when video plays
    }
    setIsPlaying(!isPlaying);
  };
  const handleMuteToggle = () => {
    setVideoMute(!videoMute);
    audioRef.current.muted = !videoMute; // Mute/unmute audio
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        handlePlayPause();
        resetInactivityTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying]);

  const handleSpeedChange = (event, newValue) => {
    setPlaybackSpeed(newValue);
    videoRef.current.playbackRate = newValue;
  };

  const handleTimeUpdate = useCallback(
    debounce(() => {
      const currentTime = videoRef.current.currentTime;
      setResumeTime(currentTime);

      const overlayTimes = [
        { time: 92, type: "karnavati" },
        { time: 140, type: "gokuldham" },
      ];

      for (const { time, type } of overlayTimes) {
        if (currentTime >= time - 1 && currentTime < time + 1) {
          if (lastOverlayTime !== time) {
            videoRef.current.pause();
            audioRef.current.pause();
            setIsPlaying(false);
            setShowOverlay(true);
            setOverlayType(type);
            setLastOverlayTime(time);
          }
          break;
        }
      }
    }, 200), // Throttle updates to every 200ms
    [lastOverlayTime]
  );

  const handleContinue = () => {
    setShowOverlay(false);
    videoRef.current.play();
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleExploreKarnavati = () => {
    navigate("/karnavati", {
      state: {
        resumeTime: resumeTime,
        overlayType: "karnavati",
        playbackSpeed: playbackSpeed,
      },
    });
  };

  const handleExploreGokuldham = () => {
    navigate("/gokuldham", {
      state: {
        resumeTime: resumeTime,
        overlayType: "gokuldham",
        playbackSpeed: playbackSpeed,
      },
    });
  };

  useEffect(() => {
    if (reset) {
      videoRef.current.currentTime = 0;
      audioRef.current.currentTime = 0; // Reset audio to start
      videoRef.current.play();
      audioRef.current.play(); // Play both video and audio
      setIsPlaying(true);
      setShowOverlay(false);
      setOverlayType(null);
      setPlaybackSpeed(1);
      setResumeTime(0);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (location.state) {
      const { resumeTime, overlayType, playbackSpeed } = location.state;
      setResumeTime(resumeTime);
      videoRef.current.currentTime = resumeTime;
      setOverlayType(overlayType);
      setPlaybackSpeed(playbackSpeed);
      videoRef.current.playbackRate = playbackSpeed;

      if (overlayType) {
        videoRef.current.pause();
        audioRef.current.pause(); // Pause audio when overlay is shown
        setIsPlaying(false);
        setShowOverlay(true);
      } else {
        videoRef.current.play();
        audioRef.current.play(); // Play audio when video resumes
        setIsPlaying(true);
      }
    } else {
      setReset(true);
    }
  }, [location.state]);

  // Function to reset the inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimeout.current) clearTimeout(inactivityTimeout.current);

    // Show controls when there is activity
    setShowControls(true);

    // Hide controls after 5 seconds of inactivity
    inactivityTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  };

  useEffect(() => {
    // Event listeners to detect user interactions
    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    resetInactivityTimer(); // Set initial inactivity timer

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      clearTimeout(inactivityTimeout.current); // Clean up the timer
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{
          background: "black",
          display: "flex",
          gap: "10px",
          flexDirection: "row",
          PointerEvent: "all",
          color: "white",
          borderRadius: "7px",
          position: "fixed",
          top: 10,
          left: 10,
          textTransform: "none",
          cursor: "pointer",
          zIndex: 1,
          ":hover": {
            backgroundColor: "black",
          },
        }}
      >
        <Box component={"img"} src={arrow} />
        Back
      </Button>
      <Box
        component="video"
        ref={videoRef}
        src={GoyalVid}
        autoPlay
        loop={false}
        muted={true}
        onTimeUpdate={handleTimeUpdate}
        sx={{ height: "100%", width: "100%", objectFit: "cover" }}
      />
      <Box component="audio" ref={audioRef} autoPlay loop>
        <Box component="source" src={chillMusic} type="audio/mp3" />
      </Box>
      {/* <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
        }}
      >
        <Box
          onClick={handlePlayPause}
          // variant="contained"
          sx={ButtonStyles}
        >
          {isPlaying ? (
            <PauseIcon
              sx={{
                color: "white",
              }}
            />
          ) : (
            <PlayArrowIcon
              sx={{
                color: "white",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            // position: "absolute",
            // bottom: "20px",
            // left: "10px",
            // zIndex: 10,
            width: "200px",
          }}
        >
          <Slider
            value={playbackSpeed}
            onChange={handleSpeedChange}
            aria-labelledby="playback-speed-slider"
            step={0.5}
            min={0.5}
            max={5}
            marks
            valueLabelDisplay="auto"
            sx={{
              color: "black",
            }}
          />
          <Box color="white" textAlign="center">
            Speed: {playbackSpeed}x
          </Box>
        </Box>
        <Box
          onClick={(e) => {
            setReset(true);
            handleSpeedChange(e, 1);
            navigate("/interactive");
          }}
          sx={ButtonStyles}
          // sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}
        >
          <RestartAltIcon
            sx={{
              color: "white",
            }}
          />
        </Box>
        <Box
          onClick={() => {
            setVideoMute(!videoMute);
          }}
          sx={ButtonStyles}
          // sx={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}
        >
          {!videoMute ? (
            <VolumeOffIcon
              sx={{
                color: "white",
              }}
            />
          ) : (
            <VolumeUpIcon
              sx={{
                color: "white",
              }}
            />
          )}
        </Box>
      </Box> */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "20px",
          opacity: showControls ? 1 : 0, // Opacity based on showControls state
          visibility: showControls ? "visible" : "hidden", // Control visibility
          transition: "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out", // Smooth transition
        }}
      >
        <Box onClick={handlePlayPause} sx={ButtonStyles}>
          {isPlaying ? (
            <PauseIcon sx={{ color: "white" }} />
          ) : (
            <PlayArrowIcon sx={{ color: "white" }} />
          )}
        </Box>
        <Box sx={{ width: "200px" }}>
          <Slider
            value={playbackSpeed}
            onChange={handleSpeedChange}
            aria-labelledby="playback-speed-slider"
            step={0.5}
            min={0.5}
            max={5}
            marks
            valueLabelDisplay="auto"
            sx={{ color: "black" }}
          />
          <Box color="white" textAlign="center">
            Speed: {playbackSpeed}x
          </Box>
        </Box>
        <Box
          onClick={(e) => {
            setReset(true);
            handleSpeedChange(e, 1);
            navigate("/interactive");
          }}
          sx={ButtonStyles}
        >
          <RestartAltIcon sx={{ color: "white" }} />
        </Box>
        <Box
          onClick={() => {
            setVideoMute(!videoMute);
            // audioRef.current.pause();
            if (videoMute) {
              audioRef.current.play();
            } else {
              audioRef.current.pause();
            }
          }}
          sx={ButtonStyles}
        >
          {!videoMute ? (
            <VolumeOffIcon sx={{ color: "white" }} />
          ) : (
            <VolumeUpIcon sx={{ color: "white" }} />
          )}
        </Box>
      </Box>

      {showOverlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            // gap: "10px",
          }}
        >
          {overlayType === "karnavati" && (
            <>
              <Box
                variant="contained"
                sx={{
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  height: "100vh",
                  width: "50%", // Adjusted width to fit alongside the second box
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    "& .moveButton": {
                      transform: "scale(1.2)",
                    },
                  },
                }}
                onClick={handleExploreKarnavati}
              >
                <Typography
                  className="moveButton"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    fontFamily: "Segoeui",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  <KeyboardDoubleArrowLeftIcon />
                  &nbsp; Explore Karnavati
                </Typography>
              </Box>
              {/* White line with shadow in the middle */}
              <Box
                sx={{
                  width: "4px",
                  height: "100vh",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 10px 10px rgba(1, 97, 155, 1)", // Box shadow with color 01619B
                  position: "relative",
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  height: "100vh",
                  width: "50%", // Adjusted width to fit alongside the first box
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    "& .moveButton": {
                      transform: "scale(1.2)",
                    },
                  },
                }}
                variant="contained"
                onClick={handleContinue}
              >
                <Typography
                  className="moveButton"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    fontFamily: "Segoeui",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  Continue &nbsp; <KeyboardDoubleArrowRightIcon />
                </Typography>
              </Box>
            </>
          )}
          {overlayType === "gokuldham" && (
            <>
              {/* <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={handleExploreGokuldham}
              >
                Explore Gokuldham
              </Button>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={handleContinue}
              >
                Continue
              </Button> */}
              <Box
                variant="contained"
                sx={{
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  height: "100vh",
                  width: "100%",
                  borderRight: "1px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    "& .moveButton": {
                      transform: "scale(1.3)",
                    },
                  },
                }}
                onClick={handleExploreGokuldham}
              >
                {/* <Typography> */}
                <Typography
                  className="moveButton"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    fontFamily: "Segoeui",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  <KeyboardDoubleArrowLeftIcon />
                  &nbsp; Explore Gokuldham
                </Typography>

                {/* </Typography> */}
              </Box>
              <Box
                sx={{
                  width: "4px",
                  height: "100vh",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 10px 10px rgba(1, 97, 155, 1)", // Box shadow with color 01619B
                  position: "relative",
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  height: "100vh",
                  width: "100%",
                  borderLeft: "1px solid white",
                  display: "flex",
                  // flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    "& .moveButton": {
                      transform: "scale(1.3)",
                    },
                  },
                }}
                variant="contained"
                onClick={handleContinue}
              >
                <Typography
                  className="moveButton"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                    fontFamily: "Segoeui",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  Continue &nbsp; <KeyboardDoubleArrowRightIcon />
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default InteractiveVid;
const ButtonStyles = {
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  padding: "10px",
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
