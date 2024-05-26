// src/components/CreateProfile.js
import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://185.192.96.202:9080/api-docs";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateProfile = async () => {
    try {
      const response = await axios.post(`${API_URL}/create-profile`, {
        name,
        email,
        state,
        city,
      });
      console.log("Profile created:", response.data);
      setSuccess(true);
    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    handleCreateProfile();
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>city:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
      {success && <p>Profile created successfully!</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateProfile;
