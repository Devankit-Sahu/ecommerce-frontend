import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: ["In stock", "Out of stock"],
  datasets: [
    {
      data: [12,20],
      backgroundColor: [
        "rgba(0,128,0,0.5)",
        "rgba(0,0,255,0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

const Doughtnut = () => {
  return <Doughnut data={data} />;
};

export default Doughtnut;
