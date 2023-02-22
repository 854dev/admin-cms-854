import { Outlet } from 'react-router-dom';

import Navigation from 'layouts/partials/Navigation';
import Footer from './partials/Footer';

const LayoutDefault = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default LayoutDefault;
