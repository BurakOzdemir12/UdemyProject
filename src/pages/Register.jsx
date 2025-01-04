import alertify from "alertifyjs";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import registerimage from "../images/registerpage.webp";

const Register = () => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Lütfen email adresinizi giriniz.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Geçerli bir email adresi giriniz.";
    }

    if (!fullname) {
      newErrors.fullname = "Ad Soyad alanı boş bırakılamaz.";
    }

    if (!username) {
      newErrors.username = "Kullanıcı adı boş bırakılamaz.";
    }

    if (!password) {
      newErrors.password = "Şifre boş bırakılamaz.";
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      newErrors.password =
        "Şifre en az 8 karakter olmalı, bir büyük harf, bir rakam ve bir özel karakter içermelidir.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await register(email, password, fullname, username);
      alertify.success("Kayıt Başarılı");
      navigate("/login");
    } catch {
      alertify.error("Kayıt Başarısız");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
      }}
    >
      <Grid2 container>
        <Grid2
          sx={{
            alignContent: "center",
            "@media (max-width: 820px )": {
              display: "none",
            },
          }}
          item
          size={{ xs: 0, sm: 12, md: 6, lg: 6, xl: 6, xxl: 6 }}
        >
          <Box
            sx={{
              justifySelf: "center",
            }}
          >
            <img
              style={{
                backgroundRepeat: "no-repeat",
              }}
              src={registerimage}
            />
          </Box>
        </Grid2>
        <Grid2
          sx={{
            mb: "75px",
            color: "black",
            alignContent: "center",
            justifyItems: "center",
          }}
          item
          size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6, xxl: 6 }}
        >
          <Box
            sx={{
              borderRadius: "25px",
              margin: "40px 40px 20px",
              boxShadow: "0px 5px 23px 11px rgba(3,76,12,0.3)",
              height: "40rem",
              width: "25rem",
              minHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",

              "@media(max-width:440px)": {
                height: "35rem",
                width: "90%",
              },
            }}
            display="grid"
            gridTemplateColumns="repeat(12,minmax(0,1fr))"
            gridAutoRows="30px"
            noGutters
          >
            <Box gridColumn="span 12" gridRow="span 3">
              <Typography variant="h4" className="text-center" fontWeight={600}>
                {" "}
                Kaydol
              </Typography>
            </Box>

            <Box
              padding={5}
              component="form"
              onSubmit={handleRegister}
              gridColumn="span 12"
              gridRow="span 12"
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!errors.email}
                helperText={errors.email}
                id="outlined-basic"
                label="abc@email.com"
                variant="outlined"
                sx={{
                  mt: 4,
                  width: "100%",
                  "& .MuiInputBase-input": {
                    color: "black", // Giriş metni rengi
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    color: "black",
                    borderColor: "black", // Çerçeve rengi
                    opacity: 0.3,
                    borderRadius: "19px",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "black",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "green",
                    },
                }}
                InputLabelProps={{
                  style: { color: "black" }, // Label rengi
                }}
              />
              <TextField
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                error={!!errors.fullname}
                helperText={errors.fullname}
                id="outlined-basic"
                label="Ad Soyad"
                variant="outlined"
                sx={{
                  mt: 2,
                  width: "100%",
                  "& .MuiInputBase-input": {
                    color: "black", // Giriş metni rengi
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    color: "black",
                    borderColor: "black", // Çerçeve rengi
                    opacity: 0.3,
                    borderRadius: "19px",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "black",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "green",
                    },
                }}
                InputLabelProps={{
                  style: { color: "black" }, // Label rengi
                }}
              />
              <TextField
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                error={!!errors.username}
                helperText={errors.username}
                id="outlined-basic"
                label="Kullanıcı Adı"
                variant="outlined"
                sx={{
                  mt: 2,
                  width: "100%",
                  "& .MuiInputBase-input": {
                    color: "black", // Giriş metni rengi
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    color: "black",
                    borderColor: "black", // Çerçeve rengi
                    opacity: 0.3,
                    borderRadius: "19px",
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "black",
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "green",
                    },
                }}
                InputLabelProps={{
                  style: { color: "black" }, // Label rengi
                }}
              />

              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={!!errors.password}
                helperText={errors.password}
                id="outlined-basic"
                label="Şifre"
                variant="outlined"
                type="password"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    color: "black", // Giriş metni rengi
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    color: "black",
                    opacity: 0.3,
                    borderRadius: "19px",
                    borderColor: "black", // Çerçeve rengi
                  },
                  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "black", // Hover durumunda çerçeve rengi
                    },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      color: "black",
                      borderColor: "green", // Focus durumunda çerçeve rengi
                    },
                  mt: 2,
                }}
                InputLabelProps={{
                  style: { color: "black" }, // Label rengi
                }}
              />

              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "green",
                  mt: 5,
                  borderRadius: "14px",
                  borderColor: "blue",
                  width: "220px",
                  height: "100%",
                  padding: "10px",
                  "&:hover": {
                    backgroundColor: green[700],
                  },
                }}
              >
                {" "}
                <Typography variant="h5" fontWeight={400} fontFamily="serif">
                  {" "}
                  Kaydol
                </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                justifySelf: "end",
              }}
              gridColumn="span 12"
              gridRow="span 6"
            >
              <Link to="/login">
                <Button
                  sx={{
                    mx: 2,
                    textTransform: "none",
                    justifySelf: "end",
                  }}
                >
                  <Typography variant="h5" fontWeight={400} fontFamily="serif">
                    {" "}
                    Hesabınız varsa. Giriş Yap!
                  </Typography>
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Register;
