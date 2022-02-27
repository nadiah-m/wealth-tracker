import React from "react";
import "./App.css";
import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SingleAssetProjection from "./Pages/SingleAssetProjection/SingleAssetProjection";
import TotalAssetProjection from "./Pages/TotalAssetProjection/TotalAssetProjection";
import Home from "./Pages/Home/Home";

function App() {
  const [assets, setAssets] = useState([]);

  const addAssets = (asset) => {
    setAssets([...assets, asset]);
  };

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/SingleAssetProjection"> Single Asset Projection</Link>
        <Link to="/TotalAssetProjection"> Total Asset Projection</Link>
      </nav>
      <h2>Calculate your wealth</h2>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/SingleAssetProjection"
            element={
              <SingleAssetProjection addAssets={addAssets} assets={assets} />
            }
          />
          <Route
            path="/TotalAssetProjection"
            element={
              <TotalAssetProjection addAssets={addAssets} assets={assets} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
