import { Box, Button, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { postWallpaper } from '../lib/api/wallpaper';

import { useLoginContext } from '../lib/loginContext';
import { useTranslation } from '../lib/translations';

export default function Index() {
  const { user, credentialsManager } = useLoginContext();
  const { i18n } = useTranslation();

  const [formState, setFormState] = React.useState({
    targetUserId: '',
    wallpaperUrl: '',
  });

  function updateFormState(
    target: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormState({
      ...formState,
      [target]: event.target.value,
    });
  }

  const setWallpaper = () => {
    postWallpaper(credentialsManager, {
      users: [formState.targetUserId],
      url: formState.wallpaperUrl,
    });
  };

  // else show the landing page

  return (
    <>
      <Head>
        <title>{i18n.t('pages.index.landingTitle')}</title>
      </Head>
      {user ? (
        <Box>
          <Typography> user id : {user?.id}</Typography>
          <Typography> set wallpaper</Typography>
          <TextField
            label="target user id"
            onChange={(e) => updateFormState('targetUserId', e)}
          />
          <TextField
            label="wallpaper url"
            onChange={(e) => updateFormState('wallpaperUrl', e)}
          />
          <Button variant="contained" color="primary" onClick={setWallpaper}>
            set wallpaper
          </Button>
        </Box>
      ) : (
        <Box>
          <Link href="/sign-in" passHref>
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
}
