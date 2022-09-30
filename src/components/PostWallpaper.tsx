import {
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
  Box,
  Stack,
  Button,
} from '@mui/material';
import React from 'react';
import useSWR from 'swr';
import { getFriends } from '../lib/api/user';
import { useLoginContext } from '../lib/loginContext';
import { postWallpaper } from '../lib/api/wallpaper';

export default function PostWallpaper() {
  const { credentialsManager } = useLoginContext();

  const [form, setForm] = React.useState<{
    title: string;
    url: string;
    target: number[];
  }>({
    title: '',
    url: '',
    target: [],
  });

  const { data, error } = useSWR('/user/friend', async () =>
    getFriends(credentialsManager)
  );

  const handleSubmit = () => {
    postWallpaper(credentialsManager, form);
  };

  return (
    <Box sx={{ maxWidth: '40rem' }}>
      <Stack spacing={2}>
        <Typography variant="h3">Post a wallpaper</Typography>
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => {
            setForm({
              ...form,
              title: e.target.value,
            });
          }}
        />
        <TextField
          label="URL"
          value={form.url}
          onChange={(e) => {
            setForm({
              ...form,
              url: e.target.value,
            });
          }}
        />

        <Typography variant="h4">select friends</Typography>

        {error && <div>failed to load friends</div>}

        <List>
          {data?.friends.map((friend) => (
            <ListItem key={friend.id}>
              <ListItemText
                primary={friend.username}
                secondary={friend.description}
              />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setForm({
                        ...form,
                        target: [...form.target, friend.id],
                      });
                    } else {
                      setForm({
                        ...form,
                        target: form.target.filter((id) => id !== friend.id),
                      });
                    }
                  }}
                  checked={form.target.includes(friend.id)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Stack>

      {form.target.length > 0 && <Button onClick={handleSubmit}>Post</Button>}
    </Box>
  );
}
