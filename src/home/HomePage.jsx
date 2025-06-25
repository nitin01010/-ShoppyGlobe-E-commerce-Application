import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomePage;
