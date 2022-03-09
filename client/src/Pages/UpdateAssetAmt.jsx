import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { UserContext } from "../App";

export const UpdateAssetAmt = () => {
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
      <Link to={`/${userContext?.data?.username}`}>Back to Home</Link>
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
          defaultValue={date(currentAsset?.assetValue?.[0]?.date)}
        />
        <br />
        <button type="submit">Update Amount</button>
      </form>
    </div>
  );
};
