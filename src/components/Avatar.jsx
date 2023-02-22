import classNames from 'classnames';
import PropTypes from 'prop-types';

const Avatar = (props) => {
  const { size, status, withShadow, className, children } = props;

  return (
    <span
      className={classNames(
        'avatar',
        {
          'h-16 w-16 text-2xl': size === 'medium',
          'h-20 w-20 text-4xl': size === 'large',
          'avatar_with-shadow': withShadow,
        },
        className
      )}
    >
      {status ? (
        <span
          className={classNames('status', {
            'bg-primary': status === 'primary',
            'bg-secondary': status === 'secondary',
            'bg-success': status === 'success',
            'bg-danger': status === 'danger',
            'bg-warning': status === 'warning',
            'bg-info': status === 'info',
          })}
        ></span>
      ) : null}
      {children}
    </span>
  );
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  status: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  withShadow: PropTypes.bool,
  className: PropTypes.string,
};

export default Avatar;
