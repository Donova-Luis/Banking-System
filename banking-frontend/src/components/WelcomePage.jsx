import React from 'react';
import { Container, Typography } from '@mui/material';

const WelcomePage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome to the Banking App
      </Typography>
    </Container>
  );
};

export default WelcomePage;