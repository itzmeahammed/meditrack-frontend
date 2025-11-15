import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  FaHome,
  FaShoppingCart,
  FaRobot,
  FaFileAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaLeaf,
} from "react-icons/fa";
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

const UserSidebarV2 = ({ setSelectedTab, selectedTab }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("meditrack_currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const menuItems = [
    { label: "Home", icon: <FaHome />, tab: "Home" },
    { label: "Shopping Cart", icon: <FaShoppingCart />, tab: "Cart" },
    { label: "AI Assistant", icon: <FaRobot />, tab: "AI Assistance" },
    { label: "Prescription Analyzer", icon: <FaFileAlt />, tab: "Prescription Analyzer" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("meditrack_currentUser");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if (isMobile) {
      setOpen(false);
    }
  };

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
        color: colors.primary,
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "0 auto",
              mb: 2,
              bgcolor: "rgba(255,255,255,0.3)",
              fontSize: "2rem",
              fontWeight: 900,
              border: `3px solid ${colors.primary}`,
            }}
          >
            {currentUser?.username?.charAt(0).toUpperCase()}
          </Avatar>
        </motion.div>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            mb: 0.5,
          }}
        >
          {currentUser?.username || "User"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            opacity: 0.9,
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          {currentUser?.email}
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 2 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.tab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ListItem disablePadding sx={{ mb: 1, px: 1 }}>
              <ListItemButton
                onClick={() => handleTabClick(item.tab)}
                selected={selectedTab === item.tab}
                sx={{
                  borderRadius: "12px",
                  bgcolor:
                    selectedTab === item.tab
                      ? "rgba(255,255,255,0.25)"
                      : "transparent",
                  color: colors.primary,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.15)",
                  },
                  transition: "all 0.3s ease",
                  py: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: colors.primary,
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: selectedTab === item.tab ? 800 : 700,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLogout}
          sx={{
            borderColor: colors.primary,
            color: colors.primary,
            fontWeight: 800,
            py: 1.2,
            borderWidth: "2px",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderColor: colors.primary,
            },
          }}
        >
          <FaSignOutAlt style={{ marginRight: "8px" }} />
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1200,
          }}
        >
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              bgcolor: colors.accent,
              color: colors.primary,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: colors.accentDark,
              },
            }}
          >
            {open ? <FaTimes /> : <FaBars />}
          </IconButton>
        </Box>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box
          sx={{
            width: 280,
            height: "100vh",
            position: "sticky",
            top: 0,
            boxShadow: `4px 0 15px ${colors.shadow}`,
          }}
        >
          {drawerContent}
        </Box>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default UserSidebarV2;
