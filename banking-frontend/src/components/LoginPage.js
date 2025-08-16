// src/components/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      login(token, user); // Store login info via context
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          linear-gradient(135deg, 
            #000000 0%, 
            #000000 30%, 
            transparent 50%, 
            transparent 100%
          ),
          linear-gradient(135deg, 
            #00d4ff 0%, 
            #8b5cf6 50%, 
            #ff6b35 100%
          )
        `,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(0, 212, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(255, 107, 53, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
          `,
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          height: '20%',
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.1) 20%, 
              rgba(255, 255, 255, 0.2) 50%, 
              rgba(255, 255, 255, 0.1) 80%, 
              transparent 100%
            )
          `,
          filter: 'blur(1px)',
          transform: 'skewY(-2deg)',
          zIndex: 2,
        }
      }}
    >
      {/* Wavy Boundary Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '45%',
          left: 0,
          right: 0,
          height: '10%',
          background: `
            linear-gradient(90deg, 
              #000000 0%, 
              #000000 20%, 
              transparent 30%, 
              transparent 70%, 
              #000000 80%, 
              #000000 100%
            )
          `,
          clipPath: 'polygon(0% 100%, 20% 80%, 40% 90%, 60% 70%, 80% 85%, 100% 100%)',
          zIndex: 3,
        }}
      />

      {/* Floating Credit Cards */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '12%',
          width: '90px',
          height: '60px',
          background: `
            linear-gradient(135deg, 
              #667eea 0%, 
              #764ba2 50%, 
              #f093fb 100%
            )
          `,
          borderRadius: '8px',
          boxShadow: '0 12px 25px rgba(0,0,0,0.15)',
          transform: 'rotate(12deg)',
          animation: 'float 7s ease-in-out infinite',
          zIndex: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '10px',
            left: '10px',
            width: '20px',
            height: '14px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '3px',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            width: '30px',
            height: '4px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'rotate(12deg) translateY(0px)',
            },
            '50%': {
              transform: 'rotate(12deg) translateY(-18px)',
            },
          },
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          left: '8%',
          width: '70px',
          height: '50px',
          background: `
            linear-gradient(135deg, 
              #ff6b6b 0%, 
              #ee5a24 50%, 
              #ff9ff3 100%
            )
          `,
          borderRadius: '6px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
          transform: 'rotate(-8deg)',
          animation: 'float2 9s ease-in-out infinite',
          zIndex: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '8px',
            left: '8px',
            width: '16px',
            height: '12px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            width: '25px',
            height: '3px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
          },
          '@keyframes float2': {
            '0%, 100%': {
              transform: 'rotate(-8deg) translateY(0px)',
            },
            '50%': {
              transform: 'rotate(-8deg) translateY(-14px)',
            },
          },
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 5 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '25px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography 
              variant="h4"
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(45deg, #1e293b, #475569)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back!
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                color: 'text.secondary',
                maxWidth: '400px'
              }}
            >
              Sign in to your account and continue your digital banking journey.
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  width: '100%',
                  borderRadius: '12px',
                  '& .MuiAlert-icon': {
                    color: '#d32f2f',
                  },
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Email Address"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#8b5cf6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    '&:hover fieldset': {
                      borderColor: '#8b5cf6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                    },
                  },
                }}
              />

              <Box textAlign="right" mt={1} mb={3}>
                <Typography 
                  variant="body2" 
                  component={Link} 
                  to="/forgot-password" 
                  sx={{
                    color: '#00d4ff',
                    textDecoration: 'none',
                    fontWeight: '500',
                    '&:hover': {
                      color: '#8b5cf6',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                size="large" 
                sx={{ 
                  py: 1.5,
                  background: 'linear-gradient(45deg, #00d4ff, #8b5cf6)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8b5cf6, #ff6b35)',
                  },
                  boxShadow: '0 8px 25px rgba(0, 212, 255, 0.3)',
                  borderRadius: '15px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                Sign In
              </Button>

              <Box textAlign="center" mt={4}>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary',
                    '& a': {
                      color: '#00d4ff',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        color: '#8b5cf6',
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  Don't have an account?{' '}
                  <Link to="/signup">
                    Sign Up Now
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
