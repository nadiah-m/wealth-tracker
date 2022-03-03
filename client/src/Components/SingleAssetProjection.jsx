import React from "react";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import AssetForm from "./AssetProjectionForm";

//individual asset to add and calculate future projections

function SingleAssetProjection(props) {
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

  //max no of years of savings
  //if years< no of savings => amt will be previous value * interest rate 

  for (let i = 0; i <= years; i++) {
    let t = i;
    let nper = 12 * t;
    let rate = Math.pow(1 + r / n, n / 12) - 1;
    let fRate = Math.pow(1 + rate, nper);
    let futureValue = P * fRate + A * ((fRate - 1) / rate);
    futureValues.push(futureValue.toFixed(2));
  }

  const finalFutureValue = Number(futureValues[futureValues.length - 1]);
  const finalFVNr = finalFutureValue.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

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
        pointBorderWidth: 3,
        pointRadius: 5,
        // tension: 0.1,
      },
      {
        label: "Total Contribution",
        data: presentValues,
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointBorderWidth: 3,
        pointRadius: 5,
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
      futureValues,
    };
    props.addAssets(asset);
    // console.log(asset);
  };

  return (
    <>
    How many years are you saving for?
<form>

</form>

      <AssetForm
        assetName={assetName}
        initialAmt={initialAmt}
        contrAmt={contrAmt}
        intRate={intRate}
        frequency={frequency}
        years={years}
        handleSubmit={handleSubmit}
        setAssetName={setAssetName}
        setInitialAmt={setInitialAmt}
        setContrAmt={setContrAmt}
        setYears={setYears}
        setIntRate={setIntRate}
        setFrequency={setFrequency}
      />

      <p>
        Based on your compounding schedule and estimated interest rate, you will
        have ${finalFVNr} in {years} years from {assetName}.
      </p>

      <Line data={data} options={options} />
    </>
  );
}

export default SingleAssetProjection;
