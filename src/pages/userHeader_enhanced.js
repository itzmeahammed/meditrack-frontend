import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaUser, FaSignOutAlt, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const UserHeaderEnhanced = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const user = localStorage.getItem("meditrack_currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("meditrack_currentUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          p: 3,
          bgcolor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        {/* Left Section */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#333",
              mb: 0.5,
            }}
          >
            Welcome back, {currentUser?.username}! 👋
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Notifications */}
          {!isMobile && (
            <Button
              sx={{
                minWidth: "auto",
                p: 1.5,
                bgcolor: "#f0f0f0",
                color: "#667eea",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#e8e8e8",
                },
              }}
            >
              <FaBell size={20} />
            </Button>
          )}

          {/* Settings */}
          {!isMobile && (
            <Button
              sx={{
                minWidth: "auto",
                p: 1.5,
                bgcolor: "#f0f0f0",
                color: "#667eea",
                borderRadius: "12px",
                "&:hover": {
                  bgcolor: "#e8e8e8",
                },
              }}
            >
              <FaCog size={20} />
            </Button>
          )}

          {/* User Menu */}
          <Box
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1,
              borderRadius: "12px",
              cursor: "pointer",
              bgcolor: "#f0f0f0",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#e8e8e8",
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                fontWeight: 800,
                fontSize: "1.1rem",
              }}
            >
              {currentUser?.username?.charAt(0).toUpperCase()}
            </Avatar>
            {!isMobile && (
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "#333",
                  }}
                >
                  {currentUser?.username}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#999",
                  }}
                >
                  {currentUser?.role === "admin" ? "Admin" : "Customer"}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                mt: 1,
              },
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                py: 1.5,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FaUser size={16} color="#667eea" />
              <Typography>Profile</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#e74c3c",
              }}
            >
              <FaSignOutAlt size={16} />
              <Typography>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </motion.div>
  );
};

export default UserHeaderEnhanced;
