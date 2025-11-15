import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserSidebarV2 from "./userSidebar_v2";
import UserHeaderV2 from "./userHeader_v2";
import HomeV2 from "./home_v2";
import CartV2 from "./cart_v2";
import AiAssistance from "./aiAssistant";
import PrescriptionAnalyzer from "./prescription";

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

const UserDashboardV2 = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Check if user is logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("meditrack_currentUser");
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("meditrack_cart") || "[]";
    setCartItems(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("meditrack_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Home":
        return <HomeV2 addToCart={addToCart} />;
      case "Cart":
        return <CartV2 cartItems={cartItems} removeFromCart={removeFromCart} />;
      case "AI Assistance":
        return <AiAssistance />;
      case "Prescription Analyzer":
        return <PrescriptionAnalyzer />;
      default:
        return <HomeV2 addToCart={addToCart} />;
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price * (item.quantity + 1),
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, totalPrice: product.price },
      ]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: colors.primary }}>
      {/* Sidebar */}
      <UserSidebarV2
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          mt: isMobile ? 8 : 0,
          bgcolor: colors.primary,
        }}
      >
        {/* Header */}
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <UserHeaderV2 />
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboardV2;
