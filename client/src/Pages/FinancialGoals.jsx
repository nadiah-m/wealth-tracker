import { useState, useContext, useEffect } from "react";

import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { UserContext } from "../App";
import axios from "axios";
import { AssetProjTable } from "../Components/AssetProjTable";

export const FinancialGoals = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [assetProj, setAssetProj] = useState([]);

  const fetchUserData = async () => {
    await axios({
      method: "get",
      url: `/api/users/${userContext?.data?._id}`,
      headers: { authorization: "Bearer " + userContext.accessToken },
    }).then((response) => {
      if (response?.data?.status === "not ok") {
        console.log(response?.data?.message);
        setMessage("You are not logged in. Please login or sign up");
      } else {
        console.log(response?.data?.message);
        const AssetProj = response?.data?.data?.foundAssetProjection;
        setAssetProj(AssetProj);
      }
    });
  };

  console.log("assetproj", assetProj);
  // console.log(props.assets);

  useEffect(() => {
    fetchUserData();
  }, []);

  //* calculate total future savings
  const totalArr = [];

  //*push future values into totalArr
  const total = assetProj.map((asset) => totalArr.push(asset.futureValues));

  // console.log("totalArr", totalArr)
  const newTotalArr = [];

  //* add sum for the same year
  totalArr.forEach((arr) => {
    arr.forEach((num, index) => {
      if (newTotalArr[index]) {
        newTotalArr[index] += Number(num);
      } else {
        newTotalArr[index] = Number(num);
      }
    });
  });

  //* get final future value at the end to display result
  const finalFutureValue = Number(newTotalArr[newTotalArr.length - 1]);
  const finalFVNr = finalFutureValue.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  //* colors of chart
  const CHART_COLORS = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  const labels = [];

  //* x-axis for no. of years
  for (let i = 0; i <= newTotalArr.length; i++) {
    labels.push("Year " + i);
  }

  //total future savings graph
  const totalData = {
    label: "Total Future Savings",
    data: newTotalArr,
    fill: false,
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235)",
    pointBorderWidth: 3,
    pointRadius: 5,
  };

  //* individual asset graph
  const dataAssets = assetProj?.map((asset, index) => ({
    label: asset.assetName,
    data: asset.futureValues,
    fill: false,
    borderColor: CHART_COLORS[index],
    backgroundColor: CHART_COLORS[index],
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

  const handleDeleteAssetProj = async (assetprojid) => {
    await axios
      .delete(`/api/assetprojections/${assetprojid}`)
      .then((response) => console.log(response?.data?.message));
      setAssetProj(assetProj.filter((assetproj) => assetproj._id !== assetprojid));
  };

  return (
    <>
      <div className="d-grid">
        <div className="pt-5">
          <p>
            You will have a total of <mark>${finalFVNr}</mark> at the end of{" "}
            <mark>{newTotalArr.length - 1}</mark> years based on your current
            financial goals and estimations
          </p>
        </div>
      </div>
      <div className="mt-0 p-0">
        <Line data={data} options={options} />
      </div>
      <AssetProjTable
        assetProj={assetProj}
        handleDeleteAssetProj={handleDeleteAssetProj}
      />
    </>
  );
};
