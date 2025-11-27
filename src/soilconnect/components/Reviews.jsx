import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  LinearProgress
} from '@mui/material';
import {
  Star,
  Chat
} from '@mui/icons-material';

const Reviews = ({ userData, userType }) => (
  <Box sx={{ spaceY: 3 }}>
    <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
      <Star sx={{ mr: 1, color: 'warning.main' }} />
      Reviews & Feedback
    </Typography>
    
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
              {userData.rating}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star 
                  key={i} 
                  sx={{ 
                    color: i < Math.floor(userData.rating) ? 'warning.main' : 'grey.300'
                  }} 
                />
              ))}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Based on {userData.visitsHosted} reviews
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Rating Breakdown
            </Typography>
            <Box sx={{ spaceY: 1 }}>
              {[
                { stars: 5, count: 18, percentage: 78 },
                { stars: 4, count: 4, percentage: 17 },
                { stars: 3, count: 1, percentage: 4 },
                { stars: 2, count: 0, percentage: 0 },
                { stars: 1, count: 0, percentage: 0 }
              ].map(rating => (
                <Box key={rating.stars} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ width: 60 }}>
                    {rating.stars} star
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={rating.percentage} 
                    sx={{ 
                      flexGrow: 1,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'warning.main'
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ width: 40, textAlign: 'right' }}>
                    {rating.count}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Recent Reviews
        </Typography>
        <Box sx={{ spaceY: 2 }}>
          {[
            {
              id: 1,
              reviewer: 'Priya Sharma',
              rating: 5,
              date: '2025-11-10',
              comment: 'Amazing learning experience! Ravi sir explained organic farming techniques in great detail. The hands-on demonstrations were very helpful.',
              response: 'Thank you for your kind words! Happy to share our farming knowledge.'
            },
            {
              id: 2,
              reviewer: 'Arun Kumar',
              rating: 5,
              date: '2025-11-05',
              comment: 'Very knowledgeable mentor. Learned a lot about water conservation and sustainable practices.',
              response: null
            },
            {
              id: 3,
              reviewer: 'Divya Lakshmi',
              rating: 4,
              date: '2025-10-28',
              comment: 'Good experience overall. Would have loved more time in the field.',
              response: 'Thanks for the feedback! We will consider extending field time in future visits.'
            }
          ].map(review => (
            <Paper key={review.id} variant="outlined" sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {review.reviewer.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.reviewer}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i} 
                      sx={{ 
                        fontSize: 20,
                        color: i < review.rating ? 'warning.main' : 'grey.300'
                      }} 
                    />
                  ))}
                </Box>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                {review.comment}
              </Typography>
              
              {review.response && (
                <Paper variant="outlined" sx={{ p: 1.5, bgcolor: 'success.light', borderColor: 'success.main' }}>
                  <Typography variant="caption" fontWeight="bold" color="success.dark">
                    Response from mentor:
                  </Typography>
                  <Typography variant="body2">
                    {review.response}
                  </Typography>
                </Paper>
              )}
              
              {!review.response && userType === 'mentor' && (
                <Button startIcon={<Chat />} color="success" size="small">
                  Respond to review
                </Button>
              )}
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default Reviews;