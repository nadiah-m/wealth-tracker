import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";

export function AssetDetails() {
  const { assetid } = useParams();
  const [currentAsset, setCurrentAsset] = useState({});
  useEffect(() => {
    const fetchCurrentAsset = async () => {
      const fetchedAsset = await axios.get(`/api/assets/${assetid}`);
      setCurrentAsset(fetchedAsset?.data?.data);
    };
    fetchCurrentAsset();
  }, [assetid]);

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
}
