import dayjs from "dayjs";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditIcon } from "./EditIcon";
import { ViewIcon } from "./ViewIcon";
import { DeleteIcon } from "./DeleteIcon";
import { UpdateMoneyIcon } from "./UpdateMoneyIcon";

export const HomeLiabilityTable = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Liability Name</th>
              <th scope="col">Type</th>
              <th scope="col">Value</th>
              <th scope="col">Last Updated Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.allLiabilities.map((liability, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{liability?.liabilityName}</td>
                <td>{liability?.liabilityType}</td>
                <td>
                  {Number(
                    liability?.liabilityvalue?.slice(-1)[0]?.valueAmt
                  ).toLocaleString()}
                </td>
                <td>
                  {dayjs(liability?.liabilityvalue?.slice(-1)[0]?.date).format(
                    "DD/MM/YYYY"
                  )}
                </td>
                <td>
                  <div className="row">
                    <div className="col">
                      <Link
                        to={`/${userContext?.data?.username}/liabilities/${liability?._id}/edit`}
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
                        to={`/${userContext?.data?.username}/liabilities/${liability?._id}`}
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
                        onClick={() => props.handleDeleteAsset(liability?._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                    <div className="col">
                      <Link
                        to={`/${userContext?.data?.username}/liabilities/${liability?._id}/updateAmt`}
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
        <Link to={`/${userContext?.data?.username}/liabilities/new`}>
          <div className="d-grid col-6 mx-auto">
            <button type="button" className="btn btn-secondary">
              Add Liability
            </button>
          </div>
        </Link>
      </div>
    </>
  );
};
