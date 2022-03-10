import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { HomeIcon } from "../Components/HomeIcon";

export const EditAssetForm = () => {
  const [userContext, setUserContext] = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { assetid } = useParams();
  const [currentAsset, setCurrentAsset] = useState({});

  const fetchCurrentAsset = async () => {
    await axios({
      method: "get",
      url: `/api/assets/${assetid}`,
      headers: { authorization: "Bearer " + userContext.accessToken },
    }).then((response) => {
      if (response.data.status === "not ok") {
        setMessage("You are not logged in. Please login or sign up");
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

  console.log(currentAsset);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedAssetName = {
      assetName: e.target.assetName.value,
      assetType: e.target.assetType.value,
    };

    await axios.put(`/api/assets/${assetid}`, editedAssetName);
    navigate(-1, { replace: true });
  };

  return (
    <div className="container mt-5">
      <h4>Edit Asset</h4>
      <div className="row d-flex card mx-auto" style={{ width: "50rem" }}>
        <Link
          className="text-decoration-none"
          to={`/${userContext?.data?.username}`}
        >
          <button type="button" className="btn btn-outline-secondary mt-3">
            <HomeIcon />
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="px-5 mt-5 align-self-center">
            <label htmlFor="assetName" className="form-label">
              {" "}
              Asset name:{" "}
            </label>
            <input
              type="text"
              name="assetName"
              id="assetName"
              className="form-control"
              defaultValue={currentAsset?.assetName?.assetName}
            />
          </div>
          <br />
          <div className="px-5 mt-0 align-self-center">
            <label htmlFor="assetType" className="form-label">
              {" "}
              Type:{" "}
            </label>
            <select
              id="assetType"
              name="assetType"
              className="form-select"
              defaultValue={currentAsset?.assetName?.assetType}
            >
              <option value="General">General</option>
              <option value="Cash">Cash</option>
              <option value="Stock">Stock</option>
              <option value="Bond">Bond</option>
              <option value="CPF">CPF</option>
              <option value="Property">Property</option>
            </select>
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
