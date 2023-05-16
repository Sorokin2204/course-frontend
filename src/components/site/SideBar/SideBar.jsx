import React, { useState } from 'react';
import styles from './SideBar.module.scss';
import { Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SideMenuItem from '../SideMenu/SideMenuItem';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { authUser } from '../../../redux/actions/user/authUser';
import { useDispatch } from 'react-redux';
import { resetAuthUser } from '../../../redux/slices/user.slice';
import BtnBack from '../BtnBack/BtnBack';
import { dataSteps } from '../CourseSteps/CourseSteps';
const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    authUser: { data: auth },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const [activeStep, setActiveStep] = useState(0);
  const { activeChapter } = useSelector((state) => state.app);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #E0E0E0',
        minHeight: '100vh',
        padding: '35px 24px 35px 28px',
        boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.5)',
      }}>
      {pathname === '/list/audit/start' ? (
        <Box sx={{ position: 'fixed', left: '28px', top: '35px', maxWidth: '323px', width: '100%' }}>
          <BtnBack
            onClick={() => {
              navigate('/list/audit');
            }}>
            Содержание
          </BtnBack>
          <Box sx={{ marginTop: '30px' }}>
            {dataSteps?.map((itemStep, indexStep) => (
              <SideMenuItem active={activeChapter == indexStep} onClick={() => {}}>
                {itemStep?.name}
              </SideMenuItem>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={{ position: 'fixed', left: '28px', top: '35px', maxWidth: '323px', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
            <img src="/img/logo.svg" style={{ width: '121px' }} />
            <img src="/img/global.svg" style={{ width: '20px' }} />
          </Box>
          <Box>
            <SideMenuItem
              active={pathname == '/dashboard'}
              icon={'img/dashboard.svg'}
              onClick={() => {
                navigate('/dashboard');
              }}>
              Дашборд
            </SideMenuItem>
            <SideMenuItem
              active={pathname == '/list'}
              icon={'img/book.svg'}
              onClick={() => {
                navigate('/list');
              }}>
              Инструменттер
            </SideMenuItem>
            <SideMenuItem
              active={pathname == '/list-2'}
              icon={'img/bookmark.svg'}
              onClick={() => {
                navigate('/list-2');
              }}>
              Менің инструменттерім
            </SideMenuItem>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '42px 1fr 20px', columnGap: '12px', alignItems: 'center', marginTop: 'auto', position: 'fixed', left: '28px', bottom: '35px', width: '100%', maxWidth: '323px' }}>
            {auth?.avatar ? (
              <Box
                sx={{
                  width: '42px',
                  height: '42px',
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
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <img src="/img/add.svg" style={{ width: '18px' }} />
              </Box>
            )}
            <Box sx={{ overflow: 'hidden' }}>
              <Box sx={{ fontSize: '14px', lineHeight: '21px', letterSpacing: '0.01em', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '100%', overflow: 'hidden' }}>{`${auth?.name} ${auth?.surname}`}</Box>
              <Box sx={{ fontSize: '12px', lineHeight: '18px', color: '#828282' }}>{auth?.profession}</Box>
            </Box>{' '}
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/');
                // dispatch(authUser());
              }}>
              <img src="/img/exit.svg" />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SideBar;
