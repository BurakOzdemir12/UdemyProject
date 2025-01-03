import { Box, Typography } from "@mui/material";
import React from "react";

function CourseCard({ course }) {
  return (
    <Box
      key={course.id}
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{fontWeight:700}} variant="h5">{course.name}</Typography>
      <Typography sx={{fontWeight:400}} variant="h6">{course.description}</Typography>
      {/* <Typography sx={{fontWeight:400}} variant="body2">{course.category}</Typography> */}
      <Typography sx={{fontWeight:400}} variant="body2">{course.instructor}</Typography>
      <Typography sx={{fontWeight:600}} variant="body1">₺{course.price}</Typography>
    </Box>
  );
}

export default CourseCard;
