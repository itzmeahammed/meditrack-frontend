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
  FaFilter,
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

const HomeV2 = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("meditrack_products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(productsData);
      localStorage.setItem("meditrack_products", JSON.stringify(productsData));
    }

    const storedFavorites = localStorage.getItem("meditrack_favorites") || "[]";
    setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
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
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: colors.primary, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                mb: 1,
                color: colors.text,
              }}
            >
              Our Medicines
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.textLight,
                fontWeight: 600,
              }}
            >
              Browse our wide selection of quality medicines and healthcare products
            </Typography>
          </Box>
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
                bgcolor: colors.secondary,
                border: `2px solid ${colors.border}`,
                transition: "all 0.3s ease",
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
              "& .MuiInputBase-input::placeholder": {
                color: colors.textLight,
                opacity: 0.7,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch style={{ color: colors.accent }} />
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
          <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
            <FaFilter style={{ color: colors.accent, marginRight: "8px" }} />
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  fontWeight: 700,
                  cursor: "pointer",
                  bgcolor:
                    selectedCategory === category ? colors.accent : colors.secondary,
                  color: selectedCategory === category ? colors.primary : colors.text,
                  border: `2px solid ${
                    selectedCategory === category ? colors.accent : colors.border
                  }`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor:
                      selectedCategory === category ? colors.accentDark : colors.border,
                    transform: "scale(1.05)",
                  },
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
                        border: `2px solid ${colors.border}`,
                        bgcolor: colors.primary,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 12px 30px ${colors.shadow}`,
                          borderColor: colors.accent,
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
                          bgcolor: colors.primary,
                          border: `2px solid ${colors.border}`,
                          borderRadius: "50%",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: colors.secondary,
                            borderColor: colors.accent,
                          },
                        }}
                      >
                        <FaHeart
                          size={18}
                          color={
                            favorites.includes(product.id)
                              ? colors.accent
                              : colors.textLight
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
                          sx={{
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                            p: 3,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minHeight: "200px",
                          }}
                        >
                          <FaCapsules size={60} color={colors.primary} />
                        </Box>
                      )}

                      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        {/* Stock Badge */}
                        {product.inStock && (
                          <Chip
                            label="In Stock"
                            size="small"
                            sx={{
                              bgcolor: colors.accent,
                              color: colors.primary,
                              fontWeight: 700,
                              mb: 1,
                              width: "fit-content",
                            }}
                          />
                        )}

                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            color: colors.text,
                            mb: 1,
                            textTransform: "capitalize",
                          }}
                        >
                          {product.productName}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.textLight,
                            mb: 2,
                            minHeight: "40px",
                            lineHeight: 1.4,
                            fontWeight: 500,
                          }}
                        >
                          {product.description}
                        </Typography>

                        {/* Rating */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <FaStar size={16} color={colors.accent} />
                          <Typography
                            variant="body2"
                            sx={{
                              ml: 1,
                              fontWeight: 700,
                              color: colors.text,
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
                            borderColor: colors.accent,
                            color: colors.accent,
                            fontWeight: 600,
                            width: "fit-content",
                          }}
                        />

                        {/* Price */}
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 900,
                            color: colors.accent,
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
                            bgcolor: colors.accent,
                            color: colors.primary,
                            fontWeight: 800,
                            py: 1.2,
                            borderRadius: "10px",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: colors.accentDark,
                              transform: "scale(1.02)",
                              boxShadow: `0 8px 20px ${colors.shadow}`,
                            },
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
                  <Typography variant="h6" sx={{ color: colors.textLight, fontWeight: 700 }}>
                    No products found. Try adjusting your search or filters.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomeV2;
