import React from "react";
import { Box, Button, Typography, IconButton, Container } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
       calculateTotal,
       calculateTotalItems,
  } = useCart();

//   const calculateTotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   const calculateTotalItems = () =>
//     cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Container maxWidth="xl">
      <Box mt={5} p={2}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Alışveriş Sepeti
        </Typography>
        <Box mb={2}>
          <Typography variant="h6">
            Sepette {calculateTotalItems()} Kurs Var
          </Typography>
        </Box>
        <Box textAlign={{ xs: "center", sm: "left" }}>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 1, mx: 1 }}
            onClick={clearCart}
          >
            Sepeti Temizle
          </Button>
        </Box>
        <Box
          mt={4}
          mb={4}
          display="flex"
          flexWrap="wrap"
          justifyContent={{ xs: "center", sm: "right" }}
          alignItems="center"
          gap={2}
        >
          <Box textAlign={{ xs: "center", sm: "right" }}>
            <Typography variant="h6" fontWeight="bold">
              Toplam: ₺{calculateTotal().toFixed(2)}
            </Typography>
            <Link to="/payment">
            <Button
              variant="contained"
              sx={{ backgroundColor: "blueviolet", mt: 1, mx: 1 }}
              to="/payment"
              //      onClick={}
            >
              Ödeme Bilgileri
            </Button>
            </Link>
          </Box>
        </Box>

        {cart.length === 0 ? (
          <Typography>Sepetinizde ürün bulunmamaktadır.</Typography>
        ) : (
          <Box>
            {cart.map((item) => (
              <Box
                key={item.id}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
                mb={3}
                p={2}
                sx={{
                  borderBottom: "1px solid #ccc",
                  gap: 2,
                }}
              >
                <Box
                  flex={{ xs: "1 1 100px", sm: "1 1 100px" }}
                  textAlign="center"
                >
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>

                <Box
                  flex={{ xs: "1 1 auto", sm: "3 1 auto" }}
                  ml={{ xs: 0, sm: 3 }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" fontWeight="600">
                    {item.description}
                  </Typography>
                  <Typography color="text.secondary">
                    Eğitmen: {item.instructor}
                  </Typography>
                  <Typography color="text.secondary">
                    Seviye: {item.level || "Tüm Düzeyler"}
                  </Typography>
                </Box>

                {/* Fiyat ve Miktar */}
                <Box
                  flex={{ xs: "1 1 auto", sm: "2 1 auto" }}
                  display="flex"
                  flexDirection="column"
                  alignItems={{ xs: "flex-start", sm: "flex-end" }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="success.main"
                    mb={1}
                  >
                    ₺{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <IconButton onClick={() => decreaseQuantity(item.id)}>
                      <Remove />
                    </IconButton>
                    <Typography mx={2}>{item.quantity}</Typography>
                    <IconButton onClick={() => increaseQuantity(item.id)}>
                      <Add />
                    </IconButton>
                  </Box>
                </Box>

                {/* İşlem Butonları */}
                <Box
                  flex={{ xs: "1 1 100%", sm: "1 1 auto" }}
                  textAlign={{ xs: "center", sm: "right" }}
                >
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ display: "block", marginBottom: 1 }}
                  >
                    Kaldır
                  </Button>
                  <Button variant="text" color="primary">
                    İstek Listesine Ekle
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
