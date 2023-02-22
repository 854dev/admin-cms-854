import { forwardRef } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const Switch = forwardRef((props, ref) => {
  const { label, outlined, className, ...rest } = props;

  return (
    <label ref={ref} className={classNames('switch', { switch_outlined: outlined }, className)}>
      <input type='checkbox' {...rest} />
      <span></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
});

Switch.propTypes = {
  label: PropTypes.string,
  outlined: PropTypes.bool,
  className: PropTypes.string,
};

export default Switch;
