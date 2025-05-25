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
} from "@mui/material";
import { FaMedkit, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toastify for notifications

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:6778/product/view_products"
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:6778/product/edit_product/${editingProduct.id}`, // Make sure id is passed correctly
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProduct),
        }
      );

      if (response.ok) {
        toast.success("Product updated successfully!");
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? editingProduct : product
          )
        );
        handleModalClose();
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:6778/product/delete_product/${productId}`, // Ensure ID is passed correctly
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter((product) => product.id !== productId)); // Remove the deleted product from the list
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", p: 3, maxWidth: "1200px", margin: "auto" }}>
      <Typography
        variant='h4'
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: "#4caf50",
        }}
      >
        <FaMedkit style={{ marginRight: "8px", fontSize: "30px" }} />
        View Products
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#4caf50", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>Product Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Price</TableCell>
              <TableCell sx={{ color: "#fff" }}>Stock</TableCell>
              <TableCell sx={{ color: "#fff" }}>Description</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:nth-of-type(odd)": { bgcolor: "#f9f9f9" },
                  "&:hover": { bgcolor: "#e0e0e0" },
                }}
              >
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "#4caf50", marginRight: 1 }}
                    onClick={() => handleEdit(product)}
                  >
                    <FaEdit />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#f44336" }}
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrashAlt />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for editing product */}
      <Modal open={openModal} onClose={handleModalClose}>
        <Box
          sx={{
            padding: 3,
            bgcolor: "#fff",
            borderRadius: "8px",
            margin: "auto",
            width: "400px",
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: "bold", mb: 3 }}>
            Edit Product
          </Typography>
          <TextField
            label='Product Name'
            fullWidth
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
            label='Price'
            fullWidth
            value={editingProduct?.price || ""}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label='Stock'
            fullWidth
            value={editingProduct?.stock || ""}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, stock: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label='Description'
            fullWidth
            value={editingProduct?.description || ""}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant='contained'
              onClick={handleSaveEdit}
              sx={{ bgcolor: "#4caf50", color: "#fff", fontWeight: "bold" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewProducts;
