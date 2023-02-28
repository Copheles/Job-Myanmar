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

const options = {
  responsive: true,
  type: "bar",
  title: {
    dispaly: true,
  },
  plugins: {
    tooltip: {
      titleFontSize: 27,
      bodyFontSize: 23,
    },
    legend: {
      display: true,
      labels: {
        font: {
          size: 14,
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {},
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
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

const BarChart = ({ data }) => {
  const labels = data.map((item) => item.date);
  const chartData = data.map((item) => item.count);

  const chart = {
    labels,
    datasets: [
      {
        label: "monthly jobs",
        data: chartData,
        backgroundColor: useColorModeValue("#319795", "#81E6D9"),
      },
    ],
  };

  return <Bar bg="red" options={options} data={chart} />;
};

export default BarChart;
