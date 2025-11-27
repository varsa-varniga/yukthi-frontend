import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Divider,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  IconButton,
  Collapse,
  Chip,
  CircularProgress
} from '@mui/material';
import {
  ShoppingCart,
  Home,
  LocalShipping,
  CreditCard,
  Person,
  LocationOn,
  Phone,
  Close,
  Security,
  CalendarToday,
  Lock
} from '@mui/icons-material';

// Custom theme for MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // AgriMart green
    },
    secondary: {
      main: '#ff9800', // Orange
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Amazon Ember", Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#2e7d32',
    },
    h5: {
      fontWeight: 600,
      color: '#0F1111',
    },
    h6: {
      fontWeight: 600,
      color: '#0F1111',
    },
    body1: {
      color: '#565959',
    },
    body2: {
      color: '#565959',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const API_BASE_URL = 'http://localhost:5000/api';

const Checkout = ({ cartItems, getTotalPrice, onCancel, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [calculatedTotal, setCalculatedTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Calculate total whenever cartItems or getTotalPrice changes
  useEffect(() => {
    if (getTotalPrice && cartItems) {
      const subtotal = getTotalPrice();
      const tax = subtotal * 0.18;
      const total = subtotal + tax;
      setCalculatedTotal(Math.round(total));
    }
  }, [cartItems, getTotalPrice]);

  const steps = ['Shipping', 'Payment', 'Review & Place Order'];

  const handleNext = () => {
    if (activeStep === 0 && !validateShipping()) return;
    if (activeStep === 1 && !validatePayment()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setPaymentInfo(prev => ({ ...prev, [name]: formattedValue }));
    } else if (name === 'expiry') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setPaymentInfo(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateShipping = () => {
    const errors = {};
    if (!shippingInfo.fullName.trim()) errors.fullName = 'Full name is required';
    if (!shippingInfo.address.trim()) errors.address = 'Address is required';
    if (!shippingInfo.city.trim()) errors.city = 'City is required';
    if (!shippingInfo.state.trim()) errors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    if (!shippingInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (shippingInfo.phone.trim() && !/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors = {};
    if (!paymentInfo.nameOnCard.trim()) errors.nameOnCard = 'Name on card is required';
    if (!paymentInfo.cardNumber.trim()) errors.cardNumber = 'Card number is required';
    if (paymentInfo.cardNumber.replace(/\s/g, '').length !== 16) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!paymentInfo.expiry.trim()) errors.expiry = 'Expiry date is required';
    if (!paymentInfo.cvv.trim()) errors.cvv = 'CVV is required';
    if (paymentInfo.cvv.length !== 3) errors.cvv = 'CVV must be 3 digits';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    
    if (!validateShipping() || !validatePayment()) {
      setIsLoading(false);
      return;
    }

    const orderData = {
      shippingInfo,
      paymentInfo: {
        ...paymentInfo,
        cardNumber: paymentInfo.cardNumber.replace(/\s/g, '')
      },
      cartItems: cartItems.map(item => ({
        productId: item.id || item.productId || `prod_${Math.random().toString(36).substr(2, 9)}`,
        name: item.name,
        price: typeof item.price === 'string' ? 
               parseFloat(item.price.replace(/[^0-9.-]+/g, "")) : 
               item.price,
        quantity: item.quantity || 1,
        image: item.image
      })),
      subtotal: getSubtotal(),
      tax: getTax(),
      shippingCost: getShippingCost(),
      total: getTotal(),
      shippingMethod,
      orderDate: new Date().toISOString(),
      // ✅ UPDATED: Add user details
      userId: "user_123", // Replace with actual user ID from your auth system
      userEmail: "customer@gmail.com", // Replace with actual user email
      userPhone: shippingInfo.phone
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/checkout`, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      if (response.data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          if (onComplete) onComplete(response.data.order);
        }, 2000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const message = error.response?.data?.message || 
                     error.message || 
                     'Failed to place order. Please try again.';
      setErrorMessage(message);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeliveryDate = () => {
    const deliveryDate = new Date();
    const days = shippingMethod === 'standard' ? 5 : 2;
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSubtotal = () => {
    return getTotalPrice ? getTotalPrice() : 0;
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.18);
  };

  const getShippingCost = () => {
    return shippingMethod === 'standard' ? 0 : 99;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShippingCost();
  };

  // ... (rest of your render functions remain exactly the same)
  const renderShippingStep = () => (
    <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocationOn color="primary" />
        Shipping Address
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleShippingChange}
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
            placeholder="Enter your full name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Address"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            error={!!formErrors.address}
            helperText={formErrors.address}
            multiline
            rows={3}
            placeholder="Street address, P.O. box, company name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="City"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            error={!!formErrors.city}
            helperText={formErrors.city}
            placeholder="Enter city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="State"
            name="state"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            error={!!formErrors.state}
            helperText={formErrors.state}
            placeholder="Enter state"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="ZIP Code"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            error={!!formErrors.zipCode}
            helperText={formErrors.zipCode}
            placeholder="6-digit PIN code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Phone Number"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            placeholder="10-digit mobile number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {/* Shipping Method */}
        <Grid item xs={12}>
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
              Choose Shipping Method
            </FormLabel>
            <RadioGroup
              value={shippingMethod}
              onChange={(e) => setShippingMethod(e.target.value)}
            >
              <FormControlLabel
                value="standard"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      Standard Delivery (FREE)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get it by {getDeliveryDate()}
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                value="express"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      Express Delivery (₹99)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get it by {getDeliveryDate()} - 2 days earlier
                    </Typography>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderPaymentStep = () => (
    <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CreditCard color="primary" />
        Payment Method
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Name on Card"
            name="nameOnCard"
            value={paymentInfo.nameOnCard}
            onChange={handlePaymentChange}
            error={!!formErrors.nameOnCard}
            helperText={formErrors.nameOnCard}
            placeholder="As shown on card"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Card Number"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            error={!!formErrors.cardNumber}
            helperText={formErrors.cardNumber}
            placeholder="1234 5678 9012 3456"
            inputProps={{ maxLength: 19 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Expiry Date"
            name="expiry"
            value={paymentInfo.expiry}
            onChange={handlePaymentChange}
            error={!!formErrors.expiry}
            helperText={formErrors.expiry}
            placeholder="MM/YY"
            inputProps={{ maxLength: 5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="CVV"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            error={!!formErrors.cvv}
            helperText={formErrors.cvv}
            placeholder="123"
            type="password"
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
        
        {/* Security Features */}
        <Grid item xs={12}>
          <Box sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 2, mt: 2 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main' }}>
              <Security fontSize="small" />
              Your payment information is secure and encrypted
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderReviewStep = () => (
    <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Review Your Order
      </Typography>
      <Divider sx={{ mb: 3 }} />
      
      {/* Order Items */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Items ({cartItems.length})
        </Typography>
        {cartItems.map((item) => (
          <Card key={item.cartId} sx={{ mb: 2, p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 80, height: 80, borderRadius: 1 }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity || 1}
                </Typography>
                <Typography variant="body1" fontWeight={600} color="primary" sx={{ mt: 1 }}>
                  {item.price}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Shipping Address */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body1" fontWeight={600}>
            {shippingInfo.fullName}
          </Typography>
          <Typography variant="body2">
            {shippingInfo.address}
          </Typography>
          <Typography variant="body2">
            {shippingInfo.city}, {shippingInfo.state} - {shippingInfo.zipCode}
          </Typography>
          <Typography variant="body2">
            Phone: {shippingInfo.phone}
          </Typography>
        </Paper>
      </Box>

      {/* Payment Method */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body1" fontWeight={600}>
            Credit/Debit Card
          </Typography>
          <Typography variant="body2">
            {paymentInfo.cardNumber}
          </Typography>
          <Typography variant="body2">
            Expires: {paymentInfo.expiry}
          </Typography>
        </Paper>
      </Box>

      {/* Shipping Method */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Method
        </Typography>
        <Chip 
          label={shippingMethod === 'standard' ? 'Standard Delivery (FREE)' : 'Express Delivery (₹99)'}
          color="primary"
          variant="outlined"
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Expected delivery: {getDeliveryDate()}
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Success Alert */}
        <Collapse in={showSuccess}>
          <Alert 
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowSuccess(false)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            Order placed successfully! Redirecting...
          </Alert>
        </Collapse>

        {/* Error Alert */}
        <Collapse in={showError}>
          <Alert 
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowError(false)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            {errorMessage}
          </Alert>
        </Collapse>

        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Checkout
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          {/* Left Column - Forms */}
          <Grid item xs={12} md={8}>
            {activeStep === 0 && renderShippingStep()}
            {activeStep === 1 && renderPaymentStep()}
            {activeStep === 2 && renderReviewStep()}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                onClick={activeStep === 0 ? onCancel : handleBack}
                startIcon={<Home />}
                disabled={isLoading}
              >
                {activeStep === 0 ? 'Back to Cart' : 'Back'}
              </Button>
              
              {activeStep < steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ minWidth: 120 }}
                  disabled={isLoading}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ minWidth: 160 }}
                  size="large"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                  {isLoading ? 'Processing...' : 'Place Your Order'}
                </Button>
              )}
            </Box>
          </Grid>

          {/* Right Column - Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 100 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShoppingCart color="primary" />
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {/* Order Items Preview */}
              <Box sx={{ mb: 3, maxHeight: 200, overflow: 'auto' }}>
                {cartItems.slice(0, 3).map((item) => (
                  <Box key={item.cartId} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {item.price}
                    </Typography>
                  </Box>
                ))}
                {cartItems.length > 3 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    +{cartItems.length - 3} more items
                  </Typography>
                )}
              </Box>

              {/* Price Breakdown */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">₹{getSubtotal()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2" color={getShippingCost() === 0 ? "success.main" : "text.primary"}>
                    {getShippingCost() === 0 ? 'FREE' : `₹${getShippingCost()}`}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tax (18%)</Typography>
                  <Typography variant="body2">₹{getTax()}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight={700}>Total</Typography>
                  <Typography variant="h6" fontWeight={700} color="primary">
                    ₹{getTotal()}
                  </Typography>
                </Box>
              </Box>

              {/* Delivery Info */}
              <Box sx={{ p: 2, backgroundColor: 'success.light', borderRadius: 2, mb: 2 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.dark' }}>
                  <LocalShipping fontSize="small" />
                  Free delivery on orders over ₹499
                </Typography>
              </Box>

              {/* Security Badge */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mt: 2 }}>
                <Lock fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  Secure checkout
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Checkout;