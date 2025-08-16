// src/components/BackgroundMusic.js
import React, { useEffect, useRef, useState } from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 50;
      audioRef.current.play().catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Play error:', err);
      });
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      <Tooltip title={isPlaying ? 'Pause Music' : 'Play Music'}>
        <IconButton color="primary" onClick={toggleMusic}>
          {isPlaying ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
      </Tooltip>
      <audio ref={audioRef} loop>
        <source src="/public/music/tokyo-music-walker-day-off-chosic.com_.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default BackgroundMusic;
