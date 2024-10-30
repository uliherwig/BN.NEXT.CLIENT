import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoader() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <CircularProgress />
    </div>
  );
}
