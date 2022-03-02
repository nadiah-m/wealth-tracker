import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function TotalAssetProjection(props) {
  console.log(props.assets);

  const totalArr = [];

  const total = props.assets.map((asset) => totalArr.push(asset.futureValues));

  const newTotalArr = [];
  totalArr.forEach((arr) => {
    arr.forEach((num, index) => {
      if (newTotalArr[index]) {
        newTotalArr[index] += Number(num);
      } else {
        newTotalArr[index] = Number(num);
      }
    });
  });

  console.log(newTotalArr);

  const labels = [];

  for (let i = 0; i <= 20; i++) {
    labels.push("Year " + i);
  }

  const totalData = {
    label: "Total Future Savings",
    data: newTotalArr,
    fill: false,
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
    pointBorderWidth: 3,
    pointRadius: 5,
  };

  const dataAssets = props.assets.map((asset) => ({
    label: asset.assetName,
    data: asset.futureValues,
    fill: false,
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
    pointBorderWidth: 3,
    pointRadius: 5,
  }));

  const data = {
    labels: labels,
    datasets: dataAssets,
  };

  data.datasets.push(totalData);

  const options = {
    layout: { padding: 80 },
    scales: {
      y: {
        ticks: {
          font: {
            size: 18,
          },
        },
      },
      x: {
        ticks: {
          font: { size: 18 },
        },
      },
    },
  };

  return (
    <>
      Total Asset Projection goes here
      <Line data={data} options={options} />
    </>
  );
}

export default TotalAssetProjection;
