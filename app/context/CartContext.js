"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Check if product is already in cart
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const addToCart = (product) => {
    // For unique artworks: only add if not already in cart
    if (!isInCart(product.id)) {
      setCart([...cart, {...product, quantity: 1}]);
      return true; // Successfully added
    }
    return false; // Already in cart
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartItemCount = cart.length;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      cartItemCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}