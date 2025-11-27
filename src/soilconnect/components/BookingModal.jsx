import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Paper
} from '@mui/material';
import {
  Close,
  Send
} from '@mui/icons-material';

const BookingModal = ({ selectedFarm, setBookingModalOpen }) => (
  <Dialog 
    open={true} 
    onClose={() => setBookingModalOpen(false)}
    maxWidth="md"
    fullWidth
  >
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h5" fontWeight="bold">
        Request Farm Visit
      </Typography>
      <Button onClick={() => setBookingModalOpen(false)} color="inherit">
        <Close />
      </Button>
    </DialogTitle>
    
    <DialogContent>
      {selectedFarm && (
        <Box sx={{ spaceY: 3 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', fontSize: '2rem', width: 60, height: 60 }}>
                {selectedFarm.image}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {selectedFarm.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFarm.location}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          <TextField
            fullWidth
            label="Preferred Date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            fullWidth
            label="Duration"
            select
            SelectProps={{ native: true }}
          >
            <option>Half Day (4 hours)</option>
            <option>Full Day (8 hours)</option>
          </TextField>
          
          <TextField
            fullWidth
            label="Purpose of Visit"
            multiline
            rows={4}
            placeholder="Describe what you hope to learn from this visit..."
          />
        </Box>
      )}
    </DialogContent>
    
    <DialogActions sx={{ p: 3, gap: 1 }}>
      <Button 
        onClick={() => setBookingModalOpen(false)}
        variant="outlined"
        fullWidth
      >
        Cancel
      </Button>
      <Button 
        variant="contained" 
        fullWidth
        startIcon={<Send />}
      >
        Send Request
      </Button>
    </DialogActions>
  </Dialog>
);

export default BookingModal;