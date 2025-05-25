import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar"; // Import Sidebar
import Header from "./Header"; // Import Header
import Dashboard from "./dashboard"; // Import the updated Dashboard component
import AddProduct from "./addProduct";
import ViewProducts from "./viewProduct";
import AnalyzeStocks from "./analyzeStocks";
import OrderHistory from "./orderHistory";

const AdminDashboard = () => {
  const username = "Admin"; // Get the logged-in user's name from cookies or state
  const [selectedTab, setSelectedTab] = useState("Dashboard"); // Track the selected tab

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Add Product":
        return <AddProduct />;
      case "View Products":
        return <ViewProducts />;
      case "Analyze Stocks":
        return <AnalyzeStocks />;
      case "Order History":
        return <OrderHistory />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar setSelectedTab={setSelectedTab} />

      {/* Main Content */}
      <Box component='main' sx={{ flexGrow: 1, bgcolor: "#f4f6f8", p: 3 }}>
        {/* Header */}
        <Header username={username} />

        {/* Render the selected tab content */}
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
