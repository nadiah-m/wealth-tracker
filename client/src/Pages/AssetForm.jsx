import { useState } from "react";

//individual asset to add and calculate future projections

function AssetForm() {
  const [assetName, setAssetName] = useState("");
  const [frequency, setFrequency] = useState("Annually");
  const [initialAmt, setInitialAmt] = useState("");
  const [contrAmt, setContrAmt] = useState("");
  const [intRate, setIntRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const asset = {
      assetName,
      initialAmt,
      contrAmt,
      intRate,
      frequency,
    };
    console.log(asset);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>Asset name: </label>
          <input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
          />
          <br />
          <label>Initial amount: $</label>
          <input
            type="number"
            value={initialAmt}
            onChange={(e) => setInitialAmt(e.target.value)}
          />
          <br />
          <label>Monthly contribution: $</label>
          <input
            type="number"
            value={contrAmt}
            onChange={(e) => setContrAmt(e.target.value)}
          />
          <br />
          <label>Estimated annual interest rate: %</label>
          <input
            type="number"
            value={intRate}
            onChange={(e) => setIntRate(e.target.value)}
          />
          <br />
          <label>Compound frequency: </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="annually">Annually</option>
            <option value="monthly">Monthly</option>
          </select>
          <br />
          <button>Add to financial goals</button>
        </fieldset>
      </form>
    </>
  );
}

export default AssetForm;
