import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CssBaseline,
  Card,
  CardContent,
  Alert,
  Chip,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  Calculate as CalculateIcon,
  Agriculture as AgricultureIcon,
  WbSunny as TemperatureIcon,
  Opacity as MoistureIcon,
  Park as CropIcon,
  LocationOn as LocationIcon,
  Spa as OrganicIcon,
  Waves as DrainageIcon,
  Cloud as RainIcon,
} from "@mui/icons-material";
import axios from "axios";

const initialFormData = {
  soil_type: "",
  soil_moisture: 0,
  soil_ph: 0,
  N: 0,
  P: 0,
  K: 0,
  organic_carbon: 0,
  texture: "",
  drainage: "",
  soil_health_index: 0,
  previous_crop: "",
  acres: 0,
  temperature: 0,
  humidity: 0,
  ph: 0,
  rainfall: 0,
  location: "",
  irrigation_method: "",
  planting_density: 0,
  ndvi: 0,
  evi: 0,
  lai: 0,
};

// Field configurations with icons and units
const fieldConfig = {
  soil_type: { icon: <AgricultureIcon />, label: "Soil Type", type: "text" },
  soil_moisture: { icon: <MoistureIcon />, label: "Soil Moisture (%)", type: "number" },
  soil_ph: { icon: <AgricultureIcon />, label: "Soil pH", type: "number" },
  N: { icon: <CropIcon />, label: "Nitrogen (N) ppm", type: "number" },
  P: { icon: <CropIcon />, label: "Phosphorus (P) ppm", type: "number" },
  K: { icon: <CropIcon />, label: "Potassium (K) ppm", type: "number" },
  organic_carbon: { icon: <OrganicIcon />, label: "Organic Carbon (%)", type: "number" },
  texture: { icon: <AgricultureIcon />, label: "Soil Texture", type: "text" },
  drainage: { icon: <DrainageIcon />, label: "Drainage", type: "text" },
  soil_health_index: { icon: <AnalyticsIcon />, label: "Soil Health Index", type: "number" },
  previous_crop: { icon: <CropIcon />, label: "Previous Crop", type: "text" },
  acres: { icon: <AgricultureIcon />, label: "Farm Size (acres)", type: "number" },
  temperature: { icon: <TemperatureIcon />, label: "Temperature (°C)", type: "number" },
  humidity: { icon: <MoistureIcon />, label: "Humidity (%)", type: "number" },
  ph: { icon: <DrainageIcon />, label: "Water pH", type: "number" },
  rainfall: { icon: <RainIcon />, label: "Rainfall (mm)", type: "number" },
  location: { icon: <LocationIcon />, label: "Location", type: "text" },
  irrigation_method: { icon: <DrainageIcon />, label: "Irrigation Method", type: "text" },
  planting_density: { icon: <CropIcon />, label: "Planting Density", type: "number" },
  ndvi: { icon: <AnalyticsIcon />, label: "NDVI", type: "number" },
  evi: { icon: <AnalyticsIcon />, label: "EVI", type: "number" },
  lai: { icon: <AnalyticsIcon />, label: "LAI", type: "number" },
};

// Navigation items
const navItems = [
  { text: "Home", icon: <HomeIcon /> },
  { text: "Market Forecast", icon: <TrendingUpIcon /> },
  { text: "Yield Prediction", icon: <AnalyticsIcon /> },
  { text: "ROI Calculator", icon: <CalculateIcon /> },
];

// Field categories for organized form
const fieldCategories = {
  soil: [
    'soil_type', 'soil_moisture', 'soil_ph', 'texture', 'drainage', 
    'organic_carbon', 'soil_health_index'
  ],
  nutrients: ['N', 'P', 'K'],
  environment: [
    'temperature', 'humidity', 'rainfall', 'location', 'ph'
  ],
  farming: [
    'previous_crop', 'acres', 'irrigation_method', 'planting_density'
  ],
  remoteSensing: ['ndvi', 'evi', 'lai']
};

