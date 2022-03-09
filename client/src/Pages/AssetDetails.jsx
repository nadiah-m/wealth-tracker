import React from "react";
import axios from "axios";
import { useEffect, useState,useContext } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import { UserContext } from "../App";

export const AssetDetails = () => {
  const [userContext, setUserContext] = useContext(UserContext);

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

  const assetValue = currentAsset?.assetValue;
  console.log("asset", assetValue);
  return (
    <div>
      <p>Asset name: {currentAsset?.assetName?.assetName}</p>
      <p>Type: {currentAsset?.assetName?.assetType}</p>
      {assetValue?.map((value, index) => (
        <div key={index}>
          <p>Market value: {value.valueAmt}</p>
          <p>Valued date: {dayjs(value.date).format("DD/MM/YYYY")}</p>
        </div>
      ))}
    </div>
  );
};
