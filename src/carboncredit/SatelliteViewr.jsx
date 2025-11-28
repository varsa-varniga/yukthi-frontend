// src/Components/SatelliteViewr.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import {
  Satellite as SatelliteIcon,
  Map as MapIcon,
  Science as ScienceIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  WaterDrop as WaterDropIcon,
  Grass as GrassIcon,
  Park as ParkIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import {
  analyzeSatelliteImagery,
  checkBackendHealth,
} from "../utils/satelliteAPI";

// ✅ ADD THESE HELPER FUNCTIONS AT THE TOP LEVEL
const getHealthColor = (score) => {
  if (score >= 85) return "success";
  if (score >= 70) return "warning";
  return "error";
};

const getIndexStatus = (value, type) => {
  const numValue = parseFloat(value);
  if (type === "ndvi") {
    if (numValue > 0.7) return { label: "Excellent", color: "success" };
    if (numValue > 0.5) return { label: "Good", color: "warning" };
    return { label: "Poor", color: "error" };
  }
  if (type === "ndwi") {
    if (numValue > 0.2) return { label: "Well Watered", color: "success" };
    if (numValue > 0.1) return { label: "Moderate", color: "warning" };
    return { label: "Dry", color: "error" };
  }
  if (type === "savi") {
    if (numValue > 0.6) return { label: "Healthy Soil", color: "success" };
    if (numValue > 0.4) return { label: "Moderate", color: "warning" };
    return { label: "Poor Soil", color: "error" };
  }
  return { label: "Unknown", color: "default" };
};

