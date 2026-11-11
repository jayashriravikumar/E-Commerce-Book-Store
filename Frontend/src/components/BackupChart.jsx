import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const BackupChart = ({ analytics }) => {

  const data = {
    labels: analytics.map(item => item._id),

    datasets: [
      {
        label: "Backups",
        data: analytics.map(item => item.backups),
      },
    ],
  };

  return <Bar data={data} />;
};

export default BackupChart;