import React from 'react';
import styles from './CourseStepsItem.module.scss';
import { Box } from '@mui/material';
const CourseStepsItem = ({ name, info, active }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '24px 1fr', alignItems: 'center', columnGap: '13px', '& + &': { marginTop: '60px' } }}>
      <Box sx={{ zIndex: '1' }}>
        <img
          src={active ? '/img/checkbox-big.svg' : '/img/checkbox-big-disable.svg'}
          style={{
            display: 'block',
            width: '24px',
            height: '24px',
          }}
        />
      </Box>
      <Box>
        <Box sx={{ fontWeight: '600', fontSize: '20px', lineHeight: '30px', marginBottom: '5px', color: active ? '#000' : '#828282' }}>{name}</Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '10px auto', alignItems: 'center', columnGap: '5px' }}>
          <Box sx={{ width: '10px', height: '10px', clipPath: 'circle(50% at 50% 50%)', backgroundColor: active ? '#4282E1' : '#828282' }}></Box>
          <Box sx={{ color: '#828282' }}>{info}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseStepsItem;
