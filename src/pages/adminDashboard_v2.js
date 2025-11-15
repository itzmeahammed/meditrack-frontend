import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  Container,
} from "@mui/material";
import {
  FaChartBar,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaEdit,
  FaTrash,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaLeaf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

const AdminDashboardV2 = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Check if user is admin
  useEffect(() => {
    const currentUser = localStorage.getItem("meditrack_currentUser");
    if (!currentUser) {
      navigate("/");
      return;
    }
    const user = JSON.parse(currentUser);
    if (user.role !== "admin") {
      navigate("/user");
    }
  }, [navigate]);

  // Load data from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("meditrack_products") || "[]";
    const storedOrders = localStorage.getItem("meditrack_orders") || "[]";
    const storedUsers = localStorage.getItem("meditrack_users") || "[]";

    setProducts(JSON.parse(storedProducts));
    setOrders(JSON.parse(storedOrders));
    setUsers(JSON.parse(storedUsers));
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      productName: "",
      price: "",
      category: "",
      description: "",
    });
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      productName: product.productName,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    setOpenDialog(true);
  };

  const handleSaveProduct = () => {
    if (
      !formData.productName ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...formData, price: parseFloat(formData.price) }
          : p
      );
      toast.success("Product updated successfully");
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        rating: 4.5,
        inStock: true,
      };
      updatedProducts = [...products, newProduct];
      toast.success("Product added successfully");
    }

    setProducts(updatedProducts);
    localStorage.setItem("meditrack_products", JSON.stringify(updatedProducts));
    setOpenDialog(false);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("meditrack_products", JSON.stringify(updatedProducts));
    toast.success("Product deleted successfully");
  };

  const handleLogout = () => {
    localStorage.removeItem("meditrack_currentUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: <FaBox size={30} />,
      color: colors.accent,
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FaShoppingCart size={30} />,
      color: colors.accentDark,
    },
    {
      title: "Total Users",
      value: users.length,
      icon: <FaUsers size={30} />,
      color: colors.accent,
    },
    {
      title: "Revenue",
      value: `₹${orders.reduce((sum, order) => sum + order.total, 0)}`,
      icon: <FaChartBar size={30} />,
      color: colors.accentDark,
    },
  ];

  const sidebarItems = [
    { label: "Dashboard", tab: "Dashboard" },
    { label: "Products", tab: "Products" },
    { label: "Orders", tab: "Orders" },
    { label: "Users", tab: "Users" },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                mb: 3,
                color: colors.text,
              }}
            >
              Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                        borderRadius: "16px",
                        border: `2px solid ${colors.border}`,
                        p: 2,
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 12px 30px ${colors.shadow}`,
                          borderColor: stat.color,
                        },
                      }}
                    >
                      <Box sx={{ color: stat.color, mb: 1, fontSize: "2rem" }}>
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textLight,
                          mb: 1,
                          fontWeight: 700,
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 900,
                          color: colors.text,
                        }}
                      >
                        {stat.value}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case "Products":
        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: colors.text,
                }}
              >
                Manage Products
              </Typography>
              <Button
                variant="contained"
                onClick={handleAddProduct}
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
                <FaPlus style={{ marginRight: "8px" }} />
                Add Product
              </Button>
            </Box>

            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      border: `2px solid ${colors.border}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: colors.accent,
                        boxShadow: `0 8px 20px ${colors.shadow}`,
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          color: colors.text,
                        }}
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textLight,
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.accent,
                          fontWeight: 800,
                          mb: 1,
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          bgcolor: colors.secondary,
                          color: colors.text,
                          fontWeight: 700,
                          mb: 2,
                        }}
                      />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => handleEditProduct(product)}
                          sx={{ color: colors.accent, fontWeight: 700 }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDeleteProduct(product.id)}
                          sx={{ color: "#D32F2F", fontWeight: 700 }}
                        >
                          <FaTrash />
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case "Orders":
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                mb: 3,
                color: colors.text,
              }}
            >
              Recent Orders
            </Typography>
            {orders.length === 0 ? (
              <Card sx={{ p: 3, textAlign: "center", border: `2px solid ${colors.border}` }}>
                <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>
                  No orders yet
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {orders.map((order) => (
                  <Grid item xs={12} key={order.id}>
                    <Card
                      sx={{
                        borderRadius: "16px",
                        border: `2px solid ${colors.border}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: colors.accent,
                          boxShadow: `0 8px 20px ${colors.shadow}`,
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              color: colors.text,
                            }}
                          >
                            Order #{order.id}
                          </Typography>
                          <Chip
                            label={order.status}
                            sx={{
                              bgcolor: colors.secondary,
                              color: colors.accent,
                              fontWeight: 800,
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.textLight,
                            mb: 1,
                            fontWeight: 600,
                          }}
                        >
                          Customer: {order.customer.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.accent,
                            fontWeight: 800,
                          }}
                        >
                          Total: ₹{order.total}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );

      case "Users":
        return (
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                mb: 3,
                color: colors.text,
              }}
            >
              Registered Users
            </Typography>
            {users.length === 0 ? (
              <Card sx={{ p: 3, textAlign: "center", border: `2px solid ${colors.border}` }}>
                <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>
                  No users yet
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={2}>
                {users.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card
                      sx={{
                        borderRadius: "16px",
                        border: `2px solid ${colors.border}`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: colors.accent,
                          boxShadow: `0 8px 20px ${colors.shadow}`,
                        },
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            mb: 1,
                            color: colors.text,
                          }}
                        >
                          {user.username}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.textLight,
                            mb: 1,
                            fontWeight: 600,
                          }}
                        >
                          {user.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.textLight,
                            mb: 1,
                            fontWeight: 600,
                          }}
                        >
                          {user.mobile}
                        </Typography>
                        <Chip
                          label={user.role}
                          sx={{
                            bgcolor: user.role === "admin" ? "#FFEBEE" : colors.secondary,
                            color: user.role === "admin" ? "#D32F2F" : colors.accent,
                            fontWeight: 800,
                          }}
                          size="small"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: colors.primary }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: 280,
            height: "100vh",
            position: "sticky",
            top: 0,
            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
            color: colors.primary,
            p: 3,
            boxShadow: `4px 0 15px ${colors.shadow}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              mb: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FaLeaf /> MediTrack Admin
          </Typography>

          <Box sx={{ flex: 1 }}>
            {sidebarItems.map((item) => (
              <Button
                key={item.tab}
                fullWidth
                onClick={() => setSelectedTab(item.tab)}
                sx={{
                  justifyContent: "flex-start",
                  mb: 1,
                  py: 1.5,
                  px: 2,
                  borderRadius: "12px",
                  bgcolor:
                    selectedTab === item.tab
                      ? "rgba(255,255,255,0.25)"
                      : "transparent",
                  color: colors.primary,
                  fontWeight: selectedTab === item.tab ? 800 : 700,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.15)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Button
            fullWidth
            onClick={handleLogout}
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              fontWeight: 800,
              py: 1.2,
              borderWidth: "2px",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
            variant="outlined"
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </Button>
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <Box
            sx={{
              width: 280,
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
              color: colors.primary,
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                mb: 4,
              }}
            >
              MediTrack Admin
            </Typography>

            <Box sx={{ flex: 1 }}>
              {sidebarItems.map((item) => (
                <Button
                  key={item.tab}
                  fullWidth
                  onClick={() => {
                    setSelectedTab(item.tab);
                    setSidebarOpen(false);
                  }}
                  sx={{
                    justifyContent: "flex-start",
                    mb: 1,
                    py: 1.5,
                    px: 2,
                    borderRadius: "12px",
                    bgcolor:
                      selectedTab === item.tab
                        ? "rgba(255,255,255,0.25)"
                        : "transparent",
                    color: colors.primary,
                    fontWeight: selectedTab === item.tab ? 800 : 700,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <Button
              fullWidth
              onClick={handleLogout}
              sx={{
                color: colors.primary,
                fontWeight: 800,
                py: 1.2,
              }}
            >
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Logout
            </Button>
          </Box>
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 4 },
          overflow: "auto",
        }}
      >
        {isMobile && (
          <Box sx={{ mb: 2 }}>
            <IconButton
              onClick={() => setSidebarOpen(true)}
              sx={{
                bgcolor: colors.accent,
                color: colors.primary,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: colors.accentDark,
                },
              }}
            >
              <FaBars />
            </IconButton>
          </Box>
        )}
        <Container maxWidth="lg">{renderContent()}</Container>
      </Box>

      {/* Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 900, color: colors.text, bgcolor: colors.secondary }}>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, bgcolor: colors.primary }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
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
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
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
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
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
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
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
            onClick={() => setOpenDialog(false)}
            sx={{ color: colors.textLight, fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveProduct}
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardV2;
