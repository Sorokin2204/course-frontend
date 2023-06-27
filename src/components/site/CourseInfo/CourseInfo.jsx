import React from 'react';
import styles from './CourseInfo.module.scss';
import { Box, CircularProgress, useMediaQuery } from '@mui/material';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
import Questions from '../Questions/Questions';
import { useNavigate } from 'react-router';
import { dataSteps } from '../CourseSteps/CourseSteps';
import { useSelector } from 'react-redux';
const CourseInfo = () => {
  const data = [
    {
      answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ratione obcaecati facilis nostrum fugiat. Accusamus eum aliquam soluta necessitatibus beatae assumenda consequuntur. Architecto pariatur harum quidem voluptatibus voluptas optio dolor.',
      question: 'Осы инструмент бойынша жалпы сұрақтар',
    },
    {
      answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ratione obcaecati facilis nostrum fugiat. Accusamus eum aliquam soluta necessitatibus beatae assumenda consequuntur. Architecto pariatur harum quidem voluptatibus voluptas optio dolor.',
      question: 'Осы инструмент бойынша жалпы сұрақтар',
    },
    {
      answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ratione obcaecati facilis nostrum fugiat. Accusamus eum aliquam soluta necessitatibus beatae assumenda consequuntur. Architecto pariatur harum quidem voluptatibus voluptas optio dolor.',
      question: 'Осы инструмент бойынша жалпы сұрақтар',
    },
    {
      answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor ratione obcaecati facilis nostrum fugiat. Accusamus eum aliquam soluta necessitatibus beatae assumenda consequuntur. Architecto pariatur harum quidem voluptatibus voluptas optio dolor.',
      question: 'Осы инструмент бойынша жалпы сұрақтар',
    },
  ];
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:1100px)');
  const { activeChapter } = useSelector((state) => state.app);
  const {
    authUser: { data: auth },
  } = useSelector((state) => state.user);
  return (
    <Box
      sx={{
        background: '#FFFFFF',
        border: { mob: 'none', desk: '1px solid #E0E0E0' },
        borderRadius: '12px',
        padding: { mob: '0', desk: '30px 24px' },
      }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <Box>
          <Box sx={{ fontWeight: '400', fontSize: { mob: '14px', desk: '16px' }, lineHeight: { mob: '21px', desk: '24px' }, color: '#828282' }}>Инструмент</Box>
          <Box sx={{ fontWeight: '600', fontSize: { mob: '20px', desk: '24px' }, lineHeight: { mob: '30px', desk: '36px' } }}>Аудит бизнеса</Box>
        </Box>
        <Box sx={{ position: 'relative', height: '48px', width: '48px' }}>
          <Box sx={{ width: '100%', height: '100%', position: 'absolute', borderRadius: '50%', border: '4px solid #F2F2F2' }}></Box>
          <CircularProgress sx={{ color: '#4282E1' }} size={48} variant="determinate" value={parseInt((100 * (activeChapter + 1)) / dataSteps?.length)} />
          <Box
            sx={{
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '400',
              fontSize: '14px',
              width: '35.5px',
              height: '35.5px',
              borderRadius: '50%',
              backgroundColor: '#4282E1',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}>
            {parseInt((100 * (activeChapter + 1)) / dataSteps?.length)}
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginBottom: '25px', fontSize: { mob: '14px', desk: '16px' }, lineHeight: { mob: '22px', desk: '26px' } }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ex dolorem porro maxime velit praesentium possimus, perferendis, enim et rem deserunt libero, error ut similique. Impedit repellendus officia ab veniam!
      </Box>
      {auth?.activeCourse ? (
        <ButtonCustom
          onClick={() => {
            navigate('/list/audit/start');
          }}
          style={{ width: '100%', marginBottom: matches ? '40px' : '30px' }}>
          Қайта өту
        </ButtonCustom>
      ) : (
        <ButtonCustom
          onClick={() => {
            window.location.href = 'https://wa.me/87068368442';
            // navigate('/list/audit/start');
          }}
          style={{ width: '100%', marginBottom: matches ? '40px' : '30px' }}>
          сатып алу
        </ButtonCustom>
      )}
      <Box>
        <Box sx={{ fontWeight: '600', fontSize: '20px', lineHeight: '30px', marginBottom: '15px' }}>Автор</Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ width: '20px', height: '20px' }} src="/img/avatar-course-1.png" />
          <Box sx={{ fontWeight: '400', fontSize: '14px', lineHeight: '21px', color: '#828282', marginLeft: '5px' }}>Артур Пирожков</Box>
        </Box>
      </Box>
      <Box sx={{ paddingTop: { mob: '30px', desk: '40px' }, marginTop: { mob: '30px', desk: '40px' }, fontWeight: '600', fontSize: '20px', lineHeight: '30px', borderTop: '1px solid #E0E0E0', marginBottom: '15px' }}>FAQ</Box>
      <Questions data={data} />
      <Box sx={{ fontWeight: '600', fontSize: '20px', lineHeight: '30px', marginBottom: '15px', marginTop: { mob: '30px', desk: '40px' } }}>История</Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '15px', paddingTop: '15px', borderBottom: '1px solid #E0E0E0', fontWeight: '400' }}>
        <Box sx={{ color: '#828282', fontSize: '16px' }}>20.11.2022</Box>
        <Box sx={{ fontSize: '16px', color: '#4282E1' }}>Ашу</Box>
      </Box>{' '}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '15px', paddingTop: '15px', borderBottom: '1px solid #E0E0E0', fontWeight: '400' }}>
        <Box sx={{ color: '#828282', fontSize: '16px' }}>20.11.2022</Box>
        <Box sx={{ fontSize: '16px', color: '#4282E1' }}>Ашу</Box>
      </Box>
    </Box>
  );
};

export default CourseInfo;
