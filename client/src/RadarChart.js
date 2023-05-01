import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const RadarChart = ({ stand }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById("radarChart").getContext("2d");
    let newChart = null;

    if (chart) {
      chart.destroy();
    }

    newChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Power",
          "Speed",
          "Range",
          "Durability",
          "Precision",
          "Potential",
        ],
        datasets: [
          {
            label: "Stand Stats",
            data: [
              stand.power,
              stand.speed,
              stand.range,
              stand.durability,
              stand.precision,
              stand.potential,
            ],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255, 99, 132, 1)",
          },
        ],
      },
      options: {
        scale: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 5,
          },
          ticks: {
            stepSize: 1,
            format: (value, tick, values) => {
              if (value === 1) {
                return "E";
              }
              if (value === 2) {
                return "D";
              }
              if (value === 3) {
                return "C";
              }
              if (value === 4) {
                return "B";
              }
              if (value === 5) {
                return "A";
              }
              return "";
            },
          },
        },
      },
    });

    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [stand]);

  return (
    <div>
      <canvas id="radarChart"></canvas>
    </div>
  );
};

export default RadarChart;
