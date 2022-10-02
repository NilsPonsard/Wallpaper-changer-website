import { Box, Button, Typography, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { generateClientToken, getClientToken } from '../lib/api/client';
import { useLoginContext } from '../lib/loginContext';

export default function TokenPanel() {
  const { credentialsManager } = useLoginContext();

  const [token, setToken] = React.useState<string>('');

  useEffect(() => {
    getClientToken(credentialsManager).then((data) => {
      setToken(data.token);
    });
  }, [credentialsManager]);

  const handleGenerateToken = () => {
    generateClientToken(credentialsManager)
      .then((data) => {
        setToken(data.token);
      })
      .catch(() => {
        setToken('Error receiving token');
      });
  };

  return (
    <Box>
      <Typography variant="h4">Client Token</Typography>
      <Stack direction="row" spacing={2}>
        <Typography component="code">
          {token === '' ? 'Click the button to generate a token' : token}
        </Typography>
        <Button onClick={handleGenerateToken} variant="text">
          Generate token
        </Button>
      </Stack>
    </Box>
  );
}
