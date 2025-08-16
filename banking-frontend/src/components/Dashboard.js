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
  CheckCircle,
  ArrowForward,
  Refresh,
  Send,
  Security,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    navigate('/login');
  };

  const transactions = [
    {
      id: 1,
      name: 'Starbucks New York LLP',
      date: '12.01.2024 09:34',
      amount: -5.30,
      type: 'expense',
      icon: <ShoppingCart sx={{ fontSize: 20 }} />
    },
    {
      id: 2,
      name: 'Wallmart Marketplace',
      date: '11.01.2024 21:34',
      amount: -135.00,
      type: 'expense',
      icon: <Payment sx={{ fontSize: 20 }} />
    },
    {
      id: 3,
      name: 'From Catherine Pierce',
      date: '11.01.2024 18:08',
      amount: 250.00,
      type: 'income',
      icon: <CheckCircle sx={{ fontSize: 20 }} />
    }
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
          gap: 2,
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
                  backgroundColor: '#f1f5f9',
                  '&:hover fieldset': { borderColor: '#8b5cf6' },
                  '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                },
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>
        </Box>

        {/* Dashboard Content */}
        <Box sx={{ flexGrow: 1, p: 3, background: '#f8fafc' }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      ....1289
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <TrendingUp sx={{ color: '#8b5cf6', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Cashback up to 60%
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6 }}>
                  Redesign concept for online bank Donova Bank. This is online service that allows you to pay bills for a variety of goods and services using your personal device.
                </Typography>
                <Chip
                  label="Active"
                  sx={{
                    background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                />
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {transactions.map((transaction) => (
                    <Box
                      key={transaction.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: '12px',
                        backgroundColor: '#f8fafc',
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
                    </Box>
                  ))}
                </Box>
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
                  View History
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
                  Security
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

            {/* Conversion Section */}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CurrencyExchange sx={{ color: '#8b5cf6', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Currency Conversion
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                      PLN
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8b5cf6' }}>
                      5,100
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Refresh sx={{ fontSize: 28, color: '#8b5cf6' }} />
                    <Typography variant="caption" sx={{ color: '#64748b' }}>
                      Rate = 5.01
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                      USD
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#00d4ff' }}>
                      $1,017
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  Jun 21, 13:99 UTC
                </Typography>
              </Paper>
            </Grid>

            {/* Activity Graph */}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Timeline sx={{ color: '#8b5cf6', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      My Activity
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    Jan 21 - Sep
                  </Typography>
                </Box>
                
                {/* Simple Activity Graph */}
                <Box sx={{ height: 120, display: 'flex', alignItems: 'end', gap: 1, mb: 2 }}>
                  {[30, 60, 45, 80, 55, 70, 90, 65].map((height, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 30,
                        height: `${height}%`,
                        background: 'linear-gradient(180deg, #8b5cf6, #00d4ff)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scaleY(1.1)',
                          background: 'linear-gradient(180deg, #00d4ff, #ff6b35)',
                        },
                      }}
                    />
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    $0
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>
                    $8k
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