const SatelliteViewer = ({ onDataUpdate }) => {
  const [formData, setFormData] = useState({
    latitude: "11.0168",
    longitude: "76.9558",
    farmSize: "2.0",
  });

  const [loading, setLoading] = useState(false);
  const [satelliteData, setSatelliteData] = useState(null);
  const [error, setError] = useState(null);
  const [openInfo, setOpenInfo] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState("");
  const [backendStatus, setBackendStatus] = useState("checking");
  const [dataSource, setDataSource] = useState("");
  const [satelliteImage, setSatelliteImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // Check backend connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const health = await checkBackendHealth();
        setBackendStatus(health.status === "OK" ? "connected" : "disconnected");
        console.log("🔗 Backend status:", health);
      } catch (error) {
        setBackendStatus("disconnected");
        console.error("❌ Backend connection failed:", error);
      }
    };

    checkConnection();
  }, []);

  const loadSatelliteImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
      setImageLoading(true);
      setImageError(false);
      setCurrentImageUrl(imageUrl);

      console.log("📸 Attempting to load satellite image:", imageUrl);

      const img = new Image();
      const loadTimeout = setTimeout(() => {
        console.log("⏰ Image load timeout after 8 seconds");
        reject(new Error("Image load timeout"));
      }, 8000); // 8 second timeout

      img.onload = () => {
        clearTimeout(loadTimeout);
        console.log("✅ Satellite image loaded successfully");
        resolve(imageUrl);
      };

      img.onerror = (err) => {
        clearTimeout(loadTimeout);
        console.error("❌ Failed to load satellite image:", err);
        console.log("🔍 Image URL that failed:", imageUrl);
        reject(new Error("Image failed to load"));
      };

      img.src = imageUrl;
    });
  };

  const analyzeFarm = async () => {
    setLoading(true);
    setError(null);
    setDataSource("");
    setSatelliteImage(null);
    setImageLoading(false);
    setImageError(false);
    setRetryCount(0);
    setCurrentImageUrl("");
    setFallbackIndex(0);

    try {
      const data = await analyzeSatelliteImagery(
        parseFloat(formData.latitude),
        parseFloat(formData.longitude),
        parseFloat(formData.farmSize)
      );

      console.log("📡 Satellite data received:", data);
      setSatelliteData(data);
      setDataSource(
        data.isRealData ? "🛰️ Real Satellite Data" : "🧪 Simulated Data"
      );

      // ✅ SIMPLIFIED: Try to load images sequentially without pre-testing
      const allUrls = [data.satelliteImage, ...(data.fallbackImages || [])];
      console.log("🔄 Will try these image URLs:", allUrls);

      let loadedSuccessfully = false;

      // Try each URL in sequence
      for (let i = 0; i < allUrls.length; i++) {
        const url = allUrls[i];
        console.log(`🔄 Trying image URL ${i + 1}/${allUrls.length}:`, url);

        try {
          await loadSatelliteImage(url);
          setSatelliteImage(url);
          setImageError(false);
          setFallbackIndex(i);
          loadedSuccessfully = true;
          console.log("🎉 Image successfully loaded!");
          break; // Stop trying once we find a working URL
        } catch (imgError) {
          console.log(`❌ URL ${i + 1} failed:`, imgError.message);
          if (i === allUrls.length - 1) {
            // Last URL failed
            setImageError(true);
            setError(
              `All image sources failed. This might be due to service limitations.`
            );
          }
        }
      }

      if (!loadedSuccessfully) {
        console.error("❌ All image URLs failed");
        setImageError(true);
        // Create a simple placeholder as last resort
        const placeholderUrl = `https://via.placeholder.com/512x300/4caf50/ffffff?text=📍+${formData.latitude}%2C${formData.longitude}`;
        setSatelliteImage(placeholderUrl);
      }

      // Update parent component if callback provided
      if (onDataUpdate) {
        onDataUpdate({
          score: data.healthScore,
          co2: data.co2Sequestration,
          indices: {
            ndvi: data.ndvi,
            ndwi: data.ndwi,
            savi: data.savi,
          },
          isRealData: data.isRealData,
        });
      }
    } catch (err) {
      console.error("❌ Analysis error:", err);
      setError("Failed to analyze satellite imagery. Please try again.");
    } finally {
      setLoading(false);
      setImageLoading(false);
    }
  };

  const tryNextFallback = async () => {
    if (!satelliteData) return;

    const allUrls = [
      satelliteData.satelliteImage,
      ...(satelliteData.fallbackImages || []),
    ];
    const nextIndex = (fallbackIndex + 1) % allUrls.length;

    setRetryCount((prev) => prev + 1);
    setImageError(false);
    setError(null);
    setFallbackIndex(nextIndex);

    const nextUrl = allUrls[nextIndex];
    console.log(
      `🔄 Trying fallback ${nextIndex + 1}/${allUrls.length}:`,
      nextUrl
    );

    try {
      await loadSatelliteImage(nextUrl);
      setSatelliteImage(nextUrl);
      setImageError(false);
      console.log("✅ Fallback image loaded successfully!");
    } catch (err) {
      console.error("❌ Fallback also failed:", err);
      setImageError(true);
      setError(`Image service unavailable. Tried ${retryCount + 1} URLs.`);
    }
  };

  const retryConnection = async () => {
    setBackendStatus("checking");
    try {
      const health = await checkBackendHealth();
      setBackendStatus(health.status === "OK" ? "connected" : "disconnected");
    } catch (error) {
      setBackendStatus("disconnected");
    }
  };

  const handleImageError = () => {
    console.error("❌ Image failed to load in render");
    setImageError(true);
  };

  return (
    <Card
      elevation={6}
      sx={{
        borderRadius: 3,
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      }}
    >
      <CardHeader
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SatelliteIcon sx={{ fontSize: "2rem" }} />
            <Typography variant="h5" fontWeight="bold">
              Satellite Imagery Analysis
            </Typography>
          </Box>
        }
        subheader="Real-time farm health monitoring using Sentinel-2 satellite data"
        sx={{
          background: "linear-gradient(to right, #1976d2, #1565c0)",
          color: "white",
          "& .MuiCardHeader-subheader": { color: "rgba(255,255,255,0.8)" },
        }}
      />

      <CardContent>
        {/* Backend Connection Status */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            icon={
              backendStatus === "connected" ? (
                <WifiIcon />
              ) : backendStatus === "checking" ? (
                <CircularProgress size={16} />
              ) : (
                <WifiOffIcon />
              )
            }
            label={`Backend: ${
              backendStatus === "connected"
                ? "✅ Connected"
                : backendStatus === "checking"
                ? "🔄 Checking..."
                : "❌ Disconnected"
            }`}
            color={
              backendStatus === "connected"
                ? "success"
                : backendStatus === "checking"
                ? "default"
                : "error"
            }
            variant="outlined"
            onDelete={
              backendStatus !== "checking" ? retryConnection : undefined
            }
            deleteIcon={<SatelliteIcon />}
          />
          {backendStatus === "disconnected" && (
            <Typography variant="caption" color="text.secondary">
              Using simulated data
            </Typography>
          )}
        </Box>

        {/* Location Input Form */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            <MapIcon color="primary" sx={{ verticalAlign: "middle", mr: 1 }} />
            Farm Location Details
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Latitude"
                name="latitude"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: e.target.value })
                }
                type="number"
                helperText="Example: 11.0168 (Tamil Nadu)"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Longitude"
                name="longitude"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: e.target.value })
                }
                type="number"
                helperText="Example: 76.9558"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Farm Size (hectares)"
                name="farmSize"
                value={formData.farmSize}
                onChange={(e) =>
                  setFormData({ ...formData, farmSize: e.target.value })
                }
                type="number"
                helperText="Your farm area"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <SatelliteIcon />
                )
              }
              onClick={analyzeFarm}
              disabled={loading}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 5,
                background: "linear-gradient(to right, #1976d2, #1565c0)",
                fontWeight: "bold",
                "&:hover": {
                  background: "linear-gradient(to right, #1565c0, #0d47a1)",
                },
              }}
            >
              {loading ? "Analyzing..." : "Analyze Farm"}
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => setError(null)}
                >
                  DISMISS
                </Button>
              </Box>
            }
          >
            {error}
            {satelliteData && (
              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={tryNextFallback}
                  sx={{ color: "inherit", borderColor: "inherit" }}
                >
                  Try Next Source ({fallbackIndex + 1}/
                  {(satelliteData.fallbackImages?.length || 0) + 1})
                </Button>
              </Box>
            )}
          </Alert>
        )}

        {/* Data Source Indicator */}
        {dataSource && (
          <Alert
            severity={satelliteData?.isRealData ? "success" : "info"}
            sx={{ mb: 3 }}
            icon={
              satelliteData?.isRealData ? <SatelliteIcon /> : <ScienceIcon />
            }
          >
            <strong>{dataSource}</strong> -{" "}
            {satelliteData?.isRealData
              ? "Connected to live Earth Engine"
              : "Using enhanced simulation (backend offline)"}
          </Alert>
        )}

        {satelliteData && (
          <>
            {/* Health Score Display */}
            <Paper elevation={4} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h4" fontWeight="bold" color="success.dark">
                  {satelliteData.healthScore}/100
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Farm Health Score
                </Typography>
                <Chip
                  label={
                    satelliteData.healthScore >= 85
                      ? "Excellent"
                      : satelliteData.healthScore >= 70
                      ? "Good"
                      : "Needs Improvement"
                  }
                  color={getHealthColor(satelliteData.healthScore)}
                  sx={{ mt: 1, fontWeight: "bold" }}
                />
              </Box>
              <LinearProgress
                variant="determinate"
                value={satelliteData.healthScore}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: alpha("#e0e0e0", 0.5),
                }}
                color={getHealthColor(satelliteData.healthScore)}
              />
            </Paper>

            {/* Vegetation Indices */}
            <Typography variant="h6" gutterBottom>
              <ScienceIcon
                color="primary"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              Vegetation Indices Analysis
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {/* NDVI Card */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, height: "100%", borderLeft: `4px solid #4caf50` }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ParkIcon color="success" />
                      <Typography variant="subtitle2" fontWeight="bold">
                        NDVI
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedInfo(
                          "NDVI (Normalized Difference Vegetation Index) measures plant health by analyzing chlorophyll content. Higher values (0.6-1.0) indicate healthier vegetation."
                        );
                        setOpenInfo(true);
                      }}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="success.dark"
                  >
                    {satelliteData.ndvi}
                  </Typography>
                  <Chip
                    label={getIndexStatus(satelliteData.ndvi, "ndvi").label}
                    color={getIndexStatus(satelliteData.ndvi, "ndvi").color}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>

              {/* NDWI Card */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, height: "100%", borderLeft: `4px solid #2196f3` }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WaterDropIcon color="info" />
                      <Typography variant="subtitle2" fontWeight="bold">
                        NDWI
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedInfo(
                          "NDWI (Normalized Difference Water Index) tracks moisture content in vegetation. Higher values (0.2-0.5) indicate better water management and hydration."
                        );
                        setOpenInfo(true);
                      }}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="h4" fontWeight="bold" color="info.dark">
                    {satelliteData.ndwi}
                  </Typography>
                  <Chip
                    label={getIndexStatus(satelliteData.ndwi, "ndwi").label}
                    color={getIndexStatus(satelliteData.ndwi, "ndwi").color}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>

              {/* SAVI Card */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={3}
                  sx={{ p: 2, height: "100%", borderLeft: `4px solid #ff9800` }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <GrassIcon color="warning" />
                      <Typography variant="subtitle2" fontWeight="bold">
                        SAVI
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSelectedInfo(
                          "SAVI (Soil-Adjusted Vegetation Index) accounts for soil brightness to provide accurate vegetation assessment in areas with exposed soil. Values above 0.5 indicate healthy vegetation."
                        );
                        setOpenInfo(true);
                      }}
                    >
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="warning.dark"
                  >
                    {satelliteData.savi}
                  </Typography>
                  <Chip
                    label={getIndexStatus(satelliteData.savi, "savi").label}
                    color={getIndexStatus(satelliteData.savi, "savi").color}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* CO2 Sequestration */}
            <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                <CheckCircleIcon
                  color="success"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Carbon Sequestration Estimate
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: alpha("#4caf50", 0.1),
                      borderRadius: 2,
                      border: `1px solid ${alpha("#4caf50", 0.3)}`,
                    }}
                  >
                    <Typography variant="overline" color="text.secondary">
                      Annual CO₂ Captured
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color="success.dark"
                    >
                      {satelliteData.co2Sequestration}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      tons per year
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      bgcolor: alpha("#2e7d32", 0.1),
                      borderRadius: 2,
                      border: `1px solid ${alpha("#2e7d32", 0.3)}`,
                    }}
                  >
                    <Typography variant="overline" color="text.secondary">
                      Estimated Credit Value
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color="success.dark"
                    >
                      ₹
                      {(
                        parseFloat(satelliteData.co2Sequestration) * 500
                      ).toFixed(0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      at ₹500 per ton CO₂
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Satellite Image Display */}
            {satelliteData && (
              <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">
                    <MapIcon
                      color="primary"
                      sx={{ verticalAlign: "middle", mr: 1 }}
                    />
                    Live Satellite View
                  </Typography>
                  {imageError && (
                    <Button
                      size="small"
                      startIcon={<RefreshIcon />}
                      onClick={tryNextFallback}
                      variant="outlined"
                      color="primary"
                    >
                      Try Source {fallbackIndex + 2}
                    </Button>
                  )}
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    cursor: imageError ? "default" : "pointer",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "2px solid",
                    borderColor: imageError ? "error.main" : "divider",
                    "&:hover": {
                      borderColor: imageError ? "error.dark" : "primary.main",
                      boxShadow: imageError
                        ? "none"
                        : "0 4px 20px 0 rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={() => !imageError && setImageDialogOpen(true)}
                >
                  {imageLoading ? (
                    <Box
                      sx={{
                        height: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: alpha("#f5f5f5", 0.5),
                      }}
                    >
                      <CircularProgress size={40} />
                      <Typography
                        variant="body2"
                        sx={{ mt: 2, color: "text.secondary" }}
                      >
                        Loading satellite image...
                      </Typography>
                    </Box>
                  ) : satelliteImage && !imageError ? (
                    <>
                      <Box
                        component="img"
                        src={satelliteImage}
                        alt="Satellite view of farm"
                        onError={handleImageError}
                        sx={{
                          width: "100%",
                          height: 300,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          color: "white",
                          p: 2,
                        }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          📍 {satelliteData.latitude.toFixed(4)},{" "}
                          {satelliteData.longitude.toFixed(4)}
                        </Typography>
                        <Typography variant="caption">
                          Click to view full image •{" "}
                          {satelliteData.isRealData
                            ? "Sentinel-2 Satellite"
                            : "Simulated View"}{" "}
                          • 10m Resolution
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Box
                      sx={{
                        height: 300,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundColor: alpha("#f5f5f5", 0.5),
                        color: "text.secondary",
                        textAlign: "center",
                        p: 3,
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                      <Typography variant="body1" gutterBottom>
                        Satellite Image Unavailable
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {`Tried ${fallbackIndex + 1} image sources.`}
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={tryNextFallback}
                        size="small"
                      >
                        Try Next Source
                      </Button>
                    </Box>
                  )}
                </Box>

                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label="True Color RGB"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="10m Resolution"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label="Sentinel-2"
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    label={satelliteData.isRealData ? "Live Data" : "Simulated"}
                    size="small"
                    color={satelliteData.isRealData ? "success" : "default"}
                  />
                  {imageError && (
                    <Chip
                      icon={<ErrorIcon />}
                      label={`Source ${fallbackIndex + 1}`}
                      size="small"
                      color="warning"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Paper>
            )}
          </>
        )}
      </CardContent>

      {/* Info Dialog */}
      <Dialog
        open={openInfo}
        onClose={() => setOpenInfo(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#e3f2fd" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold">
              Satellite Index Information
            </Typography>
            <IconButton onClick={() => setOpenInfo(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Typography>{selectedInfo}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenInfo(false)}
            color="primary"
            variant="contained"
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full Screen Image Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" fontWeight="bold">
              <SatelliteIcon sx={{ mr: 1 }} />
              Satellite View - Farm Location
            </Typography>
            <IconButton
              onClick={() => setImageDialogOpen(false)}
              size="small"
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            textAlign: "center",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
          }}
        >
          {satelliteImage && !imageError ? (
            <Box
              component="img"
              src={satelliteImage}
              alt="Full resolution satellite view"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "70vh",
                objectFit: "contain",
              }}
              onError={handleImageError}
            />
          ) : (
            <Box sx={{ color: "white", p: 4 }}>
              <ImageIcon sx={{ fontSize: 64, mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" gutterBottom>
                Satellite Image Unavailable
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.7)">
                The satellite imagery could not be loaded at this time.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#f5f5f5",
            justifyContent: "space-between",
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            📍 {satelliteData?.latitude.toFixed(4)},{" "}
            {satelliteData?.longitude.toFixed(4)} •
            {satelliteData?.isRealData
              ? " 🛰️ Live Satellite Data"
              : " 🧪 Simulated View"}
          </Typography>
          <Button
            onClick={() => setImageDialogOpen(false)}
            color="primary"
            variant="contained"
            size="small"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SatelliteViewer;
