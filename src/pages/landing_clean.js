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
  Chip,
  Avatar,
} from "@mui/material";
import {
  FaCapsules,
  FaHeartbeat,
  FaRobot,
  FaArrowRight,
  FaCheckCircle,
  FaLeaf,
  FaShieldAlt,
  FaTruck,
  FaUsers,
  FaClock,
  FaStar,
  FaAward,
  FaHeadset,
  FaQuoteLeft,
  FaPlay,
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
  lightGray: "#F5F5F5",
};

// ============================================
// NAVBAR
// ============================================
const Navbar = ({ navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          bgcolor: colors.primary,
          py: 2,
          borderBottom: `2px solid ${colors.border}`,
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 45,
                  height: 45,
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                  fontWeight: 900,
                  fontSize: "1.8rem",
                }}
              >
                M
              </Box>
              <Typography sx={{ fontWeight: 900, fontSize: "1.6rem", color: colors.text }}>
                MediTrack
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{
                  borderColor: colors.accent,
                  color: colors.accent,
                  fontWeight: 700,
                  borderRadius: "8px",
                  px: 3,
                  "&:hover": { bgcolor: colors.secondary, borderColor: colors.accentDark },
                }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: colors.accent,
                  color: colors.primary,
                  fontWeight: 700,
                  borderRadius: "8px",
                  px: 3,
                  "&:hover": { bgcolor: colors.accentDark },
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = ({ navigate }) => {
  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        py: { xs: 12, md: 16 },
        position: "relative",
        overflow: "hidden",
        borderBottom: `4px solid ${colors.accent}`,
      }}
    >
      {/* Animated Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
        <Grid container spacing={6} alignItems="center">
          {/* LEFT SIDE - TEXT */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Chip
                icon={<FaAward />}
                label="🏆 Trusted by 50,000+ Customers"
                sx={{
                  bgcolor: colors.secondary,
                  color: colors.text,
                  fontWeight: 700,
                  mb: 3,
                  py: 2.5,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  fontSize: { xs: "2.2rem", md: "3.5rem" },
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
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  color: colors.textLight,
                  fontWeight: 500,
                  lineHeight: 1.8,
                }}
              >
                Access 500+ authentic medicines, AI-powered health insights, and expert guidance all in one trusted platform.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                      "&:hover": {
                        bgcolor: colors.accentDark,
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    Get Started <FaArrowRight style={{ marginLeft: "10px" }} />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                      "&:hover": { bgcolor: colors.secondary, borderColor: colors.accentDark },
                    }}
                  >
                    <FaPlay style={{ marginRight: "8px" }} /> Watch Demo
                  </Button>
                </motion.div>
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Chip icon={<FaCheckCircle />} label="Verified Medicines" sx={{ bgcolor: colors.secondary, color: colors.text, fontWeight: 700, py: 2.5 }} />
                <Chip icon={<FaShieldAlt />} label="Secure & Safe" sx={{ bgcolor: colors.secondary, color: colors.text, fontWeight: 700, py: 2.5 }} />
                <Chip icon={<FaClock />} label="24/7 Support" sx={{ bgcolor: colors.secondary, color: colors.text, fontWeight: 700, py: 2.5 }} />
              </Box>
            </motion.div>
          </Grid>

          {/* RIGHT SIDE - ILLUSTRATION */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, md: 450 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Main Icon */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Box
                    sx={{
                      fontSize: "200px",
                      color: colors.accent,
                      filter: "drop-shadow(0 10px 30px rgba(76, 175, 80, 0.2))",
                    }}
                  >
                    <FaHeartbeat />
                  </Box>
                </motion.div>

                {/* Floating Pills */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box sx={{ position: "absolute", top: "10%", right: "10%", fontSize: "40px", color: colors.accentDark }}>
                    <FaCapsules />
                  </Box>
                  <Box sx={{ position: "absolute", bottom: "15%", left: "10%", fontSize: "40px", color: colors.accent }}>
                    <FaLeaf />
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* STATS */}
        <Grid container spacing={3} sx={{ mt: 8 }}>
          {[
            { number: "50K+", label: "Happy Customers", icon: <FaUsers /> },
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
                  <Box sx={{ color: colors.accent, mb: 1, fontSize: "2rem" }}>{stat.icon}</Box>
                  <Typography sx={{ fontSize: "1.6rem", fontWeight: 900, color: colors.accent }}>
                    {stat.number}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: colors.textLight, fontWeight: 600 }}>
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
// FEATURES SECTION
// ============================================
const FeaturesSection = () => {
  const features = [
    { icon: <FaCheckCircle />, title: "100% Authentic", description: "All medicines verified and certified" },
    { icon: <FaLeaf />, title: "Natural & Safe", description: "Carefully selected products" },
    { icon: <FaShieldAlt />, title: "Secure Payment", description: "Bank-level encryption" },
    { icon: <FaTruck />, title: "Fast Delivery", description: "Quick shipping with tracking" },
    { icon: <FaHeadset />, title: "Expert Support", description: "24/7 healthcare professionals" },
    { icon: <FaRobot />, title: "AI Health Insights", description: "Personalized recommendations" },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: colors.lightGray }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 900, mb: 2, color: colors.text, fontSize: { xs: "1.8rem", md: "2.8rem" } }}>
            Why Choose MediTrack?
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: colors.textLight, mb: 8, fontSize: "1.1rem", fontWeight: 500 }}>
            Experience healthcare like never before
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    p: 4,
                    borderRadius: "16px",
                    border: `2px solid ${colors.border}`,
                    bgcolor: colors.primary,
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: `0 20px 50px ${colors.shadow}`,
                      borderColor: colors.accent,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: colors.accent, mb: 2, fontSize: "3rem", display: "flex", justifyContent: "center" }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.text }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textLight, lineHeight: 1.7, fontWeight: 500 }}>
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
  );
};

