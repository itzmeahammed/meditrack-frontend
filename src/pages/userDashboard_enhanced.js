import React, { useState, useEffect } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserSidebarEnhanced from "./userSidebar_enhanced";
import UserHeaderEnhanced from "./userHeader_enhanced";
import HomeEnhanced from "./home_enhanced";
import CartEnhanced from "./cart_enhanced";
import AiAssistance from "./aiAssistant";
import PrescriptionAnalyzer from "./prescription";

const UserDashboardEnhanced = () => {
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
        return <HomeEnhanced addToCart={addToCart} />;
      case "Cart":
        return <CartEnhanced cartItems={cartItems} removeFromCart={removeFromCart} />;
      case "AI Assistance":
        return <AiAssistance />;
      case "Prescription Analyzer":
        return <PrescriptionAnalyzer />;
      default:
        return <HomeEnhanced addToCart={addToCart} />;
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
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      {/* Sidebar */}
      <UserSidebarEnhanced
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
        }}
      >
        {/* Header */}
        <Box sx={{ p: { xs: 1, md: 2 } }}>
          <UserHeaderEnhanced />
        </Box>

        {/* Tab Content */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {renderTabContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboardEnhanced;
