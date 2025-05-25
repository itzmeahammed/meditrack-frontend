import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { FaCapsules, FaShoppingCart } from "react-icons/fa"; // Icons for products and cart
import { toast } from "react-toastify"; // Import toastify for notifications

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]); // Store products from API

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:6778/product/view_products"
        );
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          toast.error("Failed to load products.");
        }
      } catch (error) {
        toast.error("Error fetching products: " + error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.productName} added to cart!`);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f6f8" }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                bgcolor: "#fff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                },
                padding: 2,
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Box sx={{ mb: 2 }}>
                  <FaCapsules size={40} color='#4caf50' />
                </Box>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                    mb: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {product.productName}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: "#777",
                    mb: 1,
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Price: {product.price}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: "#555",
                    mb: 1,
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                  }}
                >
                  Category: {product.category}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: "#555",
                    mb: 2,
                    fontSize: "0.9rem",
                  }}
                >
                  Description: {product.description}
                </Typography>
                <Button
                  variant='contained'
                  sx={{
                    bgcolor: "#4caf50",
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#388e3c",
                    },
                    padding: "8px 16px",
                  }}
                  fullWidth
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart style={{ marginRight: "8px" }} />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
