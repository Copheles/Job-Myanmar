import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const labels = data.map((item) => item.date);
  const chartData = data.map((item) => item.count);

  const options = {
    responsive: true,
    type: "bar",
    plugins: {
      tooltip: {
        titleFontSize: 27,
        bodyFontSize: 23,
      },
      legend: {
        display: false,
        labels: {
          font: {
            size: 20,
          },
          color: useColorModeValue("black", "white"),
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: useColorModeValue("#2D3748", "#A0AEC0  "),
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: useColorModeValue("#B7791F", "#FAF089  "),
          beginAtZero: true,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const chart = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: useColorModeValue("#319795", "#81E6D9"),
      },
    ],
  };

  return (
    <Box px={{ base: 5, lg: "100px" }} mb={10} mt={5} h={{ base: '50vh', lg: '60vh' }} w={{ base: '100%', lg:"80%" }}>
      <Bar bg="red" options={options} data={chart} />
    </Box>
  );
};

export default BarChart;
