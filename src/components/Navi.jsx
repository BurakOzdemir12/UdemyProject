import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  Col,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Box, IconButton, Badge, Typography, MenuItem, Menu } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext";
import logo from "../images/logo-udemy.svg";
import { useCart } from "../context/CartContext";
const Navi = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user,logout } = useAuth();
  const { cart, calculateTotalItems } = useCart();
 
  const toggle = () => setIsOpen(!isOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  return (
    <Box className="navlinks fluid">
      <Row noGutters>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Navbar
            style={{ backgroundColor: "seashell", color: "black" }}
            expand="xl"
            {...args}
          >
            <NavbarBrand className="brand" href="/home">
              <img src={logo} alt="Logo" height={50} />
            </NavbarBrand>
            <NavbarToggler
              style={{ borderColor: "#fff" }}
              className="justify-center"
              onClick={toggle}
            />
            <Collapse isOpen={isOpen} navbar>
              <Nav className=" nav mt-4 mx-auto" navbar>
              <NavItem className="mx-3 py-2">
                  <Link
                    to="/home"
                    style={{
                      fontWeight: 600,
                      fontSize: 30,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Ana Sayfa
                  </Link>
                </NavItem>
                <NavItem className="mx-3 py-2">
                  <Link
                    to="/cart"
                    style={{
                      fontWeight: 600,
                      fontSize: 30,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Cart
                  </Link>
                </NavItem>
               
                <NavItem className="mx-3 py-2">
                  <Link
                    to="/profile"
                    style={{
                      fontWeight: 600,
                      fontSize: 30,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    Profil
                  </Link>
                </NavItem>
              </Nav>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  ml: "auto",
                }}
              >
                
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  component={Link}
                  to="/cart"
                  sx={{ fontWeight: 600, color: "black" }}
                >
                  <Badge badgeContent={calculateTotalItems()} color="error">
                    <ShoppingCartIcon style={{ fontSize: 50 }} />
                  </Badge>
                </IconButton>

                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    fontWeight: 600,
                    fontSize: 30,
                    ml: 2,
                  }}
                >
                   <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    onClick={handleMenuOpen}
                    sx={{ color: "black" }}
                  >
                    <AccountCircleIcon style={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: 20,
                      ml: 1,
                      color: "black",
                      fontWeight: 600,
                    }}
                  >
                   {user?.fullname || (
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Giriş Yap
                      </Link>
                    )}
                  </Typography>
                </Box>
                 {/* Dropdown Menü */}
                 <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {user ? (
                    <>
                      <MenuItem
                        component={Link}
                        to="/profile"
                        onClick={handleMenuClose}
                      >
                        Profil
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                    </>
                  ) : (
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleMenuClose}
                    >
                      Giriş Yap
                    </MenuItem>
                  )}
                </Menu>
              </Box>
            </Collapse>
          </Navbar>
        </Col>
      </Row>
    </Box>
  );
};

export default Navi;
