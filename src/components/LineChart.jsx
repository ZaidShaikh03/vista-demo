import React, { useState } from "react";
import "./LineChart.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins,
} from "chart.js";
import CloseIcon from "@mui/icons-material/Close";

import {
  Paper,
  Box,
  Button,
  Slider,
  Typography,
  Modal,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins
);

const LineChart = ({ handleClose, selectedArea }) => {
  const [selectedOption, setSelectedOption] = useState("all");

  const allData = [
    {
      label: "Population Count",
      data: [1206001, 1741522, 2557560, 3312216, 4525013, 5641515, 7695694],
      backgroundColor: "rgba(98, 178, 253, 1)",
      borderColor: "rgba(98, 178, 253, 1)",
      fill: false,
    },
    {
      label: "No. of Households",
      data: [249817, 323541, 467623, 641907, 901949, 1193289],
      backgroundColor: "rgba(155, 223, 196, 1)",
      borderColor: "rgba(155, 223, 196, 1)",
      fill: false,
    },
    {
      label: "Working Population",
      data: [395791, 496938, 725817, 1256986, 1422694, 1973658],
      backgroundColor: "rgba(249, 155, 171, 1)",
      borderColor: "rgba(249, 155, 171, 1)",
      fill: false,
    },
    {
      label: "Migrant Population",
      data: [584423, 427995, 501776, 0, 1522148, 3098065],
      backgroundColor: "rgba(255, 180, 79, 1)",
      borderColor: "rgba(255, 180, 79, 1)",
      fill: false,
    },
    {
      label: "Density (/sq. km)",
      data: [4156, 6068, 8050, 11320, 10322, 10747],
      backgroundColor: "rgba(108, 96, 178, 1)",
      borderColor: "rgba(108, 96, 178, 1)",
      fill: false,
    },
  ];

  const labels = ["1970", "1980", "1990", "2000", "2010", "2020"];

  const selectedYear = selectedArea.toString();

  const is2024Selected = selectedYear === "2024";

  const selectedIndex = is2024Selected
    ? labels.indexOf("2020")
    : labels.indexOf(selectedYear);

  if (selectedIndex === -1) {
    console.error(`Year ${selectedYear} not found in labels.`);
    return null;
  }

  const filteredData = allData.map((dataset) => ({
    ...dataset,

    data: dataset.data.map((value, index) =>
      index <= selectedIndex ? value : null
    ),
  }));

  const finalData =
    selectedOption === "all"
      ? filteredData
      : filteredData.filter((dataset) => dataset.label === selectedOption);

  const chartData = {
    labels: is2024Selected ? [...labels] : labels,
    datasets: finalData,
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 6.5,
          boxHeight: 6.5,
          usePointStyle: true,
          pointStyle: "circle",
        },
        position: "bottom",
        align: "center",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value} k`;
          },
        },
        grid: {
          color: "grey",
        },
      },
      x: {
        grid: {
          color: "grey",
        },
      },
    },
    elements: {
      line: {
        tension: 0.3,
      },
      point: {
        radius: 5,
      },
    },
  };

  return (
    <Box className="container">
      <Box className="chart-container" sx={LineContainer}>
        <Box sx={closebox}>
          <div className="title-dropdown-container">
            <Typography className="chart-title" sx={chartTitle}>
              Demography
            </Typography>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="dropdown"
            >
              <option value="all">All</option>
              {allData.map((dataset, index) => (
                <option key={index} value={dataset.label}>
                  {dataset.label}
                </option>
              ))}
            </select>
          </div>
          <Box
            sx={{
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fill: "white" }} />
          </Box>
        </Box>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default LineChart;

const closebox = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
};

const LineContainer = {
  width: { lg: "500px", md: "500px", sm: "500px", xs: "300px" },
  height: { lg: "325px", md: "325px", sm: "325px", xs: "250px" },
  "& canvas": {
    width: {
      lg: "480px !important",
      md: "480px !important",
      sm: "480px !important",
      xs: "280px !important",
    },
  },
};

const chartTitle = {
  fontSize: { lg: "24px", md: "24px", sm: "24px", xs: "15px" },
};
