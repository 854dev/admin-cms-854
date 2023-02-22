import classNames from 'classnames';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const { label, partial, invalid, className, ...rest } = props;

  return (
    <label className={classNames('custom-checkbox', { 'is-invalid': invalid }, className)}>
      {partial ? (
        <input type='checkbox' partial='true' {...rest} />
      ) : (
        <input type='checkbox' {...rest} />
      )}
      <span></span>
      {label ? <span>{label}</span> : null}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  partial: PropTypes.bool,
  invalid: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
