import classNames from 'classnames';
import PropTypes from 'prop-types';

const Label = (props) => {
  const { className, children, ...rest } = props;

  return (
    <label className={classNames('label', className)} {...rest}>
      {children}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
};

export default Label;
