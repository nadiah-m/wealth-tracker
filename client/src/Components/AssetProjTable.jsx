import { DeleteIcon } from "./DeleteIcon";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export const AssetProjTable = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Asset Name</th>
              <th scope="col">Initial Amount</th>
              <th scope="col">Contribution Amount</th>
              <th scope="col">Interest Rate</th>
              <th scope="col">Frequency</th>
              <th scope="col">Years</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.assetProj.map((asset, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{asset?.assetName}</td>
                <td>{Number(asset?.initialAmt).toLocaleString()}</td>
                <td>{Number(asset?.contrAmt).toLocaleString()}</td>
                <td>{asset?.intRate}%</td>
                <td>{asset?.frequency}</td>
                <td>{asset?.years}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => props.handleDeleteAssetProj(asset?._id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to={`/AssetProjection`}>
          <div className="d-grid col-6 mt-5 mx-auto">
            <button type="button" className="btn btn-secondary">
              Add Financial Goal
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};
