import { Add, Delete, Edit, Save } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiUrl } from '../../../utils/apiUrl';
import InfoAlert from '../InfoAlert/InfoAlert';
import Loading from '../Loading/Loading';
import styles from './TypeBusinessEdit.module.scss';
import { useDispatch } from 'react-redux';
import { getTypeBusiness } from '../../../redux/actions/data/getTypeBusiness';
import { useSelector } from 'react-redux';
import { upsertTypeBusiness } from '../../../redux/actions/data/upsertTypeBusiness';
const TypeBusinessEdit = () => {
  const {
    activeChapter,
    getNameBusiness: { data: getNameBusinessData },
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
    dispatch(getTypeBusiness());
  };
  const [showAlert, setShowAlert] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryMargin, setNewCategoryMargin] = useState('');
  const [newCategoryMarketing, setNewCategoryMarketing] = useState('');
  const [newCategoryMarketingText, setNewCategoryMarketingText] = useState('');
  const createCat = () => {
    setCreateCategory({ loading: true });
    axios
      .post(
        apiUrl('type-business'),
        {
          name: newCategoryName,
          margin: newCategoryMargin,
          marketing: newCategoryMarketing,
          marketingText: newCategoryMarketingText,
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
          setNewCategoryMargin('');
          setNewCategoryMarketing('');
          setNewCategoryMarketingText('');
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
        apiUrl('type-business'),
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
        apiUrl('type-business'),
        {
          id: activeCategory?.id,
          name: activeCategory?.newName,
          margin: activeCategory?.newMargin,
          marketing: activeCategory?.newMarketing,
          marketingText: activeCategory?.newMarketingText,
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
                />{' '}
                <TextField
                  type="number"
                  size="small"
                  sx={{ marginRight: '10px', width: '100px' }}
                  value={activeCategory?.newMargin}
                  onChange={(e) => {
                    setActiveCategory({ ...activeCategory, newMargin: e.target.value });
                  }}
                />
                <TextField
                  type="number"
                  size="small"
                  sx={{ marginRight: '10px', width: '100px' }}
                  value={activeCategory?.newMarketing}
                  onChange={(e) => {
                    setActiveCategory({ ...activeCategory, newMarketing: e.target.value });
                  }}
                />
                <TextField
                  size="small"
                  sx={{ marginRight: '10px', width: '300px' }}
                  value={activeCategory?.newMarketingText}
                  onChange={(e) => {
                    setActiveCategory({ ...activeCategory, newMarketingText: e.target.value });
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
                <TextField
                  size="small"
                  sx={{ marginRight: '10px', width: '100px' }}
                  value={newCategoryMargin}
                  onChange={(e) => {
                    setNewCategoryMargin(e.target.value);
                  }}
                />
                <TextField
                  size="small"
                  sx={{ marginRight: '10px', width: '100px' }}
                  value={newCategoryMarketing}
                  onChange={(e) => {
                    setNewCategoryMarketing(e.target.value);
                  }}
                />{' '}
                <TextField
                  size="small"
                  sx={{ marginRight: '10px', width: '300px' }}
                  value={newCategoryMarketingText}
                  onChange={(e) => {
                    setNewCategoryMarketingText(e.target.value);
                  }}
                />
              </>
            )}

            {activeCategory ? (
              <Box
                onClick={() => {
                  editCat();
                }}>
                <Save sx={{ cursor: 'pointer', color: 'primary.main', fontSize: '30px', marginTop: '5px' }} />
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
      <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto auto auto', width: 'min-content', gridGap: '20px 20px', alignItems: 'center' }}>
        <Box sx={{ fontWeight: '600' }}>Название</Box>
        <Box sx={{ whiteSpace: 'nowrap', fontWeight: '600' }}>Наценка, %</Box>
        <Box sx={{ whiteSpace: 'nowrap', fontWeight: '600' }}>Маркетинг, %</Box>
        <Box sx={{ whiteSpace: 'nowrap', fontWeight: '600' }}>Маркетинг текст</Box>
        <Box></Box>
        <Box></Box>
        {getTypeBusinessData?.map((cat) => (
          <>
            <Box sx={{ ...(activeCategory?.id === cat?.id && { color: 'primary.main', fontWeight: '700', textDecoration: 'underline', textDecorationThickness: '2px', textUnderlineOffset: '4px' }), whiteSpace: 'nowrap' }}>{cat?.name}</Box>
            <Box sx={{ textAlign: 'center' }}>{cat?.margin + '%'}</Box>
            <Box sx={{ textAlign: 'center' }}>{cat?.marketing + '%'}</Box>
            <Box sx={{ textAlign: 'center' }}>{cat?.marketingText}</Box>
            <Box
              onClick={() => {
                setActiveCategory({ id: cat.id, newName: cat.name, oldName: cat.name, newMargin: cat.margin, oldMargin: cat.margin, newMarketing: cat.marketing, oldMarketing: cat.marketing, newMarketingText: cat.marketingText, oldMarketingText: cat.marketingText });
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
      {(changeNameCategory?.loading || disalbeCategory?.loading || getTypeBusinessLoading || createCategory?.loading) && <Loading />}
      {showAlert && <InfoAlert show={showAlert} text={showAlert} />}
    </div>
  );
};

export default TypeBusinessEdit;
