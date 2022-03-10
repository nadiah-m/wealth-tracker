import axios from "axios";
import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { HomeIcon } from "../Components/HomeIcon";
import NumberFormat from "react-number-format";

export const NewLiabilityForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);
  const [value, setValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLiability = {
      liabilityName: e.target.liabilityName.value,
      liabilityType: e.target.liabilityType.value,
      valueAmt: value,
      date: e.target.date.value,
      user: userContext?.data?._id,
    };
    console.log(newLiability);
    await axios({
      method: "post",
      url: "/api/liabilities/new",
      headers: { authorization: "Bearer " + userContext.accessToken },
      data: newLiability,
    }).then((response) => {
      if (response.data.status === "not ok") {
        console.log(response.data.message);
        setMessage("You are not logged in. Please login or sign up");
      } else {
        console.log(response.data.message);
        navigate(-1, { replace: true });
      }
    });
  };
  return (
    <>
      <div className="container mt-5">
        <h4>Add Liability</h4>
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
              <label htmlFor="liabilityName" className="form-label">
                {" "}
                Liability name:{" "}
              </label>
              <input
                type="text"
                name="liabilityName"
                id="liabilityName"
                className="form-control"
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
              >
                <option value="Loan">Loan</option>
                <option value="Mortgage">Mortgage</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            <br />
            <div className="px-5 mt-0 align-self-center ">
              <label htmlFor="valueAmt" className="form-label">
                {" "}
                Amount:{" "}
              </label>
              <div className="input-group">
                <div className="input-group-text col-1">$</div>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  decimalSeparator="."
                  displayType="input"
                  thousandSeparator={true}
                  allowNegative={true}
                  className="form-control"
                  value={value}
                  onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    setValue(value);
                  }}
                />
              </div>
            </div>
            <br />
            <div className="px-5 mt-0 align-self-center ">
              <label htmlFor="date" className="form-label">
                {" "}
                Date
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
                Add Liability
              </button>
            </div>
          </form>
          <div className="text-danger">{message}</div>
        </div>
      </div>
    </>
  );
};
