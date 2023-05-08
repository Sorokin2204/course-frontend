import React from 'react';
import styles from './SideMenuItem.module.scss';
import { Box } from '@mui/material';
const SideMenuItem = ({ children, icon, active, onClick }) => {
  return (
    <Box sx={{ display: 'flex', userSelect: 'none', cursor: 'pointer', alignItems: 'center', padding: '10px ', marginBottom: '15px', borderRadius: '8px', color: '#828282', ...(active && { backgroundColor: '#4282E1', color: '#fff' }), transition: 'all 0.3s' }} onClick={onClick}>
      <Box src={icon} sx={{ width: '20px', height: '20px', WebkitMaskPosition: '50% 50%', WebkitMaskImage: `url(${icon})`, WebkitMaskSize: 'contain', backgroundColor: '#828282', marginRight: '10px', transition: 'all 0.3s', ...(active && { backgroundColor: '#fff' }) }}></Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default SideMenuItem;
