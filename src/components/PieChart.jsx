import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./PieChart.css"

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "right", // Moves the legend to the right of the chart
        labels: {
          boxWidth: 20, // Adjusts the size of the color box
          padding: 10, // Adds spacing between legend items
          font: {
            size: 14, // Adjusts the font size for legend labels
          },
        },
      },
    },
    maintainAspectRatio: false, // Allows the chart to resize dynamically
  };

  return (
    <>
      <div style={{ width: "80%", maxWidth: "600px", margin: "auto", height: "210px" }}>
        <h2>Expense Breakdown</h2> {/* Place the header before the Pie chart */}
        <Pie data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default PieChart;
