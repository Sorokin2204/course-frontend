import React from 'react';
import styles from './CourseSteps.module.scss';
import { Box } from '@mui/material';
import CourseStepsItem from '../CourseStepsItem/CourseStepsItem';
const CourseSteps = () => {
  const dataSteps = [
    {
      name: 'Бастапқы инструменттер',
      info: '3 видео | 180 минут',
      active: true,
    },
    {
      name: 'Айналым(обороты)',
      info: '2 видео | 100 минут',
      active: false,
    },
    {
      name: 'Үстеме(наценка)',
      info: '2 видео | 100 минут',
      active: false,
    },
    {
      name: 'Тауардың қалдығы(остаток товара)',
      info: '2 видео | 100 минут',
      active: false,
    },
    {
      name: 'Оптовиктердің/поставщиктердің алдындағы қарыз(долг перед постащиками)',
      info: '2 видео | 100 минут',
      active: false,
    },
    {
      name: 'Маркетинг',
      info: '2 видео | 100 минут',
      active: false,
    },
  ];
  return (
    <Box>
      <Box sx={{ fontWeight: '600', fontSize: '24px', lineHeight: '36px', color: '#4282E1' }}>Главы</Box>
      <Box sx={{ position: 'relative', paddingTop: '20px', paddingBottom: '20px', marginTop: '23px' }}>
        <Box sx={{ position: 'absolute', width: '6px', background: 'rgba(66, 130, 225, 0.15)', height: '100%', left: '9px', top: 0, borderRadius: '2px' }}></Box>
        {dataSteps?.map((itemStep) => (
          <CourseStepsItem {...itemStep} />
        ))}
      </Box>
    </Box>
  );
};

export default CourseSteps;
