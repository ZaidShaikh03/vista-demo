import React from "react";
import { Paper, Typography, Box, Tooltip } from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

const renderToolbar = (Toolbar) =>
  React.createElement(Toolbar, null, (slots) => {
    const {
      CurrentPageInput,
      CurrentScale,
      GoToNextPage,
      GoToPreviousPage,
      NumberOfPages,
      ZoomIn,
      ZoomOut,
      ShowSearchPopover,
      Download,
      Print,
    } = slots;

    return React.createElement(
      "div",
      {
        style: {
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "96%",
          gap: "2px",
          // background: "red",
          position: "fixed",
          background: "rgba(219, 217, 205, 1)",
          boxShadow: "0px 10px 20px 0px rgba(147, 147, 147, 0.25)",
          p: 0,
          zIndex: -1,
        },
      },

      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 2px" } },
      //   React.createElement(ShowSearchPopover, null, (props) =>
      //     React.createElement(
      //       "button",
      //       {
      //         style: {
      //           backgroundColor: "#fff",
      //           border: "none",
      //           borderRadius: "4px",
      //           color: "#000",
      //           cursor: "pointer",
      //           padding: "4px",
      //           marginTop: "10px",
      //         },
      //         onClick: props.onClick,
      //       },

      //       <SearchIcon
      //         sx={{
      //           fontSize: "16px",
      //           color: "grey",
      //           "&:hover": {
      //             color: "#19A8FC",
      //           },
      //         }}
      //       />
      //     )
      //   )
      // ),
      React.createElement(
        "div",
        { style: { padding: "0px 2px" } },
        React.createElement(ZoomOut, null, (props) =>
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "4px",
                color: "#000",
                cursor: "pointer",
                padding: "4px",
              },
              onClick: props.onClick,
            },

            <Typography
              sx={{
                fontSize: {
                  xl: "25px",
                  lg: "25px",
                  md: "25px",
                  sm: "20px",
                  xs: "20px",
                },
                color: "black",
                "&:hover": {
                  color: "rgba(47, 87, 75, 1)",
                },
              }}
            >
              -
            </Typography>
          )
        )
      ),
      React.createElement(
        "div",
        {
          style: { padding: "0px 0px", margin: "0px 15px" },
        },
        React.createElement(CurrentScale, null, (props) =>
          React.createElement(
            "span",
            {
              style: {
                fontSize: "20px",
                color: "black",
                fontFamily: "Arial",
              },
            },
            `${Math.round(props.scale * 100)}%`
          )
        )
      ),
      React.createElement(
        "div",
        { style: { padding: "0px 0px" } },
        React.createElement(ZoomIn, null, (props) =>
          React.createElement(
            "button",
            {
              style: {
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "4px",
                color: "#000",
                cursor: "pointer",
                padding: "4px",
              },
              onClick: props.onClick,
            },

            <Typography
              sx={{
                fontSize: {
                  xl: "25px",
                  lg: "25px",
                  md: "25px",
                  sm: "20px",
                  xs: "20px",
                },
                color: "black",
                "&:hover": {
                  color: "rgba(47, 87, 75, 1)",
                },
              }}
            >
              +
            </Typography>
          )
        )
      )
      // React.createElement('div', { style: { padding: '0px 2px' } }, ''),
      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 2px", marginLeft: "auto" } },
      //   React.createElement(GoToPreviousPage, null, (props) =>
      //     React.createElement(
      //       "Box",
      //       {
      //         style: {
      //           border: "none",
      //           borderRadius: "4px",
      //           color: "#000",
      //           cursor: props.isDisabled ? "not-allowed" : "pointer",
      //           padding: "4px",
      //         },
      //         disabled: props.isDisabled,
      //         onClick: props.onClick,
      //       },
      //       <ArrowBackIosNewIcon
      //         sx={{
      //           fontSize: {
      //             xl: "16px",
      //             lg: "16px",
      //             md: "16px",
      //             sm: "11px",
      //             xs: "11px",
      //           },
      //           color: "grey",
      //           "&:hover": {
      //             color: "#19A8FC",
      //           },
      //         }}
      //       />
      //     )
      //   )
      // )
      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 2px", width: "3rem" } },
      //   React.createElement(CurrentPageInput, null)
      // ),
      // React.createElement("div", { style: { padding: "0px 2px" } }, "/"),
      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 2px" } },

      //   React.createElement(NumberOfPages, null)
      // ),
      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 0px" } },
      //   React.createElement(GoToNextPage, null, (props) =>
      //     React.createElement(
      //       "Box",
      //       {
      //         style: {
      //           border: "none",
      //           borderRadius: "4px",
      //           color: "#000",
      //           cursor: props.isDisabled ? "not-allowed" : "pointer",
      //           padding: "4px",
      //         },
      //         disabled: props.isDisabled,
      //         onClick: props.onClick,
      //       },
      //       <ArrowForwardIosIcon
      //         sx={{
      //           fontSize: {
      //             xl: "16px",
      //             lg: "16px",
      //             md: "16px",
      //             sm: "11px",
      //             xs: "11px",
      //           },
      //           color: "grey",
      //           "&:hover": {
      //             color: "#19A8FC",
      //           },
      //         }}
      //       />
      //     )
      //   )
      // )
      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 2px", marginLeft: "auto" } },
      //   React.createElement(Download, null, (props) =>
      //     React.createElement(
      //       "button",
      //       {
      //         style: {
      //           backgroundColor: "#fff",
      //           border: "none",
      //           borderRadius: "4px",
      //           color: "#000",
      //           cursor: "pointer",
      //           padding: "4px",
      //         },
      //         onClick: props.onClick,
      //       },
      //       <Tooltip title="Download">
      //         <DownloadIcon
      //           sx={{
      //             fontSize: {
      //               xl: "16px",
      //               lg: "16px",
      //               md: "16px",
      //               sm: "12px",
      //               xs: "12px",
      //             },
      //             color: "grey",
      //             "&:hover": {
      //               color: "#19A8FC",
      //             },
      //           }}
      //         />
      //       </Tooltip>
      //     )
      //   )
      // ),
      // React.createElement(
      //   "div",
      //   { style: { padding: "0px 0px" } },
      //   React.createElement(Print, null, (props) =>
      //     React.createElement(
      //       "button",
      //       {
      //         style: {
      //           backgroundColor: "#fff",
      //           border: "none",
      //           borderRadius: "4px",
      //           color: "#000",
      //           cursor: "pointer",
      //           padding: "2px",
      //         },
      //         onClick: props.onClick,
      //       },
      //       <Tooltip title="Print">
      //         <PrintIcon
      //           sx={{
      //             fontSize: {
      //               xl: "16px",
      //               lg: "16px",
      //               md: "16px",
      //               sm: "12px",
      //               xs: "12px",
      //             },
      //             color: "grey",
      //             "&:hover": {
      //               color: "#19A8FC",
      //             },
      //           }}
      //         />
      //       </Tooltip>
      //     )
      //   )
      // )
    );
  });

export default renderToolbar;
