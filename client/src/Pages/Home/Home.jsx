import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import dayjs from "dayjs";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./Home.css";

function Home() {
  const [allAssets, setAllAssets] = useState([]);
  const [allLiabilities, setAllLiabilities] = useState([]);

  const fetchAllAssets = async () => {
    const Assets = await axios.get("/api/assets");
    setAllAssets(Assets?.data?.data?.allAssets);
  };

  const fetchAllLiabilities = async () => {
    const Liabilities = await axios.get("/api/liabilities");
    setAllLiabilities(Liabilities?.data?.data?.allLiabilities);
  };

  useEffect(() => {
    fetchAllAssets();
    fetchAllLiabilities();
  }, []);

  console.log("allassets", allAssets);
  console.log("allliabilities", allLiabilities);

  const handleDeleteAsset = async (assetid) => {
    await axios
      .delete(`/api/assets/${assetid}`)
      .then((response) => console.log(response?.data?.message));

    setAllAssets(allAssets.filter((asset) => asset._id !== assetid));
  };

  const handleDeleteLiability = async (liabilityid) => {
    await axios
      .delete(`/api/liabilities/${liabilityid}`)
      .then((response) => console.log(response?.date?.message));

    setAllLiabilities(
      allLiabilities.filter((liability) => liability._id !== liabilityid)
    );
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

  const assetlabels = [];

  const assettypeAmt = [];

  const color = [];

  for (const type in assetTypeAmt) {
    assetlabels.push(type);
    assettypeAmt.push(assetTypeAmt[type]);
  }

  const CHART_COLORS = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  for (let i = 0; i < assetlabels.length; i++) {
    color.push(CHART_COLORS[i]);
  }

  const assetdata = {
    labels: assetlabels,
    datasets: [
      {
        label: "Assets",
        data: assettypeAmt,
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
        <Pie data={assetdata} options={options} />
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
          <button onClick={() => handleDeleteAsset(asset?._id)}>Delete</button>
        </div>
      ))}
      <h3>Liabilities</h3>
      <Link to={"/liabilities/new"}>
        <button>Add Liability</button>
      </Link>
      {allLiabilities?.map((liability, index) => (
        <div key={index}>
          <p>Liability name: {liability?.liabilityName}</p>
          <p>Liability Type: {liability?.liabilityType}</p>
          <p>
            Amount: ${" "}
            {Number(
              liability?.liabilityvalue?.slice(-1)[0]?.valueAmt
            ).toLocaleString()}
          </p>
          <p>
            Date:{" "}
            {dayjs(liability?.liabilityvalue?.slice(-1)[0]?.date).format(
              "DD/MM/YYYY"
            )}
          </p>
          <Link to={`/liabilities/${liability?._id}/edit`}>
            <button>Edit Liability</button>
          </Link>
          <Link to={`/liabilities/${liability?._id}/updateAmt`}>
            <button>Update Amount</button>
          </Link>
          <Link to={`/liabilities/${liability?._id}`}>
            <button>View Liability</button>
          </Link>
          <button onClick={() => handleDeleteLiability(liability?._id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default Home;
