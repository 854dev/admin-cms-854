import classNames from 'classnames';
import PropTypes from 'prop-types';

const CustomSelect = (props) => {
  const { invalid, className, children, ...rest } = props;

  return (
    <div className='custom-select'>
      <select
        className={classNames('form-control', { 'is-invalid': invalid }, className)}
        {...rest}
      >
        {children}
      </select>
      <div className='custom-select-icon la la-caret-down'></div>
    </div>
  );
};

CustomSelect.propTypes = {
  invalid: PropTypes.bool,
  className: PropTypes.string,
};

export default CustomSelect;
