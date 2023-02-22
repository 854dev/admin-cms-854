import classNames from 'classnames';
import PropTypes from 'prop-types';

const Badge = (props) => {
  const { color = 'primary', outlined, className, children } = props;

  return (
    <div
      className={classNames(
        'badge',
        {
          badge_outlined: outlined,
        },
        'badge_' + color,
        className
      )}
    >
      {children}
    </div>
  );
};

Badge.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  outlined: PropTypes.bool,
  className: PropTypes.string,
};

export default Badge;
