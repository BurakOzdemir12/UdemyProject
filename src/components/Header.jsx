import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="0px">
      <Typography
        variant="h4"
        color="textPrimary"
        fontWeight="bold"
        sx={{
          mb: "5px",
          fontSize: { xs: 20, sm: 25, md: 30, lg: 35, xl: 40, xxl: 45 },
        }}
      >
        {title}
      </Typography>

      <Typography
      sx={{
       mt: 2,
       mb: "5px",
       fontSize: { xs: 15, sm: 20, md: 20, lg: 25, xl: 25, xxl: 25 },
     }}
      variant="h5" color="textSecondary">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
