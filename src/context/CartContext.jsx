import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedCarts = JSON.parse(localStorage.getItem("carts") || "{}");
    const guestCart = storedCarts.guest || [];
    
    if (user) {
      const userCart = storedCarts[user.id] || [];
      const mergedCart = mergeCarts(userCart, guestCart);

      setCart(mergedCart);
      delete storedCarts.guest; 
      storedCarts[user.id] = mergedCart;
      localStorage.setItem("carts", JSON.stringify(storedCarts));
    } else {
      setCart(guestCart);
    }
  }, [user]);

  useEffect(() => {
    const storedCarts = JSON.parse(localStorage.getItem("carts") || "{}");
    if (user) {
      storedCarts[user.id] = cart;
    } else {
      storedCarts.guest = cart;
    }
    localStorage.setItem("carts", JSON.stringify(storedCarts));
  }, [cart, user]);

  const mergeCarts = (userCart, guestCart) => {
    const merged = [...userCart];

    guestCart.forEach((guestItem) => {
      const existingItem = merged.find((item) => item.id === guestItem.id);
      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        merged.push(guestItem);
      }
    });

    return merged;
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    alertify.success("Ürün sepete eklendi!");
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    alertify.error("Ürün sepetten kaldırıldı!");
  };

  const purchase = async () => {
    if (cart.length === 0) {
      alertify.error("Sepetinizde ürün bulunmamaktadır!");
      return;
    }
  
    try {
      for (const item of cart) {
        const purchaseRequest = {
          amount: item.price,
          paymentDetails: "Valid payment details here",
          paymentMethod: "CreditCard",
        };
  
        const response = await axios.post(
          `https://localhost:7000/api/Order/buy/${item.id}`,
          purchaseRequest,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
  
        alertify.success(`Kurs satın alındı: ${item.name}`);
      }
  
      setPurchasedItems((prevItems) => [...prevItems, ...cart]);
      setCart([]);
      alertify.success("Satın alma işlemi başarılı!");
      navigate("/profile");
    } catch (error) {
      console.error(
        "Satın alma sırasında bir hata oluştu:",
        error.response?.data || error.message
      );
  
      const errorMessage =
        error.response?.data?.error?.errors?.[0] ||
        "Satın alma işlemi sırasında bir hata oluştu.";
      alertify.error(errorMessage);
    }
  };
  
  const clearCart = () => {
    setCart([]);
    alertify.error("Sepetiniz temizlendi!");
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        purchasedItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        purchase,
        calculateTotal,
        calculateTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
