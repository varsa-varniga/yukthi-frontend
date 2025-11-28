// src/utils/satelliteAPI.js

// Use environment variable with correct port 5000
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

console.log('🔧 Backend URL configured:', API_BASE_URL);

export const analyzeSatelliteImagery = async (latitude, longitude, farmSize) => {
  try {
    console.log('🛰️ Requesting REAL satellite data from:', `${API_BASE_URL}/api/satellite/satellite-analysis`);
    
    const response = await fetch(`${API_BASE_URL}/api/satellite/satellite-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        farmSize: parseFloat(farmSize)
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ Satellite data received:', data);

    if (data.success) {
      console.log('🎯 Using satellite data');
      
      const imageUrls = generateMultipleImageUrls(longitude, latitude);
      console.log('🖼️ Generated image URLs:', imageUrls);
      
      return {
        ...data.data,
        satelliteImage: imageUrls.primary,
        fallbackImages: imageUrls.fallbacks,
        isRealData: data.data.isRealData || false,
        dataSource: data.data.isRealData ? "LIVE Satellite Data" : "Simulated Data"
      };
    } else {
      throw new Error('Backend returned unsuccessful response');
    }
  } catch (error) {
    console.error('❌ Failed to get satellite data:', error.message);
    console.log('🔄 Falling back to simulated data');
    return getEnhancedSimulatedData(latitude, longitude, farmSize);
  }
};
// ✅ FIXED: CORRECT MapTiler URL formats
const generateMultipleImageUrls = (longitude, latitude, zoom = 12, width = 512, height = 512) => {
  const apiKey = import.meta.env.VITE_MAPTILER_KEY || 'T0OUT6FUqkfwwLnG4Me9';
  
  // ✅ CORRECT: Use proper MapTiler static maps API format
  // The correct format is: https://api.maptiler.com/maps/streets-v2/static/{longitude},{latitude},{zoom}/{width}x{height}.png?key=YOUR_KEY
  
  const urls = {
    // Primary: Static map with correct format
    primary: `https://api.maptiler.com/maps/satellite/static/${longitude},${latitude},${zoom}/${width}x${height}.png?key=${apiKey}`,
    
    fallbacks: [
      // Format 1: Different map style
      `https://api.maptiler.com/maps/hybrid/static/${longitude},${latitude},${zoom}/${width}x${height}.png?key=${apiKey}`,
      
      // Format 2: Streets style
      `https://api.maptiler.com/maps/streets-v2/static/${longitude},${latitude},${zoom}/${width}x${height}.png?key=${apiKey}`,
      
      // Format 3: Basic style
      `https://api.maptiler.com/maps/basic-v2/static/${longitude},${latitude},${zoom}/${width}x${height}.png?key=${apiKey}`,
      
      // Format 4: OpenStreetMap as fallback (no API key needed)
      `https://tile.openstreetmap.org/${Math.floor(zoom)}/${Math.floor((longitude + 180) / 360 * Math.pow(2, zoom))}/${Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))}.png`,
      
      // Format 5: Simple placeholder with coordinates
      generatePlaceholderImage(longitude, latitude, width, height),
      
      // Format 6: Another placeholder service
      `https://placehold.co/${width}x${height}/4caf50/white/png?text=Satellite+View&font=roboto`,
    ]
  };
  
  console.log('🗺️ Generated multiple image URLs:', urls);
  return urls;
};

// Generate a placeholder image
const generatePlaceholderImage = (longitude, latitude, width = 512, height = 300) => {
  const lat = latitude.toFixed(4);
  const lng = longitude.toFixed(4);
  return `https://via.placeholder.com/${width}x${height}/4caf50/ffffff?text=📍+${lat}%2C${lng}+(Satellite+View+Unavailable)`;
};

// Test if an image URL is accessible (with better error handling)
export const testImageUrl = async (url) => {
  try {
    // Use GET instead of HEAD to avoid CORS issues
    const response = await fetch(url, { 
      method: 'GET',
      mode: 'no-cors' // This will still tell us if the URL exists
    });
    return true; // If we get here, the URL is probably accessible
  } catch (error) {
    console.log(`❌ URL test failed for ${url}:`, error.message);
    return false;
  }
};

// Enhanced simulated data (fallback)
const getEnhancedSimulatedData = (latitude, longitude, farmSize) => {
  const baseNDVI = 0.65 + (Math.random() * 0.25);
  const baseNDWI = 0.15 + (Math.random() * 0.2);
  const baseSAVI = 0.6 + (Math.random() * 0.25);
  
  const healthScore = Math.round((baseNDVI * 60) + (baseNDWI * 20) + (baseSAVI * 20));
  const co2Sequestration = 2.5 * (0.5 + baseNDVI * 0.5) * farmSize;

  // Generate multiple image URLs for simulated data
  const imageUrls = generateMultipleImageUrls(longitude, latitude);

  return {
    healthScore: Math.max(60, Math.min(95, healthScore)),
    score: healthScore,
    ndvi: parseFloat(baseNDVI.toFixed(3)),
    ndwi: parseFloat(baseNDWI.toFixed(3)),
    savi: parseFloat(baseSAVI.toFixed(3)),
    co2Sequestration: parseFloat(co2Sequestration.toFixed(2)),
    latitude: latitude,
    longitude: longitude,
    farmSize: farmSize,
    vegetationHealth: baseNDVI > 0.7 ? "Excellent" : baseNDVI > 0.5 ? "Good" : "Moderate",
    waterContent: baseNDWI > 0.2 ? "Well Watered" : baseNDWI > 0.1 ? "Moderate" : "Dry",
    soilHealth: baseSAVI > 0.6 ? "Healthy Soil" : baseSAVI > 0.4 ? "Moderate" : "Poor",
    confidence: "Medium",
    timestamp: new Date().toISOString(),
    satelliteImage: imageUrls.primary,
    fallbackImages: imageUrls.fallbacks,
    isRealData: false,
    dataSource: "Simulated Data (Fallback)"
  };
};

// Health check function
export const checkBackendHealth = async () => {
  try {
    console.log('🔍 Checking backend health at:', `${API_BASE_URL}/api/satellite/health`);
    const response = await fetch(`${API_BASE_URL}/api/satellite/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Satellite backend health check passed:', data);
    return data;
  } catch (error) {
    console.error('❌ Satellite backend health check failed:', error.message);
    return { 
      status: 'OFFLINE', 
      message: 'Satellite service unavailable',
      error: error.message
    };
  }
};