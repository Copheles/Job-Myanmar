import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {  useColorModeValue } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      dispaly: true,
    },
    legend: {
      display: true,
      labels: {
        font: {
          size: 14
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

const AreaChart = ({ data }) => {
  const labels = data.map((item) => item.date);
  const chartData = data.map((item) => item.count);

  const chart = {
    labels,
    datasets: [
      {
        fill: true,
        label: "monthly jobs",
        data: chartData,
        borderColor: useColorModeValue("#9de4e3", "#08a08c"),
        backgroundColor: useColorModeValue("#0ca565", "#41d497"),
      },
    ],
  };
  return <Line options={options} data={chart} />;
};

export default AreaChart;
