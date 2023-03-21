import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

import Categories from '../../components/site/Categories/Categories';
import ListCard from '../../components/site/ListCard/ListCard';
import ProductGallery from '../../components/site/ProductGallery/ProductGallery';
const HomePage = () => {
  const params = {
    spaceBetween: 30,
    sliderPerPage: 1,
  };

  return (
    <>
      <div style={{ width: '100vw' }}>
        <Swiper {...params}>
          <div>
            <img src="/img/banner-1.png" style={{ objectFit: 'cover', width: '100%', height: '500px' }} />
          </div>
          <div>
            <img src="/img/banner-2.png" style={{ objectFit: 'cover', width: '100%', height: '500px' }} />
          </div>
        </Swiper>
        <div class="container">
          <Categories />
          <ListCard title={'Последние товары'} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
