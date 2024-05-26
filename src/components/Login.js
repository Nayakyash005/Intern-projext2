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
        console.log("there is error on revieving data from Api");
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
      console.log(token);
      if (token || data) {
        login(token);
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
    <>
      {!otpsent ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enterphone..."
            name="phone"
            onChange={(e) => setcontact(e.target.value)}
          />
          <input
            type="text"
            placeholder="Your Country code..."
            name="country"
            onChange={(e) => setcountry(e.target.value)}
          />
          <button onClick={(e) => handleSendOtp(e.target.value)} type="submit">
            Send Otp
          </button>
        </div>
      ) : (
        <div>
          <h1>verify Otp </h1>
          <label htmlFor="number">
            Input Otp
            <br />
            <input
              type="number"
              name="otp"
              onChange={(e) => setotp(e.target.value)}
            />
          </label>
          <button onClick={handleVerifyOtp}>Verify</button>
        </div>
      )}
    </>
  );
};

export default Login;
