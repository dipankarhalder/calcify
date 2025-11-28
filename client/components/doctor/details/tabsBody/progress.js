import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import p1 from "../../../../public/p1.png";
import p2 from "../../../../public/p2.png";
import p3 from "../../../../public/p3.png";
import p4 from "../../../../public/p4.png";

import doct from "../../../../styles/modules/Doctor.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

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
      <div className={doct.item_review}>
        <ul>
          <li>
            <Image src={p1} alt="Bone Health" width={95} height={95} />
            <p>Workout</p>
          </li>
          <li>
            <Image src={p2} alt="Food" width={95} height={95} />
            <p>Food</p>
          </li>
          <li>
            <Image src={p4} alt="Life Style" width={95} height={95} />
            <p>Life Style</p>
          </li>
          <li>
            <Image src={p3} alt="Food 2" width={95} height={95} />
            <p>Food</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Progress;
