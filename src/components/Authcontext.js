import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // <-- Add a loading state
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem(token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  return (
    <Authcontext.Provider value={{ user, login, loading }}>
      {children}
    </Authcontext.Provider>
  );
};
