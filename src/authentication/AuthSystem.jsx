import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { User, Mail, Lock, Phone } from "lucide-react";

const API_BASE = "http://localhost:5000";

const ROLE_OPTIONS = [
  { value: "sprouter", label: "Sprouters" },
  { value: "cultivator", label: "Cultivators" },
  { value: "consumer", label: "Consumers" },
  { value: "carbon_buyer", label: "Carbon Credit Buyers" },
  { value: "hub_employee", label: "Regional Hub Employees" },
  { value: "rental_provider", label: "Rental Service Providers" },
  { value: "seller", label: "Sellers" },
];

const AuthSystem = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    primaryRole: "",
  });
  const [existingUser, setExistingUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if logged in already
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.authenticated) setCurrentUser(data.user);
      } catch (err) {
        console.log("Session check failed", err);
      }
    };
    checkSession();
  }, []);

  // Open modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStep("email");
    setError("");
    setUserData({
      name: "",
      phone: "",
      email: "",
      password: "",
      primaryRole: "",
    });
  };

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Step 1: Check if email exists
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userData.email }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.exists) {
        setExistingUser(data);
        setStep("login");
      } else {
        setStep("register");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Login existing user
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.user);
        window.location.href = `/${data.user.primaryRole}/dashboard`;
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Register New User
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!userData.primaryRole) return setError("Please select a user type");
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.user);
        window.location.href = `/${data.user.primaryRole}/dashboard`;
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar Button */}
      {currentUser ? (
        <Button
          sx={{
            background: "#e8f5e9",
            color: "#16a34a",
            borderRadius: "8px",
            fontWeight: 600,
            textTransform: "none",
          }}
          onClick={handleOpen}
        >
          Continue as {currentUser.name || currentUser.email}
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          sx={{
            background: "linear-gradient(to right, #16a34a, #059669)",
            color: "white",
            fontWeight: 600,
            borderRadius: "12px",
            px: 3,
            py: 1,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(to right, #059669, #047857)",
            },
          }}
        >
          Login / Signup
        </Button>
      )}

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: 4, position: "relative" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: 12, top: 12 }}
          >
            <Close />
          </IconButton>

          {/* Step 1: Email */}
          {step === "email" && (
            <Box>
              <Typography variant="h5" fontWeight={700} mb={2}>
                Welcome to AgroVihan 🌿
              </Typography>
              <Typography variant="body2" mb={3}>
                Enter your email to continue.
              </Typography>
              <form onSubmit={handleCheckEmail}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  required
                  value={userData.email}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} />
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography color="error" mt={2}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.2,
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #16a34a, #059669)",
                    color: "white",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(to right, #059669, #047857)",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Continue"}
                </Button>
              </form>
            </Box>
          )}

          {/* Step 2: Login */}
          {step === "login" && (
            <Box>
              <Typography variant="h5" fontWeight={700} mb={2}>
                Welcome Back!
              </Typography>
              <Typography variant="body2" mb={3}>
                Continue as {existingUser?.masked}
              </Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {error && (
                  <Typography color="error" mt={2}>
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.2,
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #16a34a, #059669)",
                    color: "white",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(to right, #059669, #047857)",
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Sign In"}
                </Button>
              </form>
            </Box>
          )}

          {/* Step 3: Register - Personal Info */}
          {step === "register" && (
            <Box>
              <Typography variant="h5" fontWeight={700} mb={2}>
                Create Your Account
              </Typography>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("role");
                }}
              >
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  margin="normal"
                  value={userData.name}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={18} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  margin="normal"
                  value={userData.phone}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone size={18} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  value={userData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.2,
                    borderRadius: "10px",
                    background: "linear-gradient(to right, #16a34a, #059669)",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Next →
                </Button>
              </form>
            </Box>
          )}

          {/* Step 4: Select Role */}
          {step === "role" && (
            <Box>
              <Typography variant="h5" fontWeight={700} mb={3}>
                Choose Your User Type
              </Typography>
              <Grid container spacing={2}>
                {ROLE_OPTIONS.map((role) => (
                  <Grid item xs={12} sm={6} key={role.value}>
                    <Button
                      fullWidth
                      variant={
                        userData.primaryRole === role.value
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() =>
                        setUserData({ ...userData, primaryRole: role.value })
                      }
                      sx={{
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "#16a34a",
                        color:
                          userData.primaryRole === role.value
                            ? "#fff"
                            : "#16a34a",
                        background:
                          userData.primaryRole === role.value
                            ? "linear-gradient(to right, #16a34a, #059669)"
                            : "transparent",
                      }}
                    >
                      {role.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              {error && (
                <Typography color="error" mt={2}>
                  {error}
                </Typography>
              )}
              <Button
                onClick={handleRegister}
                fullWidth
                sx={{
                  mt: 3,
                  py: 1.2,
                  borderRadius: "10px",
                  background: "linear-gradient(to right, #16a34a, #059669)",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Finish Signup"}
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthSystem;
