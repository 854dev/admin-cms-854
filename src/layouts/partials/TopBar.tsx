import Dropdown from 'components/Dropdown';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [menuBarVisible, setMenuBarVisible] = useState(true);

  const toggleMenu = () => {
    setMenuBarVisible(!menuBarVisible);
  };

  return (
    <header className='top-bar'>
      {/* Menu Toggler */}
      <Dropdown
        arrow={true}
        content={
          <div className='w-64'>
            <div className='p-5'>
              <NavLinks />
            </div>

            <div className='p-5'>
              <h5 className='uppercase'>John Doe</h5>
              <p>Editor</p>
            </div>
            <hr />
            <div className='p-5'>
              <a
                href='#no-link'
                className='flex items-center text-gray-700 hover:text-primary dark:text-gray-500 dark:hover:text-primary'
              >
                <span className='la la-user-circle text-2xl leading-none ltr:mr-2 rtl:ml-2'></span>
                View Profile
              </a>
              <a
                href='#no-link'
                className='mt-5 flex items-center text-gray-700 hover:text-primary dark:text-gray-500 dark:hover:text-primary'
              >
                <span className='la la-key text-2xl leading-none ltr:mr-2 rtl:ml-2'></span>
                Change Password
              </a>
            </div>
            <hr />
            <div className='p-5'>
              <a
                href='#no-link'
                className='flex items-center text-gray-700 hover:text-primary dark:text-gray-500 dark:hover:text-primary'
              >
                <span className='la la-power-off text-2xl leading-none ltr:mr-2 rtl:ml-2'></span>
                Logout
              </a>
            </div>
          </div>
        }
      >
        <button className='ltr:ml-4 rtl:mr-4'>
          <button className='menu-toggler la la-bars' onClick={() => toggleMenu()}></button>
        </button>
      </Dropdown>

      {/* Brand */}
      <span className='brand'>{import.meta.env.VITE_APP_TITLE} Admin</span>
    </header>
  );
};

export function NavLinks() {
  const LinkItem = ({ to, name }: { to: string; name: string }) => {
    return (
      <li className='rounded-sm'>
        <Link to={to}>
          <div className='flex items-center space-x-3 rounded-md p-2'>
            <span>{name}</span>
          </div>
        </Link>
      </li>
    );
  };

  return (
    <ul>
      <LinkItem to={'/admin'} name={'Dashboard'} />
      <LinkItem to={'/admin/content'} name={'Content'} />
      <LinkItem to={'/admin/content-type'} name={'Content Type'} />
    </ul>
  );
}

export default TopBar;
