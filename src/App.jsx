import React from "react";
import "./App.css";
import MainRoute from "./router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LegacyVid from "./components/Loader/LegacyVid";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://sattva-api.unada.in/";
// axios.defaults.baseURL = "http://localhost:8888/";
const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: "#202020",
                color: "#fff",
                cursor: "pointer",
                fontSize: "12px",
                ":hover": {
                  backgroundColor: "grey",
                },
              }),
          }),
        },
      },
    },
  });
  const location = window.location.pathname;
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          {/* {location === "/" && <LegacyVid />} */}
          <MainRoute />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
