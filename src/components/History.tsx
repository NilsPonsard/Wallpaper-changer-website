import { Box, Tab, Tabs, Typography } from '@mui/material';

import React from 'react';
import useSWR from 'swr';
import { getHistory } from '../lib/api/wallpaper';
import { useLoginContext } from '../lib/loginContext';
import WallpaperDisplay from './Wallpaper';

export default function HistoryPanel() {
  const { credentialsManager } = useLoginContext();

  const [panel, setPanel] = React.useState(0);

  const { data } = useSWR('/wallpaper/history', () =>
    getHistory(credentialsManager)
  );

  return (
    <Box>
      <Typography variant="h4">History</Typography>
      <Tabs value={panel} onChange={(e, newValue) => setPanel(newValue)}>
        <Tab label="Received" />
        <Tab label="Sent" />
      </Tabs>
      {data && (
        <Box>
          {(panel === 0 ? data.received : data.sent).map((wallpaper) => (
            <WallpaperDisplay wallpaper={wallpaper} key={wallpaper.id} />
          ))}
        </Box>
      )}
    </Box>
  );
}
