import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box,
  Drawer
} from '@mui/material';

// Import all components
import Dashboard from './components/Dashboard';
import FarmProfile from './components/FarmProfile';
import Availability from './components/Availability';
import BrowseFarms from './components/BrowseFarms';
import Bookings from './components/Bookings';
import Rewards from './components/Rewards';
import Journal from './components/Journal';
import Reviews from './components/Reviews';
import BookingModal from './components/BookingModal';
import Sidebar from './components/Sidebar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const drawerWidth = 240;
const collapsedWidth = 70;

const SoilConnect = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userType, setUserType] = useState('mentor');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  
  const [userData] = useState({
    name: userType === 'mentor' ? 'Ravi Kumar' : 'Priya Sharma',
    farmTokens: 450,
    carbonCredits: 120,
    badges: ['Top Mentor', 'Organic Pioneer', 'Water Saver'],
    visitsHosted: 23,
    visitsAttended: 8,
    rating: 4.8,
    certificates: 5
  });

  const [farms] = useState([
    {
      id: 1,
      name: 'Green Valley Organic Farm',
      owner: 'Ravi Kumar',
      location: 'Coimbatore, Tamil Nadu',
      coords: [11.0168, 76.9558],
      crops: ['Rice', 'Turmeric', 'Vegetables'],
      badges: ['Organic', 'Water-Saving', 'Eco-Friendly'],
      verified: true,
      rating: 4.8,
      reviews: 15,
      image: '🌾',
      available: true
    }
  ]);

  const [bookings] = useState([
    {
      id: 1,
      farmId: 1,
      learnerName: 'Priya Sharma',
      date: '2025-11-20',
      duration: 'Full Day',
      status: 'pending',
      reason: 'Learn about organic rice cultivation methods'
    }
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Main Container - Fixed Height */}
      <Box sx={{ 
        width: '100%',
        height: '550px', // Fixed height - no empty space
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Sidebar - Fixed Height */}
        <Drawer
          variant="permanent"
          sx={{
            width: sidebarOpen ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: sidebarOpen ? drawerWidth : collapsedWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)',
              color: 'white',
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
              height: '800px', // Same as container
              position: 'relative',
              border: 'none',
              borderRadius: '8px 0 0 8px'
            },
          }}
        >
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            currentView={currentView}
            setCurrentView={setCurrentView}
          />
        </Drawer>

        {/* Main Content Area - Fixed Height */}
        <Box 
          sx={{ 
            flexGrow: 1,
            p: 2,
            width: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
            transition: 'width 0.3s ease',
            height: '500px', // Fixed height
            backgroundColor: '#f8f9fa',
            overflow: 'auto' // Scroll if content exceeds
          }}
        >
          {/* Render Current View Component */}
          {currentView === 'dashboard' && (
            <Dashboard 
              userData={userData} 
              userType={userType} 
              setUserType={setUserType}
              bookings={bookings}
              farms={farms}
            />
          )}
          {currentView === 'profile' && <FarmProfile />}
          {currentView === 'availability' && <Availability />}
          {currentView === 'browse' && (
            <BrowseFarms 
              farms={farms}
              setSelectedFarm={setSelectedFarm}
              setBookingModalOpen={setBookingModalOpen}
            />
          )}
          {currentView === 'bookings' && (
            <Bookings 
              bookings={bookings}
              farms={farms}
              userType={userType}
            />
          )}
          {currentView === 'rewards' && <Rewards userData={userData} />}
          {currentView === 'journal' && <Journal />}
          {currentView === 'reviews' && <Reviews userData={userData} />}
        </Box>
        
        {/* Modals */}
        {bookingModalOpen && (
          <BookingModal 
            selectedFarm={selectedFarm}
            setBookingModalOpen={setBookingModalOpen}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default SoilConnect;