export default function AgroPulse() {
  const [formData, setFormData] = useState(initialFormData);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setRecommendations([]);
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/final_recommendation/",
        formData
      );
      setRecommendations(response.data.recommended_crops);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Something went wrong. Please try again."
      );
    }
    setLoading(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "success";
    if (score >= 6) return "warning";
    return "error";
  };

  const getFieldsByCategory = (category) => {
    return fieldCategories[category].map(fieldName => ({
      name: fieldName,
      ...fieldConfig[fieldName]
    }));
  };

  const renderFormSection = (fields, title) => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ 
          color: 'primary.main', 
          display: 'flex', 
          alignItems: 'center',
          gap: 1 
        }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                required
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Tooltip title={field.label}>
                        {field.icon}
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <>
      <CssBaseline />
      
      {/* AppBar */}
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <AgricultureIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            AgroPulse
          </Typography>
          <Chip 
            label="AI Powered" 
            color="secondary" 
            size="small"
            variant="outlined"
          />
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { 
            background: 'linear-gradient(180deg, #2E7D32 0%, #1B5E20 100%)',
            color: 'white'
          }
        }}
      >
        <Box sx={{ width: 280 }} role="presentation">
          <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <AgricultureIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              AgroPulse
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Smart Farming Solutions
            </Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem 
                button 
                key={item.text}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Crop Recommendation
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Get AI-powered crop recommendations based on your soil conditions, climate data, and farming practices
          </Typography>
        </Box>

        {/* Form Section */}
        <Card elevation={3} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
              >
                <Tab label="Soil Properties" />
                <Tab label="Nutrients" />
                <Tab label="Environment" />
                <Tab label="Farming Practices" />
                <Tab label="Remote Sensing" />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              <form onSubmit={handleSubmit}>
                {activeTab === 0 && renderFormSection(getFieldsByCategory('soil'), "Soil Properties")}
                {activeTab === 1 && renderFormSection(getFieldsByCategory('nutrients'), "Soil Nutrients")}
                {activeTab === 2 && renderFormSection(getFieldsByCategory('environment'), "Environmental Conditions")}
                {activeTab === 3 && renderFormSection(getFieldsByCategory('farming'), "Farming Practices")}
                {activeTab === 4 && renderFormSection(getFieldsByCategory('remoteSensing'), "Remote Sensing Data")}

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    disabled={loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #2E7D32, #4CAF50)',
                      minWidth: 200
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Get AI Recommendations"
                    )}
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>

        {/* Alerts */}
        {error && (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          </Fade>
        )}

        {success && recommendations.length > 0 && (
          <Fade in={success}>
            <Alert severity="success" sx={{ mb: 3 }}>
              Found {recommendations.length} crop recommendations based on your input!
            </Alert>
          </Fade>
        )}

        {/* Results Table */}
        {recommendations.length > 0 && (
          <Fade in={recommendations.length > 0}>
            <Card elevation={3}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, pb: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AgricultureIcon color="primary" />
                    Recommended Crops
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sorted by overall suitability score
                  </Typography>
                </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Crop</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Soil Score</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Climate Score</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Yield Score</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Market Score</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>ROI Score</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Final Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recommendations.map((crop, index) => (
                        <TableRow 
                          key={crop.crop}
                          sx={{ 
                            backgroundColor: index === 0 ? 'success.light' : 'transparent',
                            '&:hover': { backgroundColor: 'action.hover' }
                          }}
                        >
                          <TableCell sx={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                            {crop.crop}
                            {index === 0 && (
                              <Chip 
                                label="Best Match" 
                                color="success" 
                                size="small" 
                                sx={{ ml: 1 }}
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={crop.soil_score} 
                              color={getScoreColor(crop.soil_score)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={crop.climate_score} 
                              color={getScoreColor(crop.climate_score)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={crop.yield_score} 
                              color={getScoreColor(crop.yield_score)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={crop.market_score} 
                              color={getScoreColor(crop.market_score)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={crop.roi_score} 
                              color={getScoreColor(crop.roi_score)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={crop.final_score} 
                              color={getScoreColor(crop.final_score)}
                              size="medium"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Container>
    </>
  );
}