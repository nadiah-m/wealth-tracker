import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { AssetProjectionForm } from "../Components/AssetProjectionForm";
import axios from "axios";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";

//individual asset to add and calculate future projections

function SingleAssetProjection(props) {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [displayResult, setDisplayResult] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

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

  //* formula to calculate futureValues and push to array
  for (let i = 0; i <= years; i++) {
    let t = i;
    let nper = 12 * t;
    let rate = Math.pow(1 + r / n, n / 12) - 1;
    let fRate = Math.pow(1 + rate, nper);
    let futureValue = P * fRate + A * ((fRate - 1) / rate);
    futureValues.push(futureValue.toFixed(2));
  }

  //* get final future value at the end to display result
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

  const handleCalculate = async (e) => {
    e.preventDefault();
    setDisplayResult(`Based on your compounding schedule and estimated interest rate, you will
    have $${finalFVNr} in ${years} years from ${assetName}.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectionAsset = {
      assetName,
      initialAmt,
      contrAmt,
      intRate,
      frequency,
      years,
      futureValues,
      user: userContext?.data?._id,
    };

    await axios({
      method: "post",
      url: "/api/assetprojections/new",
      headers: { authorization: "Bearer " + userContext.accessToken },
      data: projectionAsset,
    }).then((response) => {
      if (response.data.status === "not ok") {
        console.log(response.data.message);
        setMessage("You are not logged in. Please login or sign up");
      } else {
        console.log(response.data.message);
        navigate(`/${userContext.username}/financialgoals`);
      }
    });
    props.addAssets(projectionAsset);
    console.log(projectionAsset);
  };

  const handleSubmitYears = (e) => {
    e.preventDefault();
    console.log(years);
  };

  return (
    <>
      <div className="container mt-5">
        <h3>Goals Calculator</h3>
        <div className="row d-flex card mx-auto" style={{ width: "50rem" }}>
          <form onSubmit={handleSubmitYears}>
            <div className="px-5 m-5 align-self-center">
              <label htmlFor="years" className="form-label">
                How many years are you saving for?
              </label>
              <input
                type="number"
                id="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="form-control"
              />
              <div className="d-grid col-6 mx-auto p-5">
                <button type="submit" className="btn btn-secondary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="mt-5 row d-flex card mx-auto"
          style={{ width: "50rem" }}
        >
          <AssetProjectionForm
            assetName={assetName}
            initialAmt={initialAmt}
            contrAmt={contrAmt}
            intRate={intRate}
            frequency={frequency}
            // years={years}
            handleCalculate={handleCalculate}
            setAssetName={setAssetName}
            setInitialAmt={setInitialAmt}
            setContrAmt={setContrAmt}
            // setYears={setYears}
            setIntRate={setIntRate}
            setFrequency={setFrequency}
          />
        </div>
      </div>
      <div className="d-grid col-6 mx-auto p-5">{displayResult}</div>
      <form onSubmit={handleSubmit}>
        <div className="d-grid col-3 mx-auto mt-0 pt-0 px-5">
          <button type="submit" className="btn btn-secondary">
            Add to financial goal
          </button>
        </div>
      </form>

      <Line data={data} options={options} />
    </>
  );
}

export default SingleAssetProjection;
