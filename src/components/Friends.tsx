import React from 'react';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import useSWR from 'swr';
import { useLoginContext } from '../lib/loginContext';
import { getFriends, sendFriendRequest } from '../lib/api/user';
import UserCard from './UserCard';

export default function Friends() {
  const { credentialsManager } = useLoginContext();

  const [username, setUsername] = React.useState('');

  const { error, data } = useSWR('/user/friend', async () =>
    getFriends(credentialsManager)
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box>
      <form>
        <TextField
          label="Add Friend"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();
            sendFriendRequest(credentialsManager, username);
          }}
          type="submit"
        >
          Add
        </Button>
      </form>
      <Typography>Friends</Typography>
      <Stack spacing={2}>
        {data.friends.map((friend) => (
          <UserCard user={friend} key={friend.id} />
        ))}
      </Stack>
      <Typography>Friend requests</Typography>
      <Stack spacing={2}>
        {data.requests.map((friend) => (
          <UserCard user={friend} key={friend.id} add />
        ))}
      </Stack>
      <Typography>Friend requests sent</Typography>
      <Stack spacing={2}>
        {data.sent.map((friend) => (
          <UserCard user={friend} key={friend.id} />
        ))}
      </Stack>
    </Box>
  );
}
