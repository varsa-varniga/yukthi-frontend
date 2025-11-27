import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  People,
  Star
} from '@mui/icons-material';

const Dashboard = () => {
  const [userType, setUserType] = useState('mentor');

  const stats = [
    {
      label: 'FarmTokens',
      value: '450',
      change: '+45 this month',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      icon: <EmojiEvents sx={{ fontSize: 48, opacity: 0.3 }} />
    },
    {
      label: 'Carbon Credits',
      value: '120',
      change: '+20 this month',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      icon: <TrendingUp sx={{ fontSize: 48, opacity: 0.3 }} />
    },
    {
      label: 'Visits Hosted',
      value: '23',
      change: '+3 this month',
      gradient: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
      icon: <People sx={{ fontSize: 48, opacity: 0.3 }} />
    }
  ];

  const badges = [
    { name: 'Top Mentor', icon: <Star sx={{ color: '#f59e0b' }} /> },
    { name: 'Organic Pioneer', icon: <Star sx={{ color: '#f59e0b' }} /> },
    { name: 'Water Saver', icon: <Star sx={{ color: '#f59e0b' }} /> }
  ];

  const activities = [
    {
      farm: 'Green Valley Organic Farm',
      person: 'Priya Sharma',
      date: '2025-11-20',
      status: 'PENDING',
      icon: '🌾'
    },
    {
      farm: 'Sunrise Sustainable Farm',
      person: 'Arun Kumar',
      date: '2025-11-18',
      status: 'APPROVED',
      icon: '🌻'
    }
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
            Welcome back, Ravi Kumar! <br /> 🌾
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Your farm mentorship dashboard
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setUserType(userType === 'mentor' ? 'learner' : 'mentor')}
          sx={{
            bgcolor: '#22c55e',
            color: 'white',
            textTransform: 'none',
            fontSize: '1rem',
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#16a34a'
            }
          }}
        >
          Switch to {userType === 'mentor' ? 'Learner' : 'Mentor'} View
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {stats.map((stat, index) => (
          <Card
            key={index}
            sx={{
              background: stat.gradient,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', mb: 1 }}>
                  {stat.label}
                </Typography>
                <Typography sx={{ color: 'white', fontSize: '3rem', fontWeight: 700, lineHeight: 1, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
                  {stat.change}
                </Typography>
              </Box>
              <Box sx={{ color: 'white' }}>
                {stat.icon}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Rating Card */}
      <Card sx={{ background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', borderRadius: 3, mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography sx={{ color: 'white', fontSize: '1rem', mb: 1 }}>
              Rating
            </Typography>
            <Typography sx={{ color: 'white', fontSize: '3rem', fontWeight: 700, lineHeight: 1, mb: 1 }}>
              4.8
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
              Based on 23 reviews
            </Typography>
          </Box>
          <Star sx={{ fontSize: 64, color: 'rgba(255,255,255,0.3)' }} />
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card sx={{ borderRadius: 3, mb: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <EmojiEvents sx={{ color: '#f59e0b', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              Your Badges
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {badges.map((badge, index) => (
              <Chip
                key={index}
                icon={badge.icon}
                label={badge.name}
                sx={{
                  bgcolor: 'transparent',
                  border: '2px solid #f59e0b',
                  color: '#1a1a1a',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  px: 2,
                  py: 2.5,
                  '& .MuiChip-icon': {
                    ml: 1
                  }
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 3 }}>
            Recent Activity
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activities.map((activity, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pb: index < activities.length - 1 ? 3 : 0,
                  borderBottom: index < activities.length - 1 ? '1px solid #e5e5e5' : 'none',
                  flexWrap: 'wrap',
                  gap: 2
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#f0f0f0', width: 56, height: 56, fontSize: '1.5rem' }}>
                    {activity.icon}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#1a1a1a', mb: 0.5 }}>
                      {activity.farm}
                    </Typography>
                    <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>
                      {activity.person} • {activity.date}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={activity.status}
                  sx={{
                    bgcolor: activity.status === 'PENDING' ? '#fef3c7' : '#d1fae5',
                    color: activity.status === 'PENDING' ? '#92400e' : '#065f46',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    px: 2
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;