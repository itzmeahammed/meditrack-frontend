import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  FaMedkit,
  FaBoxOpen,
  FaChartLine,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications

const Sidebar = ({ setSelectedTab, selectedTab }) => {
  const navigate = useNavigate();

  // List of menu items with icon and labels
  const menuItems = [
    { text: "Dashboard", icon: <FaChartLine />, value: "Dashboard" },
    { text: "Add Product", icon: <FaMedkit />, value: "Add Product" },
    { text: "View Products", icon: <FaBoxOpen />, value: "View Products" },
    {
      text: "Analyze Stocks",
      icon: <FaClipboardList />,
      value: "Analyze Stocks",
    },
    { text: "Order History", icon: <FaHistory />, value: "Order History" }, // New Item
  ];

  const handleSignOut = () => {
    // Show a toast notification
    toast.info("You are going to log out...", {
      position: "top-center",
      autoClose: 3000,
    });

    // Remove the token from cookies (or wherever you store the auth token)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // Redirect to the login page
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5", // Soft gray background for the sidebar
          color: "#333",
          borderRight: "1px solid #ddd",
          paddingTop: "20px",
        },
      }}
      variant='permanent'
      anchor='left'
    >
      {/* Project Title with Icon */}
      <Box
        sx={{ padding: "16px", display: "flex", alignItems: "center", mb: 2 }}
      >
        <FaMedkit size={32} color='#4caf50' />
        <Typography
          variant='h6'
          sx={{ ml: 2, fontWeight: "bold", color: "#4caf50" }}
        >
          Meditrack
        </Typography>
      </Box>

      {/* Sidebar Menu Items */}
      <List>
        {menuItems.map(({ text, icon, value }) => (
          <ListItem
            button
            key={value}
            onClick={() => setSelectedTab(value)}
            sx={{
              backgroundColor:
                selectedTab === value ? "#4caf50" : "transparent", // Active tab color
              "&:hover": {
                backgroundColor: "#e8f5e9", // Hover effect
              },
              color: selectedTab === value ? "#fff" : "#333", // Active text color
              padding: "10px 16px",
            }}
          >
            {icon}
            <ListItemText primary={text} sx={{ marginLeft: "16px" }} />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "80%",
          padding: "16px",
        }}
      >
        <Button
          variant='contained'
          fullWidth
          sx={{
            backgroundColor: "#f44336",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
          startIcon={<FaSignOutAlt />}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
