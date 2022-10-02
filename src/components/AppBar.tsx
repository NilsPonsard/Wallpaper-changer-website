import React from 'react';
import MUIAppBar from '@mui/material/AppBar';
import Link from 'next/link';
import { Toolbar, Typography, Box, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useLoginContext } from '../lib/loginContext';
import { logout } from '../lib/api/api';

export default function AppBar() {
  const { user, credentialsManager } = useLoginContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = () => {
    logout(credentialsManager).then(() => {
      enqueueSnackbar('Logged out', { variant: 'success' });
    });
  };

  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Typography variant="h6" component="div">
            WallChanger
          </Typography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link href="/sign-in" passHref>
            <Button>Sign in</Button>
          </Link>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}
