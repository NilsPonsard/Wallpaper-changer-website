import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { generateClientToken } from '../lib/api/client';
import { useLoginContext } from '../lib/loginContext';

export default function TokenPanel() {
  const { credentialsManager } = useLoginContext();

  const [token, setToken] = React.useState<string>('');

  const handleGenerateToken = () => {
    generateClientToken(credentialsManager).then((data) => {
      setToken(data.token);
    }).catch(() => {
      setToken('Error receiving token');
    });
  };

  return (
    <Box>
      <Typography variant="h4">Client Token</Typography>
      <Button onClick={handleGenerateToken} variant="contained">
        Generate token
      </Button>
      <Typography>
        {token === ''
          ? 'For security reason we can’t retrieve your token'
          : token}
      </Typography>
    </Box>
  );
}
