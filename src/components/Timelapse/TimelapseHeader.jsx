import React from "react";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import goyalLogo from "../../assets/goyalcologo.svg";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LoginIcon from "@mui/icons-material/Login";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

function Header({ setSidebarOpen }) {
  const [value, setValue] = React.useState("All");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: "short", day: "2-digit" };
    return today.toLocaleDateString("en-US", options);
  };

  const toggleSidebarDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSidebarOpen(open);
  };
  const navigate = useNavigate();

  return (
    <>
      {!isSmallScreen ? (
        <>
          <AppBar
            position="static"
            sx={{
              width: "100vw",
              height: "50px",
              backgroundColor: "black",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "0px !important",
              minHeight: "50px !important",

              }}
            >
              <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    sx={{
                      color: "white",
                      pointerEvents: "all",
                      paddingLeft: "0px",
                      minWidth: "0px",
                      padding: "0px",
                    }}
                  >
                    <img src={goyalLogo} onClick={() => navigate("/")} />
                  </Button>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                 
                 
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: "5rem" }}>
                <Box></Box>
                <Box></Box>
                <Box></Box>
              </Box>
            </Toolbar>
          </AppBar>
        </>
      ) : (
        <>
          <AppBar
            position="static"
            sx={{
              width: "100%",
              boxShadow: "none",
              backgroundColor: "rgba(0,0,0,1)",
            }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{
                  color: "white",
                  pointerEvents: "all",
                  paddingLeft: "0px",
                  minWidth: "0px",
                  padding: "0px",
                }}
              >
                <img src={goyalLogo} onClick={() => navigate("/")} />
              </Button>

            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
}

export default Header;

const tab = {
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "11px",
  textTransform: "none",
  fontFamily: "Roboto",
  opacity: 0.4,
  transition: "opacity 0.3s, font-weight 0.3s",
  "&:hover": {
    opacity: 1,
    color: "#ffffff",
    fontWeight: 700,
  },
  "&.Mui-selected": {
    opacity: 1,
    color: "#ffffff",
  },
};

const tabmobile = {
  fontWeight: 500,
  fontSize: "12px",
  color: "#bbbbbb",
  display: "flex",
  background: "#000000",
  borderRadius: "10px",
  transition: "all 0.3s",
  flex: 1,
  margin: "5px",
  textTransform: "capitalize",
  padding: "5px 10px",
  minHeight: "30px",
  lineHeight: "25px",
};
