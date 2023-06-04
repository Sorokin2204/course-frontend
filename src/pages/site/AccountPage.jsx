import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box, useMediaQuery } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AccountSettings from '../../components/site/AccountSettings/AccountSettings';
import { AuthContext } from '../../components/site/SiteLayout/SiteLayout';
import BtnBack from '../../components/site/BtnBack/BtnBack';
import DashboardSide from '../../components/site/DashboardSide/DashboardSide';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('my-advert');
  // const { auth, checkAuth } = useContext(AuthContext);
  const {
    updateUser: { data: updateUserData, loading: updateUserLoading },
    authUser: { data: auth },
  } = useSelector((state) => state.user);
  const { settingStep } = useSelector((state) => state.app);
  const matches = useMediaQuery('(min-width:1100px)');
  return (
    <>
      {auth && (
        <Box>
          {/* <BtnBack>Менің профилім</BtnBack> */}
          <Box sx={{ display: 'grid', gridGap: '25px', gridTemplateColumns: { mob: '1fr', desk: '343px 1fr' } }}>
            {(settingStep == 0 || matches) && <DashboardSide />}
            {(settingStep == 1 || matches) && <AccountSettings />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default AccountPage;
