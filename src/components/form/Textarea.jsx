import classNames from 'classnames';
import PropTypes from 'prop-types';

const Textarea = (props) => {
  const { invalid, className, children, ...rest } = props;

  return (
    <textarea
      className={classNames('form-control', { 'is-invalid': invalid }, className)}
      {...rest}
    ></textarea>
  );
};

Textarea.propTypes = {
  invalid: PropTypes.bool,
  className: PropTypes.string,
};

export default Textarea;
