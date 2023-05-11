import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
import BtnBack from '../../components/site/BtnBack/BtnBack';
import CourseSteps from '../../components/site/CourseSteps/CourseSteps';
import CourseInfo from '../../components/site/CourseInfo/CourseInfo';
const CourseSingle = () => {
  const navigate = useNavigate();
  return (
    <div>
      <BtnBack
        onClick={() => {
          navigate('/list');
        }}>
        Аудит бизнеса
      </BtnBack>
      <Box sx={{ display: 'grid', gridTemplateColumns: '340px 1fr', marginTop: '27px', columnGap: '20px' }}>
        <CourseSteps />
        <CourseInfo />
      </Box>
    </div>
  );
};

export default CourseSingle;
