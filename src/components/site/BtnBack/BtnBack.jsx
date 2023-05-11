import React from 'react';
import styles from './BtnBack.module.scss';
import { Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const BtnBack = ({ children, ...props }) => {
  return (
    <Box {...props} sx={{ fontSize: '20px', display: 'flex', alignItems: 'center', fontFamily: 'Montserrat, sans-serif', cursor: 'pointer', userSelect: 'none' }}>
      <ArrowBackIosIcon sx={{ fontSize: '16px', marginRight: '10px' }} />
      {children}
    </Box>
  );
};

export default BtnBack;
