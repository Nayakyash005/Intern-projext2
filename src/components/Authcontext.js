import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); // <-- Add a loading state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token is ", token);
    if (token && typeof token === "string") {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        // Handle the invalid token scenario, e.g., clear the token from storage
        localStorage.removeItem("token");
      }
    } else {
      console.log("tocken is not a string");
    }
    // return () => {
    //   localStorage.removeItem("token");
    // };
    setLoading(false);
  }, []);

  const login = (token, reftoken) => {
    try {
      console.log("tocken is set");
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      console.log("user is", decodedUser);
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", reftoken);
    } catch (error) {
      console.error("Invalid token during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Authcontext.Provider value={{ user, login, logout, loading }}>
      {children}
    </Authcontext.Provider>
  );
};