// ============================================
// HOW IT WORKS
// ============================================
const HowItWorksSection = () => {
  const steps = [
    { number: "1", title: "Search & Browse", description: "Find medicines from our catalog" },
    { number: "2", title: "Add to Cart", description: "Select quantity and add" },
    { number: "3", title: "Checkout", description: "Secure payment" },
    { number: "4", title: "Fast Delivery", description: "Get delivered to your door" },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: colors.primary }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 900, mb: 2, color: colors.text, fontSize: { xs: "1.8rem", md: "2.8rem" } }}>
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: colors.textLight, mb: 8, fontSize: "1.1rem", fontWeight: 500 }}>
            Simple steps to get your medicines
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {steps.map((step, index) => (
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
                    "&:hover": {
                      boxShadow: `0 15px 40px ${colors.shadow}`,
                      borderColor: colors.accent,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentDark} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      color: colors.primary,
                      fontSize: "1.8rem",
                      fontWeight: 900,
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: colors.text }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textLight, fontWeight: 500 }}>
                    {step.description}
                  </Typography>
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
// TESTIMONIALS
// ============================================
const TestimonialsSection = () => {
  const testimonials = [
    { name: "Priya Sharma", role: "Healthcare Professional", text: "MediTrack revolutionized how I manage medications. AI insights are incredibly accurate!", rating: 5, avatar: "👩‍⚕️" },
    { name: "Rajesh Kumar", role: "Busy Professional", text: "Fast delivery, authentic medicines, excellent support. Highly recommended!", rating: 5, avatar: "👨‍💼" },
    { name: "Anjali Patel", role: "Senior Citizen", text: "Very easy to use. 24/7 support team is amazing!", rating: 5, avatar: "👵" },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: colors.secondary }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 900, mb: 2, color: colors.text, fontSize: { xs: "1.8rem", md: "2.8rem" } }}>
            What Our Customers Say
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: colors.textLight, mb: 8, fontSize: "1.1rem", fontWeight: 500 }}>
            Join thousands of satisfied customers
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                <Card sx={{ height: "100%", p: 4, borderRadius: "16px", border: `2px solid ${colors.border}`, bgcolor: colors.primary, "&:hover": { boxShadow: `0 15px 40px ${colors.shadow}`, borderColor: colors.accent } }}>
                  <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 50, height: 50, bgcolor: colors.secondary, fontSize: "1.5rem" }}>
                      {testimonial.avatar}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: colors.text }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.textLight, fontWeight: 600 }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: "flex", gap: 0.5 }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} size={14} color={colors.accent} />
                    ))}
                  </Box>
                  <Box sx={{ display: "flex", mb: 2, color: colors.accent, fontSize: "1.5rem" }}>
                    <FaQuoteLeft />
                  </Box>
                  <Typography variant="body2" sx={{ color: colors.textLight, lineHeight: 1.8, fontWeight: 500, fontStyle: "italic" }}>
                    "{testimonial.text}"
                  </Typography>
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
// CTA SECTION
// ============================================
const CTASection = ({ navigate }) => {
  return (
    <Box sx={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`, py: 10, textAlign: "center", borderTop: `3px solid ${colors.accent}` }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 3, color: colors.text, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Ready to Transform Your Health?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: colors.textLight, fontSize: "1.1rem", fontWeight: 500 }}>
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
              "&:hover": {
                bgcolor: colors.accentDark,
                transform: "translateY(-5px)",
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
// FOOTER
// ============================================
const Footer = () => {
  return (
    <Box sx={{ bgcolor: colors.text, color: colors.primary, py: 6, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              About
            </Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
              Your trusted healthcare companion
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
              Home • Products • Contact
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Support
            </Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
              24/7 Customer Support
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Follow Us
            </Typography>
            <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
              Social Media Links
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: `1px solid ${colors.secondary}`, pt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            © 2025 MediTrack. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: colors.secondary, display: "block", fontWeight: 500 }}>
            Your trusted healthcare companion
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

// ============================================
// MAIN LANDING PAGE
// ============================================
const LandingClean = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", overflow: "hidden", bgcolor: colors.primary }}>
      <Navbar navigate={navigate} />
      <HeroSection navigate={navigate} />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
      <Footer />
    </Box>
  );
};

export default LandingClean;
