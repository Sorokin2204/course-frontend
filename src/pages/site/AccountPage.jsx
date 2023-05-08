import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
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
  return (
    <>
      {auth && (
        <Box>
          {/* <BtnBack>Менің профилім</BtnBack> */}
          <Box sx={{ display: 'grid', gridGap: '25px', gridTemplateColumns: '343px 1fr' }}>
            <DashboardSide />
            <AccountSettings />
          </Box>
        </Box>
      )}
    </>
  );
};

export default AccountPage;
