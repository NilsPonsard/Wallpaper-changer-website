import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { sendFriendRequest, User } from '../lib/api/user';
import { useLoginContext } from '../lib/loginContext';

export default function UserCard({ user, add }: { user: User; add?: boolean }) {
  const { credentialsManager } = useLoginContext();

  const addUser = () => {
    sendFriendRequest(credentialsManager, user.username);
  };

  return (
    <Box>
      <Typography>{user.username}</Typography>
      <Typography>{user.description}</Typography>
      {add && <Button onClick={addUser}>Accept</Button>}
    </Box>
  );
}
