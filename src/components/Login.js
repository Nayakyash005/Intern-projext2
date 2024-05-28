import React, { useState } from "react";
import { useContext } from "react";
import { Authcontext } from "./Authcontext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [country, setcountry] = useState("");
  const [contact, setcontact] = useState("");
  const [otp, setotp] = useState(0);
  const [otpsent, setotpsent] = useState(false);
  const { login } = useContext(Authcontext);
  const navigate = useNavigate();
  console.log("hi");
  const API_URL = "http://185.192.96.202:9080";
  let headersList = {
    Accept: "/",
    "Content-Type": "application/json",
  };
  let bodyContent = JSON.stringify({
    country_code: country,
    mobile_number: contact,
  });

  const handleSendOtp = async (e) => {
    try {
      console.log("btn clicked");
      console.log(e);
      console.log("Sending OTP to:", contact, "Country:", country);
      // const response = await axios.post(API_URL, {
      //   country,
      //   contact,
      // });
      let response = await fetch(API_URL + "/send-otp", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.text();
      console.log(data);

      console.log("responce is", data);
      if (data) {
        setotpsent(true);
      } else {
        console.log("there is error on revieving data from the Api");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      console.log("start verification for otp ", otp);
      // const response = await axios.post(
      //   "http://185.192.96.202:9080/verify-otp",
      //   {
      //     body: {
      //       country_code: country,
      //       mobile_number: contact,
      //       otp: otp,
      //     },
      //     headers: headersList,
      //   }
      // );

      let response = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        body: JSON.stringify({
          country_code: country,
          mobile_number: contact,
          otp: otp,
        }),
        headers: headersList,
      });
      const data = await response.json();
      console.log("token is ", data);
      const result = [data];
      console.log("token is ", result[0]);
      const token = data.access_token;
      const reftoken = data.refresh_token;
      console.log(token);
      if (token || data) {
        login(token, reftoken);
        console.log("succes");
        navigate("/profile");
      } else {
        console.log("chuti*a");
      }
    } catch (error) {
      console.log("error is ", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!otpsent ? (
        <div className="bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl mb-4">Login</h2>
          <input
            type="text"
            placeholder="Enter phone..."
            name="phone"
            value={contact}
            onChange={(e) => setcontact(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <input
            type="text"
            placeholder="Your Country code..."
            name="country"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />
          <button
            onClick={handleSendOtp}
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-md shadow-md">
          <h1 className="text-2xl mb-4">Verify OTP</h1>
          <label htmlFor="otp" className="mb-4">
            Input OTP
            <input
              type="number"
              name="otp"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />
          </label>
          <button
            onClick={handleVerifyOtp}
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
