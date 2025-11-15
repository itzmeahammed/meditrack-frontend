import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { FaMedkit, FaEdit, FaTrashAlt, FaCapsules } from "react-icons/fa";
import { toast } from "react-toastify";
import productsData from "../data/productsData";

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

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "table"

  useEffect(() => {
    // Load products from localStorage or use productsData
    const storedProducts = localStorage.getItem("meditrack_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(productsData);
      localStorage.setItem("meditrack_products", JSON.stringify(productsData));
    }
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleSaveEdit = () => {
    if (!editingProduct.productName || !editingProduct.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("meditrack_products", JSON.stringify(updatedProducts));
    toast.success("Product updated successfully");
    handleModalClose();
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter((p) => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("meditrack_products", JSON.stringify(updatedProducts));
    toast.success("Product deleted successfully");
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: colors.primary, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              mb: 2,
              color: colors.text,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FaMedkit size={32} color={colors.accent} />
            View Products
          </Typography>
          <Typography variant="body1" sx={{ color: colors.textLight, fontWeight: 600 }}>
            Browse and manage all medicines in the system
          </Typography>
        </Box>

        {/* View Mode Toggle */}
        <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
          <Button
            variant={viewMode === "grid" ? "contained" : "outlined"}
            onClick={() => setViewMode("grid")}
            sx={{
              bgcolor: viewMode === "grid" ? colors.accent : "transparent",
              color: viewMode === "grid" ? colors.primary : colors.accent,
              borderColor: colors.accent,
              fontWeight: 700,
            }}
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "table" ? "contained" : "outlined"}
            onClick={() => setViewMode("table")}
            sx={{
              bgcolor: viewMode === "table" ? colors.accent : "transparent",
              color: viewMode === "table" ? colors.primary : colors.accent,
              borderColor: colors.accent,
              fontWeight: 700,
            }}
          >
            Table View
          </Button>
        </Box>

        {/* Grid View */}
        {viewMode === "grid" && (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    border: `2px solid ${colors.border}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 12px 30px ${colors.shadow}`,
                      borderColor: colors.accent,
                    },
                  }}
                >
                  {/* Product Image */}
                  {product.image ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.productName}
                      sx={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: "200px",
                        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaCapsules size={60} color={colors.primary} />
                    </Box>
                  )}

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

                    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
                      <Typography sx={{ color: colors.accent, fontWeight: 800 }}>
                        ₹{product.price}
                      </Typography>
                      <Typography sx={{ color: colors.textLight, fontWeight: 600 }}>
                        {product.category}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => handleEdit(product)}
                        sx={{
                          color: colors.accent,
                          fontWeight: 700,
                          flex: 1,
                        }}
                      >
                        <FaEdit style={{ marginRight: "4px" }} /> Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handleDelete(product.id)}
                        sx={{
                          color: "#D32F2F",
                          fontWeight: 700,
                          flex: 1,
                        }}
                      >
                        <FaTrashAlt style={{ marginRight: "4px" }} /> Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "16px",
              border: `2px solid ${colors.border}`,
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: colors.accent }}>
                  <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>
                    Stock
                  </TableCell>
                  <TableCell sx={{ color: colors.primary, fontWeight: 800 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      "&:hover": { bgcolor: colors.secondary },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700, color: colors.text }}>
                      {product.productName}
                    </TableCell>
                    <TableCell sx={{ color: colors.textLight, fontWeight: 600 }}>
                      {product.category}
                    </TableCell>
                    <TableCell sx={{ color: colors.accent, fontWeight: 800 }}>
                      ₹{product.price}
                    </TableCell>
                    <TableCell sx={{ color: colors.textLight, fontWeight: 600 }}>
                      {product.stock || "N/A"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(product)}
                        sx={{ color: colors.accent }}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(product.id)}
                        sx={{ color: "#D32F2F" }}
                      >
                        <FaTrashAlt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Edit Modal */}
        <Modal open={openModal} onClose={handleModalClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", md: "500px" },
              bgcolor: colors.primary,
              border: `2px solid ${colors.border}`,
              borderRadius: "16px",
              p: 3,
              boxShadow: `0 12px 30px ${colors.shadow}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: colors.text,
              }}
            >
              Edit Product
            </Typography>

            <TextField
              fullWidth
              label="Product Name"
              value={editingProduct?.productName || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  productName: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Price"
              type="number"
              value={editingProduct?.price || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Category"
              value={editingProduct?.category || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={editingProduct?.description || ""}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                onClick={handleModalClose}
                sx={{
                  color: colors.textLight,
                  fontWeight: 700,
                  border: `2px solid ${colors.border}`,
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                onClick={handleSaveEdit}
                variant="contained"
                sx={{
                  bgcolor: colors.accent,
                  color: colors.primary,
                  fontWeight: 800,
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
};

export default ViewProducts;
