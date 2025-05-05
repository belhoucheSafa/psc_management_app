import React from "react";
import "./statCardChart.scss";
import ReactApexChart from "react-apexcharts";

const StatCardChart = ({ seriesData, lineColor}) => {
  const series = [
    {
      name: "STOCK ABC",
      data: [23, 45, 76, 23, 34, 67, 89, 45, 67, 89, 45, 23], // Example data
    },
  ];
 
  const options = {
    chart: {
      type: "area",
      height: 80,
      toolbar: {
        show: false,
      },
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
      colors: [lineColor],
    },
    fill: {
      colors: [lineColor], // Set the area color
      opacity: 0.3, // Adjust opacity for area fill
    },
    grid: {
      show: false, // Remove grid lines
    },
    xaxis: {
      labels: {
        show: false, // Remove x-axis labels
      },
      axisBorder: {
        show: false, // Remove x-axis border
      },
      axisTicks: {
        show: false, // Remove x-axis ticks
      },
    },
    yaxis: {
      labels: {
        show: false, // Remove y-axis labels
      },
      axisBorder: {
        show: false, // Remove y-axis border
      },
      axisTicks: {
        show: false, // Remove y-axis ticks
      },
    },
    legend: {
      show: false, // Remove legend
    },
    tooltip: {
      enabled: false, // Remove tooltip
    },
  };

  return (
    <div className="stat-card-chart-wrapper">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="area"
        height={100}
        // width={100}
      />
    </div>
  );
};

export default StatCardChart;
