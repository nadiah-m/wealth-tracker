import React from "react";
import "./App.css";
import { useState, createContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AssetProjection from "./Pages/AssetProjection/AssetProjection";
import Home from "./Pages/Home/Home";
import { SignInForm } from "./Pages/SignInForm";
import { SignUpForm } from "./Pages/SignUpForm";
import { NewAssetForm } from "./Pages/NewAssetForm";
import { EditAssetForm } from "./Pages/EditAssetForm";
import { UpdateAssetAmt } from "./Pages/UpdateAssetAmt";
import { AssetDetails } from "./Pages/AssetDetails";
import { NewLiabilityForm } from "./Pages/NewLiabilityForm";

export const UserContext = createContext();

function App() {
  const [assets, setAssets] = useState([]);

  const addAssets = (asset) => {
    setAssets([...assets, asset]);
  };

  const [userContext, setUserContext] = useState({
    userID: "",
    username: "",
    password: "",
    isLoggedIn: false,
  });

  return (
    <UserContext.Provider value={[userContext, setUserContext]}>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/AssetProjection">AssetProjection</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </nav>
        <h2>Calculate your wealth</h2>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/AssetProjection"
              element={
                <AssetProjection addAssets={addAssets} assets={assets} />
              }
            />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/assets/new" element={<NewAssetForm />} />
            <Route path="/assets/:assetid/edit" element={<EditAssetForm />} />
            <Route
              path="/assets/:assetid/updateAmt"
              element={<UpdateAssetAmt />}
            />
            <Route path="/assets/:assetid/" element={<AssetDetails />} />
            <Route path="/liabilities/new" element={<NewLiabilityForm />} />
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
