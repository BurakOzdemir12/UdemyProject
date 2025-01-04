import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid2,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/Header";
import Cards from "react-credit-cards-2";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import alertify from "alertifyjs";

const Payment = () => {
  const { cart, purchase, calculateTotal, calculateTotalItems } = useCart();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [state, setState] = useState({
    number: "",
    expiry: "",
    month: "",
    year: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateCardNumber = (number) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateExpiry = (month, year) => {
    if (!month || !year) return false;
    const currentDate = new Date();
    const enteredDate = new Date(`20${year}`, month - 1);
    return month > 0 && month <= 12 && enteredDate >= currentDate;
  };

  const validateCVC = (cvc) => /^\d{3,4}$/.test(cvc);

  const validateForm = () => {
    const newErrors = {};

    if (!state.number || !validateCardNumber(state.number.replace(/\s/g, ""))) {
      newErrors.number = "Invalid card number";
    }
    if (!state.name) {
      newErrors.name = "Name on card is required";
    }
    if (
      !state.month ||
      !state.year ||
      !validateExpiry(state.month, state.year)
    ) {
      newErrors.expiry = "Invalid expiry date. Format: MM/YY";
    }
    if (!state.cvc || !validateCVC(state.cvc)) {
      newErrors.cvc = "CVC must 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await purchase();
    } else {
      alertify.error("Lütfen ödeme bilgilerini doğru doldurun!");
    }
  };

  return (
    <Box>
      <Container maxWidth="xxl">
        <Grid2 mt={10} container justifyContent={"center"}>
          <Grid2
            item
            sx={{
              // backgroundColor: "blue",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4, xxl: 4 }}
          >
            <Header title="Ödeme Bilgileri" />
            <Typography fontWeight={"bold"} variant="h6">
              Fatura Adresi
            </Typography>
            <Typography fontWeight={"bold"} variant="h6">
              Ülke
            </Typography>
            <Box sx={{ display: { sm: "flex" }, gap: 3 }}>
              <Cards
                number={state.number}
                expiry={`${state.month}/${state.year}`}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
              <form>
                <Input
                  variant="contained"
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                {errors.number && (
                  <FormHelperText error>{errors.number}</FormHelperText>
                )}

                <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
                  <Input
                    type="number"
                    name="month"
                    placeholder="MM"
                    value={state.month}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                  <Input
                    type="number"
                    name="year"
                    placeholder="YY"
                    value={state.year}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </Box>
                {errors.expiry && (
                  <FormHelperText error>{errors.expiry}</FormHelperText>
                )}
                <Input
                  type="number"
                  name="cvc"
                  placeholder="cvc/cvv"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                {errors.cvc && (
                  <FormHelperText error>{errors.cvc}</FormHelperText>
                )}

                <Input
                  type="text"
                  name="name"
                  placeholder="Kart üzerindeki isim"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                {errors.expiry && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}

                <Input
                  type="number"
                  name="focused"
                  placeholder="focused"
                  value={state.focus}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                {errors.cvc && (
                  <FormHelperText error>{errors.cvc}</FormHelperText>
                )}
              </form>
            </Box>
          </Grid2>
          <Grid2
            item
            size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4, xxl: 4 }}
            sx={{
              // backgroundColor: "blueviolet",

              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ padding: { sm: 12 }, justifyContent: "center" }}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontWeight={"bolder"} variant="body1">
                  Orijinal Fiyat:
                </Typography>
                <Typography fontWeight={"bolder"} variant="body1">
                  ₺{calculateTotal().toFixed(2)}
                </Typography>
              </Box>

              {/* Toplam Kurs ve Fiyat */}
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontWeight={"bolder"} variant="body1">
                  Toplam: {calculateTotalItems()} Kurs
                </Typography>
                <Typography fontWeight={"bolder"} variant="body1">
                  ₺{calculateTotal().toFixed(2)}
                </Typography>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "blueviolet", mt: 5, mb: 5 }}
                onClick={handlePayment}
              >
                Ödemeyi Tamamla
              </Button>
              <Box display={"flex"} sx={{ gap: 1 }}>
                <Header subtitle={"Sipariş ayrıntıları"} />{" "}
                <Typography mt={1} alignSelf={"center"}>
                  {" "}
                  ({calculateTotalItems()} Kurs)
                </Typography>
              </Box>
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
                        width: "75px",
                        height: "75px",
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
                    <Typography>Adet: {item.quantity}</Typography>
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
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Payment;
