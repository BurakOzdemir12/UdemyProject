import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import PurchasedHistory from "./pages/PurchasedHistory";
import Navi from "./components/Navi";
import CourseDetail from "./pages/CourseDetail";

export default function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <CartProvider>
          <Navi/>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route
              path="/cart"
              element={
                  <Cart />
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/purchasedhistory"
              element={
                <ProtectedRoute>
                  <PurchasedHistory />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
