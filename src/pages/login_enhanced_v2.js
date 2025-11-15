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
  Divider,
  Paper,
} from "@mui/material";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaLeaf,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// Color Palette
const colors = {
  primary: "#FFFFFF",      // White
  secondary: "#E8F5E9",    // Light Green
  accent: "#4CAF50",       // Green
  accentDark: "#2E7D32",   // Dark Green
  text: "#1B5E20",         // Dark Green text
  textLight: "#558B2F",    // Medium Green text
  border: "#C8E6C9",       // Light Green border
  error: "#D32F2F",        // Red for errors
  shadow: "rgba(46, 125, 50, 0.15)",
};

const EnhancedLoginPageV2 = () => {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      const users = JSON.parse(localStorage.getItem("meditrack_users") || "[]");

      if (users.some((u) => u.email === signUpEmail)) {
        setSignupError("Email already registered");
        toast.error("Email already registered");
        setLoading(false);
        return;
      }

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
        background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
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

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card
            sx={{
              p: 4,
              borderRadius: "20px",
              boxShadow: `0 20px 60px ${colors.shadow}`,
              border: `2px solid ${colors.border}`,
              bgcolor: colors.primary,
              backdropFilter: "blur(10px)",
            }}
          >
            {!showSignup ? (
              <>
                {/* Login Form */}
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                      fontSize: "2.5rem",
                      color: colors.accent,
                    }}
                  >
                    <FaLeaf />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: colors.text,
                      mb: 1,
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textLight,
                      fontWeight: 600,
                    }}
                  >
                    Sign in to your account
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    mb: 3,
                    borderColor: colors.border,
                    borderWidth: "2px",
                  }}
                />

                <Box component="form" onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    error={!!loginError}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope style={{ color: colors.accent }} />
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
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: colors.accent }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ color: colors.accent, minWidth: "auto" }}
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
                      bgcolor: colors.accent,
                      color: colors.primary,
                      fontWeight: 800,
                      py: 1.5,
                      mb: 2,
                      borderRadius: "12px",
                      fontSize: "1rem",
                      boxShadow: `0 8px 20px rgba(76, 175, 80, 0.3)`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: colors.accentDark,
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 30px rgba(76, 175, 80, 0.4)`,
                      },
                      "&:disabled": {
                        bgcolor: colors.border,
                        color: colors.textLight,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: colors.primary }} />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <Divider
                    sx={{
                      my: 2,
                      borderColor: colors.border,
                      borderWidth: "1px",
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: colors.textLight,
                      mb: 2,
                      fontWeight: 600,
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
                      borderColor: colors.accent,
                      color: colors.accent,
                      fontWeight: 800,
                      py: 1.5,
                      borderRadius: "12px",
                      fontSize: "1rem",
                      borderWidth: "2px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: colors.secondary,
                        borderColor: colors.accentDark,
                        color: colors.accentDark,
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
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 2,
                      fontSize: "2.5rem",
                      color: colors.accent,
                    }}
                  >
                    <FaLeaf />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      color: colors.text,
                      mb: 1,
                    }}
                  >
                    Create Account
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.textLight,
                      fontWeight: 600,
                    }}
                  >
                    Join MediTrack today
                  </Typography>
                </Box>

                <Divider
                  sx={{
                    mb: 3,
                    borderColor: colors.border,
                    borderWidth: "2px",
                  }}
                />

                <Box component="form" onSubmit={handleSignUp}>
                  <FormControl
                    fullWidth
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                    }}
                  >
                    <InputLabel sx={{ color: colors.textLight, fontWeight: 600 }}>
                      Account Type
                    </InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label="Account Type"
                      sx={{
                        "& .MuiSelect-select": {
                          color: colors.text,
                          fontWeight: 600,
                        },
                      }}
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
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaUser style={{ color: colors.accent }} />
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
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaEnvelope style={{ color: colors.accent }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaPhone style={{ color: colors.accent }} />
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
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: colors.accent }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{ color: colors.accent, minWidth: "auto" }}
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
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: colors.border,
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: colors.accent,
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: colors.accent,
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: colors.text,
                        fontWeight: 600,
                      },
                      "& .MuiInputLabel-root": {
                        color: colors.textLight,
                        fontWeight: 600,
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaLock style={{ color: colors.accent }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            sx={{ color: colors.accent, minWidth: "auto" }}
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
                      sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          "& fieldset": {
                            borderColor: colors.border,
                            borderWidth: "2px",
                          },
                          "&:hover fieldset": {
                            borderColor: colors.accent,
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: colors.accent,
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input": {
                          color: colors.text,
                          fontWeight: 600,
                        },
                        "& .MuiInputLabel-root": {
                          color: colors.textLight,
                          fontWeight: 600,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FaKey style={{ color: colors.accent }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}

                  {signupError && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.error,
                        mb: 2,
                        textAlign: "center",
                        fontWeight: 600,
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
                      bgcolor: colors.accent,
                      color: colors.primary,
                      fontWeight: 800,
                      py: 1.5,
                      mb: 2,
                      borderRadius: "12px",
                      fontSize: "1rem",
                      boxShadow: `0 8px 20px rgba(76, 175, 80, 0.3)`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: colors.accentDark,
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 30px rgba(76, 175, 80, 0.4)`,
                      },
                      "&:disabled": {
                        bgcolor: colors.border,
                        color: colors.textLight,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: colors.primary }} />
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <Divider
                    sx={{
                      my: 2,
                      borderColor: colors.border,
                      borderWidth: "1px",
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      color: colors.textLight,
                      mb: 2,
                      fontWeight: 600,
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
                      borderColor: colors.accent,
                      color: colors.accent,
                      fontWeight: 800,
                      py: 1.5,
                      borderRadius: "12px",
                      fontSize: "1rem",
                      borderWidth: "2px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: colors.secondary,
                        borderColor: colors.accentDark,
                        color: colors.accentDark,
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

export default EnhancedLoginPageV2;
