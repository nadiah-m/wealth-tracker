import React from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

//individual asset to add and calculate future projections

const labels = ["Year 0", "Year 1", "Year 2", "Year 3", "Year 4"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Future Value",
      data: [1000, 1050, 1500, 1900, 2400],
      fill: false,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      pointBorderWidth: 5,
      pointRadius: 8,
      // tension: 0.1,
    },
    {
      label: "Total Contribution",
      data: [1000, 1200, 1400, 1600, 1800],
      fill: false,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointBorderWidth: 5,
      pointRadius: 8,
      tension: 0.4,
    },
  ],
};

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

function AssetForm() {
  const [assetName, setAssetName] = useState("");
  const [frequency, setFrequency] = useState("Annually");
  const [initialAmt, setInitialAmt] = useState("");
  const [contrAmt, setContrAmt] = useState("");
  const [intRate, setIntRate] = useState("");
  const [years, setYears] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const asset = {
      assetName,
      initialAmt,
      contrAmt,
      intRate,
      frequency,
      years,
    };
    console.log(asset);
  };

  //create a formula to produce the graph

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Asset name: </label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
          <br />
          <label>Initial amount: $</label>
          <input
            type="number"
            value={initialAmt}
            onChange={(e) => setInitialAmt(e.target.value)}
          />
          <br />
          <label>Monthly contribution: $</label>
          <input
            type="number"
            value={contrAmt}
            onChange={(e) => setContrAmt(e.target.value)}
          />
          <br />
          <label>Length of Time in Years: </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
          <br />
          <label>Estimated annual interest rate: %</label>
          <input
            type="number"
            value={intRate}
            onChange={(e) => setIntRate(e.target.value)}
          />
          <br />
          <label>Compound frequency: </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="annually">Annually</option>
            <option value="monthly">Monthly</option>
          </select>
          <br />
          <button>Add to financial goals</button>
        </fieldset>
      </form>

      <Line data={data} options={options} />
    </>
  );
}

export default AssetForm;
