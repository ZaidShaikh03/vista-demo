import React from "react";
import { Box } from "@mui/material";
import detailimg from "../../assets/Filtericon/icon/image8.png";
import SatvaHeader from "./SatvaHeader";
import Loader from "../Loader/loader";

function PlotDetail() {
  return (
    <Box sx={box}>
      <Loader />
      <SatvaHeader />
    </Box>
  );
}

export default PlotDetail;

const box = {
  position: "fixed",
  zIndex: 2,
  width: "100%",
  paddingTop: "10px",
  minHeight: "100vh",
  pointerEvents: "none",
  backgroundColor: "rgb(241,236,227)",
  backgroundImage: `url(${detailimg})`,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "background-image 0.5s ease-in-out, opacity 0.5s ease-in-out",
};
