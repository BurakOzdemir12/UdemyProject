import React from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const UserWelcomeSection = ({ title, onEditProfile }) => {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        mb: 5,
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#f8f9fa",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Profil İkonu */}
      <Avatar
        sx={{
          bgcolor: "#212529",
          color: "white",
          fontSize: "1.5rem",
          width: 56,
          height: 56,
        }}
      >
        {user?.fullname
          ? user.fullname
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
          : "?"}
      </Avatar>

      <Box>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            fontSize: { xs: 20, sm: 25, md: 30, lg: 25, xl: 25, xxl: 30 },
            color: "#212529",
            marginBottom: 1,
          }}
        >
          {title} {user?.fullname || "Kullanıcı"}!
        </Typography>

        {/* Modal açan link */}
        <Link
          onClick={(e) => {
            onEditProfile(); // Burada fonksiyon çağrılıyor
          }}
          sx={{
            color: "#007BFF",
            fontSize: "1rem",
            textDecoration: "none",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Profilini düzenle
        </Link>

        <Link
          href="/purchasedhistory"
          sx={{
            mx: 2,
            color: "#007BFF",
            fontSize: "1rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Satın alma geçmişi
        </Link>
      </Box>
    </Box>
  );
};

export default UserWelcomeSection;
