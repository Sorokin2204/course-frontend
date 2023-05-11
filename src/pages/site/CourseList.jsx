import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
import CourseItem from '../../components/site/CourseItem/CourseItem';
const CourseList = () => {
  return (
    <div>
      <Box sx={{ marginBottom: '53px', fontWeight: '400', fontSize: '20px', lineHeight: '30px' }}>Барлық инструменттер</Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '24px' }}>
        {' '}
        <CourseItem />
      </Box>
    </div>
  );
};

export default CourseList;
