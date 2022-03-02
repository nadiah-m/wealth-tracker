import React from "react";
import "./App.css";
import { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AssetProjection from "./Pages/AssetProjection/AssetProjection";
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
        <Link to="/AssetProjection">AssetProjection</Link>
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
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
