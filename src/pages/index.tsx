import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Friends from '../components/Friends';
import PostWallpaper from '../components/PostWallpaper';
import TokenPanel from '../components/Token';

import { useLoginContext } from '../lib/loginContext';
import { useTranslation } from '../lib/translations';

export default function Index() {
  const { user } = useLoginContext();
  const { i18n } = useTranslation();

  // else show the landing page

  return (
    <>
      <Head>
        <title>{i18n.t('pages.index.landingTitle')}</title>
      </Head>
      {user ? (
        <Box>
          <TokenPanel />
          <Typography> username : {user?.username}</Typography>
          <Typography> bio : {user?.description}</Typography>
          <Friends />
          <PostWallpaper />
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
