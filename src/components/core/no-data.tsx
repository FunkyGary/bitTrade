import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FileX } from '@phosphor-icons/react/dist/ssr/FileX';

export function NoData(): React.JSX.Element {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" height="300px" justifyContent="center">
      <FileX size={128} />
      <Typography variant="h4">No Data</Typography>
    </Box>
  );
}
