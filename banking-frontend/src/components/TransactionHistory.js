import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  // ...add other needed Material UI components here
} from '@mui/material';
import {
  Send,
  AccountBalance,
  Payment,
  TrendingUp,
  CheckCircle,
  Warning,
  Person,
  Speed,
  Shield,
  // ...existing icons
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';

const SendMoneyPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    currency: 'USD',
    recipientType: '',
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAccount: '',
    amount: '',
    currency: 'USD',
    transferMethod: '',
    description: '',
    isUrgent: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fraudRisk, setFraudRisk] = useState(0);

  const transferMethods = [
    {
      id: 'instant',
      name: 'Instant Transfer',
      icon: <Speed />,
      fee: '2.5%',
      time: 'Immediate',
      maxAmount: 1000,
      description: 'Transfer money instantly to any bank account',
    },
    {
      id: 'standard',
      name: 'Standard Transfer',
      icon: <AccountBalance />,
      fee: '0.5%',
      time: '1-2 business days',
      maxAmount: 10000,
      description: 'Regular bank transfer with lower fees',
    },
    {
      id: 'international',
      name: 'International Transfer',
      icon: <TrendingUp />,
      fee: '3.5%',
      time: '2-5 business days',
      maxAmount: 50000,
      description: 'Send money worldwide with competitive rates',
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: <Payment />,
      fee: '1%',
      time: 'Instant',
      maxAmount: 500,
      description: 'Quick transfer to mobile money accounts',
    },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  ];

  const steps = ['Recipient Details', 'Transfer Details', 'Review & Confirm'];

  const detectFraudRisk = (data) => {
    let risk = 0;

    // Check for suspicious patterns
    if (data.isUrgent) risk += 0.3;
    if (parseFloat(data.amount) > 5000) risk += 0.2;
    if (data.transferMethod === 'international') risk += 0.1;
    if (!data.recipientEmail.includes('@')) risk += 0.2;
    if (data.recipientName.length < 3) risk += 0.1;

    return Math.min(risk, 1);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate recipient details
      if (!formData.recipientType || !formData.recipientName) {
        setError('Please fill in all required recipient fields');
        return;
      }
      if (formData.recipientType === 'email' && !formData.recipientEmail.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      if (formData.recipientType === 'phone' && formData.recipientPhone.length < 10) {
        setError('Please enter a valid phone number');
        return;
      }
    }
    if (activeStep === 1) {
      // Validate transfer details
      if (!formData.amount || !formData.transferMethod) {
        setError('Please fill in all required transfer fields');
        return;
      }
      if (parseFloat(formData.amount) <= 0) {
        setError('Amount must be greater than 0');
        return;
      }
      // Check fraud risk
      const risk = detectFraudRisk(formData);
      setFraudRisk(risk);

      if (risk > 0.7) {
        setError('High fraud risk detected. Please review your transfer details or contact support.');
        return;
      }
    }
    setError('');
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSuccess(true);
      setFormData({
        recipientType: '',
        recipientName: '',
        recipientEmail: '',
        recipientPhone: '',
        recipientAccount: '',
        amount: '',
        currency: 'USD',
        transferMethod: '',
        description: '',
        isUrgent: false,
      });
      setActiveStep(0);
    } catch (err) {
      setError('Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedMethod = transferMethods.find((m) => m.id === formData.transferMethod);
  const selectedCurrency = currencies.find((c) => c.code === formData.currency);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Recipient Information
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Recipient Type</InputLabel>
                <Select
                  value={formData.recipientType}
                  onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                  label="Recipient Type"
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="email">Email Address</MenuItem>
                  <MenuItem value="phone">Phone Number</MenuItem>
                  <MenuItem value="account">Account Number</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Recipient Name"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                sx={{ borderRadius: '12px' }}
              />
            </Grid>

            {formData.recipientType === 'email' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.recipientEmail}
                  onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: '#64748b' }} />,
                  }}
                  sx={{ borderRadius: '12px' }}
                />
              </Grid>
            )}

            {formData.recipientType === 'phone' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.recipientPhone}
                  onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: '#64748b' }} />,
                  }}
                  sx={{ borderRadius: '12px' }}
                />
              </Grid>
            )}

            {formData.recipientType === 'account' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={formData.recipientAccount}
                  onChange={(e) => setFormData({ ...formData, recipientAccount: e.target.value })}
                  InputProps={{
                    startAdornment: <AccountBalanceWallet sx={{ mr: 1, color: '#64748b' }} />,
                  }}
                  sx={{ borderRadius: '12px' }}
                />
              </Grid>
            )}
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Transfer Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                InputProps={{
                  startAdornment: selectedCurrency && (
                    <Typography sx={{ mr: 1, color: '#64748b' }}>
                      {selectedCurrency.symbol}
                    </Typography>
                  ),
                }}
                sx={{ borderRadius: '12px' }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  label="Currency"
                  sx={{ borderRadius: '12px' }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Transfer Method</InputLabel>
                <Select
                  value={formData.transferMethod}
                  onChange={(e) => setFormData({ ...formData, transferMethod: e.target.value })}
                  label="Transfer Method"
                  sx={{ borderRadius: '12px' }}
                >
                  {transferMethods.map((method) => (
                    <MenuItem key={method.id} value={method.id}>
                      {method.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description (Optional)"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{ borderRadius: '12px' }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Review Transfer Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: '12px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Recipient Details
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Person sx={{ color: '#8b5cf6' }} />
                      <Typography>{formData.recipientName}</Typography>
                    </Box>
                    {formData.recipientType === 'email' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Email sx={{ color: '#64748b' }} />
                        <Typography>{formData.recipientEmail}</Typography>
                      </Box>
                    )}
                    {formData.recipientType === 'phone' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <Phone sx={{ color: '#64748b' }} />
                        <Typography>{formData.recipientPhone}</Typography>
                      </Box>
                    )}
                    {formData.recipientType === 'account' && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <AccountBalanceWallet sx={{ color: '#64748b' }} />
                        <Typography>{formData.recipientAccount}</Typography>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Transfer Details
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Amount:</Typography>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {selectedCurrency?.symbol}
                        {parseFloat(formData.amount).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Method:</Typography>
                      <Typography>{selectedMethod?.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Fee:</Typography>
                      <Typography sx={{ color: '#dc2626' }}>{selectedMethod?.fee}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Processing Time:</Typography>
                      <Typography>{selectedMethod?.time}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: '12px' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Security Check
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Shield sx={{ color: fraudRisk > 0.5 ? '#dc2626' : '#10b981' }} />
                  <Typography>Fraud Risk: {Math.round(fraudRisk * 100)}%</Typography>
                </Box>
                {fraudRisk > 0.5 && (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Higher than normal risk detected. Please review details.
                  </Alert>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} /> Recipient verified
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} /> Amount within limits
                  </Typography>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, color: '#10b981' }} /> Secure transfer method
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, #8b5cf6, #00d4ff)',
              color: '#fff',
              borderRadius: '20px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Send sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Send Money
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Transfer money securely to anyone, anywhere in the world
            </Typography>
          </Paper>
        </Grid>
        {/* Stepper */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {success && (
              <Alert
                severity="success"
                icon={<CheckCircle />}
                sx={{ mb: 3, borderRadius: '12px' }}
                onClose={() => setSuccess(false)}
              >
                Transfer initiated successfully! You will receive a confirmation email shortly.
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
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  borderColor: '#8b5cf6',
                  color: '#8b5cf6',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  },
                }}
                variant="outlined"
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                    },
                  }}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Confirm Transfer'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                    },
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SendMoneyPage;