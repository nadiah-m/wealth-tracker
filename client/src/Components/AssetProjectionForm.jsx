


export const AssetProjectionForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <div className="px-5 mt-5 align-self-center">
          <fieldset>
            <label htmlFor="assetName" className="form-label">
              Asset name:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              value={props.assetName}
              onChange={(e) => props.setAssetName(e.target.value)}
            />
            <br />
            <label htmlFor="initialAmt" className="form-label">
              Initial amount: $
            </label>
            <div className="input-group">
              <div className="input-group-text col-1">$</div>

              <input
                type="number"
                className="form-control"
                value={props.initialAmt}
                onChange={(e) => props.setInitialAmt(e.target.value)}
              />
            </div>
            <br />
            <label htmlFor="contrAmt" className="form-label">
              Monthly contribution:
            </label>
            <div className="input-group">
              <div className="input-group-text col-1">$</div>

              <input
                type="number"
                className="form-control"
                value={props.contrAmt}
                onChange={(e) => props.setContrAmt(e.target.value)}
              />
            </div>
            <br />
            {/* <label>Length of Time in Years: </label>
          <input
            type="number"
            value={props.years}
            onChange={(e) => props.setYears(e.target.value)}
          /> */}
            <br />
            <label htmlFor="intRate" className="form-label">
              Estimated annual interest rate:
            </label>
            <div className="input-group">
              <div className="input-group-text col-1">%</div>
              <input
                type="number"
                className="form-control"
                value={props.intRate}
                onChange={(e) => props.setIntRate(e.target.value)}
              />
            </div>
            <br />
            <label htmlFor="frequency" className="form-label">
              Compound frequency:{" "}
            </label>
            <select
              className="form-select"
              value={props.frequency}
              onChange={(e) => props.setFrequency(e.target.value)}
            >
              <option value="1">Annually</option>
              <option value="12">Monthly</option>
            </select>
            <br />
            <div className="d-grid col-6 mx-auto p-5">
              <button type="submit" className="btn btn-secondary">
                Calculate
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </>
  );
}


