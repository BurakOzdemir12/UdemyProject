import { Box, Grid, Typography, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { urlCourses } from "../endpoints";
import { ClipLoader } from "react-spinners";
import { useCart } from "../context/CartContext";

const CourseDetail = () => {
  const { id } = useParams();
  const { data: course, loading, error } = useFetch(`${urlCourses}/${id}`);
  const { addToCart } = useCart();

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <ClipLoader color="#007BFF" size={180} />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <p>Error: {error.message}</p>
      </Box>
    );

  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Sol Kısım */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {course.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {course.description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Kategori:</strong> {course.category || "Tarih yok"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Eğitmen:</strong> {course.instructor}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Son Güncelleme:</strong> {course.updatedAt || "Tarih yok"}
          </Typography>

          <Box
            sx={{
              padding: 1,
              boxShadow: "0px 4px 5px 5px rgba(0, 0, 0, 0.1)",
              border: "black",
              borderRadius: 5,
              mt: 10,
            }}
          >
            <body1>!Örnek Verilmiştir. Bu kısım dinamik yazılmıştır! </body1>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Öğrenecekleriniz
              <ul>
                <li>
                  <Typography variant="body1">
                    Yapay Zeka Teknolojileri: Makine öğrenmesi, derin öğrenme ve
                    büyük dil modellerini öğren
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Prompt Mühendisliği: En doğru sonuçları alabileceğin
                    metinleri yazmayı öğren
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    DALL-E: Saniyeler içinde kelimelerin görsellere dönüşsün
                    öğren
                  </Typography>
                </li>
              </ul>
            </Typography>
            <ul>
              {course?.features?.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body1">{feature}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>

        {/* Sağ Kısım */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: 3,
              backgroundColor: "white",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              ₺{course.price}{" "}
              <Typography
                component="span"
                variant="body2"
                sx={{ textDecoration: "line-through", color: "gray", ml: 1 }}
              >
                ₺{course.oldPrice || course.price + 100}
              </Typography>
            </Typography>
            <Typography variant="body2" gutterBottom>
              30 Gün Para İade Garantisi
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              onClick={() => addToCart(course)}
            >
              Sepete Ekle
            </Button>
            <Button fullWidth variant="outlined">
              Hemen Kayıt Olun
            </Button>

            <Box mt={3}>
              <Typography variant="subtitle1" fontWeight="bold">
                Bu kursun içeriği:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">27 saat video içeriği</Typography>
                </li>
                <li>
                  <Typography variant="body2">6 makale</Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    15 indirilebilir kaynak
                  </Typography>
                </li>
              </ul>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetail;
