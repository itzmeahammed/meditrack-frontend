import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Validate fields
    if (!productName || !price || !stock || !description || !category) {
      setError("All fields are required!");
      toast.error("All fields are required!"); // Show toast error
      return;
    }

    // Send POST request to backend
    try {
      const response = await fetch(
        "http://localhost:6778/product/add_product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName,
            price,
            stock,
            description,
            category,
          }),
        }
      );

      if (response.ok) {
        toast.success("Product added successfully!"); // Show success toast
        console.log("Product added successfully");
      } else {
        setError("Failed to add product");
        toast.error("Failed to add product"); // Show failure toast
      }
    } catch (error) {
      setError("Error: " + error.message);
      toast.error("Error: " + error.message); // Show failure toast
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#f4f6f8",
        p: 4,
        borderRadius: "8px",
        margin: "auto",
      }}
    >
      <Typography
        variant='h4'
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          color: "#4caf50",
        }}
      >
        <FaPlus style={{ marginRight: "8px" }} />
        Add New Product
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography
          variant='body2'
          sx={{ color: "red", mb: 2, textAlign: "center" }}
        >
          {error}
        </Typography>
      )}

      {/* Form fields using Grid layout for better alignment */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Product Name'
            variant='outlined'
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='Price'
            variant='outlined'
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ mb: 2 }}
            type='number'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label='Stock Quantity'
            variant='outlined'
            fullWidth
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            sx={{ mb: 2 }}
            type='number'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label='Category'
            >
              <MenuItem value='medicine'>Medicine</MenuItem>
              <MenuItem value='supplement'>Supplement</MenuItem>
              <MenuItem value='equipment'>Equipment</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label='Description'
            variant='outlined'
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

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
          onClick={handleSubmit}
        >
          Add Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
