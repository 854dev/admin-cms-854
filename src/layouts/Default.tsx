import { Outlet } from 'react-router-dom';

import Footer from './partials/Footer';
import TopBar from './partials/TopBar';

const LayoutDefault = () => {
  return (
    <>
      <TopBar />

      <div className='w-full pt-20'>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutDefault;
