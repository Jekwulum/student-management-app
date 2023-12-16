import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pieData }) => {

  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: pieData,
        backgroundColor: [
          "rgb(242,165,152)",
          "rgb(255,232,157)",
          "rgb(236,107,109)",
          "rgb(122,231,125)",
          "rgb(195,233,151)"
        ],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ],

    plugins: {
      labels: {
        render: "percentage",
        fontColor: ["green", "white", "red"],
        precision: 2
      },
    },
    text: "23%",
    
  };

  return (
    <Doughnut data={data} />
  );
};

export default PieChart;