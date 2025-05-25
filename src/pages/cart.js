import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  Card,
  CardContent,
  Divider,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa"; // Icon for Cart and Delete
import { toast } from "react-toastify"; // For Notifications

const Cart = ({ cartItems, removeFromCart }) => {
  const [openModal, setOpenModal] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: "",
    paymentMethod: "",
  });

  const handleProceedToCheckout = async () => {
    if (
      !billingDetails.name ||
      !billingDetails.address ||
      !billingDetails.paymentMethod
    ) {
      toast.error("Please fill in all billing details.");
      return;
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    const orderData = {
      cartItems: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        productName: item.productName,
      })),
      totalAmount: totalAmount,
      billingDetails: billingDetails,
    };

    const token = localStorage.getItem("token"); 
    try {
      const response = await fetch("http://localhost:6778/order/place_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        toast.success("Order placed successfully!");
        setOpenModal(false);
      } else {
        toast.error("Failed to place the order.");
      }
    } catch (error) {
      toast.error("Error placing order: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "#f4f6f8",
        borderRadius: "8px",
        minHeight: "80vh",
      }}
    >
      <Typography
        variant='h4'
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#4caf50",
          textAlign: "center",
        }}
      >
        <FaShoppingCart style={{ marginRight: "8px" }} />
        Cart
      </Typography>

      {/* If the cart is empty, show a message */}
      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            color: "#888",
          }}
        >
          <Typography variant='h6'>Your cart is empty</Typography>
          <Typography variant='body2' sx={{ color: "#888", mt: 1 }}>
            Add some products to your cart to proceed with the checkout.
          </Typography>
        </Box>
      ) : (
        <List sx={{ mb: 4 }}>
          {cartItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                mb: 2,
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                bgcolor: "#fff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                    {item.productName}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant='body1'
                    sx={{
                      fontWeight: "bold",
                      color: "#388e3c",
                      mb: 1,
                    }}
                  >
                    ${item.totalPrice}
                  </Typography>
                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    sx={{ color: "#f44336" }}
                  >
                    <FaTrashAlt />
                  </IconButton>
                </Box>
              </CardContent>
              <Divider />
            </Card>
          ))}
        </List>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant='contained'
            sx={{
              bgcolor: "#4caf50",
              color: "#fff",
              padding: "12px 24px",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
              transition: "background-color 0.3s ease-in-out",
            }}
            onClick={() => setOpenModal(true)}
          >
            Proceed to Checkout
          </Button>
        </Box>
      )}

      {/* Modal for Billing and Order Confirmation */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            padding: 3,
            bgcolor: "#fff",
            borderRadius: "8px",
            margin: "auto",
            width: "400px",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: "bold", mb: 3 }}>
            Enter Billing Information
          </Typography>
          <TextField
            label='Full Name'
            fullWidth
            value={billingDetails.name}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label='Address'
            fullWidth
            value={billingDetails.address}
            onChange={(e) =>
              setBillingDetails({ ...billingDetails, address: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label='Payment Method'
            fullWidth
            value={billingDetails.paymentMethod}
            onChange={(e) =>
              setBillingDetails({
                ...billingDetails,
                paymentMethod: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant='contained'
              sx={{
                bgcolor: "#4caf50",
                color: "#fff",
                padding: "12px 24px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#388e3c",
                },
              }}
              onClick={handleProceedToCheckout}
            >
              Order Placed
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Cart;
