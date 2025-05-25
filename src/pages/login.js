import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Typography,
} from "@mui/material";
import "../styles/components/login.scss";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post(
        "http://localhost:6778/api/auth/login",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      Cookies.set("token", token);

      // Decode the token to get the role
      const decodedToken = jwtDecode(token); // Use jwtDecode correctly
      const userRole = decodedToken.role; // Get the role from decoded token

      // Navigate based on user role
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "user") {
        navigate("/user");
      }
    } catch (error) {
      setError("Invalid credentials, please try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post(
        "http://localhost:6778/api/auth/signup",
        {
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
          mobile: mobile,
          role: role,
          secretCode: secretCode,
        }
      );

      // Show success toast
      toast.success("Sign up successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message); // Display error message
      toast.error("Sign up failed. Please try again.");
    }
  };

  const isLoginButtonDisabled = !loginEmail || !loginPassword;
  const isSignUpButtonDisabled =
    !signUpUsername ||
    !signUpEmail ||
    !signUpPassword ||
    !mobile ||
    !role ||
    (role === "admin" && !secretCode); // Check if secret code is entered for admin

  return (
    <div className='login-page'>
      <div className='login-page-left'>
        <div className='login-form'>
          <div className={`login-page-form-div ${showSignup ? "slide" : ""}`}>
            {!showSignup ? (
              <>
                <h1 className='header-login'>Login</h1>
                <div className='login-page-container'>
                  <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant='contained'
                    fullWidth
                    onClick={handleLogin}
                    disabled={isLoginButtonDisabled}
                    sx={{
                      padding: "12px",
                      fontWeight: "bold",
                      backgroundColor: isLoginButtonDisabled
                        ? "#ccc"
                        : "#080808",
                      "&:hover": {
                        backgroundColor: "#000000",
                      },
                    }}
                  >
                    Login
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 2 }}>
                    Don't have an account?
                  </Typography>
                  <Button
                    variant='outlined'
                    fullWidth
                    onClick={() => setShowSignup(true)}
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      borderColor: "#080808",
                      color: "#fff",
                      backgroundColor: "#000",
                      "&:hover": {
                        borderColor: "#000000",
                        color: "#000",
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h1 className='header-login'>Sign Up</h1>
                <div className='login-page-container'>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      label='Role'
                    >
                      <MenuItem value='admin'>Admin</MenuItem>
                      <MenuItem value='user'>User</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    label='Username'
                    variant='outlined'
                    fullWidth
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Email'
                    variant='outlined'
                    fullWidth
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Mobile Number'
                    variant='outlined'
                    fullWidth
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  {role === "admin" && (
                    <TextField
                      label='Secret Code'
                      type='password'
                      variant='outlined'
                      fullWidth
                      value={secretCode}
                      onChange={(e) => setSecretCode(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                  )}
                  <Button
                    variant='contained'
                    fullWidth
                    onClick={handleSignUp}
                    disabled={isSignUpButtonDisabled}
                    sx={{
                      padding: "12px",
                      fontWeight: "bold",
                      backgroundColor: isSignUpButtonDisabled ? "#000" : "#000",
                      "&:hover": {
                        backgroundColor: "#000000",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 2 }}>
                    Already have an account?
                  </Typography>
                  <Button
                    variant='outlined'
                    fullWidth
                    onClick={() => setShowSignup(false)}
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      borderColor: "#080808",
                      color: "#fff",
                      backgroundColor: "#000",
                      "&:hover": {
                        borderColor: "#000000",
                        color: "#000",
                        backgroundColor: "#fff",
                      },
                    }}
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
