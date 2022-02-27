function AssetForm(props) {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <fieldset>
          <label>Asset name: </label>
          <input
            type="text"
            value={props.assetName}
            onChange={(e) => props.setAssetName(e.target.value)}
          />
          <br />
          <label>Initial amount: $</label>
          <input
            type="number"
            value={props.initialAmt}
            onChange={(e) => props.setInitialAmt(e.target.value)}
          />
          <br />
          <label>Monthly contribution: $</label>
          <input
            type="number"
            value={props.contrAmt}
            onChange={(e) => props.setContrAmt(e.target.value)}
          />
          <br />
          <label>Length of Time in Years: </label>
          <input
            type="number"
            value={props.years}
            onChange={(e) => props.setYears(e.target.value)}
          />
          <br />
          <label>Estimated annual interest rate: %</label>
          <input
            type="number"
            value={props.intRate}
            onChange={(e) => props.setIntRate(e.target.value)}
          />
          <br />
          <label>Compound frequency: </label>
          <select
            value={props.frequency}
            onChange={(e) => props.setFrequency(e.target.value)}
          >
            <option value="1">Annually</option>
            <option value="12">Monthly</option>
          </select>
          <br />
          <button>Add to financial goals</button>
        </fieldset>
      </form>
    </>
  );
}

export default AssetForm;
