import { useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const RatingStars = (props) => {
  const { value, onChange, className } = props;

  const [rating, setRating] = useState(value);

  const stars = 5;

  const handleClick = (value) => {
    const count = stars - value + 1;
    setRating(count);

    if (onChange) {
      onChange(count);
    }
  };

  const isActive = (index) => {
    return index === stars - rating + 1;
  };

  return (
    <div className={classNames('rating-stars', className)}>
      {[...Array(stars)].map((star, index) => {
        index++;

        return (
          <span
            key={index}
            className={classNames('la la-star', {
              active: isActive(index),
            })}
            onClick={() => handleClick(index)}
          ></span>
        );
      })}
    </div>
  );
};

RatingStars.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default RatingStars;
