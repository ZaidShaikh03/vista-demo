import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import renderToolbar from "./PluginData";
import brocuhure from "../../assets/brochures/Roots_Brochure_Original.pdf";
export default function Brouchermodal({ videomodal, setVideomodal }) {
  const handleClosebrouchermodal = () => setVideomodal(false);

  const pdfFile =
    // "https://arcus-greens.s3.ap-south-1.amazonaws.com/ARCUS_GREENS_BROCHURE_309.pdf";
    "https://arcus-greens.s3.ap-south-1.amazonaws.com/ARCUS_GREENS_BROCHURE_259.pdf";

  const [showPdf, setShowPdf] = useState(false); // State to control PDF display
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
  });

  return (
    <>
      <Modal open={videomodal} onClose={handleClosebrouchermodal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            outline: "none",
            minWidth: {
              xl: 650,
              lg: 650,
              md: 450,
              sm: 400,
              xs: 310,
            },
            bgcolor: "#121212",
            color: "white",
            border: "1px solid #121212",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                // width: "100%",
                width: {
                  xl: "95%",
                  lg: "95%",
                  md: "95%",
                  sm: "95%",
                  xs: "95%",
                },
                height: "100%",
                fontWeight: 600,
                textAlign: "center",
              }}
            ></Typography>
            <CloseIcon
              onClick={handleClosebrouchermodal}
              style={{
                width: "5%",
                cursor: "pointer",
                PointerEvent: "all",
              }}
            />
          </Box>

          <Box
            sx={{
              mt: 1,
              width: {
                xl: "55vw",
                lg: "55vw",
                md: "70vw",
                sm: "90vw",
                xs: "90vw",
              },
              maxHeight: "70vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <video
              src="https://rajyash-frontend-s3.s3.ap-south-1.amazonaws.com/rajyash-files/ROSEATE+ROOTS_90mb.mp4"
              controls
              autoPlay
              style={{ width: "100%", maxHeight: "100%", borderRadius: "8px" }}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
