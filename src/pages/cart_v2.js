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
  Container,
} from "@mui/material";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhone,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// Color Palette
const colors = {
  primary: "#FFFFFF",
  secondary: "#E8F5E9",
  accent: "#4CAF50",
  accentDark: "#2E7D32",
  text: "#1B5E20",
  textLight: "#558B2F",
  border: "#C8E6C9",
  shadow: "rgba(46, 125, 50, 0.1)",
};

const CartV2 = ({ cartItems, removeFromCart }) => {
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
    const storedOrders = localStorage.getItem("meditrack_orders") || "[]";
    setOrders(JSON.parse(storedOrders));

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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + 50;
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
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: colors.primary, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              mb: 4,
              color: colors.text,
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
                border: `2px solid ${colors.border}`,
                bgcolor: colors.secondary,
              }}
            >
              <FaShoppingBag size={60} color={colors.textLight} style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ color: colors.textLight, fontWeight: 700, mb: 2 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textLight, fontWeight: 600 }}>
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
                    border: `2px solid ${colors.border}`,
                    overflow: "hidden",
                  }}
                >
                  <TableContainer component={Paper} sx={{ bgcolor: colors.primary }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: colors.accent }}>
                          <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>
                            Product
                          </TableCell>
                          <TableCell align="right" sx={{ color: colors.primary, fontWeight: 800 }}>
                            Price
                          </TableCell>
                          <TableCell align="center" sx={{ color: colors.primary, fontWeight: 800 }}>
                            Quantity
                          </TableCell>
                          <TableCell align="right" sx={{ color: colors.primary, fontWeight: 800 }}>
                            Total
                          </TableCell>
                          <TableCell align="center" sx={{ color: colors.primary, fontWeight: 800 }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map((item) => (
                          <motion.tr key={item.id} variants={itemVariants}>
                            <TableCell sx={{ fontWeight: 700, color: colors.text }}>
                              {item.productName}
                            </TableCell>
                            <TableCell align="right" sx={{ color: colors.accent, fontWeight: 700 }}>
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
                                  sx={{
                                    minWidth: "auto",
                                    p: 0.5,
                                    color: colors.accent,
                                  }}
                                >
                                  <FaMinus size={12} />
                                </Button>
                                <Typography sx={{ minWidth: "30px", textAlign: "center", fontWeight: 700 }}>
                                  {item.quantity}
                                </Typography>
                                <Button
                                  size="small"
                                  sx={{
                                    minWidth: "auto",
                                    p: 0.5,
                                    color: colors.accent,
                                  }}
                                >
                                  <FaPlus size={12} />
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell align="right" sx={{ fontWeight: 800, color: colors.text }}>
                              ₹{item.totalPrice}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                size="small"
                                onClick={() => removeFromCart(item.id)}
                                sx={{
                                  color: "#D32F2F",
                                  transition: "all 0.3s ease",
                                  "&:hover": { bgcolor: "#FFEBEE" },
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
                    border: `2px solid ${colors.border}`,
                    bgcolor: colors.secondary,
                    position: "sticky",
                    top: 20,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 900,
                        mb: 3,
                        color: colors.text,
                      }}
                    >
                      Order Summary
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1.5,
                          pb: 1.5,
                          borderBottom: `2px solid ${colors.border}`,
                        }}
                      >
                        <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>
                          Subtotal:
                        </Typography>
                        <Typography sx={{ fontWeight: 800, color: colors.text }}>
                          ₹{calculateSubtotal()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1.5,
                          pb: 1.5,
                          borderBottom: `2px solid ${colors.border}`,
                        }}
                      >
                        <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>
                          Tax (18%):
                        </Typography>
                        <Typography sx={{ fontWeight: 800, color: colors.text }}>
                          ₹{calculateTax()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 2,
                          pb: 2,
                          borderBottom: `2px solid ${colors.border}`,
                        }}
                      >
                        <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>
                          Shipping:
                        </Typography>
                        <Typography sx={{ fontWeight: 800, color: colors.text }}>
                          ₹50
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          bgcolor: colors.primary,
                          p: 2,
                          borderRadius: "10px",
                          border: `2px solid ${colors.accent}`,
                        }}
                      >
                        <Typography sx={{ fontWeight: 900, color: colors.text, fontSize: "1.1rem" }}>
                          Total:
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color: colors.accent,
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
                        bgcolor: colors.accent,
                        color: colors.primary,
                        fontWeight: 800,
                        py: 1.5,
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: colors.accentDark,
                          transform: "translateY(-2px)",
                          boxShadow: `0 10px 30px ${colors.shadow}`,
                        },
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
          <DialogTitle sx={{ fontWeight: 900, color: colors.text, bgcolor: colors.secondary }}>
            Delivery Details
          </DialogTitle>
          <DialogContent sx={{ pt: 3, bgcolor: colors.primary }}>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: colors.border,
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.accent,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.accent,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaUser style={{ color: colors.accent }} />
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: colors.border,
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.accent,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.accent,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaEnvelope style={{ color: colors.accent }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: colors.border,
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.accent,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.accent,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaPhone style={{ color: colors.accent }} />
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: colors.border,
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.accent,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.accent,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaMapMarkerAlt style={{ color: colors.accent }} />
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: colors.border,
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.accent,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.accent,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontWeight: 600,
                  },
                }}
              />
              <TextField
                fullWidth
                label="ZIP Code"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: colors.border,
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: colors.accent,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: colors.accent,
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: colors.text,
                    fontWeight: 600,
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1, bgcolor: colors.secondary }}>
            <Button
              onClick={() => setOpenCheckout(false)}
              sx={{ color: colors.textLight, fontWeight: 700 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckoutSubmit}
              variant="contained"
              sx={{
                bgcolor: colors.accent,
                color: colors.primary,
                fontWeight: 800,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: colors.accentDark,
                },
              }}
            >
              <FaCheckCircle style={{ marginRight: "8px" }} />
              Place Order
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CartV2;
