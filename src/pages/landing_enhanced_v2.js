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
  FaAward,
  FaClock,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
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

const LandingEnhancedV2 = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCapsules size={50} />,
      title: "Wide Medicine Selection",
      description: "Browse our extensive collection of quality medicines and healthcare products",
      color: colors.accent,
    },
    {
      icon: <FaHeartbeat size={50} />,
      title: "Health Tracking",
      description: "Monitor your health metrics and maintain comprehensive wellness records",
      color: colors.accent,
    },
    {
      icon: <FaRobot size={50} />,
      title: "AI Assistant",
      description: "Get personalized health recommendations from our intelligent AI assistant",
      color: colors.accent,
    },
    {
      icon: <FaShoppingCart size={50} />,
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

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <FaUsers /> },
    { number: "500+", label: "Medicines", icon: <FaCapsules /> },
    { number: "24/7", label: "Support", icon: <FaClock /> },
    { number: "99%", label: "Satisfaction", icon: <FaStar /> },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Healthcare Professional",
      image: "https://via.placeholder.com/60x60?text=SJ",
      rating: 5,
      text: "MediTrack has revolutionized how I manage my medications. Highly recommended!",
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Medical Doctor",
      image: "https://via.placeholder.com/60x60?text=RK",
      rating: 5,
      text: "The platform is user-friendly and reliable. My patients love it!",
    },
    {
      name: "Emma Wilson",
      role: "Patient",
      image: "https://via.placeholder.com/60x60?text=EW",
      rating: 5,
      text: "Fast delivery and authentic medicines. Best healthcare app ever!",
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

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity },
    },
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: colors.primary }}>
      {/* 3D Background with Animated Shapes */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          overflow: "hidden",
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        }}
      >
        {/* Animated 3D Circles */}
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
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accentDark}15 0%, transparent 70%)`,
            bottom: "-150px",
            left: "-150px",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(50px)",
          }}
        />
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: colors.text,
          py: { xs: 12, md: 20 },
          position: "relative",
          overflow: "hidden",
          borderBottom: `3px solid ${colors.accent}`,
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
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
                      lineHeight: 1.2,
                    }}
                  >
                    Your Health, Our Priority
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
                    Experience the future of healthcare with MediTrack. Access quality medicines, expert guidance, and personalized health solutions all in one place.
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
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </motion.div>

                {/* Trust Badges */}
                <motion.div variants={itemVariants}>
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

              {/* Floating 3D Element */}
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                  style={{
                    perspective: "1000px",
                  }}
                >
                  <Box
                    sx={{
                      background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                      borderRadius: "20px",
                      p: 4,
                      textAlign: "center",
                      color: colors.primary,
                      boxShadow: `0 20px 60px ${colors.shadow}`,
                      border: `2px solid ${colors.border}`,
                      transform: "rotateX(5deg) rotateY(-5deg)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "rotateX(10deg) rotateY(-10deg)",
                        boxShadow: `0 30px 80px ${colors.shadow}`,
                      },
                    }}
                  >
                    <FaCapsules size={80} style={{ marginBottom: "20px" }} />
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
                      500+ Medicines
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                      Access to a comprehensive collection of authentic medicines
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <FaStar key={i} size={20} />
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>

            {/* Stats Row */}
            <Grid container spacing={3} sx={{ mt: 6 }}>
              {stats.map((stat, idx) => (
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
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 10, bgcolor: colors.secondary }}>
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
              We're committed to your health and wellness
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
                        transform: "translateY(-12px)",
                        boxShadow: `0 15px 40px ${colors.shadow}`,
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
                        transform: "translateY(-15px)",
                        boxShadow: `0 20px 50px ${colors.shadow}`,
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

      {/* Testimonials Section */}
      <Box sx={{ py: 10, bgcolor: colors.secondary }}>
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
              What Our Users Say
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
              Join thousands of satisfied customers
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      borderRadius: "16px",
                      border: `2px solid ${colors.border}`,
                      p: 3,
                      bgcolor: colors.primary,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        boxShadow: `0 15px 40px ${colors.shadow}`,
                        transform: "translateY(-8px)",
                        borderColor: colors.accent,
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar
                          src={testimonial.image}
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 800,
                              color: colors.text,
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: colors.textLight,
                              fontWeight: 600,
                            }}
                          >
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        sx={{ mb: 2, color: colors.accent }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textLight,
                          fontStyle: "italic",
                          lineHeight: 1.6,
                          fontWeight: 500,
                        }}
                      >
                        "{testimonial.text}"
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
              Join thousands of satisfied customers and experience healthcare like never before
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

      {/* Contact Section */}
      <Box sx={{ py: 8, bgcolor: colors.primary }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 900,
              mb: 6,
              color: colors.text,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            Get In Touch
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <FaPhone size={30} />,
                title: "Call Us",
                content: "+1 (555) 123-4567",
              },
              {
                icon: <FaEnvelope size={30} />,
                title: "Email Us",
                content: "support@meditrack.com",
              },
              {
                icon: <FaMapMarkerAlt size={30} />,
                title: "Visit Us",
                content: "123 Health Street, Medical City",
              },
            ].map((contact, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 3,
                      borderRadius: "16px",
                      border: `2px solid ${colors.border}`,
                      bgcolor: colors.secondary,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        borderColor: colors.accent,
                        transform: "translateY(-8px)",
                        boxShadow: `0 12px 30px ${colors.shadow}`,
                      },
                    }}
                  >
                    <Box sx={{ color: colors.accent, mb: 2 }}>
                      {contact.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        color: colors.text,
                      }}
                    >
                      {contact.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textLight,
                        fontWeight: 600,
                      }}
                    >
                      {contact.content}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
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
    </Box>
  );
};

export default LandingEnhancedV2;
