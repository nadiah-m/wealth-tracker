import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { NewAssetForm } from "../NewAssetForm";
import dayjs from "dayjs";

function Home() {
  const [allAssets, setAllAssets] = useState([]);

  useEffect(() => {
    const fetchAllAssets = async () => {
      const Assets = await axios.get("/api/assets");
      setAllAssets(Assets?.data?.data);
    };
    fetchAllAssets();
  }, []);

  const handleDelete = async (assetid) => {
    await axios
      .delete(`/api/assets/${assetid}`)
      .then((response) => console.log(response.data.message));

    setAllAssets(allAssets.filter((asset) => asset._id !== assetid));
  };


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
          <p>Date: {dayjs(asset.date).format('DD/MM/YYYY')}</p>
          <Link to={`/assets/${asset._id}/edit`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(asset._id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default Home;
