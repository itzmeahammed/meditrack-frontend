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
  Paper,
} from "@mui/material";
import {
  FaCapsules,
  FaHeartbeat,
  FaRobot,
  FaShoppingCart,
  FaArrowRight,
  FaCheckCircle,
  FaLeaf,
  FaShieldAlt,
  FaFire,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Color Palette
const colors = {
  primary: "#FFFFFF",      // White
  secondary: "#E8F5E9",    // Light Green (very light)
  accent: "#4CAF50",       // Green (minor accent)
  accentDark: "#2E7D32",   // Dark Green
  text: "#1B5E20",         // Dark Green text
  textLight: "#558B2F",    // Medium Green text
  border: "#C8E6C9",       // Light Green border
  shadow: "rgba(46, 125, 50, 0.1)",
};

const LandingEnhanced = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCapsules size={45} />,
      title: "Wide Medicine Selection",
      description: "Browse our extensive collection of quality medicines and healthcare products",
      color: colors.accent,
    },
    {
      icon: <FaHeartbeat size={45} />,
      title: "Health Tracking",
      description: "Monitor your health metrics and maintain comprehensive wellness records",
      color: colors.accent,
    },
    {
      icon: <FaRobot size={45} />,
      title: "AI Assistant",
      description: "Get personalized health recommendations from our intelligent AI assistant",
      color: colors.accent,
    },
    {
      icon: <FaShoppingCart size={45} />,
      title: "Easy Checkout",
      description: "Quick and secure ordering process designed for your convenience",
      color: colors.accent,
    },
  ];

  const benefits = [
    {
      icon: <FaCheckCircle />,
      title: "100% Authentic",
      description: "All medicines are verified and authentic",
    },
    {
      icon: <FaLeaf />,
      title: "Natural & Safe",
      description: "Carefully selected for your wellbeing",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      description: "Your data is protected with encryption",
    },
    {
      icon: <FaFire />,
      title: "Fast Delivery",
      description: "Quick delivery to your doorstep",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: colors.primary }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: colors.text,
          py: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
          borderBottom: `3px solid ${colors.accent}`,
        }}
      >
        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: colors.accent,
            top: "-100px",
            right: "-100px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: colors.accent,
            bottom: "-50px",
            left: "-50px",
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
                  fontWeight: 900,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  color: colors.text,
                  textShadow: `0 2px 4px ${colors.shadow}`,
                  letterSpacing: "-1px",
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
                  fontSize: { xs: "1.1rem", md: "1.5rem" },
                  color: colors.textLight,
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Your trusted healthcare companion for medicines, health tracking, and wellness
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/login")}
                  sx={{
                    bgcolor: colors.accent,
                    color: colors.primary,
                    fontWeight: 800,
                    px: 5,
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    boxShadow: `0 8px 20px rgba(76, 175, 80, 0.3)`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: colors.accentDark,
                      transform: "translateY(-3px)",
                      boxShadow: `0 12px 30px rgba(76, 175, 80, 0.4)`,
                    },
                  }}
                >
                  Get Started <FaArrowRight style={{ marginLeft: "10px" }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: colors.accent,
                    color: colors.accent,
                    fontWeight: 700,
                    px: 5,
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderRadius: "12px",
                    borderWidth: "2px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: colors.secondary,
                      borderColor: colors.accentDark,
                      color: colors.accentDark,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants}>
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {[
                  { number: "10K+", label: "Happy Customers" },
                  { number: "500+", label: "Medicines" },
                  { number: "24/7", label: "Support" },
                ].map((stat, idx) => (
                  <Grid item xs={6} md={3} key={idx}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontSize: "1.8rem",
                          fontWeight: 900,
                          color: colors.accent,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: colors.textLight,
                          fontWeight: 600,
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, bgcolor: colors.secondary }}>
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
                fontWeight: 900,
                mb: 2,
                color: colors.text,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Why Choose MediTrack?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: colors.textLight,
                mb: 6,
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              Experience healthcare like never before
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
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
                      border: `2px solid ${colors.border}`,
                      bgcolor: colors.primary,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 30px ${colors.shadow}`,
                        borderColor: colors.accent,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: colors.accent,
                          mb: 2,
                          fontSize: "2.5rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          mb: 1,
                          color: colors.text,
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textLight,
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: colors.primary }}>
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
                fontWeight: 900,
                mb: 2,
                color: colors.text,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Our Features
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: colors.textLight,
                mb: 6,
                fontSize: "1.1rem",
                fontWeight: 500,
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
                      border: `2px solid ${colors.border}`,
                      bgcolor: colors.secondary,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: `0 15px 40px ${colors.shadow}`,
                        borderColor: colors.accent,
                        bgcolor: colors.primary,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          color: feature.color,
                          mb: 2,
                          fontSize: "3rem",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          mb: 1.5,
                          color: colors.text,
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textLight,
                          lineHeight: 1.7,
                          fontWeight: 500,
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
          background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
          color: colors.text,
          py: 10,
          textAlign: "center",
          borderTop: `3px solid ${colors.accent}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                mb: 3,
                color: colors.text,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Ready to Transform Your Health?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: colors.textLight,
                fontSize: "1.1rem",
                fontWeight: 500,
              }}
            >
              Join thousands of satisfied customers today
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                bgcolor: colors.accent,
                color: colors.primary,
                fontWeight: 800,
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                borderRadius: "12px",
                boxShadow: `0 8px 20px rgba(76, 175, 80, 0.3)`,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: colors.accentDark,
                  transform: "translateY(-3px)",
                  boxShadow: `0 12px 30px rgba(76, 175, 80, 0.4)`,
                },
              }}
            >
              Sign Up Now
            </Button>
          </Container>
        </motion.div>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: colors.text,
          color: colors.primary,
          py: 4,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            © 2025 MediTrack. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.secondary,
              mt: 1,
              display: "block",
              fontWeight: 500,
            }}
          >
            Your trusted healthcare companion
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingEnhanced;
