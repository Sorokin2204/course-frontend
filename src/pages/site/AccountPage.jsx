import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import { Box } from '@mui/material';
import UserAdvertList from '../../components/site/UserAdvertList/UserAdvertList';
import AccountSettings from '../../components/site/AccountSettings/AccountSettings';
import { AuthContext } from '../../components/site/SiteLayout/SiteLayout';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('my-advert');
  const { auth, checkAuth } = useContext(AuthContext);
  return (
    <>
      {auth?.data && (
        <div className="container">
          <Box sx={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              onClick={() => {
                setActiveTab('my-advert');
              }}
              sx={{ marginLeft: 'auto', fontSize: '18px', transition: 'all 0.3s', userSelect: 'none', cursor: 'pointer', fontWeight: '600', ...(activeTab == 'my-advert' ? { color: '#3f51b5' } : { opacity: '0.4' }) }}>
              Мои объявления
            </Box>
            <Box
              onClick={() => {
                setActiveTab('my-account');
              }}
              sx={{ transition: 'all 0.3s', userSelect: 'none', marginRight: 'auto', fontSize: '18px', fontWeight: '600', cursor: 'pointer', marginLeft: '30px', ...(activeTab == 'my-account' ? { color: '#3f51b5' } : { opacity: '0.4' }) }}>
              Кабинет
            </Box>
          </Box>{' '}
          {activeTab == 'my-account' ? <AccountSettings /> : <UserAdvertList />}
        </div>
      )}
    </>
  );
};

export default AccountPage;
