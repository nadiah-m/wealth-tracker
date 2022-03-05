import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const NewLiabilityForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLiability = {
      liabilityName: e.target.liabilityName.value,
      liabilityType: e.target.liabilityType.value,
      valueAmt: e.target.valueAmt.value,
      date: e.target.date.value,
    };
    console.log(newLiability);
    await axios.post("/api/liabilities/new", newLiability);
    navigate(-1, { replace: true });
  };
  return (
    <>
      <h3>Add Asset</h3>
      <Link to="/">Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Liability name: </label>
        <input type="text" name="liabilityName" id="liabilityName" />
        <br />
        <label htmlFor="liabilityType"> Type: </label>
        <select id="liabilityType" name="liabilityType">
          <option value="Loan">Loan</option>
          <option value="Mortgage">Mortgage</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <br />
        <label> Amount: </label>
        <input type="number" name="valueAmt" id="valueAmt" />
        <br />
        <label> Date</label>
        <input type="date" name="date" id="date" />
        <button type="submit">Add Liability</button>
      </form>
    </>
  );
};
