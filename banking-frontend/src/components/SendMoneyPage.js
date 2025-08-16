import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Grid,
  Paper,
  Box,
  Divider,
  Button,
  TextField,
  Avatar,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Dashboard as DashboardIcon,
  AccountBalanceWallet,
  BarChart,
  Chat,
  CalendarToday,
  Settings,
  ExitToApp,
  Search,
  Balance,
  Add,
  TrendingUp,
  Payment,
  Receipt,
  AccountBalance,
  CurrencyExchange,
  Timeline,
  CreditCard,
  AttachMoney,
  ShoppingCart,
  eWallet,
  CheckCircle,
  ArrowForward,
  Refresh,
  Send,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    recipientType: '',
    recipientAccount: '',
    transferMethod: '',
    description: '',
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    amount: '',
    currency: 'USD',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fraudRisk, setFraudRisk] = useState(0);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
  ];

  const selectedCurrency =
    currencies.find((c) => c.code === formData.currency) || currencies[0];

  const steps = ['Recipient Details', 'Transfer Details', 'Review & Confirm'];

  const handleLogout = () => {
    navigate('/login');
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveStep(0);
      setFormData({
        recipientType: '',
        recipientAccount: '',
        transferMethod: '',
        description: '',
        recipientName: '',
        recipientEmail: '',
        recipientPhone: '',
        amount: '',
        currency: 'USD',
      });
      setError('');
      setFraudRisk(0);
    }, 2000);
  };

  const transactions = [
    {
      id: 1,
      name: 'Starbucks New York LLP',
      date: '12.01.2024 09:34',
      amount: -5.3,
      type: 'expense',
      icon: <ShoppingCart sx={{ fontSize: 20 }} />,
    },
    {
      id: 2,
      name: 'Wallmart Marketplace',
      date: '11.01.2024 21:34',
      amount: -135.0,
      type: 'expense',
      icon: <Payment sx={{ fontSize: 20 }} />,
    },
    {
      id: 3,
      name: 'From Catherine Pierce',
      date: '11.01.2024 18:08',
      amount: 250.0,
      type: 'income',
      icon: <CheckCircle sx={{ fontSize: 20 }} />,
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f8fafc' }}>
      {/* Left Sidebar */}
      <Box
        sx={{
          width: 80,
          background: 'linear-gradient(180deg, #8b5cf6, #00d4ff)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 3,
        }}
      >
        {/* Profile Icon */}
        <IconButton
          onClick={() => navigate('/profile')}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            width: 50,
            height: 50,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
          }}
        >
          <Person sx={{ fontSize: 24 }} />
        </IconButton>

        {/* Navigation Icons */}
        <IconButton
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <DashboardIcon sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <AccountBalanceWallet sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <BarChart sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <Chat sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <CalendarToday sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <Settings sx={{ fontSize: 20 }} />
        </IconButton>

        {/* Logout */}
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          onClick={handleLogout}
          sx={{
            color: '#fff',
            width: 45,
            height: 45,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
          }}
        >
          <ExitToApp sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                Overview
              </Typography>
              <Typography variant="h6" sx={{ color: '#64748b', mt: 0.5 }}>
                Welcome back, User! 👋
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Recipient Information
                </Typography>
                <TextField
                  placeholder="Search..."
                  size="small"
                  InputProps={{
                    startAdornment: <Search sx={{ color: '#64748b', mr: 1 }} />,
                  }}
                  sx={{
                    width: 300,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '25px',
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Current Balance Card */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                background: 'linear-gradient(135deg, #ff6b6b, #00d4ff)',
                color: '#fff',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 100,
                  height: 100,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                },
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
                Current Balance
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                $5,750.20
              </Typography>
              <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Account Number
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    **** **** **** 1289
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Expiry Date
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                    09/25
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CreditCard sx={{ fontSize: 28 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    Mastercard
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Cashback Section */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TrendingUp sx={{ color: '#8b5cf6', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Cashback up to 60%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6 }}>
                    Redesign concept for online bank Donova Bank. This is online service that allows you to pay bills for a variety of goods and services using your personal device.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Chip
                    label="Active"
                    sx={{
                      background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Transactions */}
          <Grid item xs={12} md={6}>
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
                Recent Transactions
              </Typography>
              <Grid container spacing={2}>
                {transactions.map((transaction) => (
                  <Grid item xs={12} key={transaction.id}>
                    <Paper
                      sx={{
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: transaction.type === 'income' ? '#dcfce7' : '#fef2f2',
                            color: transaction.type === 'income' ? '#166534' : '#dc2626',
                          }}
                        >
                          {transaction.icon}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {transaction.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {transaction.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 'bold',
                          color: transaction.type === 'income' ? '#166534' : '#dc2626',
                        }}
                      >
                        {transaction.type === 'income' ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
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
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Send />}
                    onClick={() => navigate('/send-money')}
                    sx={{
                      background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                      borderRadius: '12px',
                      py: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                      },
                    }}
                  >
                    Send Money
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AccountBalanceWallet />}
                    onClick={() => navigate('/deposit')}
                    sx={{
                      background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                      borderRadius: '12px',
                      py: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ff6b35, #8b5cf6)',
                      },
                    }}
                  >
                    Deposit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Receipt />}
                    onClick={() => navigate('/transactions')}
                    sx={{
                      borderColor: '#8b5cf6',
                      color: '#8b5cf6',
                      borderRadius: '12px',
                      py: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      },
                    }}
                  >
                    View Transactions
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Security />}
                    sx={{
                      borderColor: '#00d4ff',
                      color: '#00d4ff',
                      borderRadius: '12px',
                      py: 2,
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#ff6b35',
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                      },
                    }}
                  >
                    Security Settings
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Steps / Progress */}
        <Box sx={{ px: 3, py: 1.5, borderRadius: '12px', mt: 3, background: 'rgba(255,255,255,0.95)' }}>
          <LinearProgress variant="determinate" value={(activeStep + 1) * (100 / 3)} sx={{ borderRadius: '12px' }} />
        </Box>

        {/* Step Content */}
        <Paper
          sx={{
            p: 3,
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            mt: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            {activeStep === 0 && 'Recipient Details'}
            {activeStep === 1 && 'Transfer Details'}
            {activeStep === 2 && 'Review & Confirm'}
          </Typography>

          {/* Step 1: Recipient Details */}
          {activeStep === 0 && (
            <Box>
              <TextField
                label="Recipient Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Recipient Type</InputLabel>
                <Select
                  value={formData.recipientType}
                  onChange={(e) => setFormData({ ...formData, recipientType: e.target.value })}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    },
                  }}
                >
                  <MenuItem value="email">Email Address</MenuItem>
                  <MenuItem value="phone">Phone Number</MenuItem>
                  <MenuItem value="account">Account Number</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                InputLabelProps={{ shrink: true }}
                startAdornment={
                  <InputAdornment position="start">
                    {selectedCurrency.symbol}
                  </InputAdornment>
                }
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Currency</InputLabel>
                <Select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    },
                  }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.name} ({currency.symbol})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Step 2: Transfer Details */}
          {activeStep === 1 && (
            <Box>
              <TextField
                label="Transfer Method"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.transferMethod}
                onChange={(e) => setFormData({ ...formData, transferMethod: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Description (Optional)"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          )}

          {/* Step 3: Review & Confirm */}
          {activeStep === 2 && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please review your details before confirming the transfer.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  <strong>Recipient Name:</strong> {formData.recipientName}
                </Typography>
                <Typography variant="body2">
                  <strong>Recipient Type:</strong> {formData.recipientType}
                </Typography>
                <Typography variant="body2">
                  <strong>Amount:</strong> {selectedCurrency.symbol}
                  {parseFloat(formData.amount).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  <strong>Currency:</strong> {formData.currency}
                </Typography>
                <Typography variant="body2">
                  <strong>Transfer Method:</strong> {formData.transferMethod}
                </Typography>
                <Typography variant="body2">
                  <strong>Description:</strong> {formData.description || 'N/A'}
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Fraud Risk Warning */}
          {fraudRisk > 0.5 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Higher than normal risk detected. Please review details.
            </Alert>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{
                borderColor: '#8b5cf6',
                color: '#8b5cf6',
                borderRadius: '12px',
                py: 1.5,
                fontWeight: 'bold',
                '&:hover': {
                  borderColor: '#00d4ff',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                },
              }}
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
                {loading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : (
                  'Confirm Transfer'
                )}
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
      </Box>
    </Box>
  );
};

export default Dashboard;
