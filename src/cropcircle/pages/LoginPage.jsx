import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../firebase";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const API = "http://localhost:5000/api/auth";

// ✅ Make sure this is a default export
const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ AUTO-REDIRECT SPRINTER USERS
  useEffect(() => {
    const checkSprouterAndRedirect = () => {
      const sprouterData = localStorage.getItem('sprouterData');
      
      if (sprouterData) {
        const sprouterUser = JSON.parse(sprouterData);
        console.log("Sprouter detected, redirecting to complete profile...");
        
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
          isSprouter: true
        };
        
        // Login and redirect
        login(cropCircleUser);
        localStorage.setItem('user', JSON.stringify(cropCircleUser));
        localStorage.setItem('cc_user', JSON.stringify(cropCircleUser));
        
        // Always go to complete profile for Sprouter users
        navigate('/cropcircle/complete-profile');
      }
    };

    checkSprouterAndRedirect();
  }, [login, navigate]);

  // Regular user check
  useEffect(() => {
    if (user && user._id && !user.isSprouter) {
      if (!user.crop_name || !user.experience_level) {
        navigate("/cropcircle/complete-profile");
      } else {
        navigate("/cropcircle/profile");
      }
    }
  }, [user, navigate]);

  const validate = () => {
    if (!email) return setError("Email is required") && false;
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Invalid email format") && false;
    if (!password) return setError("Password is required") && false;
    setError("");
    return true;
  };

  const handleEmailLogin = async () => {
    if (!validate()) return;

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Login failed");

      if (data.user) {
        login(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("cc_user", JSON.stringify(data.user));

        if (!data.user.crop_name || !data.user.experience_level) {
          navigate("/cropcircle/complete-profile");
        } else {
          navigate("/cropcircle/profile");
        }
      } else {
        setError("User data not received");
      }
    } catch (err) {
      console.error("Email login error:", err);
      setError("Server error, try again later.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await googleSignIn();
      const res = await fetch(`${API}/login-google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Google login failed");

      if (data.user) {
        login(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("cc_user", JSON.stringify(data.user));

        if (!data.user.crop_name || !data.user.experience_level) {
          navigate("/cropcircle/complete-profile");
        } else {
          navigate("/cropcircle/profile");
        }
      } else {
        setError("User data not received from server");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed - check console for details");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10, p: 3, bgcolor: "#fafafa", borderRadius: 2, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center", color: "#16a34a" }}>CropCircle Login</Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      
      <Stack spacing={2}>
        <TextField 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          fullWidth 
        />
        <TextField 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          fullWidth 
        />

        <Button variant="contained" sx={{ bgcolor: "#16a34a" }} onClick={handleEmailLogin}>
          Login
        </Button>

        <Button variant="outlined" onClick={handleGoogleLogin}>
          Login with Google
        </Button>

        <Button onClick={() => navigate("/cropcircle/register")}>
          Don't have an account? Sign up
        </Button>
      </Stack>
    </Box>
  );
};

// ✅ ADD THIS DEFAULT EXPORT
export default LoginPage;