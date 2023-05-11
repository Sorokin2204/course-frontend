import React from 'react';
import styles from './CourseItem.module.scss';
import { Box } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router';
const CourseItem = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ background: '#FFFFFF', borderRadius: '18px', border: ' 1px solid #E0E0E0', cursor: 'pointer' }}
      onClick={() => {
        navigate('/list/audit');
      }}>
      <img src="/img/course-prev.png" />
      <Box sx={{ padding: '17px 37px 23px 22px', position: 'relative' }}>
        <Box sx={{ fontWeight: '500', fontSize: '24px', lineHeight: '36px' }}>Аудит бизнеса</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: '400', fontSize: '16px', lineHeight: '24px' }}>Артур Пирожков</Box>
          <ChevronRight />
        </Box>
        <Box sx={{ position: 'absolute', top: '-25.5px', right: '26px' }}>
          <img src="/img/avatar-course-1.png" style={{ border: '3px solid #E0E0E0', width: '50px', height: '50px', borderRadius: '50%' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default CourseItem;
