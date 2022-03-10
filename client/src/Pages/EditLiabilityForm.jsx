import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { HomeIcon } from "../Components/HomeIcon";

export const EditLiabilityForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [message, setMessage] = useState("");
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
        setMessage("You are not logged in. Please login or sign up");
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
      <div className="container mt-5">
        <h4>Edit Liability</h4>
        <div className="row d-flex card mx-auto" style={{ width: "50rem" }}>
          <Link
            className="text-decoration-none"
            to={`/${userContext?.data?.username}`}
          >
            <button type="button" className="btn btn-outline-secondary mt-3">
              <HomeIcon />
            </button>
          </Link>{" "}
          <form onSubmit={handleSubmit}>
            <div className="px-5 mt-5 align-self-center">
              <label htmlFor="liabilityName" className="form-label">
                {" "}
                Liability name:{" "}
              </label>
              <input
                type="text"
                name="liabilityName"
                id="liabilityName"
                className="form-control"
                defaultValue={currentLiability?.liabilityName?.liabilityName}
              />
            </div>
            <br />
            <div className="px-5 mt-0 align-self-center">
              <label htmlFor="liabilityType" className="form-label">
                {" "}
                Type:{" "}
              </label>
              <select
                id="liabilityType"
                name="liabilityType"
                className="form-select"
                defaultValue={currentLiability?.liabilityName?.liabilityType}
              >
                <option value="Loan">Loan</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            <div className="d-grid col-4 mx-auto p-5">
              <button type="submit" className="btn btn-secondary">
                Update
              </button>
            </div>
          </form>
          <div className="text-danger">{message}</div>
        </div>
      </div>
    </>
  );
};
