import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginimage from "../images/udemyloginpage.webp";
import { useAuth } from "../context/AuthContext";
import alertify from "alertifyjs";
const Login = () => {
  const { login,user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alertify.success("Giriş Başarılı");
      navigate("/home");
    } catch {
      setError("Giriş Başarısız");
      alertify.error("Giriş Başarısız");
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
              src={loginimage}
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
                Giriş Yap
              </Typography>
            </Box>
            <Box gridColumn="span 12" gridRow="span 0">
              <Typography variant="h5">
                <hr />
                Mail Adresin ile Giriş Yap
              </Typography>
            </Box>
            <Box
              padding={5}
              component="form"
              onSubmit={handleLogin}
              gridColumn="span 12"
              gridRow="span 10"
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                id="outlined-basic"
                label="abc@email.com"
                variant="outlined"
                sx={{
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
                //  {error ?(
                //        id="outlined-basic"
                //        label="abc@email.com"
                //  ):(
                //        error
                //        id="outlined-error-helper-text"
                //        label="Error"
                //        helperText="Incorrect entry."
                //   )
                // }

                InputLabelProps={{
                  style: { color: "black" }, // Label rengi
                }}
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="outlined-basic"
                label="Şifre"
                variant="outlined"
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
                  mt: 4,
                }}
                InputLabelProps={{
                  style: { color: "black" }, // Label rengi
                }}
              />
              {/* <TextField
                 error
                 id="outlined-error-helper-text"
                 label="Error"
                 helperText="Incorrect entry."
 
                 defaultValue="Hello World"
 
               /> */}
              {/* <FormControlLabel
                 control={
                   <Checkbox
                     sx={{
                       "& .MuiSvgIcon-root": { fontSize: 28 },
                       color: "primary",
                       "&.Mui-checked": {
                         color: "darkgreen",
                       },
                     }}
                   />
                 }
                 label={
                   <Typography variant="h4" sx={{ color: "black" }}>
                     Beni Hatırla
                   </Typography>
                 }
               /> */}

              {/* {error && <Typography color="error">{error}</Typography>} */}
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
                  Giriş Yap
                </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                justifySelf: "end",
              }}
              gridColumn="span 12"
              gridRow="span 3"
            >
              <Link to="/signUp">
                <Button
                  sx={{
                    mx: 2,
                    textTransform: "none",
                    justifySelf: "end",
                  }}
                >
                  <Typography variant="h5" fontWeight={400} fontFamily="serif">
                    {" "}
                    Hesabınız Yok mu? Kaydol{" "}
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

export default Login;
