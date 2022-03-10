import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { UserContext } from "../App";
import { HomeIcon } from "../Components/HomeIcon";

export const UpdateAssetAmt = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const [message, setMessage] = useState("");

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
        setMessage("You are not logged in. Please log in or sign up");
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
    <div className="container mt-5">
      <h4>Update Amount</h4>

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
          <h6 className="fw-bold">Asset name: </h6>
          <p>{currentAsset?.assetName?.assetName}</p>
          <h6 className="fw-bold">Type: </h6>{" "}
          <p>{currentAsset?.assetName?.assetType}</p>
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
                defaultValue={currentAsset?.assetValue?.[0]?.valueAmt}
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
              defaultValue={date(currentAsset?.assetValue?.[0]?.date)}
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
