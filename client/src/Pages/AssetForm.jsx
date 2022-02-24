import React from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

//individual asset to add and calculate future projections

function AssetForm() {
  const [assetName, setAssetName] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [initialAmt, setInitialAmt] = useState("");
  const [contrAmt, setContrAmt] = useState("");
  const [intRate, setIntRate] = useState("");
  const [years, setYears] = useState("");

  const P = initialAmt;
  const r = intRate / 100;
  const A = contrAmt;
  const n = frequency;

  //* print out every year from 0 to t
  const labels = [];

  for (let i = 0; i <= years; i++) {
    labels.push("Year " + i);
  }

  const futureValues = [];

  for (let i = 0; i <= years; i++) {
    let t = i;
    let nper = 12 * t;
    let rate = Math.pow(1 + r / n, n / 12) - 1;
    let fRate = Math.pow(1 + rate, nper);
    let futureValue = P * fRate + A * ((fRate - 1) / rate);
    let futureValueComma = futureValue.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
    console.log(futureValueComma);
    futureValues.push(futureValue.toFixed(2));
  }

  console.log(futureValues);

  const finalFutureValue = Number(futureValues[futureValues.length - 1]);
  const finalFVNr = finalFutureValue.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
  console.log(finalFVNr);

  const presentValues = [];

  for (let i = 0; i <= years; i++) {
    let presentValue = parseInt(P) + parseInt(A * (12 * i));
    presentValues.push(presentValue.toFixed(2));
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Future Value",
        data: futureValues,
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        pointBorderWidth: 5,
        pointRadius: 8,
        // tension: 0.1,
      },
      {
        label: "Total Contribution",
        data: presentValues,
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
    // console.log("Handlesubmit fv", futureValue);
  };

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
            <option value="1">Annually</option>
            <option value="12">Monthly</option>
          </select>
          <br />
          <button>Add to financial goals</button>
        </fieldset>
      </form>

      <p>
        Based on your compounding schedule and estimated interest rate, you will
        have ${finalFVNr} in {years} years
      </p>

      <Line data={data} options={options} />
    </>
  );
}

export default AssetForm;
