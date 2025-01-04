
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role || "user",
          fullname: decodedToken.given_name,
        });
      } catch (error) {
        console.error("Token decode edilemedi:", error);
        logout(); 
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://localhost:7000/api/Auth/CreateToken",
        { email, password }
      );
      const token = response.data.data.accessToken;
      if (!token) {
        throw new Error("Token bulunamadı.");
      }
      localStorage.setItem("jwt", token);

      const decodedToken = jwtDecode(token); 
      setUser({
        id: decodedToken.sub, 
        email: decodedToken.email, 
        role: decodedToken.role || "user", 
        fullname: decodedToken.given_name, 
      });
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  const value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
