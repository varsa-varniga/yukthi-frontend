import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, useMediaQuery } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../../context/AuthContext.jsx';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const TopBar = ({ showNotifications = true }) => {
  const { mongoUser } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchUnreadNotifications = async () => {
    if (!mongoUser?._id || !showNotifications) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${mongoUser._id}?only_unread=true`
      );
      setUnreadCount(res.data.notifications?.length || 0);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
    if (showNotifications) {
      const interval = setInterval(fetchUnreadNotifications, 5000);
      return () => clearInterval(interval);
    }
  }, [mongoUser, showNotifications]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #4caf50 0%, #81c784 100%)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
          position: 'relative'
        }}
      >
        {/* Logo & Title - Left Side */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            flexShrink: 0,
            '&:hover': { opacity: 0.8 },
          }}
          onClick={() => navigate('/cropcircle/home')}
        >
          <Box
            component="img"
            src={logo}
            alt="Crop Circles"
            sx={{ 
              width: { xs: 28, sm: 32 }, 
              height: { xs: 28, sm: 32 }, 
              borderRadius: '50%', 
              boxShadow: 2 
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              whiteSpace: 'nowrap'
            }}
          >
            Crop Circles
          </Typography>
        </Box>

        {/* Notification Button - Right Side */}
        {showNotifications && (
          <IconButton
            color="inherit"
            onClick={() => navigate('/cropcircle/notifications')}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'scale(1.05)'
              },
              borderRadius: 2,
              padding: { xs: 0.75, sm: 1 },
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              flexShrink: 0,
              transition: 'all 0.2s ease',
              position: 'relative',
              right: 0
            }}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{ 
                '& .MuiBadge-badge': { 
                  fontWeight: 600, 
                  boxShadow: '0 0 3px rgba(0,0,0,0.3)',
                  fontSize: { xs: '0.6rem', sm: '0.7rem' },
                  minWidth: { xs: 18, sm: 20 },
                  height: { xs: 18, sm: 20 },
                  transform: { xs: 'scale(0.9) translate(50%, -50%)', sm: 'scale(1) translate(50%, -50%)' }
                } 
              }}
            >
              <NotificationsIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
            </Badge>
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;