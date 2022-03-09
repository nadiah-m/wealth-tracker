import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserContext } from "../App";

export const EditLiabilityForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  const navigate = useNavigate();

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
      <Link to={`/${userContext?.data?.username}`}>Back to Home</Link>
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
