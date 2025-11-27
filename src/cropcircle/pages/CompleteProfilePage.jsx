import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const API_CROP = "http://localhost:5000/api/crop-circle";

export default function CompleteProfilePage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const [circle, setCircle] = useState(null);

  const [cropName, setCropName] = useState("");
  const [district, setDistrict] = useState("");
  const [experienceLevel, setExperienceLevel] = useState(
    user?.experience_level || "beginner"
  );

  const districts = [
    "Bangalore North",
    "Bangalore South",
    "Bangalore East",
    "Bangalore West",
    "Mysore",
    "Tumkur",
    "Chikkaballapur",
    "Erode",
    "Salem",
    "Tirupur",
  ];

  // ✅ FIXED: Check if user exists and handle Sprouter users
  useEffect(() => {
    if (!user) {
      console.log("No user found, redirecting to login...");
      navigate("/cropcircle/login");
      return;
    }

    // ✅ If user is from Sprouter and already has profile data, redirect to home
    if (user.isSprouter && user.profile_completed) {
      console.log("Sprouter user with completed profile, redirecting to home");
      navigate("/cropcircle/home");
      return;
    }

    const checkCircle = async () => {
      try {
        // ✅ Skip API check for Sprouter users to avoid 500 errors
        if (user.isSprouter) {
          console.log("Sprouter user - setting up new circle");
          setAlreadyJoined(false);
          setLoading(false);
          return;
        }

        // Regular users check via API
        const res = await axios.get(`${API_CROP}/get-my-circle`, {
          params: { user_id: user._id },
        });
        
        if (res.data.alreadyJoined) {
          setAlreadyJoined(true);
          setCircle(res.data.circle);
        }
      } catch (err) {
        console.error("Error fetching circle info:", err.response?.data || err.message);
        setAlreadyJoined(false);
      } finally {
        setLoading(false);
      }
    };

    checkCircle();
  }, [user, navigate]);

  // ✅ FIXED: Handle form submission for both Sprouter and regular users
  const handleSubmit = async () => {
    if (!user) {
      alert("Please login first");
      navigate("/cropcircle/login");
      return;
    }

    if (!cropName || !district) return alert("Please select crop type and district");

    try {
      setLoading(true);

      // ✅ Handle Sprouter users (local storage only)
      if (user.isSprouter) {
        const updatedUser = { 
          ...user, 
          crop_name: cropName, 
          district: district,
          experience_level: experienceLevel,
          profile_completed: true // Mark profile as completed
        };
        
        login(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("cc_user", JSON.stringify(updatedUser));

        alert("🎉 Welcome to Crop Circle! Your profile is now complete.");
        navigate("/cropcircle/home");
      } else {
        // Regular users use the API
        const res = await axios.post(`${API_CROP}/join-or-create`, {
          user_id: user._id,
          crop_name: cropName,
          district,
        });

        const updatedUser = { ...user, crop_name: cropName, district };
        login(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("cc_user", JSON.stringify(updatedUser));

        setAlreadyJoined(true);
        setCircle(res.data.circle);
        alert(res.data.message);
        navigate("/cropcircle/home");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to complete profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Show loading or redirect if no user
  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 10, flexDirection: "column" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Redirecting to login...</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If already joined a circle, show circle info
  if (alreadyJoined && circle) {
    return (
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 10,
          p: 3,
          bgcolor: "#fafafa",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#16a34a" }}>
          Your Crop Circle
        </Typography>
        <Typography>
          Crop: <strong>{circle.crop_name}</strong>
        </Typography>
        <Typography>
          District: <strong>{circle.district}</strong>
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: "#16a34a" }}
          onClick={() => navigate("/cropcircle/home")}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  // Main form for joining/creating a crop circle
  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 3,
        bgcolor: "#fafafa",
        borderRadius: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center", color: "#16a34a" }}>
        Complete Your Profile
      </Typography>
      
      {/* Show user info */}
      <Typography variant="body2" sx={{ mb: 2, color: "#666", textAlign: "center" }}>
        Welcome, {user?.name || user?.fullName || "User"}!
        {user.isSprouter && " (Sprouter User)"}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Crop Name"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          fullWidth
          placeholder="e.g., Rice, Wheat, Cotton"
        />

        <FormControl fullWidth>
          <InputLabel>District</InputLabel>
          <Select value={district} label="District" onChange={(e) => setDistrict(e.target.value)}>
            {districts.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Experience Level</InputLabel>
          <Select
            value={experienceLevel}
            label="Experience Level"
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
            <MenuItem value="expert">Expert</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ bgcolor: "#16a34a", fontWeight: 600 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Join Crop Circle"}
        </Button>
      </Stack>
    </Box>
  );
}