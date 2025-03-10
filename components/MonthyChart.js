import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

// Register necessary scales
ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function MonthlyChart({ transactions }) {
  console.log("Transaction Data in Chart:", transactions);

  if (!transactions || transactions.length === 0) {
    return <p>No data available for chart</p>;
  }

  const data = {
    labels: transactions.map((tx) => new Date(tx.date).toLocaleDateString()),
    datasets: [
      {
        label: "Expenses",
        data: transactions.map((tx) => parseFloat(tx.amount) || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
}
