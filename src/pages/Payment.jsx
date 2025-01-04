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
  const { purchase, calculateTotal, calculateTotalItems } = useCart();
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

  const handlePayment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      purchase();
      alertify.success("Ödeme Başarılı!");
      navigate("/profile");
    } else {
      alertify.error("Ödeme Başarısız!");
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
                sx={{ backgroundColor: "blueviolet", mt: 1, mx: 1 }}
                onClick={handlePayment}
              >
                Ödemeyi Tamamla
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Payment;
