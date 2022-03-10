import dayjs from "dayjs";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditIcon } from "./EditIcon";
import { ViewIcon } from "./ViewIcon";
import { DeleteIcon } from "./DeleteIcon";
import { UpdateMoneyIcon } from "./UpdateMoneyIcon";

export const HomeAssetTable = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Asset Name</th>
              <th scope="col">Type</th>
              <th scope="col">Market Value</th>
              <th scope="col">Last Updated Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.allAssets.map((asset, index) => (
              <tr key = {index}>
                <th scope="row">{index + 1}</th>
                <td>{asset?.assetName}</td>
                <td>{asset?.assetType}</td>
                <td>
                  {Number(
                    asset?.assetvalue?.slice(-1)[0]?.valueAmt
                  ).toLocaleString()}
                </td>
                <td>
                  {dayjs(asset?.assetvalue?.slice(-1)[0]?.date).format(
                    "DD/MM/YYYY"
                  )}
                </td>
                <td>
                  <div className="row">
                    <div className="col">
                      <Link
                        to={`/${userContext?.data?.username}/assets/${asset?._id}/edit`}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                        >
                          <EditIcon />
                        </button>
                      </Link>
                    </div>
                    <div className="col">
                      <Link
                        to={`/${userContext?.data?.username}/assets/${asset?._id}`}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                        >
                          <ViewIcon />
                        </button>
                      </Link>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => props.handleDeleteAsset(asset?._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                    <div className="col">
                      <Link
                        to={`/${userContext?.data?.username}/assets/${asset?._id}/updateAmt`}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                        >
                          <UpdateMoneyIcon />
                        </button>
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to={`/${userContext?.data?.username}/assets/new`}>
          <div className="d-grid col-6 mt-4 mx-auto">
            <button type="button" className="btn btn-secondary">
              Add Asset
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};
