// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

 const addToCart = (product) => {
   setCartItems((prevItems) => {
     const existingItem = prevItems.find(
       (item) => item.product.id === product.id
     );
     if (existingItem) {
       // If the product already exists, increase its quantity
       return prevItems.map((item) =>
         item.product.id === product.id
           ? { ...item, quantity: item.quantity + 1 }
           : item
       );
     }
     // Otherwise, add the product to the cart
     return [...prevItems, { product, quantity: 1 }];
   });
 };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

   const calculateTotalPrice = () => {
     return cartItems.reduce(
       (total, item) => total + item.product.price * item.quantity,
       0
     );
   };



  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, calculateTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
