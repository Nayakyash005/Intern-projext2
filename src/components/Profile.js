// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://185.192.96.202:9080";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No access token found, redirecting to login...");
        setTimeout(() => {
          Navigate("/login");
        }, 2000);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      try {
        const response = await fetch(`${API_URL}/profile-sunscription`, {
          method: "GET",
          headers: headers,
        });

        if (response.status === 401) {
          // Handle token expiration
          const refreshToken = localStorage.getItem("refresh_token");
          const refreshResponse = await fetch(`${API_URL}/refresh-token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          const refreshData = await refreshResponse.json();
          if (refreshData.access_token) {
            localStorage.setItem("token", refreshData.access_token);
            fetchProfileData(); // Retry with new token
          } else {
            setError("Session expired, redirecting to login...");
            setTimeout(() => {
              Navigate("/login");
            }, 2000);
          }
        } else {
          const data = await response.json();
          console.log("user data is", data);
          setProfileData(data);
        }
      } catch (err) {
        setError("Failed to fetch profile data");
        Navigate("/CreateProfile");
      }
    };

    fetchProfileData();
  }, [Navigate]);

  // Assuming profileData is an object containing the profile information
  // Make sure to import Tailwind CSS in your project before using these styles

  // Render method of a React component
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md md:w-1/2 mx-auto">
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-400 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {!profileData && <div className="text-center">Loading...</div>}

      {profileData && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="mb-2">
            <span className="font-semibold">Name:</span> {profileData.name}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {profileData.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Company:</span>{" "}
            {profileData.company}
          </p>
          <p className="mb-2">
            <span className="font-semibold">City:</span> {profileData.city}
          </p>
          <p className="mb-2">
            <span className="font-semibold">State:</span> {profileData.state}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
