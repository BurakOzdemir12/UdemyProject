import React from "react";
import { Box, Typography, Avatar, Link } from "@mui/material";

const UserWelcomeSection = ({ user }) => {
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

      {/* Hoş Geldiniz Mesajı */}
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
          Tekrar hoş geldiniz, {user?.fullname || "Kullanıcı"}!
        </Typography>
        <Link
          href="#"
          sx={{
            color: "#007BFF",
            fontSize: "1rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Profilini düzenle
        </Link>
      </Box>
    </Box>
  );
};

export default UserWelcomeSection;
