import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useCart } from "../Store/Cart"; // Import your cart context
import { useNavigate } from "react-router-dom";

const CartTab = () => {
  const { cartItems, clearCart, total } = useCart(); // Fetch cart items, clearCart, and total
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();

  // Handle Checkout button
  const handleCheckout = () => {
    setCheckout(true);
    // Implement further logic for checkout process (e.g., payment gateway integration)
  };

  // Handle Clear Cart button
  const handleClearCart = () => {
    clearCart();
  };

  // If no items in cart, show empty cart message
  if (cartItems.length === 0) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5">Your cart is empty!</Typography>
        <Button
          onClick={() => navigate("/userhome/store")}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Store
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your Cart
      </Typography>
      <List>
        {cartItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItemText
              primary={item.product.name}
              secondary={`Quantity: ${item.quantity}`}
            />
            <Typography>{item.product.price}</Typography>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Total: {total}đ</Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button onClick={handleClearCart} variant="outlined" color="error">
          Clear Cart
        </Button>
        <Button onClick={handleCheckout} variant="contained" color="primary">
          Checkout
        </Button>
      </Box>

      {/* Conditional Rendering of Checkout Message */}
      {checkout && (
        <Typography variant="h6" color="success.main" sx={{ mt: 3 }}>
          Checkout successful! Thank you for your purchase.
        </Typography>
      )}
    </Box>
  );
};

export default CartTab;
