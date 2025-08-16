import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  AccountBalance,
  Payment,
  CreditCard,
  AccountBalanceWallet,
  TrendingUp,
  Security,
  CheckCircle,
  Warning,
} from '@mui/icons-material';

const DepositFunds = () => {
  const [formData, setFormData] = useState({
    amount: '',
    country: '',
    currency: '',
    depositMethod: '',
    accountNumber: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const countries = [
    { code: 'US', name: 'United States', currency: 'USD', symbol: '$' },
    { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£' },
    { code: 'EU', name: 'European Union', currency: 'EUR', symbol: '€' },
    { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$' },
    { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$' },
    { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥' },
    { code: 'CH', name: 'Switzerland', currency: 'CHF', symbol: 'CHF' },
    { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: 'S$' },
    { code: 'IN', name: 'India', currency: 'INR', symbol: '₹' },
    { code: 'BR', name: 'Brazil', currency: 'BRL', symbol: 'R$' },
    { code: 'MX', name: 'Mexico', currency: 'MXN', symbol: '$' },
    { code: 'ZA', name: 'South Africa', currency: 'ZAR', symbol: 'R' },
    { code: 'NG', name: 'Nigeria', currency: 'NGN', symbol: '₦' },
    { code: 'KE', name: 'Kenya', currency: 'KES', symbol: 'KSh' },
    { code: 'GH', name: 'Ghana', currency: 'GHS', symbol: 'GH₵' },
  ];

  const depositMethods = [
    { id: 'bank_transfer', name: 'Bank Transfer', icon: <AccountBalance />, fee: '0%' },
    { id: 'credit_card', name: 'Credit Card', icon: <CreditCard />, fee: '2.5%' },
    { id: 'mobile_money', name: 'Mobile Money', icon: <Payment />, fee: '1%' },
    { id: 'crypto', name: 'Cryptocurrency', icon: <TrendingUp />, fee: '0.5%' },
  ];

  const handleCountryChange = (event) => {
    const selectedCountry = countries.find(c => c.code === event.target.value);
    setFormData({
      ...formData,
      country: event.target.value,
      currency: selectedCountry ? selectedCountry.currency : '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate form
      if (!formData.amount || !formData.country || !formData.depositMethod) {
        throw new Error('Please fill in all required fields');
      }

      if (parseFloat(formData.amount) <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      setSuccess(true);
      setFormData({
        amount: '',
        country: '',
        currency: '',
        depositMethod: '',
        accountNumber: '',
        description: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = countries.find(c => c.code === formData.country);
  const selectedMethod = depositMethods.find(m => m.id === formData.depositMethod);

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
              color: '#fff',
              borderRadius: '20px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <AccountBalanceWallet sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Deposit Funds
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Add money to your account using your preferred method and local currency
            </Typography>
          </Paper>
        </Grid>

        {/* Main Form */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 4,
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {success && (
              <Alert
                severity="success"
                icon={<CheckCircle />}
                sx={{ mb: 3, borderRadius: '12px' }}
                onClose={() => setSuccess(false)}
              >
                Deposit request submitted successfully! You will receive a confirmation email shortly.
              </Alert>
            )}

            {error && (
              <Alert
                severity="error"
                icon={<Warning />}
                sx={{ mb: 3, borderRadius: '12px' }}
                onClose={() => setError('')}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Country Selection */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Select Country</InputLabel>
                    <Select
                      value={formData.country}
                      onChange={handleCountryChange}
                      label="Select Country"
                      sx={{
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e2e8f0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#8b5cf6',
                        },
                      }}
                    >
                      {countries.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography>{country.name}</Typography>
                            <Chip
                              label={country.currency}
                              size="small"
                              sx={{ backgroundColor: '#f1f5f9' }}
                            />
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Currency Display */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Currency"
                    value={selectedCountry ? `${selectedCountry.currency} (${selectedCountry.symbol})` : ''}
                    InputProps={{ readOnly: true }}
                    sx={{
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#f8fafc',
                      },
                    }}
                  />
                </Grid>

                {/* Amount */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    InputProps={{
                      startAdornment: selectedCountry && (
                        <Typography sx={{ mr: 1, color: '#64748b' }}>
                          {selectedCountry.symbol}
                        </Typography>
                      ),
                    }}
                    sx={{
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#8b5cf6' },
                        '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                      },
                    }}
                  />
                </Grid>

                {/* Deposit Method */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Select Deposit Method
                  </Typography>
                  <Grid container spacing={2}>
                    {depositMethods.map((method) => (
                      <Grid item xs={12} sm={6} key={method.id}>
                        <Paper
                          sx={{
                            p: 2,
                            border: formData.depositMethod === method.id ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: '#8b5cf6',
                              backgroundColor: '#f8fafc',
                            },
                          }}
                          onClick={() => setFormData({ ...formData, depositMethod: method.id })}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ backgroundColor: '#8b5cf6' }}>
                              {method.icon}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                {method.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Fee: {method.fee}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Account Number (for bank transfer) */}
                {formData.depositMethod === 'bank_transfer' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      sx={{
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: '#8b5cf6' },
                          '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                        },
                      }}
                    />
                  </Grid>
                )}

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description (Optional)"
                    multiline
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    sx={{
                      borderRadius: '12px',
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': { borderColor: '#8b5cf6' },
                        '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                      },
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: 2,
                      background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                      borderRadius: '15px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: '#fff' }} />
                    ) : (
                      'Process Deposit'
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Summary Card */}
            <Paper
              sx={{
                p: 3,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Deposit Summary
              </Typography>
              
              {selectedCountry && formData.amount && (
                <Box sx={{ space: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Amount:</Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {selectedCountry.symbol}{parseFloat(formData.amount).toLocaleString()}
                    </Typography>
                  </Box>
                  
                  {selectedMethod && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Method:</Typography>
                      <Typography>{selectedMethod.name}</Typography>
                    </Box>
                  )}
                  
                  {selectedMethod && selectedMethod.fee !== '0%' && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Fee:</Typography>
                      <Typography sx={{ color: '#dc2626' }}>
                        {selectedMethod.fee}
                      </Typography>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#8b5cf6' }}>
                      {selectedCountry.symbol}{parseFloat(formData.amount).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>

            {/* Security Info */}
            <Paper
              sx={{
                p: 3,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Security sx={{ color: '#8b5cf6' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Security Features
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                  End-to-end encryption
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                  Fraud detection
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                  Real-time monitoring
                </Typography>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} />
                  Secure authentication
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DepositFunds;
