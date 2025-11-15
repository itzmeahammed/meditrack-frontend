import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
  Rating,
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
  FaUsers,
  FaClock,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import productsData from "../data/productsData";

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

// ============================================
// HERO SECTION COMPONENT
// ============================================
const HeroSection = ({ navigate }) => {
  const medicines = productsData.slice(0, 6);

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: colors.text,
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        borderBottom: `3px solid ${colors.accent}`,
      }}
    >
      {/* 3D Background Circles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}20 0%, transparent 70%)`,
          top: "-200px",
          right: "-200px",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* LEFT SIDE - TEXT & CTA */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  color: colors.text,
                  lineHeight: 1.2,
                }}
              >
                Your Health, Our Priority
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  color: colors.textLight,
                  fontWeight: 500,
                  lineHeight: 1.6,
                }}
              >
                Access 500+ authentic medicines, expert guidance, and personalized health solutions all in one place.
              </Typography>

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
                    boxShadow: `0 12px 30px rgba(76, 175, 80, 0.3)`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: colors.accentDark,
                      transform: "translateY(-5px)",
                      boxShadow: `0 18px 40px rgba(76, 175, 80, 0.4)`,
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
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>

              {/* Trust Badges */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip
                  icon={<FaCheckCircle />}
                  label="Verified Medicines"
                  sx={{
                    bgcolor: colors.secondary,
                    color: colors.text,
                    fontWeight: 700,
                    py: 2.5,
                  }}
                />
                <Chip
                  icon={<FaShieldAlt />}
                  label="Secure & Safe"
                  sx={{
                    bgcolor: colors.secondary,
                    color: colors.text,
                    fontWeight: 700,
                    py: 2.5,
                  }}
                />
                <Chip
                  icon={<FaClock />}
                  label="24/7 Support"
                  sx={{
                    bgcolor: colors.secondary,
                    color: colors.text,
                    fontWeight: 700,
                    py: 2.5,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* RIGHT SIDE - MEDICINE SHOWCASE */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Grid container spacing={2}>
                {medicines.map((medicine, index) => (
                  <Grid item xs={6} key={medicine.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          borderRadius: "16px",
                          border: `2px solid ${colors.border}`,
                          bgcolor: colors.primary,
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: `0 12px 30px ${colors.shadow}`,
                            borderColor: colors.accent,
                          },
                        }}
                      >
                        {/* Medicine Image */}
                        {medicine.image ? (
                          <CardMedia
                            component="img"
                            height="150"
                            image={medicine.image}
                            alt={medicine.productName}
                            sx={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: "150px",
                              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FaCapsules size={50} color={colors.primary} />
                          </Box>
                        )}

                        <CardContent sx={{ p: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 800,
                              color: colors.text,
                              mb: 1,
                              fontSize: "0.9rem",
                            }}
                          >
                            {medicine.productName}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color: colors.textLight,
                              display: "block",
                              mb: 1,
                              fontWeight: 600,
                            }}
                          >
                            {medicine.category}
                          </Typography>

                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography
                              sx={{
                                color: colors.accent,
                                fontWeight: 800,
                                fontSize: "1rem",
                              }}
                            >
                              ₹{medicine.price}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <FaStar size={12} color={colors.accent} />
                              <Typography variant="caption" sx={{ fontWeight: 700, color: colors.text }}>
                                {medicine.rating}
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>
        </Grid>

        {/* STATS ROW */}
        <Grid container spacing={3} sx={{ mt: 6 }}>
          {[
            { number: "10K+", label: "Happy Customers", icon: <FaUsers /> },
            { number: "500+", label: "Medicines", icon: <FaCapsules /> },
            { number: "24/7", label: "Support", icon: <FaClock /> },
            { number: "99%", label: "Satisfaction", icon: <FaStar /> },
          ].map((stat, idx) => (
            <Grid item xs={6} md={3} key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ color: colors.accent, mb: 1, fontSize: "2rem" }}>
                    {stat.icon}
                  </Box>
                  <Typography sx={{ fontSize: "1.8rem", fontWeight: 900, color: colors.accent }}>
                    {stat.number}
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: colors.textLight, fontWeight: 600 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ============================================
// BENEFITS SECTION COMPONENT
// ============================================
const BenefitsSection = () => {
  const benefits = [
    { icon: <FaCheckCircle />, title: "100% Authentic", description: "All medicines verified" },
    { icon: <FaLeaf />, title: "Natural & Safe", description: "Carefully selected" },
    { icon: <FaShieldAlt />, title: "Secure Payment", description: "Data protected" },
    { icon: <FaFire />, title: "Fast Delivery", description: "Quick shipping" },
  ];

  return (
    <Box sx={{ py: 10, bgcolor: colors.secondary }}>
      <Container maxWidth="lg">
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

        <Grid container spacing={3} sx={{ mt: 2 }}>
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
                      transform: "translateY(-12px)",
                      boxShadow: `0 15px 40px ${colors.shadow}`,
                      borderColor: colors.accent,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: colors.accent, mb: 2, fontSize: "2.5rem", display: "flex", justifyContent: "center" }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.text }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textLight, lineHeight: 1.6, fontWeight: 500 }}>
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
  );
};

