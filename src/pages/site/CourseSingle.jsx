import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box, useMediaQuery } from '@mui/material';
import BtnBack from '../../components/site/BtnBack/BtnBack';
import CourseSteps from '../../components/site/CourseSteps/CourseSteps';
import CourseInfo from '../../components/site/CourseInfo/CourseInfo';
import { getResult } from '../../redux/actions/user/getResult';
import { setActiveChapter } from '../../redux/slices/app.slice';
const CourseSingle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    authUser: { data: auth },
    getResult: { data: getResultData },
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getResult(auth.id));
  }, []);
  useEffect(() => {
    if (getResultData) {
      dispatch(setActiveChapter(getResultData?.chapter));
    }
  }, [getResultData]);
  const matches = useMediaQuery('(min-width:1100px)');
  return (
    <div>
      {matches && (
        <BtnBack
          onClick={() => {
            navigate('/list');
          }}>
          Аудит бизнеса
        </BtnBack>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { mob: '1fr', desk: '340px 1fr' }, marginTop: { mob: 0, desk: '27px' }, gap: { mob: '30px', desk: '20px' } }}>
        <Box sx={{ ...(!matches && { gridRow: '2/3' }) }}>
          <CourseSteps />
        </Box>
        <Box sx={{ ...(!matches && { gridRow: '1/2' }) }}>
          {' '}
          <CourseInfo />
        </Box>
      </Box>
    </div>
  );
};

export default CourseSingle;
