import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

export const UpdateLiabilityAmt = () => {
  const navigate = useNavigate();

  const { liabilityid } = useParams();
  const [currentLiability, setCurrentLiability] = useState({});

  useEffect(() => {
    const fetchCurrentLiability = async () => {
      const fetchedCurrentLiability = await axios.get(
        `/api/liabilities/${liabilityid}`
      );
      setCurrentLiability(fetchedCurrentLiability?.data?.data);
    };
    fetchCurrentLiability();
  }, []);

  console.log(currentLiability);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editLiabilityAmount = {
      valueAmt: e.target.valueAmt.value,
      date: e.target.date.value,
    };
    await axios.post(
      `/api/liabilities/${liabilityid}/updateAmt`,
      editLiabilityAmount
    );
    navigate(-1, { replace: true });
  };

  let date = (liabilityDate) => {
    return dayjs(liabilityDate).format("YYYY-MM-DD");
  };

  return (
    <div>
      <h3>Update Liability Amount</h3>
      <Link to="/">Back to Home</Link>
      <p>Liability name: {currentLiability?.liabilityName?.liabilityName}</p>
      <p>Type: {currentLiability?.liabilityName?.liabilityType}</p>
      <form onSubmit={handleSubmit}>
        <label> Market value: $</label>
        <input
          type="number"
          name="valueAmt"
          id="valueAmt"
          defaultValue={currentLiability?.liabilityValue?.[0]?.valueAmt}
        />
        <br />
        <label> Date</label>
        <input
          type="date"
          name="date"
          id="date"
          defaultValue={date(currentLiability?.liabilityValue?.[0]?.date)}
        />
        <br />
        <button type="submit">Update Amount</button>
      </form>
    </div>
  );
};
