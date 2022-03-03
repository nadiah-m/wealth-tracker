import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const NewAssetForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAsset = {};
  };
  return (
    <>
      <h3>Add Asset</h3>
      <Link to="/">Back to Home</Link>
      <form onSubmit={handleSubmit}>
        <label> Asset name: </label>
        <input type="text" name="name" id="name" />
        <button type="submit">Add Asset</button>
      </form>
    </>
  );
};
