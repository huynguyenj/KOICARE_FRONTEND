import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Divider,
  IconButton,
  Switch,
  InputAdornment,
} from "@mui/material";
import { ChevronLeft } from "lucide-react";
import RemoveIcon from "@mui/icons-material/Remove";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Store/Cart"; // Importing Cart Context

const Payment = () => {
  const { cartItems, calculateTotalPrice, removeFromCart } = useCart(); // Using cart items and functions
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    voucher: "",
    cardholderName: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });

  // const [cartItems, setCartItems] = useState([
  //   // Example items in the cart
  //   { id: 1, name: "Item 1", price: 500000, quantity: 1 },
  //   { id: 2, name: "Item 2", price: 500000, quantity: 1 },
  // ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = 10; // Example: 48,000 VND shipping fee
    return subtotal + shipping;
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Step 1: Collect all necessary information
      const orderData = {
        personalInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          postalCode: formData.postalCode,
          city: formData.city,
          country: formData.country,
        },
        cartItems,
        paymentMethod,
        total: calculateTotal(),
        voucher: formData.voucher,
      };

      // Step 2: Call the API to create the order
      const orderResponse = await axios.post("/api/orders/create", orderData);

      if (orderResponse.data.success) {
        // Step 3: If payment method is credit/debit, process the payment
        if (paymentMethod === "credit") {
          const paymentData = {
            cardholderName: formData.cardholderName,
            cardNumber: formData.cardNumber,
            expDate: formData.expDate,
            cvc: formData.cvc,
            amount: calculateTotal(),
            orderId: orderResponse.data.orderId, // Use order ID from the created order
          };

          const paymentResponse = await axios.post(
            "/api/payment/process",
            paymentData
          );

          if (paymentResponse.data.success) {
            alert("Payment successful!");
          } else {
            alert("Payment failed!");
          }
        } else {
          alert("Order created! You selected Cash on Delivery.");
        }
      } else {
        alert("Failed to create the order.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  function backtoStore() {
    navigate("/userhome/store");
  }

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={8}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{
              mr: 2,
              mb: 2,
              transition: "transform 0.3s ease-in-out", // Smooth transition
              "&:hover": {
                transform: "translateX(-1px)", // Move left on hover
                "& .backText": {
                  textDecoration: "underline", // Underline the text on hover
                },
              },
            }}
            onClick={backtoStore} // Call the function to go back to home
          >
            <ChevronLeft />
            <Typography
              className="backText"
              sx={{
                fontSize: "20px",
                transition: "text-decoration 0.3s ease-in-out", // Smooth underline transition
              }}
            >
              Quay lại cửa hàng
            </Typography>
          </IconButton>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Thông tin cá nhân
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Họ và tên"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Số điện thoại"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Box mt={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Địa chỉ
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Địa chỉ"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Thành phố"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Payment Methods */}
          <Box mt={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Methods
                </Typography>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label="Cash On Delivery"
                  />
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label="Credit or Debit"
                  />
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Cardholder Name"
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCardIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        fullWidth
                        type="number"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Switch />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="EXP Date"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVC"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Box>

        </Grid>

        {/* Items and Total Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Item
              </Typography>

              {/* Example item */}
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 1,
                        mr: 2,
                      }}
                    ></Box>
                    <Typography>{item.name}</Typography>
                  </Box>
                  <Box>
                    <Typography>
                      {item.price.toLocaleString("vi-VN")} VND
                    </Typography>
                    <IconButton onClick={() => handleRemoveItem(item.id)}>
                      <RemoveIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toLocaleString("vi-VN")}{" "}
                  VND
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography>Discount</Typography>
                <Typography>48.000 VND</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography>Shipping</Typography>
                <Typography>500.000 VND</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography>Total</Typography>
                <Typography fontWeight="bold">
                  {calculateTotal().toLocaleString("vi-VN")} VND{" "}
                </Typography>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Đang thanh toán..." : "Thanh toán"}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
