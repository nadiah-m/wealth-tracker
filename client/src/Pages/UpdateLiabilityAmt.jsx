import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { UserContext } from "../App";
import { HomeIcon } from "../Components/HomeIcon";

export const UpdateLiabilityAmt = () => {
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
    <div className="container mt-5">
      <h4>Update Liability Amount</h4>
      <div className="row d-flex card mx-auto" style={{ width: "50rem" }}>
        <Link
          className="text-decoration-none"
          to={`/${userContext?.data?.username}`}
        >
          <button type="button" className="btn btn-outline-secondary mt-3">
            <HomeIcon />
          </button>
        </Link>
        <div className="px-5 mt-5 align-self-center">
          <h6 className="fw-bold">Liability name: </h6>
          <p>{currentLiability?.liabilityName?.liabilityName}</p>
          <h6 className="fw-bold">Type: </h6>
          <p>{currentLiability?.liabilityName?.liabilityType}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-5 mt-5 align-self-center">
            <label htmlFor="valueAmt" className="form-label">
              Market value: $
            </label>
            <div className="input-group">
              <div className="input-group-text col-1">$</div>
              <input
                type="number"
                name="valueAmt"
                id="valueAmt"
                className="form-control"
                defaultValue={currentLiability?.liabilityValue?.[0]?.valueAmt}
              />
            </div>
          </div>
          <br />
          <div className="px-5 mt-0 align-self-center">
            <label htmlFor="date" className="form-label">
              {" "}
              Date:
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="form-control"
              defaultValue={date(currentLiability?.liabilityValue?.[0]?.date)}
            />
          </div>
          <br />
          <div className="d-grid col-4 mx-auto p-5">
            <button type="submit" className="btn btn-secondary">
              Update
            </button>
          </div>
        </form>
        <div className="text-danger">{message}</div>
      </div>
    </div>
  );
};
