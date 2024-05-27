// src/components/CreateProfile.js
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Authcontext } from "./Authcontext";

const API_URL = "http://185.192.96.202:9080";

const CreateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [company, setCompany] = useState("");
  const [sponsorCode, setSponsorCode] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    console.log("Access Token from localStorage:", storedAccessToken);
    console.log("Refresh Token from localStorage:", storedRefreshToken);
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
  }, []);

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, {
        refresh_token: refreshToken,
      });
      const { access_token: newAccessToken } = response.data;
      setAccessToken(newAccessToken);
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
      setError("Failed to refresh token. Please log in again.");
      return null;
    }
  };

  const handleCreateProfile = async () => {
    let validAccessToken = accessToken;
    if (!accessToken || isTokenExpired(accessToken)) {
      console.log("Access token is expired or missing, refreshing...");
      validAccessToken = await refreshAccessToken();
      if (!validAccessToken) return;
    }

    const headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${validAccessToken}`,
    };

    console.log("Headers being sent:", headersList);
    console.log("Request body:", {
      name,
      email,
      company,
      state,
      city,
      sponsor_code: sponsorCode,
    });

    try {
      const response = await fetch(`${API_URL}/create-profile`, {
        method: "POST",
        headers: headersList,
        body: JSON.stringify({
          name,
          email,
          company,
          state,
          city,
          sponsor_code: sponsorCode,
        }),
      });

      const data = await response.json();
      console.log("Profile created:", data);

      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to create profile");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    handleCreateProfile();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl bg-slate-500 text-blue-300 font-bold mb-4">
        Create Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold mb-1">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block font-semibold mb-1">
            State:
          </label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block font-semibold mb-1">
            City:
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="company" className="block font-semibold mb-1">
            Company:
          </label>
          <input
            id="company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sponsorCode" className="block font-semibold mb-1">
            Sponsor Code:
          </label>
          <input
            id="sponsorCode"
            type="text"
            value={sponsorCode}
            onChange={(e) => setSponsorCode(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Create Profile
        </button>
      </form>
      {success && (
        <p className="text-green-500 mt-2">Profile created successfully!</p>
      )}
      {error && (
        <div>
          {" "}
          <p className="text-red-500 mt-2">{error}</p>{" "}
          <div className="h-fit w-50  bg-red-200 px-4 text-xl text-black">
            <p className="mt-3 px-4">
              Note : This Api That Provided is giving the token that are already
              expired so Due to that the token is found to be invalid{" "}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreateProfile;
