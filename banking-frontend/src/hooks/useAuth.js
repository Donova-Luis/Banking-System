import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // Stores user object
  const [loading, setLoading] = useState(true); // Shows loading spinner while fetching

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/auth/me', {
          withCredentials: true, // 🔥 Send cookies (token)
        });
        setUser(res.data); // Set logged in user
      } catch (err) {
        console.error('Error fetching profile:', err);
        setUser(null); // Reset user on error
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
