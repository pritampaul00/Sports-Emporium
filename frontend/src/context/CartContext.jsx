/*
import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext(); // ✅ Named export

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) =>
    setCart((prev) => prev.filter((item) => item._id !== productId));

  const updateQuantity = (productId, quantity) =>
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
*/

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// ✅ EXPORT THIS
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend on login/mount
  /*
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/users/cart");
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Error fetching cart", err);
      }
    };

    fetchCart();
  }, []);
  */

useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/users/cart");
      const rawCart = res.data.cart || [];

      // 🧠 Enrich each cart item with product info
      const enrichedCart = await Promise.all(
        rawCart.map(async (item) => {
          const { data: product } = await axios.get(`/api/products/${item.productId}`);
          return {
            ...product,
            quantity: item.quantity, // Keep quantity from cart
          };
        })
      );

      setCart(enrichedCart);
    } catch (err) {
      console.error("Error fetching/enriching cart", err);
    }
  };

  fetchCart();
}, []);


  /*
  const saveCartToBackend = async (updatedCart) => {
    try {
      await axios.put("/api/users/cart", { cartItems: updatedCart });
    } catch (err) {
      console.error("Failed to sync cart", err);
    }
  };
  */

const saveCartToBackend = async (updatedCart) => {
  try {
    const simplified = updatedCart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));
    await axios.put("/api/users/cart", { cartItems: simplified });
  } catch (err) {
    console.error("Failed to sync cart", err);
  }
};


  const addToCart = (product) => {
    const existing = cart.find((item) => item._id === product._id);
    const updated = existing
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updated);
    saveCartToBackend(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter((item) => item._id !== productId);
    setCart(updated);
    saveCartToBackend(updated);
  };

  const updateQuantity = (productId, quantity) => {
    const updated = cart.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    setCart(updated);
    saveCartToBackend(updated);
  };

  const clearCart = () => {
    setCart([]);
    saveCartToBackend([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
