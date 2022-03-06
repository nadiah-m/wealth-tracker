import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";

export const EditLiabilityForm = () => {
  const navigate = useNavigate();

  const { liabilityid } = useParams();
  const [currentLiability, setCurrentLiability] = useState({});

  useEffect(() => {
    const fetchCurrentLiability = async () => {
      const fetchLiability = await axios.get(`/api/liabilities/${liabilityid}`);
      setCurrentLiability(fetchLiability?.data?.data);
    };
    fetchCurrentLiability();
  }, []);

  console.log(currentLiability);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedLiabilityName = {
      liabilityName: e.target.liabilityName.value,
      liabilityType: e.target.liabilityType.value,
    };

    await axios.put(`/api/liabilities/${liabilityid}`, editedLiabilityName);
    navigate(-1, { replace: true });
  };

  return (
    <>
      <h3>Edit Liability</h3>
      <Link to="/">Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Liability name: </label>
        <input
          type="text"
          name="liabilityName"
          id="liabilityName"
          defaultValue={currentLiability?.liabilityName?.liabilityName}
        />

        <br />
        <label htmlFor="liabilityType"> Type: </label>
        <select
          id="liabilityType"
          name="liabilityType"
          value={currentLiability?.liabilityName?.liabilityType}
        >
          <option value="Loan">Loan</option>
          <option value="Mortgage">Mortgage</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <button type="submit">Update Asset</button>
      </form>
    </>
  );
};
