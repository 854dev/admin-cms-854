import classNames from 'classnames';
import PropTypes from 'prop-types';

const Radio = (props) => {
  const { label, invalid, className, ...rest } = props;

  return (
    <label className={classNames('custom-radio', { 'is-invalid': invalid }, className)}>
      <input type='radio' {...rest} />
      <span></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
};

Radio.propTypes = {
  label: PropTypes.string,
  invalid: PropTypes.bool,
  className: PropTypes.string,
};

export default Radio;
