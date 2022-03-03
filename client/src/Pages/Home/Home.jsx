import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { NewAssetForm } from "../NewAssetForm";

function Home() {
  const [allAssets, setAllAssets] = useState([]);

  useEffect(() => {
    const fetchAllAssets = async () => {
      const Assets = await axios.get("/api/assets");
      setAllAssets(Assets?.data?.data);
    };
    fetchAllAssets();
    console.log(allAssets);
  }, []);

  return (
    <>
      Dashboard of current assets and liabilities
      <h3>Assets</h3>
      <Link to={"/assets/new"}>
        <button>Add Asset</button>
      </Link>
      {allAssets.map((asset, index) => (
        <div key={index}>
          <p>Asset Name: {asset.assetName}</p>
          <p>Asset Type: {asset.assetType}</p>
          <p>Market Value: ${asset.valueAmt}</p>
          <p>Date: {asset.date}</p>
        </div>
      ))}
    </>
  );
}

export default Home;
