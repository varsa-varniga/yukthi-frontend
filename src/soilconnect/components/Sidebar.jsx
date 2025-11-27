import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import {
  Home,
  Settings,
  CalendarToday,
  Search,
  People,
  EmojiEvents,
  Book,
  Star,
  Menu,
  Close
} from '@mui/icons-material';

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profile', icon: Settings, label: 'Farm Profile' },
    { id: 'availability', icon: CalendarToday, label: 'Availability' },
    { id: 'browse', icon: Search, label: 'Browse Farms' },
    { id: 'bookings', icon: People, label: 'Bookings' },
    { id: 'rewards', icon: EmojiEvents, label: 'Rewards' },
    { id: 'journal', icon: Book, label: 'Journals' },
    { id: 'reviews', icon: Star, label: 'Reviews' }
  ];

  return (
    <Box sx={{ 
      p: 2, 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'space-between' // Space between header and menu
    }}>
      {/* Header - Fixed Height */}
      <Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: sidebarOpen ? 'space-between' : 'center',
          mb: 2,
          height: '40px'
        }}>
          {sidebarOpen && (
            <Typography variant="h6" fontWeight="bold" noWrap>
              🌾 SoilConnect
            </Typography>
          )}
          <IconButton 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            sx={{ color: 'white' }}
            size="small"
          >
            {sidebarOpen ? <Close /> : <Menu />}
          </IconButton>
        </Box>
        
        {/* Navigation Menu - Exact fit */}
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block', mb: 0.5 }}>
              <ListItemButton
                onClick={() => setCurrentView(item.id)}
                sx={{
                  borderRadius: 1,
                  backgroundColor: currentView === item.id ? 'white' : 'transparent',
                  color: currentView === item.id ? 'primary.main' : 'white',
                  '&:hover': {
                    backgroundColor: currentView === item.id ? 'white' : 'rgba(255,255,255,0.1)',
                  },
                  minHeight: 42,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit'
                  }}
                >
                  <item.icon fontSize="small" />
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      noWrap: true,
                      fontSize: '0.9rem',
                      fontWeight: currentView === item.id ? 'bold' : 'normal'
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Empty space removed - No footer needed */}
    </Box>
  );
};

export default Sidebar;