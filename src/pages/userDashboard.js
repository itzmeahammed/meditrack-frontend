import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./userSidebar"; // Sidebar component
import Header from "./Header"; // Header component
import Home from "./home"; // Home component (display products)
import Cart from "./cart"; // Cart component (place orders)
import AiAssistance from "./aiAssistant"; // AI Assistance component (chatbot)
import PrescriptionAnalyzer from "./prescription"; // Prescription Analyzer
import UserHeader from "./userHeader"; // User-specific header

const UserDashboard = () => {
  const username = "User";
  const [selectedTab, setSelectedTab] = useState("Home");
  const [cartItems, setCartItems] = useState([]); // State to manage cart items

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Home":
        return <Home addToCart={addToCart} />;
      case "Cart":
        return <Cart cartItems={cartItems} removeFromCart={removeFromCart} />;
      case "AI Assistance":
        return <AiAssistance />;
      case "Prescription Analyzer":
        return <PrescriptionAnalyzer />;
      default:
        return <Home addToCart={addToCart} />;
    }
  };

  // Function to add items to the cart
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

  // Function to remove items from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar setSelectedTab={setSelectedTab} />

      {/* Main Content */}
      <Box component='main' sx={{ flexGrow: 1, bgcolor: "#f4f6f8", p: 3 }}>
        {/* Header */}
        <UserHeader username={username} />

        {/* Render selected tab content */}
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default UserDashboard;
