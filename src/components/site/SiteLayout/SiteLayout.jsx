import React, { createContext, useEffect, useState } from 'react';
import styles from './SiteLayout.module.scss';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { apiUrl } from '../../../utils/apiUrl';
import Loading from '../Loading/Loading';
import SideBar from '../SideBar/SideBar';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authUser } from '../../../redux/actions/user/authUser';
import { resetAuthUser } from '../../../redux/slices/user.slice';

export const AuthContext = createContext(null);

export const darkTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        autoComplete: 'off',
      },
      styleOverrides: {
        notchedOutline: { borderWidth: '1px !important', transition: 'border 0.3s', outline: 'none' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: 'Montserrat, sans-serif',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          textTransform: 'none',
          fontFamily: 'Montserrat, sans-serif',
          borderRadius: '2px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {},
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {},
      },
    },
  },
  palette: {
    primary: { main: '#3f51b5' },
  },
  breakpoints: {
    values: { mob: 0, desk: 1100 },
  },
});

const SiteLayout = ({ children }) => {
  const dispatch = useDispatch();

  const {
    authUser: { data: authUserData, error: authUserError, loading: authUserLoading },
  } = useSelector((state) => state.user);

  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    // dispatch(authUser());
  }, []);
  useEffect(() => {
    dispatch(authUser());
  }, []);
  // useEffect(() => {
  //   if (authUserError) {
  //     navigate('/');
  //   }
  // }, [authUserError]);

  console.log(pathname);
  // function checkAuth() {
  //   axios
  //     .get(apiUrl('auth'), { headers: { 'auth-token': localStorage.getItem('token') } })
  //     .then((res) => {
  //       setAuth({ loading: false, data: res.data });
  //     })
  //     .catch((err) => {
  //       setAuth({ loading: false, data: null, error: true });
  //     });
  // }
  useEffect(() => {
    if (authUserError && !authUserLoading) {
      localStorage.removeItem('token');
      dispatch(resetAuthUser());
      navigate('/');
    }
  }, [authUserError]);
  useEffect(() => {
    if (!authUserData?.activeCourse && pathname == '/list/audit/start') {
      navigate('/list/audit');
    }
  }, [authUserData]);
  useEffect(() => {
    if (authUserData?.role == 'admin') {
      navigate('/admin/users');
    }
  }, [authUserData]);
  return (
    <>
      {authUserData?.role == 'user' ? (
        <ThemeProvider theme={darkTheme}>
          <Box sx={{ width: '100vw', display: 'grid', gridTemplateColumns: { mob: '1fr', desk: '375px 1fr' }, minHeight: '100vh', justifyContent: 'stretch' }}>
            <SideBar />
            <Box sx={{ padding: { mob: '82px 16px 102px 16px', desk: '38px 28px 35px 28px' }, background: { mob: '#fff', desk: '#FBFBFB' } }}>{authUserData ? <div>{children}</div> : <div></div>}</Box>
          </Box>
        </ThemeProvider>
      ) : (
        <></>
      )}
    </>
  );
};

export default SiteLayout;
