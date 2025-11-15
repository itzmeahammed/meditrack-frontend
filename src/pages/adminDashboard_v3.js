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
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Tooltip,
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
  FaSignOutAlt,
  FaLeaf,
  FaEye,
  FaDownload,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import productsData from "../data/productsData";

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

const AdminDashboardV3 = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    category: "",
    description: "",
    manufacturer: "",
    stock: "",
    expiryDate: "",
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    const storedProducts = localStorage.getItem("meditrack_products");
    const storedOrders = localStorage.getItem("meditrack_orders") || "[]";
    const storedUsers = localStorage.getItem("meditrack_users") || "[]";

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(productsData);
      localStorage.setItem("meditrack_products", JSON.stringify(productsData));
    }

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
      manufacturer: "",
      stock: "",
      expiryDate: "",
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
      manufacturer: product.manufacturer || "",
      stock: product.stock || "",
      expiryDate: product.expiryDate || "",
    });
    setOpenDialog(true);
  };

  const handleSaveProduct = () => {
    if (!formData.productName || !formData.price || !formData.category) {
      toast.error("Please fill required fields");
      return;
    }

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? { ...p, ...formData, price: parseFloat(formData.price) }
          : p
      );
      toast.success("Product updated");
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        rating: 4.5,
        inStock: true,
        image: "https://via.placeholder.com/300x300?text=" + formData.productName.replace(/\s+/g, "+"),
      };
      updatedProducts = [...products, newProduct];
      toast.success("Product added");
    }

    setProducts(updatedProducts);
    localStorage.setItem("meditrack_products", JSON.stringify(updatedProducts));
    setOpenDialog(false);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("meditrack_products", JSON.stringify(updatedProducts));
    toast.success("Product deleted");
  };

  const handleLogout = () => {
    localStorage.removeItem("meditrack_currentUser");
    toast.success("Logged out");
    navigate("/");
  };

  const handleExportData = () => {
    const data = { products, orders, users, exportDate: new Date().toISOString() };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `meditrack_data_${new Date().getTime()}.json`;
    link.click();
    toast.success("Data exported");
  };

  const stats = [
    { title: "Total Products", value: products.length, icon: <FaBox size={35} />, color: colors.accent, bg: "#E8F5E9" },
    { title: "Total Orders", value: orders.length, icon: <FaShoppingCart size={35} />, color: colors.accentDark, bg: "#C8E6C9" },
    { title: "Total Users", value: users.length, icon: <FaUsers size={35} />, color: colors.accent, bg: "#E8F5E9" },
    { title: "Revenue", value: `₹${orders.reduce((sum, order) => sum + order.total, 0)}`, icon: <FaChartBar size={35} />, color: colors.accentDark, bg: "#C8E6C9" },
  ];

  const sidebarItems = [
    { label: "Dashboard", tab: "Dashboard" },
    { label: "Products", tab: "Products" },
    { label: "Orders", tab: "Orders" },
    { label: "Users", tab: "Users" },
    { label: "Analytics", tab: "Analytics" },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const renderContent = () => {
    if (selectedTab === "Dashboard") {
      return (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: colors.text }}>
            Dashboard Overview
          </Typography>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <Card sx={{ borderRadius: "16px", border: `2px solid ${colors.border}`, p: 3, textAlign: "center", bgcolor: stat.bg, transition: "all 0.3s ease", "&:hover": { transform: "translateY(-8px)", boxShadow: `0 12px 30px ${colors.shadow}`, borderColor: stat.color } }}>
                    <Box sx={{ color: stat.color, mb: 2, fontSize: "2.5rem", display: "flex", justifyContent: "center" }}>{stat.icon}</Box>
                    <Typography variant="body2" sx={{ color: colors.textLight, mb: 1, fontWeight: 700, fontSize: "0.9rem" }}>{stat.title}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: colors.text, fontSize: "1.8rem" }}>{stat.value}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    if (selectedTab === "Products") {
      return (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: colors.text }}>
              Manage Products ({filteredProducts.length})
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: colors.accent, color: colors.primary, fontWeight: 800, "&:hover": { bgcolor: colors.accentDark } }}>
                <FaPlus style={{ marginRight: "8px" }} /> Add
              </Button>
              <Button variant="outlined" onClick={handleExportData} sx={{ borderColor: colors.accent, color: colors.accent, fontWeight: 800 }}>
                <FaDownload style={{ marginRight: "8px" }} /> Export
              </Button>
            </Box>
          </Box>

          <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ flex: 1, minWidth: "200px", "& .MuiOutlinedInput-root": { borderRadius: "10px", "& fieldset": { borderColor: colors.border } } }} />
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <Chip key={cat} label={cat} onClick={() => setFilterCategory(cat)} sx={{ bgcolor: filterCategory === cat ? colors.accent : colors.secondary, color: filterCategory === cat ? colors.primary : colors.text, fontWeight: 700, cursor: "pointer" }} />
              ))}
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredProducts.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
                  <Card sx={{ borderRadius: "16px", border: `2px solid ${colors.border}`, bgcolor: colors.secondary, transition: "all 0.3s ease", "&:hover": { borderColor: colors.accent, boxShadow: `0 12px 30px ${colors.shadow}`, transform: "translateY(-8px)" } }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.text, fontSize: "1.1rem" }}>{product.productName}</Typography>
                      <Typography variant="body2" sx={{ color: colors.textLight, mb: 2, fontWeight: 600, lineHeight: 1.5 }}>{product.description}</Typography>
                      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ color: colors.accent, fontWeight: 900, fontSize: "1.3rem" }}>₹{product.price}</Typography>
                        <Typography sx={{ color: colors.textLight, fontWeight: 700, fontSize: "0.9rem" }}>Stock: {product.stock || 0}</Typography>
                      </Box>
                      <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        <Chip label={product.category} size="small" sx={{ bgcolor: colors.primary, color: colors.accent, fontWeight: 700 }} />
                        {product.manufacturer && <Chip label={product.manufacturer} size="small" variant="outlined" sx={{ borderColor: colors.border, color: colors.textLight, fontWeight: 600 }} />}
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title="Edit"><Button size="small" onClick={() => handleEditProduct(product)} sx={{ color: colors.accent, "&:hover": { bgcolor: colors.primary } }}><FaEdit /></Button></Tooltip>
                        <Tooltip title="Delete"><Button size="small" onClick={() => handleDeleteProduct(product.id)} sx={{ color: "#D32F2F", "&:hover": { bgcolor: "#FFEBEE" } }}><FaTrash /></Button></Tooltip>
                        <Tooltip title="View"><Button size="small" sx={{ color: colors.textLight, "&:hover": { bgcolor: colors.primary } }}><FaEye /></Button></Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    if (selectedTab === "Orders") {
      return (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: colors.text }}>
            Recent Orders ({orders.length})
          </Typography>
          {orders.length === 0 ? (
            <Card sx={{ p: 3, textAlign: "center", border: `2px solid ${colors.border}` }}>
              <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>No orders</Typography>
            </Card>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: "16px", border: `2px solid ${colors.border}` }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: colors.accent }}>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Order ID</TableCell>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Customer</TableCell>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Total</TableCell>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} sx={{ "&:hover": { bgcolor: colors.secondary } }}>
                      <TableCell sx={{ fontWeight: 700, color: colors.text }}>#{order.id.substring(0, 8)}</TableCell>
                      <TableCell sx={{ color: colors.textLight, fontWeight: 600 }}>{order.customer.name}</TableCell>
                      <TableCell sx={{ color: colors.accent, fontWeight: 800 }}>₹{order.total}</TableCell>
                      <TableCell><Chip label={order.status} sx={{ bgcolor: colors.secondary, color: colors.accent, fontWeight: 800 }} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      );
    }

    if (selectedTab === "Users") {
      return (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 3, color: colors.text }}>
            Registered Users ({users.length})
          </Typography>
          {users.length === 0 ? (
            <Card sx={{ p: 3, textAlign: "center", border: `2px solid ${colors.border}` }}>
              <Typography sx={{ color: colors.textLight, fontWeight: 700 }}>No users</Typography>
            </Card>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: "16px", border: `2px solid ${colors.border}` }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: colors.accent }}>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Username</TableCell>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Email</TableCell>
                    <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} sx={{ "&:hover": { bgcolor: colors.secondary } }}>
                      <TableCell sx={{ fontWeight: 700, color: colors.text }}>{user.username}</TableCell>
                      <TableCell sx={{ color: colors.textLight, fontWeight: 600 }}>{user.email}</TableCell>
                      <TableCell><Chip label={user.role} sx={{ bgcolor: user.role === "admin" ? "#FFEBEE" : colors.secondary, color: user.role === "admin" ? "#D32F2F" : colors.accent, fontWeight: 800 }} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: colors.primary }}>
      {!isMobile && (
        <Box sx={{ width: 280, height: "100vh", position: "sticky", top: 0, background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`, color: colors.primary, p: 3, boxShadow: `4px 0 15px ${colors.shadow}`, display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 4, display: "flex", alignItems: "center", gap: 1 }}>
            <FaLeaf /> MediTrack Admin
          </Typography>
          <Box sx={{ flex: 1 }}>
            {sidebarItems.map((item) => (
              <Button key={item.tab} fullWidth onClick={() => setSelectedTab(item.tab)} sx={{ justifyContent: "flex-start", mb: 1, py: 1.5, px: 2, borderRadius: "12px", bgcolor: selectedTab === item.tab ? "rgba(255,255,255,0.25)" : "transparent", color: colors.primary, fontWeight: selectedTab === item.tab ? 800 : 700 }}>
                {item.label}
              </Button>
            ))}
          </Box>
          <Button fullWidth onClick={handleLogout} variant="outlined" sx={{ borderColor: colors.primary, color: colors.primary, fontWeight: 800, py: 1.2 }}>
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </Button>
        </Box>
      )}

      {isMobile && (
        <Drawer anchor="left" open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
          <Box sx={{ width: 280, background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`, color: colors.primary, p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>MediTrack Admin</Typography>
            <Box sx={{ flex: 1 }}>
              {sidebarItems.map((item) => (
                <Button key={item.tab} fullWidth onClick={() => { setSelectedTab(item.tab); setSidebarOpen(false); }} sx={{ justifyContent: "flex-start", mb: 1, py: 1.5, px: 2, borderRadius: "12px", bgcolor: selectedTab === item.tab ? "rgba(255,255,255,0.25)" : "transparent", color: colors.primary, fontWeight: selectedTab === item.tab ? 800 : 700 }}>
                  {item.label}
                </Button>
              ))}
            </Box>
            <Button fullWidth onClick={handleLogout} sx={{ color: colors.primary, fontWeight: 800, py: 1.2 }}>
              <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
            </Button>
          </Box>
        </Drawer>
      )}

      <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, overflow: "auto" }}>
        {isMobile && (
          <Box sx={{ mb: 2 }}>
            <IconButton onClick={() => setSidebarOpen(true)} sx={{ bgcolor: colors.accent, color: colors.primary }}>
              <FaBars />
            </IconButton>
          </Box>
        )}
        <Container maxWidth="lg">{renderContent()}</Container>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 900, color: colors.text, bgcolor: colors.secondary }}>
          {editingProduct ? "Edit Product" : "Add New Product"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, bgcolor: colors.primary }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField fullWidth label="Product Name" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} />
            <TextField fullWidth label="Price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            <TextField fullWidth label="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            <TextField fullWidth label="Description" multiline rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <TextField fullWidth label="Manufacturer" value={formData.manufacturer} onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })} />
            <TextField fullWidth label="Stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
            <TextField fullWidth label="Expiry Date" type="date" value={formData.expiryDate} onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1, bgcolor: colors.secondary }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ color: colors.textLight, fontWeight: 700 }}>Cancel</Button>
          <Button onClick={handleSaveProduct} variant="contained" sx={{ bgcolor: colors.accent, color: colors.primary, fontWeight: 800 }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboardV3;
