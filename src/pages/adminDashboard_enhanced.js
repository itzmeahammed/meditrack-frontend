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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const AdminDashboardEnhanced = () => {
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
      color: "#667eea",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FaShoppingCart size={30} />,
      color: "#764ba2",
    },
    {
      title: "Total Users",
      value: users.length,
      icon: <FaUsers size={30} />,
      color: "#f093fb",
    },
    {
      title: "Revenue",
      value: `₹${orders.reduce((sum, order) => sum + order.total, 0)}`,
      icon: <FaChartBar size={30} />,
      color: "#4caf50",
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
                fontWeight: 800,
                mb: 3,
                color: "#333",
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
                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                        p: 2,
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                        },
                      }}
                    >
                      <Box sx={{ color: stat.color, mb: 1 }}>
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          mb: 1,
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: "#333",
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
                  fontWeight: 800,
                  color: "#333",
                }}
              >
                Manage Products
              </Typography>
              <Button
                variant="contained"
                onClick={handleAddProduct}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  fontWeight: 700,
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
                      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#333",
                        }}
                      >
                        {product.productName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          mb: 1,
                        }}
                      >
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#667eea",
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => handleEditProduct(product)}
                          sx={{ color: "#667eea" }}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleDeleteProduct(product.id)}
                          sx={{ color: "#e74c3c" }}
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
                fontWeight: 800,
                mb: 3,
                color: "#333",
              }}
            >
              Recent Orders
            </Typography>
            {orders.length === 0 ? (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography sx={{ color: "#666" }}>
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
                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
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
                              fontWeight: 700,
                              color: "#333",
                            }}
                          >
                            Order #{order.id}
                          </Typography>
                          <Chip
                            label={order.status}
                            color={
                              order.status === "Pending"
                                ? "warning"
                                : "success"
                            }
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            mb: 1,
                          }}
                        >
                          Customer: {order.customer.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#667eea",
                            fontWeight: 700,
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
                fontWeight: 800,
                mb: 3,
                color: "#333",
              }}
            >
              Registered Users
            </Typography>
            {users.length === 0 ? (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography sx={{ color: "#666" }}>
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
                        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: "#333",
                          }}
                        >
                          {user.username}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            mb: 1,
                          }}
                        >
                          {user.email}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            mb: 1,
                          }}
                        >
                          {user.mobile}
                        </Typography>
                        <Chip
                          label={user.role}
                          color={user.role === "admin" ? "error" : "primary"}
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
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: 280,
            height: "100vh",
            position: "sticky",
            top: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            p: 3,
            boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
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
                onClick={() => setSelectedTab(item.tab)}
                sx={{
                  justifyContent: "flex-start",
                  mb: 1,
                  py: 1.5,
                  px: 2,
                  borderRadius: "12px",
                  bgcolor:
                    selectedTab === item.tab
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                  color: "white",
                  fontWeight: selectedTab === item.tab ? 700 : 600,
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
              borderColor: "white",
              color: "white",
              fontWeight: 700,
              py: 1.2,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              p: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
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
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                    color: "white",
                    fontWeight: selectedTab === item.tab ? 700 : 600,
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
                color: "white",
                fontWeight: 700,
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
                bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
              }}
            >
              <FaBars />
            </IconButton>
          </Box>
        )}
        {renderContent()}
      </Box>

      {/* Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: "#333" }}>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Product Name"
              value={formData.productName}
              onChange={(e) =>
                setFormData({ ...formData, productName: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
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
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveProduct}
            variant="contained"
            sx={{
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardEnhanced;
