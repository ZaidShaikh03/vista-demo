import React, { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import RajyashLogo from "../../assets/logos/RajyashLogo.svg";
import RajyashTextLogo from "../../assets/logos/RajyashTextLogo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles.js";
import brochureimg from "../../assets/Filtericon/brochure-icon.svg";
import loginIcon from "../../assets/Filtericon/loginIcon.svg";
import profileIcon from "../../assets/Filtericon/profileIcon.svg";
import DynamicModal from "../Login/DynamicModal.jsx";
import Login from "../Login/Login.jsx";
import Brouchermodal from "../Login/Brouchermodal.jsx";
import Cookies from "js-cookie";
// import { getToken } from "../../utils/token.js";

const getToken = () => {
  return Cookies.get("jwt"); // Get JWT token from cookies
};

function Header({ setSidebarOpen, open, setOpen, value, setValue }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const Location = location.pathname;

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

  const [profilemodal, setProfilemodal] = useState(false);
  const handleOpenModal = () => setProfilemodal(true);

  const [isLogin, setIsLogin] = useState(true);
  const [loginmodal, setloginmodal] = useState(true);
  const [otpmodal, setotpmodal] = useState(false);
  const [forgototpmodal, setforgototpmodal] = useState(false);
  const [text, settext] = useState("Login");
  const [sellerLoginModel, setSellerLoginModel] = useState(false);
  const [brouchermodal, setBrouchermodal] = useState(false);
  const handleOpenModalbroucher = () => setBrouchermodal(true);

  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    const checkToken = () => {
      const token = getToken();
      if (location.pathname === "/" && (!token || token === "undefined")) {
        setloginmodal(true); // Show modal if token is missing
        setIsAuthenticated(false);
      } else {
        setloginmodal(false); // Hide modal if token exists
        setIsAuthenticated(true);
        settext("Logout");
      }
    };

    checkToken();
  }, [location.pathname]);

  const handleAuthClick = () => {
    if (!getToken() || getToken() === "undefined") {
      setloginmodal(true);
    } else {
      const confirmLogout = window.confirm("Are you sure you want to logout?");

      if (confirmLogout) {
        Cookies.remove("jwt");
        setIsAuthenticated(false);
        settext("Login");
        toast.success("Logged out successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setloginmodal(true);
      }
    }
  };

  return (
    <>
      {!isSmallScreen ? (
        <>
          <AppBar
            position="fixed"
            sx={{
              width: "100vw",
              height: "60px",
              backgroundColor: "black",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "0px !important",
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
                      display: "flex",
                      gap: "15px",
                      textAlign: "start",
                      marginLeft: "20px",
                    }}
                  >
                    <Box
                      component="img"
                      src={RajyashLogo}
                      onClick={() => navigate("/")}
                      sx={{ width: "30px", height: "30px" }}
                    />
                    <Box
                      component="img"
                      src={RajyashTextLogo}
                      onClick={() => navigate("/")}
                      sx={{ width: "80px", height: "80px" }}
                    />
                    {/* <Typography
                      sx={{
                        fontFamily: "Roboto",
                        color: "#ffffff",
                        fontWeight: 500,
                        fontSize: "14px",
                        textTransform: "uppercase",
                      }}
                    >
                      Rajyash
                    </Typography> */}
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
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      color: "#ffffff",
                      fontWeight: 300,
                      fontSize: "14px",
                    }}
                  >
                    Ahmedabad
                  </Typography>
                </Box>
              </Box>

              <Tabs
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                value={value}
                onChange={handleChange}
                sx={styles.TabsMain}
              >
                <Tab value="All" label="All" sx={tab} />
                <Tab value="Residential" label="Residential" sx={tab} />
                <Tab value="Commercial" label="Commercial" sx={tab} />
                {/* <Tab value="Land" label="Land (6)" sx={tab} /> */}

                {/* <Tab value="Land" sx={tab} label="Land" /> */}
              </Tabs>

              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  backgroundColor: "red",
                  zIndex: -1,
                }}
              ></Box>
            </Toolbar>
            {/* <DynamicModal
              profilemodal={profilemodal}
              setProfilemodal={setProfilemodal}
            /> */}

            {/* <Login
              loginmodal={loginmodal}
              setloginmodal={setloginmodal}
              otpmodal={otpmodal}
              setotpmodal={setotpmodal}
              setIsLogin={setIsLogin}
              isLogin={isLogin}
              setforgototpmodal={setforgototpmodal}
              forgototpmodal={forgototpmodal}
              settext={settext}
              setSellerLoginModel={setSellerLoginModel}
              sellerLoginModel={sellerLoginModel}
            /> */}

            <Brouchermodal
              brouchermodal={brouchermodal}
              setBrouchermodal={setBrouchermodal}
            />
          </AppBar>
        </>
      ) : (
        <>
          {open !== true && (
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              indicatorColor={false}
              sx={styles.FilterTabsMain}
            >
              <Tab
                value="All"
                label={<span style={styles.AllTab}>All</span>}
                sx={tabmobile}
              />
              <Tab
                value="Residential"
                label={
                  <span style={styles.ResidentialCommercialTab}>
                    Residential
                  </span>
                }
                sx={tabmobile}
              />
              <Tab
                value="Commercial"
                label={
                  <span style={styles.ResidentialCommercialTab}>
                    Commercial
                  </span>
                }
                sx={tabmobile}
              />
              {/* <Tab
                  value="Land"
                  sx={tabmobile}
                  label={<span style={styles.AllTab}>Land</span>}
                /> */}
            </Tabs>
          )}
        </>
      )}
    </>
  );
}

export default Header;

const tab = {
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "10px",
  textTransform: "none",
  fontFamily: "Roboto",
  opacity: 0.4,
  transition: "opacity 0.3s, font-weight 0.3s",
  whiteSpace: "nowrap",
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
  fontSize: { lg: "12px", md: "12px", sm: "12px", xs: "9px" },
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
  minWidth: "auto",
};
const sideButtonTextStyle = {
  fontSize: "10px",
  color: "#ffffff",
  fontWeight: 300,
  fontFamily: "Roboto",
};
const sideButtonBoxStyle = {
  display: "flex",
  gap: "4px",
  padding: "5px 15px",
  // width: "60px",
  alignItems: "center",
  flexDirection: "column",
  color: "#ffffff",
  justifyContent: "flex-end",
  border: "1px solid transparent",
  transition: "background-color 0.3s",
  borderRadius: "4px",
  "&:hover": {
    cursor: "pointer",
    // border: "1px solid #fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
};
const IconStyle = {
  width: "15px",
  height: "15px",
};
