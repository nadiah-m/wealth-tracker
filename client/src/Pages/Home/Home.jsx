import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { NewAssetForm } from "../NewAssetForm";
import dayjs from "dayjs";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./Home.css";

function Home() {
  const [allAssets, setAllAssets] = useState([]);

  useEffect(() => {
    const fetchAllAssets = async () => {
      const Assets = await axios.get("/api/assets");
      setAllAssets(Assets?.data?.data?.allAssets);
    };
    fetchAllAssets();
  }, []);

  console.log("help", allAssets);
  const handleDelete = async (assetid) => {
    await axios
      .delete(`/api/assets/${assetid}`)
      .then((response) => console.log(response.data.message));

    setAllAssets(allAssets.filter((asset) => asset._id !== assetid));
  };

  let assetTypeAmt = {};

  allAssets.forEach((asset) => {
    if (assetTypeAmt[asset?.assetType]) {
      assetTypeAmt[asset?.assetType] +=
        asset?.assetvalue?.slice(-1)[0]?.valueAmt;
    } else {
      assetTypeAmt[asset?.assetType] =
        asset?.assetvalue?.slice(-1)[0]?.valueAmt;
    }
  });
  console.log(assetTypeAmt);

  const labels = [];

  const typeAmt = [];

  const color = [];

  //assetTypeAmt = {
  //Stock: num,
  //Bond: num,
  //Property: num
  //}

  for (const type in assetTypeAmt) {
    labels.push(type);
    typeAmt.push(assetTypeAmt[type]);
  }

  console.log("labels", labels);
  console.log("amt", typeAmt);

  const CHART_COLORS = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  for (let i = 0; i < labels.length; i++) {
    color.push(CHART_COLORS[i]);
    console.log(color);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Assets",
        data: typeAmt,
        backgroundColor: color,
      },
    ],
  };

  const options = {
    layout: { padding: 20 },
    maintainAspectRatio: false,
  };
  return (
    <>
      Dashboard of current assets and liabilities
      <h3>Assets</h3>
      <div className="Pie">
        <Pie data={data} options={options} />
      </div>
      <Link to={"/assets/new"}>
        <button>Add Asset</button>
      </Link>
      {allAssets?.map((asset, index) => (
        <div key={index}>
          <p>Asset Name: {asset?.assetName}</p>
          <p>Asset Type: {asset?.assetType}</p>
          <p>
            Market Value: $
            {Number(asset?.assetvalue?.slice(-1)[0]?.valueAmt).toLocaleString(
              "en-US"
            )}
          </p>
          <p>
            Date:{" "}
            {dayjs(asset?.assetvalue?.slice(-1)[0]?.date).format("DD/MM/YYYY")}
          </p>
          <Link to={`/assets/${asset?._id}/edit`}>
            <button>Edit Asset</button>
          </Link>
          <Link to={`/assets/${asset?._id}/updateAmt`}>
            <button>Update Amount</button>
          </Link>
          <Link to={`/assets/${asset?._id}`}>
            <button>View Asset</button>
          </Link>
          <button onClick={() => handleDelete(asset?._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Home;
