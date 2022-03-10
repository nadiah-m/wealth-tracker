import React from "react";
import "./App.css";
import { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import AssetProjection from "./Pages/AssetProjection/AssetProjection";
import Home from "./Pages/Home/Home";
import { SignInForm } from "./Pages/SignInForm";
import { SignUpForm } from "./Pages/SignUpForm";
import { NewAssetForm } from "./Pages/NewAssetForm";
import { EditAssetForm } from "./Pages/EditAssetForm";
import { UpdateAssetAmt } from "./Pages/UpdateAssetAmt";
import { AssetDetails } from "./Pages/AssetDetails";
import { NewLiabilityForm } from "./Pages/NewLiabilityForm";
import { EditLiabilityForm } from "./Pages/EditLiabilityForm";
import { UpdateLiabilityAmt } from "./Pages/UpdateLiabilityAmt";
import { LiabilityDetails } from "./Pages/LiabilityDetails";

export const UserContext = createContext();

function App() {
  const { userID } = useParams();
  const [assets, setAssets] = useState([]);

  const addAssets = (asset) => {
    setAssets([...assets, asset]);
  };

  const [userContext, setUserContext] = useState({});

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedData = localStorage.getItem("userContext");
      if (!storedData) {
        return;
      } else {
        const parsedStoredData = JSON.parse(storedData);
        setUserContext(parsedStoredData);
      }
    };
    checkLocalStorage();
  }, []);

  console.log("check local storage", userContext);
  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <div className="App">
        <nav className="navbar navbar-light bg-dark container-fluid">
          <div className="d-flex">
            <div className="px-4 fs-5 m-auto">
              <Link
                className="text-decoration-none text-white"
                to={`/${userContext?.data?.username}`}
              >
                Home
              </Link>
            </div>

            <div className="px-4 fs-5 m-auto">
              <Link
                className="text-decoration-none text-white"
                to="/AssetProjection"
              >
                Goals Calculator
              </Link>
            </div>

            <div className="px-4 fs-5 m-auto">
              <Link className="text-decoration-none text-white" to="/signin">
                Log In
              </Link>
            </div>

            <div className="px-4 fs-5 m-auto">
              <Link className="text-decoration-none text-white" to="/signup">
                Sign Up
              </Link>
            </div>
        
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/:userID" element={<Home />} />
            <Route
              path="/AssetProjection"
              element={
                <AssetProjection addAssets={addAssets} assets={assets} />
              }
            />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/:userID/assets/new" element={<NewAssetForm />} />
            <Route
              path="/:userID/assets/:assetid/edit"
              element={<EditAssetForm />}
            />
            <Route
              path="/:userID/assets/:assetid/updateAmt"
              element={<UpdateAssetAmt />}
            />
            <Route
              path="/:userID/assets/:assetid/"
              element={<AssetDetails />}
            />
            <Route
              path="/:userID/liabilities/:liabilityid/edit"
              element={<EditLiabilityForm />}
            />
            <Route
              path="/:userID/liabilities/new"
              element={<NewLiabilityForm />}
            />
            <Route
              path="/:userID/liabilities/:liabilityid/updateAmt"
              element={<UpdateLiabilityAmt />}
            />
            <Route
              path="/:userID/liabilities/:liabilityid"
              element={<LiabilityDetails />}
            />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
