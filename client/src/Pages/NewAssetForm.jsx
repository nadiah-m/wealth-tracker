import axios from "axios";
import { React, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";

export const NewAssetForm = () => {
  const navigate = useNavigate();
  // const { userID } = useParams();
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
      } else {
        console.log(response.data.message);
        navigate(-1, { replace: true });
      }
    });
  };
  return (
    <>
      <h3>Add Asset</h3>
      <Link to={`/${userContext?.data?.username}`}>Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Asset name: </label>
        <input type="text" name="assetName" id="assetName" />
        <br />
        <label htmlFor="assetType"> Type: </label>
        <select id="assetType" name="assetType">
          <option value="General">General</option>
          <option value="Cash">Cash</option>
          <option value="Stock">Stock</option>
          <option value="Bond">Bond</option>
          <option value="CPF">CPF</option>
          <option value="Property">Property</option>
        </select>
        <br />
        <label> Market value: $</label>
        <input type="number" name="valueAmt" id="valueAmt" />
        <br />
        <label> Date</label>
        <input type="date" name="date" id="date" />
        <button type="submit">Add Asset</button>
      </form>
    </>
  );
};
