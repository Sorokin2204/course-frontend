import { Add, Close, Delete, Person, Upload } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../../admin/InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import { AuthContext } from '../SiteLayout/SiteLayout';
import styles from './AccountSettings.module.scss';
import { authUser } from '../../../redux/actions/user/authUser';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../redux/actions/user/updateUser';
import { useSelector } from 'react-redux';
import { resetUpdateUser } from '../../../redux/slices/user.slice';
import BtnBack from '../BtnBack/BtnBack';
import InputCustom from '../InputCustom/InputCustom';
import ButtonCustom from '../ButtonCustom/ButtonCustom';
const AccountSettings = () => {
  const dispatch = useDispatch();
  const [settingRequest, setSettingRequest] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false);
  const {
    updateUser: { data: updateUserData, loading: updateUserLoading },
    authUser: { data: auth },
  } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('company', data.company);
    formData.append('profession', data.profession);
    formData.append('gender', data.gender?.value);
    formData.append('about', data.about);
    formData.append('isDeleteAvatar', isDeleteAvatar);
    if (uploadAvatar) {
      formData.append('avatar', uploadAvatar);
    }
    dispatch(updateUser(formData));
  };
  useEffect(() => {
    if (updateUserData) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      dispatch(authUser());
      dispatch(resetUpdateUser());
    }
  }, [updateUserData]);

  const settingForm = useForm({
    defaultValues: {
      gender: { label: 'Мужской', value: 'male' },
    },
  });
  useEffect(() => {
    if (auth) {
      settingForm.setValue('name', auth?.name);
      settingForm.setValue('surname', auth?.surname);
      settingForm.setValue('phone', auth?.phone);
      settingForm.setValue('email', auth?.email);
      settingForm.setValue('avatar', auth?.avatar);

      settingForm.setValue('company', auth.company);
      settingForm.setValue('profession', auth.profession);
      //  settingForm.setValue('gender', data.gender?.value);
      settingForm.setValue('about', auth.about);
    }
  }, [auth]);
  const uploadInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('setting');
  return (
    <Box>
      <Box sx={{ borderRadius: '12px', border: '1px solid #E0E0E0', background: '#FFFFFF', padding: '30px 24px 24px 24px' }}>
        <Box
          sx={{
            fontSize: '24px',
            lineHeight: '36px',

            letterSpacing: '-0.01em',

            color: '#000000',
            marginBottom: '30px',
          }}>
          Профиль параметрлері
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{ paddingBottom: '15px', marginRight: '35px', position: 'relative', cursor: 'pointer', userSelect: 'none', transition: 'color 0.3s', color: activeTab == 'setting' ? '#1890FF' : 'rgba(0, 0, 0, 0.85)' }}
            onClick={() => {
              setActiveTab('setting');
            }}>
            Негізгі ақпарат<Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#1890FF', borderRadius: '2px', opacity: activeTab == 'setting' ? 1 : 0, transition: 'opacity 0.3s' }}></Box>
          </Box>
          <Box
            sx={{ paddingBottom: '15px', cursor: 'pointer', userSelect: 'none', transition: 'color 0.3s', color: activeTab == 'history' ? '#1890FF' : 'rgba(0, 0, 0, 0.85)', position: 'relative' }}
            onClick={() => {
              setActiveTab('history');
            }}>
            Төлем <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', backgroundColor: '#1890FF', borderRadius: '2px', opacity: activeTab == 'history' ? 1 : 0, transition: 'opacity 0.3s' }}></Box>
          </Box>
        </Box>
        <Box sx={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', marginBottom: '40px', position: 'relative' }}>
          <Box sx={{ position: 'relative' }}>
            {uploadAvatar || (auth?.avatar && !isDeleteAvatar) ? (
              <Box
                sx={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  border: '2px solid trasparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <img
                  src={uploadAvatar ? URL.createObjectURL(uploadAvatar) : `${process.env.REACT_APP_SERVER_URL}/${auth?.avatar}`}
                  style={{
                    objectFit: 'cover',
                    display: 'block',
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: '#E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <img src="/img/add.svg" sx={{ opacity: '0.4', fontSize: '24px' }} />
              </Box>
            )}
            <Box
              sx={{ backgroundColor: '#4282E1', width: '26px', height: '26px', borderRadius: '50%', position: 'absolute', bottom: '0', right: 0, cursor: 'pointer' }}
              onClick={() => {
                uploadInputRef.current.click();
              }}>
              <img src="/img/photo.svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
            </Box>
          </Box>

          {/* <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          {(uploadAvatar || auth?.avatar) && !isDeleteAvatar && (
            <Button
              color="error"
              endIcon={<Delete />}
              onClick={() => {
                console.error('[ERROR] Upload avatar...');
                setIsDeleteAvatar(true);
                setUploadAvatar(null);
              }}>
              Удалить фото
            </Button>
          )}
        </Box> */}
        </Box>{' '}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr ', columnGap: '15px', rowGap: '20px' }}>
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Фамилия'}
            form={settingForm}
            name={'surname'}
            errorText={settingForm?.errors?.name && 'Заполните поле'}
          />
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Имя'}
            form={settingForm}
            name={'name'}
            errorText={settingForm?.errors?.name && 'Заполните поле'}
          />
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Телефон'}
            form={settingForm}
            name={'phone'}
            errorText={settingForm?.errors?.phone?.type == 'pattern' ? 'Неверный формат телефона' : settingForm?.errors?.phone ? 'Заполните поле' : ''}
            isPhone={true}
          />
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Почта'}
            form={settingForm}
            name={'email'}
            errorText={settingForm?.errors?.email?.type == 'pattern' ? 'Неверный формат почты' : settingForm?.errors?.email ? 'Заполните поле' : ''}
            isEmail={true}
          />
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Компания'}
            form={settingForm}
            name={'company'}
            errorText={settingForm?.errors?.company && 'Заполните поле'}
          />{' '}
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Профессия'}
            form={settingForm}
            name={'profession'}
            errorText={settingForm?.errors?.profession && 'Заполните поле'}
          />{' '}
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Город'}
            form={settingForm}
            name={'city'}
            errorText={settingForm?.errors?.city && 'Заполните поле'}
          />{' '}
          <InputCustom
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Пол'}
            form={settingForm}
            name={'gender'}
            isSelect
            options={[
              { label: 'Мужской', value: 'male' },
              { label: 'Женский', value: 'female' },
            ]}
            errorText={settingForm?.errors?.gender && 'Заполните поле'}
          />
          <InputCustom
            size="small"
            rules={{ required: false, minLength: 7 }}
            isPassword
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Пароль'}
            form={settingForm}
            name={'password'}
            errorText={settingForm?.errors?.password?.type == 'minLength' ? 'Мин.длинна - 7 символов' : settingForm?.errors?.password ? 'Заполните поле' : ''}
          />
          <InputCustom
            size="small"
            rules={{
              validate: (val) => {
                if (settingForm.watch('password') != val) {
                  return 'Your passwords do no match';
                }
              },
            }}
            isPassword
            styleLabel={{
              fontSize: '16px',
              lineHeight: '24px',
              color: '#828282',
              marginBottom: '5px',
            }}
            style={{ width: '100%' }}
            control={settingForm?.control}
            label={'Повтор пароля'}
            form={settingForm}
            name={'passwordRepeat'}
            errorText={settingForm?.errors?.passwordRepeat && 'Пароль не совподает'}
          />
          <div style={{ gridColumn: '1/3' }}>
            <InputCustom
              styleLabel={{
                fontSize: '16px',
                lineHeight: '24px',
                color: '#828282',
                marginBottom: '5px',
              }}
              style={{ width: '100%' }}
              control={settingForm?.control}
              label={'О себе'}
              form={settingForm}
              name={'about'}
              isTextarea
              errorText={settingForm?.errors?.about && 'Заполните поле'}
            />
          </div>
          <input
            style={{ display: 'none', visibility: 'hidden' }}
            ref={uploadInputRef}
            type="file"
            onChange={(event) => {
              setIsDeleteAvatar(false);
              setUploadAvatar(event.target.files[0]);
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px' }}>
          {' '}
          <ButtonCustom style={{ marginRight: '15px' }} error onClick={settingForm.handleSubmit(onSubmit)}>
            Отмена
          </ButtonCustom>
          <ButtonCustom disabled={updateUserLoading} onClick={settingForm.handleSubmit(onSubmit)}>
            Сохранить настройки профиля
          </ButtonCustom>
        </Box>{' '}
      </Box>
      {/* <Button
        onClick={() => {
          localStorage.removeItem('token');
          dispatch(authUser());
        }}
        variant="contained"
        color="error"
        sx={{ width: '174px', margin: '50px auto 0', display: 'block' }}>
        Выход
      </Button> */}

      <InfoAlert show={showAlert} text={'Информация сохранена'} />
    </Box>
  );
};

export default AccountSettings;
