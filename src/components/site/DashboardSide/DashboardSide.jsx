import React from 'react';
import styles from './DashboardSide.module.scss';
import { Box, LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { ArrowBackIos } from '@mui/icons-material';
const DashboardSide = () => {
  const {
    authUser: { data: auth },
  } = useSelector((state) => state.user);
  return (
    <Box sx={{ borderRadius: '12px', border: '1px solid #E0E0E0', background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 24px 24px 24px' }}>
      {auth?.avatar ? (
        <Box
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '2px solid trasparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/${auth?.avatar}`}
            style={{
              objectFit: 'cover',
              display: 'block',
              width: '100px',
              height: '100px',
              borderRadius: '50%',
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: '#E0E0E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
          <img src="img/add.svg" style={{ width: '18px' }} />
        </Box>
      )}
      <Box sx={{ marginTop: '14px', textAlign: 'center', fontSize: '20px', lineHeight: '30px', fontWeight: '600' }}>{`${auth?.name} ${auth?.surname}`}</Box>
      <Box sx={{ marginTop: '6px', textAlign: 'center', fontSize: '16px', lineHeight: '24px', fontWeight: '400' }}>{auth?.profession}</Box>
      <Box sx={{ marginBottom: '12px', marginTop: '30px', fontSize: '16px', lineHeight: '24px', alignSelf: 'start' }}>Қолданылған инструменттер:</Box>
      <Box sx={{ marginBottom: '30px', display: 'grid', width: '100%', gridTemplateColumns: '1fr auto', columnGap: '30px', alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={30} sx={{ '& .MuiLinearProgress-bar': { borderRadius: '8px', background: '#4282E1' }, '&.MuiLinearProgress-root': { borderRadius: '8px', height: '6px', background: 'rgba(66, 130, 225, 0.15)' }, width: '100%' }} />
        </Box>{' '}
        <Box sx={{ color: '#4282E1' }}>3/15</Box>
      </Box>
      <Box sx={{ marginBottom: '12px', marginTop: '30px', fontSize: '16px', lineHeight: '24px', alignSelf: 'start' }}>Последние посещения:</Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', alignSelf: 'stretch', justifyContent: 'space-between' }}>
        <img src="../img/teach.svg" />
        <img src="../img/teach.svg" />
        <img src="../img/teach.svg" />
        <img src="../img/teach.svg" />
      </Box>
      <Box sx={{ marginBottom: '12px', marginTop: '50px', fontSize: '16px', lineHeight: '24px', alignSelf: 'start' }}>Поддержка:</Box>
      <Box sx={{ alignSelf: 'stretch' }}>
        <Box sx={{ border: '1px solid #E0E0E0', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', padding: '8px 16px', alignItems: 'center' }}>
          <img src="img/headset.svg" />
          <Box sx={{ marginLeft: '12px' }}>Поддержка</Box> <ArrowBackIos sx={{ transform: 'rotate(180deg)', color: '#828282', fontSize: '14px' }} />
        </Box>
        <Box sx={{ marginTop: '5px', border: '1px solid #E0E0E0', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', padding: '8px 16px', alignItems: 'center' }}>
          <img src="img/group.svg" />
          <Box sx={{ marginLeft: '12px' }}>Достарыңды шақыр</Box> <ArrowBackIos sx={{ transform: 'rotate(180deg)', color: '#828282', fontSize: '14px' }} />
        </Box>
        <Box sx={{ marginTop: '5px', border: '1px solid #E0E0E0', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', padding: '8px 16px', alignItems: 'center' }}>
          <img src="img/delete.svg" />
          <Box sx={{ marginLeft: '12px' }}>Аккаунтты жою</Box>
          <ArrowBackIos sx={{ transform: 'rotate(180deg)', color: '#828282', fontSize: '14px' }} />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardSide;
