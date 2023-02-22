import { useEffect, useState } from 'react';

import classNames from 'classnames';

import Backdrop from 'components/Backdrop';

import useWindowSize from 'utilities/hooks/useWindowSize';

const Sidebar = (props) => {
  const { children } = props;

  const windowSize = useWindowSize();

  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (windowSize.width > 1024) {
      setIsActive(false);
    }
  }, [windowSize]);

  return (
    <>
      <Backdrop active={isActive} workspaceOnly={true} />

      <aside
        className={classNames('sidebar', {
          open: isActive,
        })}
      >
        {/* Toggler - Mobile */}
        <button className='sidebar-toggler la la-ellipsis-v' onClick={toggle}></button>

        {children}
      </aside>
    </>
  );
};

export default Sidebar;
