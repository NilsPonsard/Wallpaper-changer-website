import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React from 'react';
import TokenPanel from '../components/Token';
import { logout } from '../lib/api/api';
import { useLoginContext } from '../lib/loginContext';

export default function Settings() {
  const { credentialsManager, validUser } = useLoginContext();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const handleLogout = () => {
    logout(credentialsManager).then(() => {
      enqueueSnackbar('Logged out', { variant: 'success' });
      router.push('/');
    });
  };

  if (!validUser) router.push('/');

  return (
    <Box>
      <Typography variant="h3">Settings</Typography>
      <TokenPanel />

      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>
    </Box>
  );
}
