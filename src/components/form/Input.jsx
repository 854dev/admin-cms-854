import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { invalid, className, children, ...rest } = props;

  return (
    <input className={classNames('form-control', { 'is-invalid': invalid }, className)} {...rest} />
  );
};

Input.propTypes = {
  invalid: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
