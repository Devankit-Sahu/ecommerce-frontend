import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopProductsBarChart = ({ topFiveProducts }) => {
  const labels = topFiveProducts.map((product) => product.productName);
  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data: topFiveProducts.map((product) => product.totalSales),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value, index, ticks) {
            return labels[index] && labels[index].length > 10
              ? labels[index].substring(0, 10) + "..."
              : labels[index];
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TopProductsBarChart;
