import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const CartEnhanced = ({ cartItems, removeFromCart }) => {
  const [openCheckout, setOpenCheckout] = useState(false);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("meditrack_orders") || "[]";
    setOrders(JSON.parse(storedOrders));

    // Load user data if available
    const currentUser = localStorage.getItem("meditrack_currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setFormData((prev) => ({
        ...prev,
        name: user.username,
        email: user.email,
        phone: user.mobile,
      }));
    }
  }, []);

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    // This would need to be handled by parent component
    // For now, we'll show a toast
    toast.info("Update quantity in parent component");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 50; // 50 is shipping
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // Create order
    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: 50,
      total: calculateTotal(),
      customer: formData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const updatedOrders = [...orders, newOrder];
    localStorage.setItem("meditrack_orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);

    toast.success("Order placed successfully!");
    setOpenCheckout(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    });

    // Clear cart (would need parent component to handle this)
    // For now, just show success
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 4,
            color: "#333",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <FaShoppingBag /> Shopping Cart
        </Typography>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              textAlign: "center",
              py: 8,
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <FaShoppingBag size={60} color="#ccc" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ color: "#666", mb: 2 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body2" sx={{ color: "#999" }}>
              Add some medicines to get started!
            </Typography>
          </Card>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        <TableCell sx={{ color: "white", fontWeight: 700 }}>
                          Product
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          Total
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <motion.tr key={item.id} variants={itemVariants}>
                          <TableCell sx={{ fontWeight: 600, color: "#333" }}>
                            {item.productName}
                          </TableCell>
                          <TableCell align="right" sx={{ color: "#667eea", fontWeight: 600 }}>
                            ₹{item.price}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                              }}
                            >
                              <Button
                                size="small"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                sx={{
                                  minWidth: "auto",
                                  p: 0.5,
                                  color: "#667eea",
                                }}
                              >
                                <FaMinus size={12} />
                              </Button>
                              <Typography sx={{ minWidth: "30px", textAlign: "center" }}>
                                {item.quantity}
                              </Typography>
                              <Button
                                size="small"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                sx={{
                                  minWidth: "auto",
                                  p: 0.5,
                                  color: "#667eea",
                                }}
                              >
                                <FaPlus size={12} />
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, color: "#333" }}>
                            ₹{item.totalPrice}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              onClick={() => removeFromCart(item.id)}
                              sx={{
                                color: "#e74c3c",
                                "&:hover": { bgcolor: "#ffe0e0" },
                              }}
                            >
                              <FaTrash />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </motion.div>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  position: "sticky",
                  top: 20,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: "#333",
                    }}
                  >
                    Order Summary
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ color: "#666" }}>Subtotal:</Typography>
                      <Typography sx={{ fontWeight: 600, color: "#333" }}>
                        ₹{calculateSubtotal()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography sx={{ color: "#666" }}>Tax (18%):</Typography>
                      <Typography sx={{ fontWeight: 600, color: "#333" }}>
                        ₹{calculateTax()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography sx={{ color: "#666" }}>Shipping:</Typography>
                      <Typography sx={{ fontWeight: 600, color: "#333" }}>
                        ₹50
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        borderTop: "2px solid #eee",
                        pt: 2,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ fontWeight: 800, color: "#333" }}>
                        Total:
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#667eea",
                          fontSize: "1.3rem",
                        }}
                      >
                        ₹{calculateTotal()}
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => setOpenCheckout(true)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: "10px",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 30px rgba(102,126,234,0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      )}

      {/* Checkout Dialog */}
      <Dialog
        open={openCheckout}
        onClose={() => setOpenCheckout(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 800, color: "#333" }}>
          Delivery Details
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser style={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaPhone style={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              multiline
              rows={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMapMarkerAlt style={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenCheckout(false)} sx={{ color: "#666" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCheckoutSubmit}
            variant="contained"
            sx={{
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontWeight: 700,
            }}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartEnhanced;
