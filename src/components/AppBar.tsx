import React, { useRef } from 'react';
import MUIAppBar from '@mui/material/AppBar';
import Link from 'next/link';
import { Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLoginContext } from '../lib/loginContext';

export default function AppBar() {
  const { user  } = useLoginContext();

  const container = useRef(null);



  return (
    <Box ref={container}>
      <MUIAppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Typography variant="h6" component="div">
              WallChanger
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Link href="/settings" passHref>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Link>
          ) : (
            <Link href="/sign-in" passHref>
              <Button>Sign in</Button>
            </Link>
          )}
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}
