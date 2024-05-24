import React, { useState } from "react";
import { useContext } from "react";
import { Authcontext } from "./Authcontext";
import axios from "axios";
const Login = () => {
  const [country, setcountry] = useState("");
  const [contact, setcontact] = useState("");
  const [otp, setotp] = useState(0);
  const [otpsent, setotpsent] = useState(false);
  const { login } = useContext(Authcontext);
  console.log("hi");
  const API_URL = "http://185.192.96.202:9080/api-docs/";
  const handleSendOtp = async () => {
    try {
      console.log("btn clicked");
      const response = await axios.post(API_URL + "/send-otp", {
        contact,
        country,
      });
      console.log("responce is", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(API_URL + "/verify-otp", {
        country,
        contact,
        otp,
      });
      const { token } = response.data.access_token;
      console.log(token);
      login(token);
    } catch (error) {}
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
            placeholder="Your Country..."
            name="country"
            onChange={(e) => setcountry(e.target.value)}
          />
          <button onClick={handleSendOtp} type="submit">
            Send Otp
          </button>
        </div>
      ) : (
        <div>
          <h1>verify Otp </h1>;
          <label htmlFor="number">
            Input Otp
            <input
              type="number"
              name="otp"
              onChange={(e) => setotp(e.target.value)}
            />
          </label>
          <button onClick={handleVerifyOtp}></button>
        </div>
      )}
    </>
  );
};

export default Login;
