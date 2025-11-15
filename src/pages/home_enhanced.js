import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Container,
} from "@mui/material";
import {
  FaCapsules,
  FaShoppingCart,
  FaSearch,
  FaStar,
  FaHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
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

const HomeEnhanced = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load products from localStorage or use productsData
    const storedProducts = localStorage.getItem("meditrack_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Use productsData with images
      setProducts(productsData);
      localStorage.setItem("meditrack_products", JSON.stringify(productsData));
    }

    // Load favorites
    const storedFavorites = localStorage.getItem("meditrack_favorites") || "[]";
    setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    // Filter products based on search and category
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = [
    "All",
    "Pain Relief",
    "Vitamins",
    "Cough & Cold",
    "Topical",
    "Digestive",
    "Sleep",
    "Allergy",
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.productName} added to cart!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const toggleFavorite = (productId) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
    setFavorites(newFavorites);
    localStorage.setItem("meditrack_favorites", JSON.stringify(newFavorites));
    toast.success(
      favorites.includes(productId)
        ? "Removed from favorites"
        : "Added to favorites",
      { position: "bottom-right", autoClose: 1500 }
    );
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 1,
            color: "#333",
          }}
        >
          Our Medicines
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 4,
          }}
        >
          Browse our wide selection of quality medicines and healthcare products
        </Typography>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <TextField
          fullWidth
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch style={{ color: "#667eea" }} />
              </InputAdornment>
            ),
          }}
        />
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                bgcolor:
                  selectedCategory === category ? "#667eea" : "#f0f0f0",
                color: selectedCategory === category ? "white" : "#333",
                "&:hover": {
                  bgcolor:
                    selectedCategory === category ? "#667eea" : "#e0e0e0",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      </motion.div>

      {/* Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "16px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(102,126,234,0.2)",
                      },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Favorite Button */}
                    <Button
                      onClick={() => toggleFavorite(product.id)}
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        zIndex: 10,
                        minWidth: "auto",
                        p: 1,
                        bgcolor: "rgba(255,255,255,0.9)",
                        "&:hover": {
                          bgcolor: "white",
                        },
                      }}
                    >
                      <FaHeart
                        size={20}
                        color={
                          favorites.includes(product.id)
                            ? "#e74c3c"
                            : "#ccc"
                        }
                      />
                    </Button>

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
                          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          p: 3,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: "200px",
                        }}
                      >
                        <FaCapsules size={60} color="white" />
                      </Box>
                    )}

                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* Stock Badge */}
                      {product.inStock && (
                        <Chip
                          label="In Stock"
                          size="small"
                          sx={{
                            bgcolor: "#4caf50",
                            color: "white",
                            fontWeight: 600,
                            mb: 1,
                          }}
                        />
                      )}

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "#333",
                          mb: 1,
                          textTransform: "capitalize",
                        }}
                      >
                        {product.productName}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          mb: 2,
                          minHeight: "40px",
                          lineHeight: 1.4,
                        }}
                      >
                        {product.description}
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <FaStar size={16} color="#ffc107" />
                        <Typography
                          variant="body2"
                          sx={{
                            ml: 1,
                            fontWeight: 600,
                            color: "#333",
                          }}
                        >
                          {product.rating}
                        </Typography>
                      </Box>

                      {/* Category */}
                      <Chip
                        label={product.category}
                        size="small"
                        variant="outlined"
                        sx={{
                          mb: 2,
                          borderColor: "#667eea",
                          color: "#667eea",
                        }}
                      />

                      {/* Price */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: "#667eea",
                          mb: 2,
                        }}
                      >
                        ₹{product.price}
                      </Typography>

                      {/* Add to Cart Button */}
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => handleAddToCart(product)}
                        sx={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          fontWeight: 700,
                          py: 1.2,
                          borderRadius: "10px",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <FaShoppingCart style={{ marginRight: "8px" }} />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  No products found. Try adjusting your search or filters.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default HomeEnhanced;
