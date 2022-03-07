import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";

export const LiabilityDetails = () => {
  const { liabilityid } = useParams();
  const [currentLiability, setCurrentLiability] = useState({});

  useEffect(() => {
    const fetchCurrentLiability = async () => {
      const fetchLiability = await axios.get(`/api/liabilities/${liabilityid}`);
      setCurrentLiability(fetchLiability?.data?.data);
    };
    fetchCurrentLiability();
  }, [liabilityid]);

  const liabilityValue = currentLiability?.liabilityValue;
  console.log("liability", currentLiability);

  return (
    <>
      <h3>View Liability</h3>
      <p>Liability Name: {currentLiability?.liabilityName?.liabilityName}</p>
      <p>Type: {currentLiability?.liabilityName?.liabilityType}</p>
      {liabilityValue?.map((value, index) => (
        <div key={index}>
          <p>Amount: {value?.valueAmt}</p>
          <p>Date: {dayjs(value?.date).format("DD/MM/YYYY")}</p>
        </div>
      ))}
    </>
  );
};
