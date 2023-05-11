import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router';
import InfoAlert from '../../../components/admin/InfoAlert/InfoAlert';
import Loading from '../../../components/site/Loading/Loading';
// import Loading from '../../../components/admin/Loading/Loading';
import { apiUrl } from '../../../utils/apiUrl';
import styles from './AdminLogin.module.scss';
import InputCustom from '../../../components/site/InputCustom/InputCustom';
import ButtonCustom from '../../../components/site/ButtonCustom/ButtonCustom';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../redux/actions/user/createUser';
import { loginUser } from '../../../redux/actions/user/loginUser';
import { useSelector } from 'react-redux';
import { resetCreateUser, resetLoginUser } from '../../../redux/slices/user.slice';
const AdminLogin = () => {
  const loginForm = useForm({
    defaultValues: {
      password: '',
    },
  });

  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const errors = loginForm?.formState?.errors;
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const {
    authUser: { data: authUserData },
    createUser: { data: createUserData, loading: createUserLoading, error: createUserError },
    loginUser: { data: loginUserData, loading: loginUserLoading, error: loginUserError },
  } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    if (isRegister) {
      dispatch(createUser(data));
    } else {
      dispatch(loginUser(data));
    }
    // setloginRequest({ loading: true });
    // axios
    //   .post(apiUrl(isRegister ? 'register' : 'login'), data)
    //   .then((res) => {
    //
    //     setloginRequest({ loading: false, data: true });
    //
    //   })
    //   .catch((err) => {
    //     setloginRequest({ loading: false, data: null, error: err.response?.data?.error || true });
    //   });
  };
  useEffect(() => {
    if (authUserData) {
      navigate('/dashboard');
    }
  }, [authUserData]);
  useEffect(() => {
    if (loginUserData) {
      localStorage.setItem('token', loginUserData.token);
      navigate('/dashboard');
      dispatch(resetLoginUser());
    }
  }, [loginUserData]);
  useEffect(() => {
    if (createUserData) {
      localStorage.setItem('token', createUserData.token);
      navigate('/dashboard');
      dispatch(resetCreateUser());
    }
  }, [createUserData]);
  return (
    <Box sx={{ overflow: 'hidden', paddingBottom: '285px', background: 'linear-gradient(117.82deg, #C67BFE 2.65%, #F17383 98.16%)', minHeight: '100vh', position: 'relative' }}>
      <Box class="container">
        <Box sx={{ paddingTop: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ fontSize: '32px', fontWeigh: '400', color: '#fff' }}>Logotype</Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              onClick={() => {
                setIsRegister(true);
                loginForm.clearErrors();
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '44px',
                marginRight: '20px',
                userSelect: 'none',
                cursor: 'pointer',
                borderRadius: '21px',
                padding: '0px 26px',
                color: '#fff',
                fontSize: '20px',
                ...(isRegister && { backgroundColor: '#fff', color: '#000' }),
                transition: 'all 0.3s ease-out',
              }}>
              Регистрация
            </Box>
            <Box
              onClick={() => {
                setIsRegister(false);
                loginForm.clearErrors();
              }}
              sx={{ display: 'flex', alignItems: 'center', height: '44px', userSelect: 'none', cursor: 'pointer', borderRadius: '21px', padding: '0px 42px 0px 35px', fontSize: '20px', color: '#fff', ...(!isRegister && { backgroundColor: '#fff', color: '#000' }), transition: 'all 0.3s ease-out' }}>
              Кіру
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 531px', marginTop: '60px', alignItems: 'start' }}>
          <Box>
            <Typography variant="h1" sx={{ marginBottom: '63px', fontSize: '64px', fontWeight: '600', lineHeight: '96px' }}>
              Сіздің бизнесіңізге <br /> арналған аудит <br /> инструменттері
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="/img/avatar-1.png" style={{ zIndex: '5', display: 'block', width: '79px', height: '79px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #EB5757' }} />
              <img src="/img/avatar-2.png" style={{ zIndex: '4', marginLeft: '-20px', display: 'block', width: '79px', height: '79px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #EB5757' }} />
              <img src="/img/avatar-3.png" style={{ zIndex: '3', marginLeft: '-20px', display: 'block', width: '79px', height: '79px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #EB5757' }} />
              <img src="/img/avatar-4.png" style={{ zIndex: '2', marginLeft: '-20px', display: 'block', width: '79px', height: '79px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #EB5757' }} />
              <img src="/img/avatar-5.png" style={{ zIndex: '1', marginLeft: '-20px', display: 'block', width: '79px', height: '79px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #EB5757' }} />
              <img src="/img/plus.svg" style={{ margin: '0 10px', display: 'block', width: '48px', height: '42px', objectFit: 'contain' }} />
              <img src="/img/bonus.svg" style={{ display: 'block', width: '79px', height: '79px', objectFit: 'cover', borderRadius: '50%' }} />
            </Box>
          </Box>
          <Box sx={{ zIndex: '1', display: 'flex', flexDirection: 'column', alignItems: 'start', margin: '0 auto', position: 'relative', width: '100%', backgroundColor: '#fff', borderRadius: '15px', justifyContent: 'start', padding: '50px 27px 60px 27px' }}>
            <Box
              sx={{
                fontWeight: ' 700',
                fontSize: ' 36px',
                lineHeight: ' 44px',
                letterSpacing: '0.02em',
                color: '#000000',
                marginBottom: '40px',
              }}>
              {isRegister ? (
                'Регистрация'
              ) : (
                <>
                  {' '}
                  Аккаунтқа кіру<Box sx={{ color: '#EB5757', display: 'inline-block' }}>!</Box>
                </>
              )}
            </Box>
            <Box sx={{ display: 'grid', width: '100%', gridTemplateColumns: 'auto', gridGap: '19px' }}>
              {isRegister ? (
                <>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '167px 1fr', columnGap: '19px' }}>
                    <InputCustom styleInput={{ height: '52px', fontSize: '20px' }} style={{ width: '100%' }} control={loginForm?.control} label={'Имя'} form={loginForm} name={'name'} errorText={errors?.name && 'Заполните поле'} />
                    <InputCustom styleInput={{ height: '52px', fontSize: '20px' }} style={{ width: '100%' }} control={loginForm?.control} label={'Фамилия'} form={loginForm} name={'surname'} errorText={errors?.surname && 'Заполните поле'} />
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '19px' }}>
                    <InputCustom
                      rules={{ required: true, minLength: 7 }}
                      isPassword
                      styleInput={{ height: '52px', fontSize: '20px' }}
                      style={{ width: '100%' }}
                      control={loginForm?.control}
                      label={'Пароль'}
                      form={loginForm}
                      name={'password'}
                      errorText={errors?.password?.type == 'minLength' ? 'Мин.длинна - 7 символов' : errors?.password ? 'Заполните поле' : ''}
                    />
                    <InputCustom
                      rules={{
                        validate: (val) => {
                          if (loginForm.watch('password') != val) {
                            return 'Your passwords do no match';
                          }
                        },
                      }}
                      isPassword
                      styleInput={{ height: '52px', fontSize: '20px' }}
                      style={{ width: '100%' }}
                      control={loginForm?.control}
                      label={'Повтор пароля'}
                      form={loginForm}
                      name={'passwordRepeat'}
                      errorText={errors?.passwordRepeat && 'Пароль не совподает'}
                    />
                  </Box>{' '}
                  <InputCustom
                    styleInput={{ height: '52px', fontSize: '20px' }}
                    style={{ width: '100%' }}
                    control={loginForm?.control}
                    label={'Телефон'}
                    form={loginForm}
                    name={'phone'}
                    errorText={errors?.phone?.type == 'pattern' ? 'Неверный формат телефона' : errors?.phone ? 'Заполните поле' : ''}
                    isPhone={true}
                  />
                  <InputCustom
                    styleInput={{ height: '52px', fontSize: '20px' }}
                    style={{ width: '100%' }}
                    control={loginForm?.control}
                    label={'Почта'}
                    form={loginForm}
                    name={'email'}
                    errorText={errors?.email?.type == 'pattern' ? 'Неверный формат почты' : errors?.email ? 'Заполните поле' : ''}
                    isEmail={true}
                  />
                </>
              ) : (
                <>
                  <InputCustom
                    styleInput={{ height: '52px', fontSize: '20px' }}
                    style={{ width: '100%' }}
                    control={loginForm?.control}
                    label={'Почта'}
                    form={loginForm}
                    name={'emailLogin'}
                    errorText={errors?.emailLogin?.type == 'pattern' ? 'Неверный формат почты' : errors?.emailLogin ? 'Заполните поле' : ''}
                    isEmail={true}
                  />
                  <InputCustom
                    isPassword
                    styleInput={{ height: '52px', fontSize: '20px' }}
                    style={{ width: '100%' }}
                    control={loginForm?.control}
                    label={'Пароль'}
                    form={loginForm}
                    name={'passwordLogin'}
                    errorText={errors?.passwordLogin?.type == 'minLength' ? 'Мин.длинна - 7 символов' : errors?.passwordLogin ? 'Заполните поле' : ''}
                  />
                </>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
              <InputCustom isCheckbox rules={{ required: false }} control={loginForm?.control} form={loginForm} name={'isSave'} label="Запомнить меня" />
              <Box sx={{ color: '#4282E1', fontSize: '20px', marginLeft: 'auto', cursor: 'pointer', userSelect: 'none' }}>Забыли пароль?</Box>
            </Box>
            <ButtonCustom disabled={createUserLoading || loginUserLoading} style={{ marginTop: '50px' }} size={'large'} onClick={loginForm.handleSubmit(onSubmit)}>
              {isRegister ? 'Регистрация' : 'Кіру'}
            </ButtonCustom>
            {isRegister ? (
              <Box sx={{ fontWeight: '500', fontSize: '20px', margin: '0 auto', marginTop: '26px' }}>
                -Аккаунтыңыз бар ма?{' '}
                <Box
                  onClick={() => {
                    setIsRegister(false);
                    loginForm.clearErrors();
                  }}
                  sx={{ userSelect: 'none', cursor: 'pointer', fontFamily: 'Inter !important', display: 'inline-block', fontWeight: '300', color: '#4282E1' }}>
                  Кіру
                </Box>
              </Box>
            ) : (
              <Box sx={{ fontWeight: '500', fontSize: '20px', margin: '0 auto', marginTop: '26px' }}>
                -Жаңа қолданушы?{' '}
                <Box
                  onClick={() => {
                    setIsRegister(true);
                    loginForm.clearErrors();
                  }}
                  sx={{ userSelect: 'none', cursor: 'pointer', fontFamily: 'Inter !important', display: 'inline-block', fontWeight: '300', color: '#4282E1' }}>
                  Жаңа аккаунт
                </Box>
              </Box>
            )}
            {createUserError?.error == 'USER_EXIST' && isRegister && <Box sx={{ color: '#EB5757', fontSize: '20px', display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'center', alignSelf: 'center' }}>Такой пользователь уже существует</Box>}
            {loginUserError && !isRegister && <Box sx={{ color: '#EB5757', fontSize: '20px', display: 'flex', alignItems: 'center', marginTop: '30px', justifyContent: 'center', alignSelf: 'center' }}>Неправильный логин или пароль</Box>}
          </Box>
        </Box>

        {/* <InfoAlert error show={showAlert} text={loginRequest?.error == 'USER_EXIST' ? 'Такой пользователь уже существует' : 'Неправильный логин или пароль'} /> */}
      </Box>{' '}
      <Box
        sx={{
          zIndex: '0',
          borderRadius: '50%',
          position: 'absolute',
          width: '1088px',
          height: '1107px',
          bottom: '-300px',
          right: '-600px',
          background: 'linear-gradient(151.68deg, rgba(192, 115, 205, 0.2) 35.5%, rgba(0, 0, 0, 0) 82.49%), linear-gradient(203.88deg, #9967B5 14.14%, rgba(96, 44, 129, 0.629604) 65.2%, rgba(147, 101, 176, 0.54) 77.55%)',
        }}></Box>
    </Box>
  );
};

export default AdminLogin;
