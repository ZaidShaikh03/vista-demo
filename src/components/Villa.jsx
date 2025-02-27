import React from "react";
import { Box } from "@mui/material";
import VillaBg from "../assets/villa/villa-bg.png";
import GoyalHeader from "../components/GoyalHeader";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader/loader";
import standardimg from "../assets/villa/image 133.svg";

export default function Villa() {
  const location = useLocation();
  const propertydata = location?.state?.mapData;

  return (
    <>
      <Loader />
      <Box sx={mainbox}>
        <GoyalHeader />

        <Box
          component={"img"}
          src={propertydata?.bgimg ? propertydata?.bgimg : standardimg}
          alt="Foreground"
          className="image-map"
          sx={propertyimg}
        />
      </Box>
    </>
  );
}

const mainbox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundImage: `url(${VillaBg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  overflow: "hidden",
  transition: "all 0.5s",
};

const propertyimg = {
  width: "auto",
  height: {
    xl: "75vh",
    lg: "75vh",
    md: "55vh",
    sm: "55vh",
    xs: "55vh",
  },
};
