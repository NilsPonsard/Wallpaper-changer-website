import { Button, Typography, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import { sendFriendRequest, User } from '../lib/api/user';
import { useLoginContext } from '../lib/loginContext';

export default function UserCard({ user, add }: { user: User; add?: boolean }) {
  const { credentialsManager } = useLoginContext();
  const { enqueueSnackbar } = useSnackbar();

  const addUser = () => {
    sendFriendRequest(credentialsManager, user.username)
      .then(() => {
        enqueueSnackbar('Friend request sent', { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar('Failed to send friend request', { variant: 'error' });
      });
  };

  return (
    <Paper elevation={3} sx={{ m: 1, p: 1 }}>
      <Typography>{user.username}</Typography>
      <Typography sx={{color: "text.secondary"}}>{user.description}</Typography>
      {add && <Button onClick={addUser}>Accept</Button>}
    </Paper>
  );
}
