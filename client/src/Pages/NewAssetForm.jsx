
import axios from "axios";
import { Link, useNavigate, } from "react-router-dom";

export const NewAssetForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAsset = {
      assetName: e.target.assetName.value,
      assetType: e.target.assetType.value,
      valueAmt: e.target.valueAmt.value,
      date: e.target.date.value,
    };
    console.log(newAsset);
    await axios.post("/api/assets/new", newAsset);
    navigate(-1, { replace: true });
  };
  return (
    <>
      <h3>Add Asset</h3>
      <Link to="/">Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Asset name: </label>
        <input type="text" name="assetName" id="assetName" />
        <br />
        <label htmlFor="assetType"> Type: </label>
        <select id="assetType" name="assetType">
          <option value="general">General</option>
          <option value="stock">Stock</option>
          <option value="bond">Bond</option>
          <option value="cpf">CPF</option>
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
