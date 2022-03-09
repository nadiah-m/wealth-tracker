import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import { UserContext } from "../App";

export const LiabilityDetails = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const { liabilityid } = useParams();
  const [currentLiability, setCurrentLiability] = useState({});

  const fetchCurrentLiability = async () => {
    await axios({
      method: "get",
      url: `/api/liabilities/${liabilityid}`,
      headers: { authorization: "Bearer " + userContext.accessToken },
    }).then((response) => {
      if (response.data.status === "not ok") {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
        const fetchedLiability = response?.data?.data;
        setCurrentLiability(fetchedLiability);
      }
    });
  };

  useEffect(() => {
    fetchCurrentLiability();
  }, []);

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
