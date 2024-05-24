import react, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./Authcontext";
function login() {
  const [country, setcountry] = useState("");
  const [contact, setcontact] = useState("");
  const [otp, setotp] = useState("");
  const [otpsent, setotpsent] = useState(false);
  const { login } = useContext(AuthContext);

  const API_URL = "http://185.192.96.202:9080/api-docs/";
  const sendotp = () => {
    const response = axios.post(API_URL + "/send-otp", { contact, country });
  };
  const handleverifyotp = () => {};
  return (
    <>
      {!otpsent ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Enterphone..."
            name="phone"
            onChange={(e) => setcontact(e)}
          />
          <input
            type="text"
            placeholder="Your Country..."
            name="country"
            onChange={(e) => setcountry(e)}
          />
          <button onSubmit={sendotp} type="submit">
            Send Otp
          </button>
        </div>
      ) : (
        <div>
          <h1>verify Otp </h1>;
          <label htmlFor="text">
            Input Otp
            <input type="text" name="otp" />
          </label>
          <button onClick={handleverifyotp}></button>
        </div>
      )}
    </>
  );
}
