import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserContext } from "../App";

export const EditAssetForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const navigate = useNavigate();

  const { assetid } = useParams();
  const [currentAsset, setCurrentAsset] = useState({});

  const fetchCurrentAsset = async () => {
    await axios({
      method: "get",
      url: `/api/assets/${assetid}`,
      headers: { authorization: "Bearer " + userContext.accessToken },
    }).then((response) => {
      if (response.data.status === "not ok") {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
        const fetchedAsset = response?.data?.data;
        setCurrentAsset(fetchedAsset);
      }
    });
  };

  useEffect(() => {
    fetchCurrentAsset();
  }, []);

  console.log(currentAsset);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedAssetName = {
      assetName: e.target.assetName.value,
      assetType: e.target.assetType.value,
    };

    await axios.put(`/api/assets/${assetid}`, editedAssetName);
    navigate(-1, { replace: true });
  };

  return (
    <div>
      <h3>Edit Assets</h3>
      <Link to={`/${userContext?.data?.username}`}>Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Asset name: </label>
        <input
          type="text"
          name="assetName"
          id="assetName"
          defaultValue={currentAsset?.assetName?.assetName}
        />

        <br />
        <label htmlFor="assetType"> Type: </label>
        <select
          id="assetType"
          name="assetType"
          defaultValue={currentAsset?.assetName?.assetType}
        >
          <option value="General">General</option>
          <option value="Cash">Cash</option>
          <option value="Stock">Stock</option>
          <option value="Bond">Bond</option>
          <option value="CPF">CPF</option>
          <option value="Property">Property</option>
        </select>
        <br />

        <button type="submit">Update Asset</button>
      </form>
    </div>
  );
};
