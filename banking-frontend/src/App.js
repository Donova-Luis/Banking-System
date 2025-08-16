import React, { useRef, useState } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import DepositFunds from './components/DepositFunds';
import TransactionHistory from './components/TransactionHistory';
import SendMoneyPage from './components/SendMoneyPage';
import UserProfile from './components/UserProfile';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Start with false

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AuthProvider>
      <HashRouter>
        {/* Audio Element */}
        <audio ref={audioRef} src="/music/tokyo-music-walker-day-off-chosic.com_.mp3" loop />

        {/* Music Control Button */}
        <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 1000 }}>
          <button onClick={togglePlay} style={{ padding: '10px', fontSize: '14px' }}>
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>
        </div>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/deposit" element={<PrivateRoute><DepositFunds /></PrivateRoute>} />
          <Route path="/transactions" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
                    <Route path="/send-money" element={<PrivateRoute><SendMoneyPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;