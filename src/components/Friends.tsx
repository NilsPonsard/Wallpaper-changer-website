import React from 'react';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';
import { useLoginContext } from '../lib/loginContext';
import { getFriends, sendFriendRequest } from '../lib/api/user';
import UserCard from './UserCard';

export default function Friends() {
  const { credentialsManager } = useLoginContext();
  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = React.useState('');

  const { error, data, mutate } = useSWR('/user/friend', async () =>
    getFriends(credentialsManager)
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box>
      <form>
        <TextField
          label="Add Friend..."
          variant='standard'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            sendFriendRequest(credentialsManager, username)
              .then(() => {
                setUsername('');
                enqueueSnackbar('Friend request sent', { variant: 'success' });
                mutate();
              })
              .catch(() => {
                enqueueSnackbar('Failed to send friend request', {
                  variant: 'error',
                });
              });
          }}
          type="submit"
        >
          Add
        </Button>
      </form>
      <Typography variant="h4">Friends</Typography>
      <Stack spacing={2}>
        {data.friends.map((friend) => (
          <UserCard user={friend} key={friend.id} />
        ))}
      </Stack>
      <Typography variant="h4">Friend requests</Typography>
      <Stack spacing={2}>
        {data.requests.map((friend) => (
          <UserCard user={friend} key={friend.id} add />
        ))}
      </Stack>
      <Typography variant="h4">Friend requests sent</Typography>
      <Stack spacing={2}>
        {data.sent.map((friend) => (
          <UserCard user={friend} key={friend.id} />
        ))}
      </Stack>
    </Box>
  );
}
