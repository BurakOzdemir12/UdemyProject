import alertify from "alertifyjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          userName: decodedToken.username,
        });
      } catch (error) {
        console.error("Token decode edilemedi:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);
  const register = async (email, password, fullname, userName) => {
    try {
      const response = await axios.post(
        "https://localhost:7000/api/User/register",
        {
          email,
          password,
          fullname,
          userName,
        }
      );
  
      if (response.data.success) {
        alertify.success(response.data.message || "Kayıt başarılı!");
      } else {
        throw new Error(response.data.errors || "Kayıt sırasında bir hata oluştu.");
      }
    } catch (error) {
      console.error("Register Failed", error.response?.data || error.message);
      alertify.error(
        error.response?.data?.errors?.[0] || "Kayıt sırasında bir hata oluştu."
      );
      throw error;
    }
  };
  
  
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
        userName: decodedToken.given_name,
      });
    } catch (error) {
      console.error("Login Failed", error);
      throw error;
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const response = await axios.put(
        "https://localhost:7000/api/User/update-profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const token = response.data.data.accessToken;
      if (token) {
        localStorage.setItem("jwt", token);
        const decodedToken = jwtDecode(token);
        setUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role || "user",
          fullname: updatedData.fullname,
          userName: updatedData.userName,
        });
      }
    } catch (error) {
      console.error(
        "Profil güncellenirken hata oluştu:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Güncelleme sırasında bir hata oluştu."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, updateProfile, logout, loading ,register}}
    >
      {children}
    </AuthContext.Provider>
  );
};
