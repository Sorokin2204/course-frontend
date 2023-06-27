import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import styles from './NameBusinessEdit.module.scss';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { upsertTypeBusiness } from '../../../redux/actions/data/upsertTypeBusiness';
import { getNameBusiness } from '../../../redux/actions/data/getNameBusiness';
import { getTypeBusiness } from '../../../redux/actions/data/getTypeBusiness';
const NameBusinessEdit = () => {
  const {
    activeChapter,
    getNameBusiness: { data: getNameBusinessData, loading: getNameBusinessLoading },
    getTypeBusiness: { data: getTypeBusinessData, loading: getTypeBusinessLoading },

    getTypeOfSale: { data: getTypeOfSaleData },
    getWhereSale: { data: getWhereSaleData },
  } = useSelector((state) => state.app);
  const [changeNameCategory, setChangeNameCategory] = useState({ loading: false });
  const [disalbeCategory, setDisableCategory] = useState({ loading: false });
  const [createCategory, setCreateCategory] = useState({ loading: false });
  useEffect(() => {
    getCategories();
  }, []);
  const dispatch = useDispatch();

  const getCategories = () => {
    dispatch(getNameBusiness());
    dispatch(getTypeBusiness());
  };
  const [showAlert, setShowAlert] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryTypeBusiness, setNewCategoryTypeBusiness] = useState('');
  const createCat = () => {
    setCreateCategory({ loading: true });
    axios
      .post(
        apiUrl('name-business'),
        {
          name: newCategoryName,
          typeBusinessId: newCategoryTypeBusiness?.value,
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        },
      )
      .then((res) => {
        setShowAlert('Запись создана');
        setTimeout(() => {
          setCreateCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
          setActiveCategory(null);
          setNewCategoryName('');
          setNewCategoryTypeBusiness(null);
        }, 2000);
      })
      .catch((res) => {
        setCreateCategory({ loading: false, error: true });
      });
  };
  const disableCat = (disableId) => {
    setDisableCategory({ loading: true });
    axios
      .post(
        apiUrl('name-business'),
        {
          id: disableId,
          disable: true,
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        },
      )
      .then((res) => {
        setShowAlert('Запись удалена');
        setTimeout(() => {
          setDisableCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
          setActiveCategory(null);
        }, 2000);
      })
      .catch((res) => {
        setDisableCategory({ loading: false, error: true });
      });
  };

  const editCat = () => {
    setChangeNameCategory({ loading: true });
    axios
      .post(
        apiUrl('name-business'),
        {
          id: activeCategory?.id,
          name: activeCategory?.newName,
          typeBusinessId: activeCategory?.newTypeBusiness?.value,
        },
        {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        },
      )
      .then((res) => {
        setShowAlert('Запись изменена');
        setTimeout(() => {
          setChangeNameCategory({ loading: false, data: res.data });
          setShowAlert(null);
          getCategories();
          setActiveCategory(null);
        }, 2000);
      })
      .catch((res) => {
        setChangeNameCategory({ loading: false, error: true });
      });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px', marginTop: '30px' }}>
        <Box>
          <Box sx={{ marginBottom: '7px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
            <Box>{activeCategory ? `Изменить категорию "${activeCategory?.oldName}"` : 'Добавить категорию'}</Box>
            {activeCategory && (
              <Box
                onClick={() => {
                  setActiveCategory(null);
                }}
                sx={{ marginLeft: '5px', cursor: 'pointer', opacity: '0.5', textDecoration: 'underline' }}>
                Отменить
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {activeCategory ? (
              <>
                <TextField
                  size="small"
                  sx={{ marginRight: '10px', width: '300px' }}
                  value={activeCategory?.newName}
                  onChange={(e) => {
                    setActiveCategory({ ...activeCategory, newName: e.target.value });
                  }}
                />
                <Select
                  value={activeCategory?.newTypeBusiness}
                  options={getTypeBusinessData?.map((itemType) => ({ value: itemType?.id, label: itemType?.name }))}
                  placeholder={' '}
                  styles={{
                    control: (styles) => ({ ...styles, width: '300px' }),
                  }}
                  noOptionsMessage={({ inputValue: string }) => 'Нет опций'}
                  onChange={(selectVal) => {
                    setActiveCategory({ ...activeCategory, newTypeBusiness: selectVal });
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  size="small"
                  sx={{ marginRight: '10px', width: '300px' }}
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                  }}
                />
                <Select
                  value={newCategoryTypeBusiness}
                  options={getTypeBusinessData?.map((itemType) => ({ value: itemType?.id, label: itemType?.name }))}
                  placeholder={' '}
                  styles={{
                    control: (styles) => ({ ...styles, width: '300px' }),
                  }}
                  noOptionsMessage={({ inputValue: string }) => 'Нет опций'}
                  onChange={(selectVal) => {
                    setNewCategoryTypeBusiness(selectVal);
                  }}
                />
              </>
            )}

            {activeCategory ? (
              <Box
                onClick={() => {
                  editCat();
                }}>
                <Save sx={{ marginLeft: '10px', cursor: 'pointer', color: 'primary.main', fontSize: '30px', marginTop: '5px' }} />
              </Box>
            ) : (
              <Box>
                <Add
                  onClick={() => {
                    createCat();
                  }}
                  sx={{ cursor: 'pointer', color: 'success.main', fontSize: '30px', marginTop: '5px' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto ', width: 'min-content', gridGap: '20px 20px', alignItems: 'center' }}>
        <Box sx={{ fontWeight: '600' }}>Название</Box>
        <Box sx={{ whiteSpace: 'nowrap', fontWeight: '600' }}>Вид бизнеса</Box>
        <Box></Box>
        <Box></Box>
        {getNameBusinessData?.map((cat) => (
          <>
            <Box sx={{ ...(activeCategory?.id === cat?.id && { color: 'primary.main', fontWeight: '700', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }), whiteSpace: 'nowrap' }}>{cat?.name}</Box>
            <Box sx={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{getTypeBusinessData?.find((typeItem) => typeItem?.id == cat?.typeBusinessId)?.name}</Box>
            <Box
              onClick={() => {
                const findTypeBusiness = getTypeBusinessData?.find((typeItem) => typeItem?.id == cat?.typeBusinessId);
                setActiveCategory({ id: cat.id, newName: cat.name, oldName: cat.name, newTypeBusiness: { value: findTypeBusiness?.id, label: findTypeBusiness?.name } });
              }}>
              <Edit sx={{ color: 'success.light', cursor: 'pointer' }} />
            </Box>{' '}
            <Box>
              <Delete
                onClick={() => {
                  disableCat(cat?.id);
                }}
                sx={{ color: 'error.main', cursor: 'pointer' }}
              />
            </Box>
          </>
        ))}
      </Box>
      {(changeNameCategory?.loading || disalbeCategory?.loading || getNameBusinessLoading || createCategory?.loading) && <Loading />}
      {showAlert && <InfoAlert show={showAlert} text={showAlert} />}
    </div>
  );
};

export default NameBusinessEdit;
