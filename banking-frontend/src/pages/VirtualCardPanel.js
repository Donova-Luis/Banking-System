// src/components/VirtualCardPanel.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const VirtualCardPanel = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/virtual-card')
      .then(res => {
        setCard(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading card:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Virtual Card Details</Typography>
      <Paper sx={{ p: 3, maxWidth: 400 }}>
        <Typography variant="body1">Cardholder: {card.cardholder}</Typography>
        <Typography variant="body1">Card Number: **** **** **** {card.last4}</Typography>
        <Typography variant="body1">Limit: ${card.limit}</Typography>
        <Typography variant="body1">Status: {card.status}</Typography>
        <Typography variant="body2" color="text.secondary">Expires: {card.expiry}</Typography>
        <Box mt={2}>
          <Button variant="outlined" color="primary" disabled={card.status !== 'active'}>
            Freeze Card
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default VirtualCardPanel;