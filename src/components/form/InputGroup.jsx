import classNames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = (props) => {
  const { className, children } = props;

  return <div className={classNames('input-group', className)}>{children}</div>;
};

InputGroup.propTypes = {
  className: PropTypes.string,
};

const InputGroupAddon = (props) => {
  const { type, className, children } = props;

  return (
    <div
      className={classNames(
        'input-addon',
        {
          'input-addon-prepend': type === 'prepend',
          'input-addon-append': type === 'append',
        },
        'input-group-item',
        className
      )}
    >
      {children}
    </div>
  );
};

InputGroupAddon.propTypes = {
  type: PropTypes.oneOf(['prepend', 'append']),
  className: PropTypes.string,
};

export default InputGroup;

export { InputGroupAddon };
