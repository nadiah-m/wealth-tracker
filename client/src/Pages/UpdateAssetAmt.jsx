import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

export const UpdateAssetAmt = () => {
  const navigate = useNavigate();

  const { assetid } = useParams();
  const [currentAsset, setCurrentAsset] = useState({});

  useEffect(() => {
    const fetchCurrentAsset = async () => {
      const fetchedAsset = await axios.get(`/api/assets/${assetid}`);
      setCurrentAsset(fetchedAsset?.data?.data);
    };
    fetchCurrentAsset();
  }, [assetid]);

  console.log(currentAsset);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editAssetAmount = {
      valueAmt: e.target.valueAmt.value,
      date: e.target.date.value,
    };
    await axios.post(`/api/assets/${assetid}/updateAmt`, editAssetAmount);
    navigate(-1, { replace: true });
  };

  let date = (assetDate) => {
    return dayjs(assetDate).format("YYYY-MM-DD");
  };
  return (
    <div>
      <Link to="/">Back to Home</Link>
      <p>Asset name: {currentAsset?.assetName?.assetName}</p>
      <p>Type: {currentAsset?.assetName?.assetType}</p>
      <form onSubmit={handleSubmit}>
        <label> Market value: $</label>
        <input
          type="number"
          name="valueAmt"
          id="valueAmt"
          defaultValue={currentAsset?.assetValue?.[0]?.valueAmt}
        />
        <br />
        <label> Date</label>
        <input
          type="date"
          name="date"
          id="date"
          defaultValue={date(currentAsset?.assetValue?.[0].date)}
        />
        <br />
        <button type="submit">Update Amount</button>
      </form>
    </div>
  );
};