// ============================================
// FEATURED MEDICINES SECTION
// ============================================
const FeaturedMedicinesSection = () => {
  const medicines = productsData.slice(0, 8);

  return (
    <Box sx={{ py: 10, bgcolor: colors.primary }}>
      <Container maxWidth="lg">
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
          Featured Medicines
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
          Explore our most popular and trusted medicines
        </Typography>

        <Grid container spacing={3}>
          {medicines.map((medicine, index) => (
            <Grid item xs={12} sm={6} md={3} key={medicine.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    border: `2px solid ${colors.border}`,
                    bgcolor: colors.secondary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: `0 15px 40px ${colors.shadow}`,
                      borderColor: colors.accent,
                    },
                  }}
                >
                  {/* Medicine Image */}
                  {medicine.image ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={medicine.image}
                      alt={medicine.productName}
                      sx={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: "200px",
                        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaCapsules size={60} color={colors.primary} />
                    </Box>
                  )}

                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.text }}>
                      {medicine.productName}
                    </Typography>

                    <Typography variant="body2" sx={{ color: colors.textLight, mb: 2, fontWeight: 600 }}>
                      {medicine.description}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography sx={{ color: colors.accent, fontWeight: 800, fontSize: "1.2rem" }}>
                        ₹{medicine.price}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <FaStar size={14} color={colors.accent} />
                        <Typography variant="body2" sx={{ fontWeight: 700, color: colors.text }}>
                          {medicine.rating}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={medicine.category}
                      size="small"
                      sx={{
                        bgcolor: colors.primary,
                        color: colors.accent,
                        fontWeight: 700,
                        mb: 2,
                      }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        bgcolor: colors.accent,
                        color: colors.primary,
                        fontWeight: 800,
                        borderRadius: "10px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: colors.accentDark,
                        },
                      }}
                    >
                      <FaShoppingCart style={{ marginRight: "8px" }} /> Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ============================================
// CTA SECTION COMPONENT
// ============================================
const CTASection = ({ navigate }) => {
  return (
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
              boxShadow: `0 12px 30px rgba(76, 175, 80, 0.3)`,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: colors.accentDark,
                transform: "translateY(-5px)",
                boxShadow: `0 18px 40px rgba(76, 175, 80, 0.4)`,
              },
            }}
          >
            Sign Up Now <FaArrowRight style={{ marginLeft: "10px" }} />
          </Button>
        </Container>
      </motion.div>
    </Box>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: colors.text,
        color: colors.primary,
        py: 4,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          © 2025 MediTrack. All rights reserved.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: colors.secondary,
            display: "block",
            fontWeight: 500,
          }}
        >
          Your trusted healthcare companion
        </Typography>
      </Container>
    </Box>
  );
};

// ============================================
// MAIN LANDING PAGE COMPONENT
// ============================================
const LandingFinal = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: colors.primary }}>
      <HeroSection navigate={navigate} />
      <BenefitsSection />
      <FeaturedMedicinesSection />
      <CTASection navigate={navigate} />
      <Footer />
    </Box>
  );
};

export default LandingFinal;
