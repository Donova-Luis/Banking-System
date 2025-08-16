import React, { useState, useRef } from 'react';
import Email from '@mui/icons-material/Email';
import Phone from '@mui/icons-material/Phone';
import LocationOn from '@mui/icons-material/LocationOn';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import Palette from '@mui/icons-material/Palette';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person,
  Edit,
  CameraAlt,
  PhotoLibrary,
  Save,
  Cancel,
  Security,
  CheckCircle,
  Warning,
  CalendarToday,
} from '@mui/icons-material';

const mockTransactions = [
  {
    id: 1,
    date: '2024-01-15T10:30:00Z',
    description: 'Payment Received',
    amount: 250.0,
    currency: 'USD',
    type: 'income',
    status: 'completed',
    fraudRisk: 0.1,
  },
  {
    id: 2,
    date: '2024-01-14T15:45:00Z',
    description: 'Invoice #12345',
    amount: 150.0,
    currency: 'USD',
    type: 'income',
    status: 'pending',
    fraudRisk: 0.3,
  },
  {
    id: 3,
    date: '2024-01-13T09:20:00Z',
    description: 'Payment to Supplier',
    amount: -100.0,
    currency: 'USD',
    type: 'expense',
    status: 'completed',
    fraudRisk: 0.2,
  },
  {
    id: 4,
    date: '2024-01-12T11:15:00Z',
    description: 'Salary Payment',
    amount: 500.0,
    currency: 'USD',
    type: 'income',
    status: 'completed',
    fraudRisk: 0.05,
  },
  {
    id: 5,
    date: '2024-01-10T14:00:00Z',
    description: 'Office Supplies',
    amount: -75.0,
    currency: 'USD',
    type: 'expense',
    status: 'completed',
    fraudRisk: 0.1,
  },
];

