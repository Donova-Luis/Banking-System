// src/components/LandingPage.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';

const LandingPage = () => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Hero Section with Abstract Gradient Design */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '80vh', md: '100vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
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

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 4 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              background: 'linear-gradient(45deg, #fff, #f0f0f0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Future of Digital Banking
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            Experience seamless and secure banking with our state-of-the-art platform.
            Manage your finances with ease, transfer funds effortlessly and keep track 
            of all your transactions in one place.
            
            Secure. Smart. Seamless.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/signup"
              sx={{ 
                background: 'linear-gradient(45deg, #00d4ff, #8b5cf6)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #8b5cf6, #ff6b35)',
                },
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/login"
              sx={{ 
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
                borderRadius: '25px',
                px: 4,
                py: 1.5,
              }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section with Gradient Background */}
      <Box 
        sx={{ 
          py: 10,
          background: `
            linear-gradient(135deg, 
              #f8fafc 0%, 
              #e2e8f0 50%, 
              #cbd5e1 100%
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
            height: '100px',
            background: `
              linear-gradient(180deg, 
                transparent 0%, 
                rgba(248, 250, 252, 1) 100%
              )
            `,
          }
        }}
      >
        {/* Floating Credit Card Background Element */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '120px',
            height: '80px',
            background: `
              linear-gradient(135deg, 
                #667eea 0%, 
                #764ba2 50%, 
                #f093fb 100%
              )
            `,
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            transform: 'rotate(15deg)',
            animation: 'float 6s ease-in-out infinite',
            zIndex: 1,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '30px',
              height: '20px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '4px',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '15px',
              left: '15px',
              width: '40px',
              height: '6px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '3px',
            },
            '@keyframes float': {
              '0%, 100%': {
                transform: 'rotate(15deg) translateY(0px)',
              },
              '50%': {
                transform: 'rotate(15deg) translateY(-20px)',
              },
            },
          }}
        />
        
        {/* Second Floating Card */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: '8%',
            width: '100px',
            height: '65px',
            background: `
              linear-gradient(135deg, 
                #ff6b6b 0%, 
                #ee5a24 50%, 
                #ff9ff3 100%
              )
            `,
            borderRadius: '10px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.12)',
            transform: 'rotate(-10deg)',
            animation: 'float2 8s ease-in-out infinite',
            zIndex: 1,
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
            '@keyframes float2': {
              '0%, 100%': {
                transform: 'rotate(-10deg) translateY(0px)',
              },
              '50%': {
                transform: 'rotate(-10deg) translateY(-15px)',
              },
            },
          }}
        />

        {/* Third Floating Card */}
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            right: '20%',
            width: '90px',
            height: '60px',
            background: `
              linear-gradient(135deg, 
                #4facfe 0%, 
                #00f2fe 50%, 
                #43e97b 100%
              )
            `,
            borderRadius: '8px',
            boxShadow: '0 12px 25px rgba(0,0,0,0.1)',
            transform: 'rotate(5deg)',
            animation: 'float3 7s ease-in-out infinite',
            zIndex: 1,
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
            '@keyframes float3': {
              '0%, 100%': {
                transform: 'rotate(5deg) translateY(0px)',
              },
              '50%': {
                transform: 'rotate(5deg) translateY(-18px)',
              },
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1e293b, #475569)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 6
            }}
          >
            Our Features
          </Typography>

          <Grid container columns={12} spacing={2}>
            {[
              {
                title: 'Secure Wallets',
                desc: 'Military-grade encryption protects your funds and transactions.',
                gradient: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
              },
              {
                title: 'Instant Transfers',
                desc: 'Send and receive money in real time without delays and swift.',
                gradient: 'linear-gradient(135deg, #8b5cf6, #ff6b35)',
              },
              {
                title: 'Analytics Dashboard',
                desc: 'Track spending, manage cards, and analyze financial health.',
                gradient: 'linear-gradient(135deg, #ff6b35, #00d4ff)',
              },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%', 
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: item.gradient,
                      margin: '0 auto 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                      {i + 1}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2, color: '#1e293b' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final Call to Action with Gradient */}
      <Box 
        sx={{ 
          py: 10, 
          background: `
            linear-gradient(135deg, 
              #000000 0%, 
              #1a1a1a 50%, 
              #2d2d2d 100%
            )
          `,
          color: '#fff', 
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)
            `,
          }
        }}
      >
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Ready to Experience Futuristic Banking?
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/signup"
            sx={{ 
              background: 'linear-gradient(45deg, #00d4ff, #8b5cf6)',
              '&:hover': {
                background: 'linear-gradient(45deg, #8b5cf6, #ff6b35)',
              },
              boxShadow: '0 4px 15px rgba(0, 212, 255, 0.3)',
              borderRadius: '25px',
              px: 4,
              py: 1.5,
            }}
          >
            Create Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3, textAlign: 'center', backgroundColor: '#000', color: '#ccc' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Futurio Bank. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;
