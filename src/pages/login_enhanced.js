import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
  Container,
  Card,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaKey,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const EnhancedLoginPage = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Signup state
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(loginEmail)) {
      setLoginError("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call - in real app, this would be an axios call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("meditrack_users") || "[]");
      const user = users.find(
        (u) => u.email === loginEmail && u.password === loginPassword
      );

      if (!user) {
        setLoginError("Invalid email or password");
        toast.error("Invalid credentials");
        setLoading(false);
        return;
      }

      // Store user session
      localStorage.setItem(
        "meditrack_currentUser",
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          mobile: user.mobile,
        })
      );

      toast.success("Login successful!");

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSignupError("");

    // Validation
    if (
      !signUpUsername ||
      !signUpEmail ||
      !signUpPassword ||
      !confirmPassword ||
      !mobile ||
      !role
    ) {
      setSignupError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(signUpEmail)) {
      setSignupError("Please enter a valid email");
      return;
    }

    if (!isValidPassword(signUpPassword)) {
      setSignupError("Password must be at least 6 characters");
      return;
    }

    if (signUpPassword !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      setSignupError("Please enter a valid 10-digit phone number");
      return;
    }

    if (role === "admin" && !secretCode) {
      setSignupError("Admin secret code is required");
      return;
    }

    if (role === "admin" && secretCode !== "ADMIN123") {
      setSignupError("Invalid admin secret code");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get existing users
      const users = JSON.parse(localStorage.getItem("meditrack_users") || "[]");

      // Check if email already exists
      if (users.some((u) => u.email === signUpEmail)) {
        setSignupError("Email already registered");
        toast.error("Email already registered");
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
        mobile: mobile,
        role: role,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("meditrack_users", JSON.stringify(users));

      toast.success("Sign up successful! Please login.");
      setShowSignup(false);
      resetSignupForm();
    } catch (error) {
      setSignupError("An error occurred. Please try again.");
      toast.error("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const resetSignupForm = () => {
    setSignUpUsername("");
    setSignUpEmail("");
    setSignUpPassword("");
    setConfirmPassword("");
    setMobile("");
    setRole("");
    setSecretCode("");
  };

  const isLoginDisabled = !loginEmail || !loginPassword || loading;
  const isSignUpDisabled =
    !signUpUsername ||
    !signUpEmail ||
    !signUpPassword ||
    !confirmPassword ||
    !mobile ||
    !role ||
    (role === "admin" && !secretCode) ||
    loading;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card
            sx={{
              p: 4,
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            {!showSignup ? (
              <>
                {/* Login Form */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    mb: 4,
                  }}
                >
                  Sign in to your account
                </Typography>

                <Box component="form" onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    error={!!loginError}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    error={!!loginError}
                    helperText={loginError}
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ color: "#667eea" }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isLoginDisabled}
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 700,
                      py: 1.5,
                      mb: 2,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 30px rgba(102,126,234,0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#666",
                      mb: 2,
                    }}
                  >
                    Don't have an account?
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setShowSignup(true);
                      setLoginError("");
                    }}
                    sx={{
                      borderColor: "#667eea",
                      color: "#667eea",
                      fontWeight: 700,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                        borderColor: "#667eea",
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </Box>
              </>
            ) : (
              <>
                {/* Signup Form */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    textAlign: "center",
                    mb: 4,
                  }}
                >
                  Join MediTrack today
                </Typography>

                <Box component="form" onSubmit={handleSignUp}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Account Type</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Account Type"
                    >
                      <MenuItem value="user">Customer</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Username"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaPhone style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ color: "#667eea" }}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: "#667eea" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            sx={{ color: "#667eea" }}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {role === "admin" && (
                    <TextField
                      fullWidth
                      label="Admin Secret Code"
                      type="password"
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaKey style={{ color: "#667eea" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}

                  {signupError && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#d32f2f",
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      {signupError}
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isSignUpDisabled}
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontWeight: 700,
                      py: 1.5,
                      mb: 2,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 30px rgba(102,126,234,0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: "#666",
                      mb: 2,
                    }}
                  >
                    Already have an account?
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setShowSignup(false);
                      resetSignupForm();
                      setSignupError("");
                    }}
                    sx={{
                      borderColor: "#667eea",
                      color: "#667eea",
                      fontWeight: 700,
                      py: 1.5,
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                        borderColor: "#667eea",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </>
            )}
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default EnhancedLoginPage;
