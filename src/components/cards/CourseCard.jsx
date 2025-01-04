import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

function CourseCard({ course, hideAddToCart }) {
  const { addToCart } = useCart();

  return (
    <Box
    
      component={Link}
      to={`/course/${course.id}`}
      key={course.id}
      sx={{
        textDecoration: "none",
        textTransform: "none",
        border: "1px solid #ccc",
        padding: 2,
        borderRadius: 4,
         color: "inherit",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover":{
          backgroundColor:"#adb5bd"
        }
      }}
    >
      <Typography sx={{ fontWeight: 700 }} variant="h5">
        {course.name}
      </Typography>
      <Typography sx={{ fontWeight: 400 }} variant="h6">
        {course.description}
      </Typography>
      {/* <Typography sx={{fontWeight:400}} variant="body2">{course.category}</Typography> */}
      <Typography sx={{ fontWeight: 400 }} variant="body2">
        {course.instructor}
      </Typography>
      <Typography sx={{ fontWeight: 600 }} variant="body1">
        ₺{course.price}
      </Typography>
      <Typography sx={{ fontWeight: 400 }} variant="body2">
        {course.OrderDate}
      </Typography>
      {hideAddToCart && (
        <Button
          onClick={() => addToCart(course)}
          variant="contained"
          sx={{ width: "50%", backgroundColor: "purple", color: "white" }}
        >
          Sepete Ekle
        </Button>
      )}
    </Box>
  );
}

export default CourseCard;
