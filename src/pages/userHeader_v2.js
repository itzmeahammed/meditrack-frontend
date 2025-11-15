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

const UserHeaderV2 = () => {
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
          bgcolor: colors.primary,
          borderRadius: "16px",
          border: `2px solid ${colors.border}`,
          boxShadow: `0 4px 15px ${colors.shadow}`,
        }}
      >
        {/* Left Section */}
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              color: colors.text,
              mb: 0.5,
            }}
          >
            Welcome back, {currentUser?.username}! 👋
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: colors.textLight,
              fontWeight: 600,
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
                bgcolor: colors.secondary,
                color: colors.accent,
                borderRadius: "12px",
                border: `2px solid ${colors.border}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: colors.border,
                  borderColor: colors.accent,
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
                bgcolor: colors.secondary,
                color: colors.accent,
                borderRadius: "12px",
                border: `2px solid ${colors.border}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: colors.border,
                  borderColor: colors.accent,
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
              bgcolor: colors.secondary,
              border: `2px solid ${colors.border}`,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: colors.border,
                borderColor: colors.accent,
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                fontWeight: 900,
                fontSize: "1.1rem",
                color: colors.primary,
              }}
            >
              {currentUser?.username?.charAt(0).toUpperCase()}
            </Avatar>
            {!isMobile && (
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 800,
                    color: colors.text,
                  }}
                >
                  {currentUser?.username}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textLight,
                    fontWeight: 600,
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
                border: `2px solid ${colors.border}`,
                boxShadow: `0 8px 24px ${colors.shadow}`,
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
                color: colors.text,
                fontWeight: 700,
                "&:hover": {
                  bgcolor: colors.secondary,
                },
              }}
            >
              <FaUser size={16} color={colors.accent} />
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
                color: "#D32F2F",
                fontWeight: 700,
                "&:hover": {
                  bgcolor: "#FFEBEE",
                },
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

export default UserHeaderV2;