const mockGalleryImages = [
  '/api/placeholder/150/150?text=Photo+1',
  '/api/placeholder/150/150?text=Photo+2',
  '/api/placeholder/150/150?text=Photo+3',
  '/api/placeholder/150/150?text=Photo+4',
  '/api/placeholder/150/150?text=Photo+5',
  '/api/placeholder/150/150?text=Photo+6',
];

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1990-01-15',
    country: 'United States',
    currency: 'USD',
    language: 'English',
    theme: 'Light',
    notifications: {
      email: true,
      sms: true,
      push: true,
      security: true,
    },
    security: {
      twoFactor: true,
      biometric: false,
      lastLogin: '2024-01-15T10:30:00Z',
      loginHistory: [
        { date: '2024-01-15T10:30:00Z', location: 'New York, NY', device: 'Chrome on Windows' },
        { date: '2024-01-14T15:45:00Z', location: 'New York, NY', device: 'Mobile App' },
        { date: '2024-01-13T09:20:00Z', location: 'San Francisco, CA', device: 'Safari on Mac' },
      ],
    },
  });

  const [transactions, setTransactions] = useState(mockTransactions);
  const [editingTransactionId, setEditingTransactionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === editingTransactionId ? { ...transaction, ...profileData } : transaction
        )
      );
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGallerySelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    setGalleryOpen(false);
  };

  const openGallery = () => {
    setGalleryOpen(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Example usage in your component:
  const handleEditTransaction = (id) => {
    setEditingTransactionId(id);
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        {/* Header */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Person sx={{ fontSize: 32 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                User Profile
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Manage your account settings and personal information
            </Typography>
          </Paper>
        </Grid>

        {/* Success Alert */}
        {success && (
          <Grid item xs={12}>
            <Alert
              severity="success"
              icon={<CheckCircle />}
              sx={{ borderRadius: '12px' }}
              onClose={() => setSuccess(false)}
            >
              Profile updated successfully!
            </Alert>
          </Grid>
        )}

        {/* Error Alert */}
        {error && (
          <Grid item xs={12}>
            <Alert
              severity="error"
              icon={<Warning />}
              sx={{ borderRadius: '12px' }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          </Grid>
        )}

        {/* Profile Photo Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Box sx={{ position: 'relative', mb: 3 }}>
              <Avatar
                src={selectedImage}
                sx={{
                  width: 150,
                  height: 150,
                  fontSize: '3rem',
                  background: 'linear-gradient(45deg, #8b5cf6, #00d4ff)',
                  border: '4px solid #fff',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }}
              >
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </Avatar>
              <IconButton
                onClick={triggerFileInput}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#8b5cf6',
                  '&:hover': { backgroundColor: '#7c3aed' },
                }}
              >
                <CameraAlt sx={{ color: '#fff' }} />
              </IconButton>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
              {profileData.email}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<PhotoLibrary />}
                onClick={openGallery}
                sx={{
                  borderRadius: '12px',
                  borderColor: '#8b5cf6',
                  color: '#8b5cf6',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  },
                }}
              >
                Gallery
              </Button>
            </Box>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </Paper>
        </Grid>

        {/* Profile Information */}
        <Grid item xs={12} md={8}>
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
              Personal Information
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: '#64748b' }} />,
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: '#64748b' }} />,
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: '#64748b' }} />,
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: '#64748b' }} />,
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: '#64748b' }} />,
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <CalendarToday sx={{ mr: 1, color: '#64748b' }} />,
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={profileData.country}
                  onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                  disabled={!isEditing}
                  sx={{
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#8b5cf6' },
                      '&.Mui-focused fieldset': { borderColor: '#00d4ff' },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              {!isEditing ? (
                <Button
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  sx={{
                    borderRadius: '12px',
                    borderColor: '#8b5cf6',
                    color: '#8b5cf6',
                    '&:hover': {
                      borderColor: '#00d4ff',
                      backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    },
                  }}
                >
                  Edit
                </Button>
              ) : (
                <>
                  <Button
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    sx={{
                      borderRadius: '12px',
                      borderColor: '#64748b',
                      color: '#64748b',
                      '&:hover': {
                        backgroundColor: 'rgba(100, 116, 139, 0.1)',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    startIcon={loading ? <CircularProgress size={16} /> : <Save />}
                    onClick={handleSave}
                    disabled={loading}
                    sx={{
                      borderRadius: '12px',
                      background: 'linear-gradient(45deg, #8bcf6, #00d4ff)',
                      color: '#fff',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00d4ff, #ff6b35)',
                      },
                    }}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Security & Settings */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Security Settings */}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Security sx={{ color: '#8b5cf6' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Security Settings
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Two-Factor Authentication</Typography>
                    <Chip
                      label={profileData.security.twoFactor ? 'Enabled' : 'Disabled'}
                      size="small"
                      sx={{
                        backgroundColor: profileData.security.twoFactor ? '#dcfce7' : '#fef2f2',
                        color: profileData.security.twoFactor ? '#166534' : '#dc2626',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Biometric Login</Typography>
                    <Chip
                      label={profileData.security.biometric ? 'Enabled' : 'Disabled'}
                      size="small"
                      sx={{
                        backgroundColor: profileData.security.biometric ? '#dcfce7' : '#fef2f2',
                        color: profileData.security.biometric ? '#166534' : '#dc2626',
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Recent Login Activity
                  </Typography>

                  {profileData.security.loginHistory.slice(0, 3).map((login, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {new Date(login.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                          {login.location} • {login.device}
                        </Typography>
                      </Box>
                      <VerifiedUser sx={{ fontSize: 16, color: '#10b981' }} />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>

            {/* Preferences */}
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Palette sx={{ color: '#8b5cf6' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Preferences
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Language</Typography>
                    <Chip label={profileData.language} size="small" />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Currency</Typography>
                    <Chip label={profileData.currency} size="small" />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Theme</Typography>
                    <Chip label={profileData.theme} size="small" />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Notifications
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Email Notifications</Typography>
                    <Chip
                      label={profileData.notifications.email ? 'On' : 'Off'}
                      size="small"
                      sx={{
                        backgroundColor: profileData.notifications.email ? '#dcfce7' : '#fef2f2',
                        color: profileData.notifications.email ? '#166534' : '#dc2626',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">SMS Notifications</Typography>
                    <Chip
                      label={profileData.notifications.sms ? 'On' : 'Off'}
                      size="small"
                      sx={{
                        backgroundColor: profileData.notifications.sms ? '#dcfce7' : '#fef2f2',
                        color: profileData.notifications.sms ? '#166534' : '#dc2626',
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Transaction History */}
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Transaction History
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {transactions.map((tx) => (
                <Paper
                  key={tx.id}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      {tx.description}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {tx.amount} {tx.currency}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditTransaction(tx.id)}
                    sx={{
                      borderRadius: '8px',
                      borderColor: '#8b5cf6',
                      color: '#8b5cf6',
                      '&:hover': {
                        borderColor: '#00d4ff',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                      },
                    }}
                  >
                    Edit
                  </Button>
                </Paper>
              ))}
            </Box>

            {editingTransactionId && (
              <Box sx={{ mt: 3, p: 2, borderRadius: '12px', background: '#f0f4ff' }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Editing Transaction ID: {editingTransactionId}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setEditingTransactionId(null)}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: '#8b5cf6',
                    '&:hover': {
                      backgroundColor: '#7c3aed',
                    },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Gallery Dialog */}
      <Dialog
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #8b5cf6, #00d4ff)', color: '#fff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <PhotoLibrary />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Photo Gallery
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            {mockGalleryImages.map((image, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    },
                  }}
                  onClick={() => handleGallerySelect(image)}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 120,
                        background: `linear-gradient(45deg, #8b5cf6, #00d4ff)`,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.875rem',
                      }}
                    >
                      Photo {index + 1}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setGalleryOpen(false)}
            sx={{
              borderRadius: '8px',
              borderColor: '#8b5cf6',
              color: '#8b5cf6',
              '&:hover': {
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
              },
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
