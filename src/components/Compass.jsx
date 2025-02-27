import { Box, Typography, Modal, Button } from "@mui/material";
import React, { useState } from "react";
import "./ImageMap.css";
import styles from "./styles.js";
import DisclaimerIcon from "../assets/icons/disclaimericon.svg";
import CloseIcon from "@mui/icons-material/Close";

const Compass = () => {
  const [open, setOpen] = useState(false);

  const showDisclaimer = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          zIndex: 5,
          position: "absolute",
          bottom: 10,
          userSelect: "none",
          pointerEvents: "none",
          WebkitUserDrag: "none",
          WebkitTouchCallout: "none",
          MozUserSelect: "none",
          bgColor: "red",
        }}
      >
        <div class="compass svelte-16rgxa1">
          <div class="compass__wrapper svelte-16rgxa1">
            <div
              class="compass__circle svelte-16rgxa1"
              style={{
                transform: "rotate(1deg)",
              }}
            >
              <div
                class="compass__north svelte-16rgxa1"
                style={{
                  transform: "rotate(-1deg)",
                }}
              >
                N
              </div>
              <div class="compass__arrow svelte-16rgxa1" style={stylen}></div>
            </div>
          </div>
        </div>
      </Box>
      <Box sx={styles.CompassTextMain}>
        <Box sx={disclaimerBtn}>
          <Box
            onClick={showDisclaimer}
            component={"img"}
            src={DisclaimerIcon}
            sx={{
              pointerEvents: "all",
              cursor: "pointer",
            }}
          />

          <Box
            component={"a"}
            href="https://unada.io"
            target="_blank"
            sx={CompassTextSub}
          >
            Designed & Developed by <br />
            Unada Labs Pvt. Ltd.
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalPopup}>
          <Box sx={closebox}>
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Box>
          </Box>
          <Box sx={ModalPopupContent}>
            <Box
              component={"img"}
              src={DisclaimerIcon}
              sx={{
                pointerEvents: "all",
              }}
            />
          </Box>
          <Typography sx={disclaimertitle}>Disclaimer</Typography>
          <Box sx={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            <Typography sx={disclaimerdata}>
              This master plan is provided solely for the purpose of providing
              an impression of the Roseate master plan, as well as the
              approximate location of existing and proposed facilities,
              services, or destinations, and is not intended for any other
              purpose.
            </Typography>
            <Typography sx={disclaimerdata}>
              Rajyash does not make any representation or give any warranty in
              relation to the future developments shown, or the current or
              future amenity, location, or existence of any facilities,
              services, or destinations.
            </Typography>
            <Typography sx={disclaimerdata}>
              This masterplan is based on the intention of Roseate and details
              may change due to future circumstances. Any indications of
              distance or size are approximate and for indicative purposes only,
              and are not to scale. All distances and travel time frames are
              estimates only.
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Compass;

const closebox = {
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
};

const stylen = {
  width: "40px",
  height: "40px",
};

const ModalPopup = {
  bgcolor: "#1F1F1F",
  outline: "none",
  color: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  zIndex: 0,
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "60%",
    lg: "50%",
    xl: "30%",
  },
  maxHeight: "90vh",
  boxShadow: 24,
  borderRadius: "30px",
  p: "30px",
};

const disclaimertitle = {
  textTransform: "uppercase",
  textAlign: "center",
  fontSize: "13px",
  color: "#EEEEEE",
};

const disclaimerdata = {
  color: "#7F7F7F",
  fontSize: "13px",
  fontFamily: "Roboto",
  lineHeight: "15px",
};

const disclaimerBtn = { display: "flex", alignItems: "center", gap: "1.5rem" };

const ModalPopupContent = { textAlign: "center", margin: "5px" };

const CompassText = {
  zIndex: 5,
  position: "absolute",
  bottom: 20,
  left: 80,
  userSelect: "none",
  pointerEvents: "none",
  WebkitUserDrag: "none",
  WebkitTouchCallout: "none",
  MozUserSelect: "none",
  bgColor: "red",
};

const CompassTextSub = {
  fontSize: "8px",
  color: "#bdbdbd",
  opacity: 0.8,
  fontWeight: "Segoeui",
  pointerEvents: "all",
  cursor: "pointer",
  textDecoration: "none",
  transition: "opacity 0.3s",
  display: {
    xl: "flex",
    lg: "flex",
    md: "none",
    sm: "none",
    xs: "none",
  },
  "&:hover": {
    opacity: 1,
  },
  "& div": {
    fontSize: "10px",
  },
};
