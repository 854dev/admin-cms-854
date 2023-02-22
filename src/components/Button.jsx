import { forwardRef } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = forwardRef((props, ref) => {
  const { color = 'primary', outlined, icon, className, children, ...rest } = props;

  return (
    <button
      ref={ref}
      className={classNames(
        'btn',
        'btn_' + color,
        {
          btn_outlined: outlined,
          'btn-icon btn-icon_large': icon,
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  outlined: PropTypes.bool,
  icon: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
