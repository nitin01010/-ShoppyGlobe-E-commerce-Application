import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';

const HomePage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomePage;
