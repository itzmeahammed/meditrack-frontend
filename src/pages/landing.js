import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  FaCapsules,
  FaHeartbeat,
  FaRobot,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCapsules size={40} />,
      title: "Medicine Catalog",
      description: "Browse our extensive collection of medicines and healthcare products",
    },
    {
      icon: <FaHeartbeat size={40} />,
      title: "Health Tracking",
      description: "Monitor your health metrics and maintain wellness records",
    },
    {
      icon: <FaRobot size={40} />,
      title: "AI Assistant",
      description: "Get personalized health recommendations from our AI assistant",
    },
    {
      icon: <FaShoppingCart size={40} />,
      title: "Easy Checkout",
      description: "Quick and secure ordering process for your convenience",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "white",
            top: "-100px",
            right: "-100px",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3.5rem" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                Welcome to MediTrack
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  opacity: 0.95,
                  fontWeight: 300,
                }}
              >
                Your trusted healthcare companion for medicines, health tracking, and wellness
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: "white",
                    color: "#667eea",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "#f0f0f0",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started <FaArrowRight style={{ marginLeft: "8px" }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: "#f8f9fa" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                mb: 2,
                color: "#333",
              }}
            >
              Why Choose MediTrack?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#666",
                mb: 6,
                fontSize: "1.1rem",
              }}
            >
              Everything you need for better health management
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      textAlign: "center",
                      p: 3,
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 40px rgba(102,126,234,0.2)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: "#667eea",
                          mb: 2,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: "#333",
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          lineHeight: 1.6,
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Transform Your Health?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              bgcolor: "white",
              color: "#667eea",
              fontWeight: 700,
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            Sign Up Now
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Landing;
