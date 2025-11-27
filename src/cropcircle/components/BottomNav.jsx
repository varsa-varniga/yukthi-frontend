// src/cropcircle/components/BottomNav.jsx
import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState('home');

  // Sync tab with current URL
  useEffect(() => {
    if (location.pathname.startsWith('/cropcircle/home')) setValue('home');
    else if (location.pathname.startsWith('/cropcircle/profile')) setValue('profile');
    else if (location.pathname.startsWith('/cropcircle/notifications')) setValue('notifications');
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/cropcircle/${newValue}`);
  };

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Notifications" value="notifications" icon={<NotificationsIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;