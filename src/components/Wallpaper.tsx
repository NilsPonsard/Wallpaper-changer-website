/* eslint-disable @next/next/no-img-element */
import { Paper, Typography } from '@mui/material';
import React from 'react';
import { Wallpaper } from '../lib/api/wallpaper';

export default function WallpaperDisplay({
  wallpaper,
}: {
  wallpaper: Wallpaper;
}) {
  return (
    <Paper sx={{ p: 1, m: 1 }}>
      <Typography variant='h5'>{wallpaper.title}</Typography>
      <img
        src={wallpaper.url}
        alt={wallpaper.title}
        style={{ maxWidth: '90vw', maxHeight: '30rem' }}
      />
    </Paper>
  );
}
