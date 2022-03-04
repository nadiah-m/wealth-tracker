import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

export const EditAssetForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedAsset = {
      assetName: e.target.assetName.value,
      assetType: e.target.assetType.value,
      valueAmt: e.target.valueAmt.value,
      date: e.target.date.value,
    };

    await axios.put(`/api/assets/${assetid}`, editedAsset);
    navigate(-1, { replace: true });
  };

  let date = (assetDate) => {
    return dayjs(assetDate).format("YYYY-MM-DD");
  };

  return (
    <div>
      <h3>Edit Assets</h3>
      <Link to="/">Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Asset name: </label>
        <input
          type="text"
          name="assetName"
          id="assetName"
          defaultValue={currentAsset.assetName}
        />

        <br />
        <label htmlFor="assetType"> Type: </label>
        <select id="assetType" name="assetType" value={currentAsset.assetType}>
          <option value="General">General</option>
          <option value="Stock">Stock</option>
          <option value="Bond">Bond</option>
          <option value="CPF">CPF</option>
        </select>
        <br />
        <label> Market value: $</label>
        <input
          type="number"
          name="valueAmt"
          id="valueAmt"
          defaultValue={currentAsset.valueAmt}
        />
        <br />
        <label> Date</label>
        <input
          type="date"
          name="date"
          id="date"
          //*resolve date
          defaultValue={date(currentAsset?.date)}
        />
        <button type="submit">Update Asset</button>
      </form>
    </div>
  );
};
