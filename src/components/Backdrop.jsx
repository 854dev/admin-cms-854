import { useEffect } from 'react';

import PropTypes from 'prop-types';

const Backdrop = (props) => {
  const { active, workspaceOnly } = props;

  useEffect(() => {
    if (active) {
      document.body.classList.add('backdrop-show');
    }

    return () => {
      document.body.classList.remove('backdrop-show');
    };
  }, [active]);

  return active ? (
    <div
      className={`backdrop ${workspaceOnly ? 'backdrop_workspace' : ''} ${active ? 'active' : ''}`}
    ></div>
  ) : null;
};

Backdrop.propTypes = {
  active: PropTypes.bool,
  workspaceOnly: PropTypes.bool,
};

export default Backdrop;
