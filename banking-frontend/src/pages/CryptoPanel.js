// src/components/CryptoPanel.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';

const CryptoPanel = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/crypto-wallet')
      .then(res => {
        setWallet(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading wallet:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Box textAlign="center"><CircularProgress /></Box>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Crypto Wallet</Typography>
      <Grid container spacing={3}>
        {wallet.assets.map(asset => (
          <Grid item xs={12} md={4} key={asset.name}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">{asset.name}</Typography>
              <Typography variant="body1">Balance: {asset.amount}</Typography>
              <Typography variant="body2" color="text.secondary">Value: ${asset.usdValue}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={4}>
        <Typography variant="h6">Total Portfolio Value: ${wallet.totalUSD}</Typography>
      </Box>
    </Box>
  );
};

export default CryptoPanel;