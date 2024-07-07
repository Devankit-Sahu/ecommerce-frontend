import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughtnut = ({ productsInStock, productsOutOfStock }) => {
  const data = {
    labels: ["In stock", "Out of stock"],
    datasets: [
      {
        data: [productsInStock, productsOutOfStock],
        backgroundColor: ["rgba(0,128,0,0.5)", "rgba(0,0,255,0.5)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Doughtnut;
