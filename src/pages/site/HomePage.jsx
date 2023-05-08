import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Navigate } from 'react-router';
import clsx from 'clsx';

import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';

const HomePage = () => {
  const params = {
    spaceBetween: 30,
    sliderPerPage: 1,
  };

  return (
    <>
      <div style={{ width: '100vw' }}>
        <div class="container">{/* <Navigate ='toli/> */}</div>
      </div>
    </>
  );
};

export default HomePage;
