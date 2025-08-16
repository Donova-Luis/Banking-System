// src/hooks/useProfile.js
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useProfile = () => {
  const { token, user, logout } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(!user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfile(user);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        logout();
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, user, logout, navigate]);

  return { profile, loading };
};

export default useProfile;
