import { Box, Typography, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';  
import TokenPanel from '../components/Token';
import { logout } from '../lib/api/api';
import { useLoginContext } from '../lib/loginContext';

export default function Settings() {
  
    const {credentialsManager} = useLoginContext();
    const { enqueueSnackbar } = useSnackbar();
  
  const handleLogout = () => {
    logout(credentialsManager).then(() => {
      enqueueSnackbar('Logged out', { variant: 'success' });
    });
  };

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