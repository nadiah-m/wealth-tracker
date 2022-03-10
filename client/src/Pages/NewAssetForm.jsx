import axios from "axios";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import jwt_decode from "jwt-decode";
import { HomeIcon } from "../Components/HomeIcon";
const axiosJWT = axios.create();

export const NewAssetForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAsset = {
      assetName: e.target.assetName.value,
      assetType: e.target.assetType.value,
      valueAmt: e.target.valueAmt.value,
      date: e.target.date.value,
      user: userContext?.data?._id,
    };
    console.log(newAsset);
    // await axios.post("/api/assets/new", newAsset);

    await axios({
      method: "post",
      url: "/api/assets/new",
      headers: { authorization: "Bearer " + userContext.accessToken },
      data: newAsset,
    }).then((response) => {
      if (response.data.status === "not ok") {
        console.log(response.data.message);
        setMessage("You are not logged in. Please login or sign up");
      } else {
        console.log(response.data.message);
        navigate(`/${userContext.username}`);
      }
    });
  };
  return (
    <>
      <div className="container mt-5">
        <h4>Add Asset</h4>
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
                Asset name:
              </label>
              <input
                type="text"
                name="assetName"
                id="assetName"
                className="form-control"
              />
            </div>
            <br />
            <div className="px-5 mt-0 align-self-center">
              <label htmlFor="assetType" className="form-label">
                {" "}
                Type:{" "}
              </label>
              <select id="assetType" name="assetType" className="form-select">
                <option value="General">General</option>
                <option value="Cash">Cash</option>
                <option value="Stock">Stock</option>
                <option value="Bond">Bond</option>
                <option value="CPF">CPF</option>
                <option value="Property">Property</option>
              </select>
            </div>
            <br />
            <div className="px-5 mt-0 align-self-center ">
              <label htmlFor="valueAmt" className="form-label">
                {" "}
                Market value:
              </label>
              <div className="input-group">
                <div className="input-group-text col-1">$</div>
                <input
                  type="number"
                  name="valueAmt"
                  id="valueAmt"
                  className="form-control"
                />
              </div>
            </div>
            <br />
            <div className="px-5 mt-0 align-self-center ">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="form-control"
              />
            </div>
            <div className="d-grid col-4 mx-auto p-5">
              <button type="submit" className="btn btn-secondary">
                Add Asset
              </button>
            </div>
          </form>
          <div className="text-danger">{message}</div>
        </div>
      </div>
    </>
  );
};
