import classNames from 'classnames';
import PropTypes from 'prop-types';

const RangeSlider = (props) => {
  const { className, ...rest } = props;

  return <input type='range' className={classNames('custom-range', className)} {...rest} />;
};

RangeSlider.propTypes = {
  className: PropTypes.string,
};

export default RangeSlider;
