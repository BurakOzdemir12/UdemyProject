import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color="textPrimary"
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>

      <Typography
        variant="h5"
        color="textSecondary"
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
