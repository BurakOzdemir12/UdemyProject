import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [pendingItem, setPendingItem] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Sepet verilerini localStorage'dan yükleme
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sepet verilerini localStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if (!user) {
      alertify.error("Giriş yapmadığınız için ürünü sepete ekleyemezsiniz!");
      setPendingItem(item);
      navigate("/login");
      return;
    }
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

  const addPendingItemToCart = () => {
    if (pendingItem) {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === pendingItem.id
        );
        if (existingItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === pendingItem.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prevCart, { ...pendingItem, quantity: 1 }];
      });
      alertify.success("Bekleyen Ürün sepete eklendi!");
      setPendingItem(null);
    }
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

  const purchase = () => {
    if (cart.length === 0) {
      alertify.error("Sepetinizde ürün bulunmamaktadır!");
      return;
    }
    setPurchasedItems((prevItems) => [...prevItems, ...cart]);
    setCart([]);
    alertify.success("Satın alma işlemi başarılı!");
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
        pendingItem,
        clearCart,
        addToCart,
        addPendingItemToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        purchase,
        calculateTotal,
        calculateTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
