import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./Home.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { UserContext } from "../../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomeAssetTable } from "../../Components/HomeAssetTable";
import { HomeLiabilityTable } from "../../Components/HomeLiabilityTable";

function Home() {
  const [userContext, setUserContext] = useContext(UserContext);
  Chart.register(ChartDataLabels);
  const [allAssets, setAllAssets] = useState([]);
  const [allLiabilities, setAllLiabilities] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    await axios({
      method: "get",
      url: `/api/users/${userContext?.data?._id}`,
      headers: { authorization: "Bearer " + userContext.accessToken },
    }).then((response) => {
      if (response.data.status === "not ok") {
        console.log(response.data.message);
        navigate("/signin", { replace: true });
      } else {
        console.log(response.data.message);

        const AssetData = response?.data?.data?.foundAsset;
        const LiabilityData = response?.data?.data?.foundLiability;
        setAllAssets(AssetData);
        setAllLiabilities(LiabilityData);
      }
    });
  };

  console.log(userContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("allAssets", allAssets);

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

  allAssets?.forEach((asset) => {
    if (assetTypeAmt[asset?.assetType]) {
      assetTypeAmt[asset?.assetType] +=
        asset?.assetvalue?.slice(-1)[0]?.valueAmt;
    } else {
      assetTypeAmt[asset?.assetType] =
        asset?.assetvalue?.slice(-1)[0]?.valueAmt;
    }
  });

  let liabilityTypeAmt = {};

  allLiabilities?.forEach((liability) => {
    if (liabilityTypeAmt[liability?.liabilityType]) {
      liabilityTypeAmt[liability?.liabilityType] +=
        liability?.liabilityvalue?.slice(-1)[0]?.valueAmt;
    } else {
      liabilityTypeAmt[liability?.liabilityType] =
        liability?.liabilityvalue?.slice(-1)[0]?.valueAmt;
    }
  });

  const assetlabels = [];
  const liabilitylabels = [];

  const assettypeAmt = [];
  const liabilitytypeAmt = [];

  const assetColor = [];
  const liabilityColor = [];

  for (const type in assetTypeAmt) {
    assetlabels.push(type);
    assettypeAmt.push(assetTypeAmt[type]);
  }

  for (const type in liabilityTypeAmt) {
    liabilitylabels.push(type);
    liabilitytypeAmt.push(liabilityTypeAmt[type]);
  }

  let totalAssets = 0;
  let totalLiabilities = 0;

  assettypeAmt.forEach((asset) => (totalAssets += asset));

  liabilitytypeAmt.forEach((liability) => {
    totalLiabilities += liability;
  });

  const totalNetWorth = Number(totalAssets - totalLiabilities).toLocaleString();

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
    assetColor.push(CHART_COLORS[i]);
  }

  for (let i = 0; i < liabilitylabels.length; i++) {
    liabilityColor.push(CHART_COLORS[i]);
  }

  const assetdata = {
    labels: assetlabels,
    datasets: [
      {
        label: "Assets",
        data: assettypeAmt,
        backgroundColor: assetColor,
      },
    ],
  };

  const liabilitydata = {
    labels: liabilitylabels,
    datasets: [
      {
        label: "Liability",
        data: liabilitytypeAmt,
        backgroundColor: liabilityColor,
      },
    ],
  };

  const options = {
    layout: { padding: 50 },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        formatter: function (value, context) {
          let datasets = context.chart.data.datasets;
          if (datasets.indexOf(context.dataset) === datasets.length - 1) {
            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = Math.round((value / sum) * 100) + "%";
            return (
              context.chart.data.labels[context.dataIndex] + " " + percentage
            );
          }
        },
      },
    },
  };
  return (
    <div className="container-fluid">
      <div className="d-grid gap-4">
        <div className="p-5">
          <h4>
            Your total net worth is <h4 className="fs-2">${totalNetWorth}</h4>
          </h4>
        </div>

        <div className="p-2">
          <HomeAssetTable
            allAssets={allAssets}
            handleDeleteAsset={handleDeleteAsset}
          />
        </div>
        <div className="p-5">
          <HomeLiabilityTable
            allLiabilities={allLiabilities}
            handleDeleteLiability={handleDeleteLiability}
          />
        </div>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-6">Assets</div>
          <div className="col-6">Liabilities</div>
        </div>

        <div className="row justify-content-evenly">
          <div className="col-6">
            <div className="Pie">
              <Pie data={assetdata} options={options} />
            </div>
          </div>
          <div className="col-6">
            <div className="Pie">
              <Pie data={liabilitydata} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
