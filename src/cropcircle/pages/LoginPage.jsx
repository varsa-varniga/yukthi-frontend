import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../firebase";
import { Box, Typography, TextField, Button, Stack, CircularProgress } from "@mui/material";

const API = "http://localhost:5000/api/auth";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSprouter, setCheckingSprouter] = useState(true);

  // ✅ AUTO-REDIRECT SPRINTER USERS - UPDATED
  useEffect(() => {
    const checkSprouterAndRedirect = async () => {
      try {
        const sprouterData = localStorage.getItem('sprouterData');
        
        if (sprouterData) {
          const sprouterUser = JSON.parse(sprouterData);
          console.log("Sprouter user detected, auto-login to CropCircle...");
          
          // Create CropCircle user from Sprouter data
          const cropCircleUser = {
            _id: sprouterUser._id || `sprouter_${Date.now()}`,
            name: sprouterUser.fullName,
            email: sprouterUser.email,
            phone: sprouterUser.phone,
            experience_level: sprouterUser.experience || 'beginner',
            profile_photo: null,
            crop_name: sprouterUser.mainCrops || '',
            district: sprouterUser.district || '',
            state: sprouterUser.state || '',
            isSprouter: true,
            profile_completed: true // ✅ Mark as completed to skip complete-profile
          };
          
          // Login and redirect
          login(cropCircleUser);
          localStorage.setItem('user', JSON.stringify(cropCircleUser));
          localStorage.setItem('cc_user', JSON.stringify(cropCircleUser));
          
          // ✅ Go directly to home for Sprouter users
          navigate('/cropcircle/home');
          return;
        }
      } catch (error) {
        console.error("Error during Sprouter auto-login:", error);
      } finally {
        setCheckingSprouter(false);
      }
    };

    checkSprouterAndRedirect();
  }, [login, navigate]);

  // Regular user check - only for non-Sprouter users
  useEffect(() => {
    if (user && user._id && !user.isSprouter && !checkingSprouter) {
      if (!user.crop_name || !user.experience_level) {
        navigate("/cropcircle/complete-profile");
      } else {
        navigate("/cropcircle/home");
      }
    }
  }, [user, navigate, checkingSprouter]);

  const validate = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleEmailLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (data.user) {
        login(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("cc_user", JSON.stringify(data.user));

        // Redirect based on profile completion
        if (!data.user.crop_name || !data.user.experience_level) {
          navigate("/cropcircle/complete-profile");
        } else {
          navigate("/cropcircle/home");
        }
      } else {
        setError("User data not received");
      }
    } catch (err) {
      console.error("Email login error:", err);
      setError("Server error, try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const { idToken } = await googleSignIn();
      const res = await fetch(`${API}/login-google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Google login failed");
        return;
      }

      if (data.user) {
        login(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("cc_user", JSON.stringify(data.user));

        // Redirect based on profile completion
        if (!data.user.crop_name || !data.user.experience_level) {
          navigate("/cropcircle/complete-profile");
        } else {
          navigate("/cropcircle/home");
        }
      } else {
        setError("User data not received from server");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed - check console for details");
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking Sprouter
  if (checkingSprouter) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        flexDirection: "column",
        gap: 2
      }}>
        <CircularProgress size={40} />
        <Typography variant="h6" color="primary">
          Checking Sprouter account...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: 400, 
      mx: "auto", 
      mt: 10, 
      p: 3, 
      bgcolor: "#fafafa", 
      borderRadius: 2, 
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)" 
    }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#16a34a" }}>
        CropCircle Login
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: "center" }}>
          {error}
        </Typography>
      )}

      {/* Sprouter Info Banner */}
      {localStorage.getItem('sprouterData') && (
        <Box sx={{ 
          backgroundColor: "#f0fdf4", 
          border: "1px solid #bbf7d0", 
          borderRadius: 1, 
          p: 2, 
          mb: 2,
          textAlign: "center"
        }}>
          <Typography variant="body2" sx={{ color: "#166534", fontWeight: 500 }}>
            🚀 Sprouter user detected! You'll be automatically logged in.
          </Typography>
        </Box>
      )}
      
      <Stack spacing={2}>
        <TextField 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth 
          disabled={loading}
        />
        <TextField 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth 
          disabled={loading}
        />

        <Button 
          variant="contained" 
          sx={{ bgcolor: "#16a34a", py: 1.5 }} 
          onClick={handleEmailLogin}
          disabled={loading}
          fullWidth
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Button 
          variant="outlined" 
          onClick={handleGoogleLogin}
          disabled={loading}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {loading ? "Connecting..." : "Login with Google"}
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button 
            onClick={() => navigate("/cropcircle/register")}
            disabled={loading}
            sx={{ color: "#16a34a" }}
          >
            Don't have an account? Sign up
          </Button>
        </Box>

        {/* Sprouter Redirect Info */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Coming from Sprouter? You'll be automatically redirected.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;