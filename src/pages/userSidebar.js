import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  Button,
} from "@mui/material";
import {
  FaHome,
  FaShoppingCart,
  FaRobot,
  FaFilePrescription,
  FaMedkit,
  FaSignOutAlt,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ setSelectedTab, selectedTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Home", icon: <FaHome size={20} />, value: "Home" },
    { text: "Cart", icon: <FaShoppingCart size={20} />, value: "Cart" },
    {
      text: "AI Assistance",
      icon: <FaRobot size={20} />,
      value: "AI Assistance",
    },
    {
      text: "Prescription Analyzer",
      icon: <FaFilePrescription size={20} />,
      value: "Prescription Analyzer",
    },
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
          backgroundColor: "#ffffff",
          color: "#333",
          borderRight: "1px solid #ddd",
          paddingTop: "20px",
        },
      }}
      variant='permanent'
      anchor='left'
    >
      <Box
        sx={{ padding: "16px", display: "flex", alignItems: "center", mb: 2 }}
      >
        <FaMedkit size={32} color='#4caf50' />
        <Typography
          variant='h6'
          sx={{ ml: 2, fontWeight: "bold", color: "#4caf50", fontSize: "24px" }}
        >
          Meditrack
        </Typography>
      </Box>

      {/* Sidebar Menu Items */}
      <List sx={{ paddingTop: "10px" }}>
        {menuItems.map(({ text, icon, value }) => (
          <ListItem
            button
            key={value}
            onClick={() => setSelectedTab(value)}
            sx={{
              backgroundColor:
                selectedTab === value ? "#4caf50" : "transparent",
              "&:hover": {
                backgroundColor: "#e8f5e9",
              },
              color: selectedTab === value ? "#fff" : "#333",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow:
                selectedTab === value ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            <Box sx={{ marginRight: "16px" }}>{icon}</Box>
            <ListItemText
              primary={text}
              sx={{
                fontWeight: selectedTab === value ? "bold" : "normal",
                color: selectedTab === value ? "#fff" : "#333",
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Sign Out Button */}
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
