import { Box, Button, Tab, Tabs } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Friends from '../components/Friends';
import HistoryPanel from '../components/History';
import PostWallpaper from '../components/PostWallpaper';

import { useLoginContext } from '../lib/loginContext';
import { useTranslation } from '../lib/translations';

export default function Index() {
  const { user } = useLoginContext();
  const { i18n } = useTranslation();

  const [panel, setPanel] = React.useState(0);

  // else show the landing page

  return (
    <>
      <Head>
        <title>{i18n.t('pages.index.landingTitle')}</title>
      </Head>

      {user ? (
        <Box>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={panel}
                onChange={(e, newValue) => setPanel(newValue)}
              >
                <Tab label="Wallpaper" />
                <Tab label="Friends" />
                <Tab label="History" />
              </Tabs>
            </Box>
            {panel === 0 && <PostWallpaper />}
            {panel === 1 && <Friends />}
            {panel === 2 && <HistoryPanel />}
          </Box>
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
