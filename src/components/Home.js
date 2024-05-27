import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const Handlelogin = () => {
    navigate("/login");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleCreate = () => {
    navigate("/createProfile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome</h1>
      <h3 className="text-xl font-semibold text-gray-600 mb-4">
        Please select an option:
      </h3>
      <div className="space-x-4">
        <button
          onClick={Handlelogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>
        <button
          onClick={handleProfile}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Profile
        </button>
        <button
          onClick={handleCreate}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors duration-300"
        >
          Create Profile
        </button>
      </div>
      <br />
      <br />

      <div className="h-12 w-50  bg-yellow-200 px-4 text-xl text-black">
        <p className="mt-3 px-4">
          Note : if You dont have a profile so the profile will also redirect
          you to the Profile page{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
