import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          top: '15%',
          right: '15%',
          width: '100px',
          height: '65px',
          background: `
            linear-gradient(135deg, 
              #667eea 0%, 
              #764ba2 50%, 
              #f093fb 100%
            )
          `,
          borderRadius: '10px',
          boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
          transform: 'rotate(15deg)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '12px',
            left: '12px',
            width: '25px',
            height: '16px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '3px',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            width: '35px',
            height: '5px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
          },
          '@keyframes float': {
            '0%, 100%': {
              transform: 'rotate(15deg) translateY(0px)',
            },
            '50%': {
              transform: 'rotate(15deg) translateY(-15px)',
            },
          },
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '80px',
          height: '55px',
          background: `
            linear-gradient(135deg, 
              #ff6b6b 0%, 
              #ee5a24 50%, 
              #ff9ff3 100%
            )
          `,
          borderRadius: '8px',
          boxShadow: '0 12px 25px rgba(0,0,0,0.12)',
          transform: 'rotate(-10deg)',
          animation: 'float2 8s ease-in-out infinite',
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
          '@keyframes float2': {
            '0%, 100%': {
              transform: 'rotate(-10deg) translateY(0px)',
            },
            '50%': {
              transform: 'rotate(-10deg) translateY(-12px)',
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
              component="h1" 
              variant="h4"
              sx={{ 
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(45deg, #1e293b, #475569)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Create Your Account
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                textAlign: 'center',
                color: 'text.secondary',
                maxWidth: '400px'
              }}
            >
              Join the future of digital banking. Experience secure, seamless, and smart financial management.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
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
              
              {error && (
                <Typography 
                  color="error" 
                  sx={{ 
                    mt: 2, 
                    p: 2, 
                    borderRadius: '8px',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    border: '1px solid rgba(244, 67, 54, 0.3)'
                  }}
                >
                  {error}
                </Typography>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 4, 
                  mb: 3,
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
                Create Account
              </Button>
              
              <Typography 
                variant="body2" 
                align="center"
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
                Already have an account? <Link to="/login">Sign In</Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;