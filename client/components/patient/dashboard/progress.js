import Image from "next/image";
import doct from "../../../styles/modules/Doctor.module.scss";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "left",
    },
    title: {
      display: false,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const data = {
  labels,
  datasets: [
    {
      label: "Self Assessment",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 120 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const Progress = () => {
  return (
    <div className={doct.progress_cover}>
      <div className={doct.grap_cover}>
        <Line options={options} data={data} height={280} />
      </div>
    </div>
  );
};

export default Progress;
