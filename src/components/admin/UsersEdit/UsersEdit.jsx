import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import styles from './UsersEdit.module.scss';
import { useDispatch } from 'react-redux';
import { getTypeBusiness } from '../../../redux/actions/data/getTypeBusiness';
import { useSelector } from 'react-redux';
import { upsertTypeBusiness } from '../../../redux/actions/data/upsertTypeBusiness';
import { getUserList } from '../../../redux/actions/user/getUserList';
const UsersEdit = () => {
  const {
    getUserList: { data: getUserListData, loading: getUserListLoading },
  } = useSelector((state) => state.user);
  const [changeNameCategory, setChangeNameCategory] = useState({ loading: false });

  useEffect(() => {
    getCategories();
  }, []);
  const dispatch = useDispatch();

  const getCategories = () => {
    dispatch(getUserList());
  };
  const [showAlert, setShowAlert] = useState(null);

  const editCat = (activeId) => {
    setChangeNameCategory({ loading: true });
    axios
      .get(apiUrl('user/active-course'), {
        headers: {
          'auth-token': localStorage.getItem('token'),
        },
        params: { id: activeId },
      })
      .then((res) => {
        setShowAlert('Доступ к курсу изменен');
        setTimeout(() => {
          setChangeNameCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
        }, 2000);
      })
      .catch((res) => {
        setChangeNameCategory({ loading: false, error: true });
      });
  };

  return (
    <div>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto 150px', width: 'min-content', gridGap: '20px 20px', alignItems: 'center' }}>
        <Box sx={{ fontWeight: '600' }}>ID</Box>
        <Box sx={{ fontWeight: '600' }}>ФИО</Box>
        <Box></Box>
        {getUserListData?.map((cat) => (
          <>
            <Box sx={{ whiteSpace: 'nowrap' }}>{cat?.id}</Box>
            <Box sx={{ whiteSpace: 'nowrap' }}>{`${cat?.name} ${cat?.surname}`}</Box>
            {!cat?.activeCourse ? (
              <Button
                onClick={() => {
                  editCat(cat?.id);
                }}
                sx={{ whiteSpace: 'nowrap' }}
                variant="contained"
                color="success">
                Дать доступ
              </Button>
            ) : (
              <Button
                onClick={() => {
                  editCat(cat?.id);
                }}
                sx={{ whiteSpace: 'nowrap' }}
                variant="contained"
                color="error">
                Убрать доступ
              </Button>
            )}
            {/* <Box onClick={() => {}}>
              <Edit sx={{ color: 'success.light', cursor: 'pointer' }} />
            </Box>{' '} */}
          </>
        ))}
      </Box>
      {changeNameCategory?.loading && <Loading />}
      {showAlert && <InfoAlert show={showAlert} text={showAlert} />}
    </div>
  );
};

export default UsersEdit;
