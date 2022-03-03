import React from "react";
import "./App.css";
import { useState, createContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import AssetProjection from "./Pages/AssetProjection/AssetProjection";
import Home from "./Pages/Home/Home";
import { SignInForm } from "./Pages/SignInForm";
import { SignUpForm } from "./Pages/SignUpForm";

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
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
