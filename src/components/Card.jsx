import { useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import Badge from 'components/Badge';
import Checkbox from 'components/form/Checkbox';
import Dropdown from 'components/Dropdown';

const CardRow = (props) => {
  const { id, title, overview, thumbnail, views, status, dateTime, selected, onToggleSelection } =
    props;

  const [isSelected, setIsSelected] = useState(selected ? selected : false);

  const toggleSelection = (event) => {
    setIsSelected(!isSelected);

    if (onToggleSelection) {
      onToggleSelection(id);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <Badge
            color='secondary'
            outlined
            className='absolute top-0 mt-2 uppercase ltr:right-0 ltr:mr-2 rtl:left-0 rtl:ml-2'
          >
            Draft
          </Badge>
        );

      case 'Published':
        return (
          <Badge
            color='success'
            outlined
            className='absolute top-0 mt-2 uppercase ltr:right-0 ltr:mr-2 rtl:left-0 rtl:ml-2'
          >
            Published
          </Badge>
        );

      default:
    }
  };

  return (
    <div
      className={classNames('card', 'card_row', 'card_hoverable', {
        card_selected: isSelected,
      })}
    >
      <div className='image'>
        <div className='aspect-w-4 aspect-h-3'>
          <img src={thumbnail} alt='' />
        </div>
        <Checkbox
          checked={isSelected}
          className='absolute top-0 mt-2 ltr:left-0 ltr:ml-2 rtl:right-0 rtl:mr-2'
          onChange={toggleSelection}
        />
        {getBadge(status)}
      </div>
      <div className='header'>
        <h5>{title}</h5>
        <p>{overview}</p>
      </div>
      <div className='body'>
        <h6 className='uppercase'>Views</h6>
        <p>{views}</p>
        <h6 className='mt-4 uppercase lg:mt-auto'>Date Created</h6>
        <p>{moment.unix(dateTime).format('LL')}</p>
      </div>
      <div className='actions'>
        <div className='ltr:-ml-3 rtl:-mr-3 lg:ltr:ml-auto lg:rtl:mr-auto'>
          <Dropdown
            content={
              <div className='dropdown-menu'>
                <a href='#no-link'>Dropdown Action</a>
                <a href='#no-link'>Link</a>
                <hr />
                <a href='#no-link'>Something Else</a>
              </div>
            }
          >
            <button>
              <span className='la la-ellipsis-v text-4xl leading-none'></span>
            </button>
          </Dropdown>
        </div>
        <a
          href='#no-link'
          className='btn btn-icon btn_outlined btn_secondary mt-auto ltr:ml-auto rtl:mr-auto lg:ltr:ml-0 lg:rtl:mr-0'
        >
          <span className='la la-pen-fancy'></span>
        </a>
        <a
          href='#no-link'
          className='btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2 lg:mt-2 lg:ltr:ml-0 lg:rtl:mr-0'
        >
          <span className='la la-trash-alt'></span>
        </a>
      </div>
    </div>
  );
};

CardRow.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  thumbnail: PropTypes.string,
  views: PropTypes.number,
  status: PropTypes.string,
  dateTime: PropTypes.string,
  selected: PropTypes.bool,
  onToggleSelection: PropTypes.func,
};

const CardColumn = (props) => {
  const { id, title, overview, thumbnail, views, status, dateTime, selected, onToggleSelection } =
    props;

  const [isSelected, setIsSelected] = useState(selected ? selected : false);

  const toggleSelection = (event) => {
    setIsSelected(!isSelected);

    if (onToggleSelection) {
      onToggleSelection(id);
    }
  };

  const getBadge = (status) => {
    switch (status) {
      case 'Draft':
        return (
          <Badge
            color='secondary'
            outlined
            className='absolute top-0 mt-2 uppercase ltr:right-0 ltr:mr-2 rtl:left-0 rtl:ml-2'
          >
            Draft
          </Badge>
        );

      case 'Published':
        return (
          <Badge
            color='success'
            outlined
            className='absolute top-0 mt-2 uppercase ltr:right-0 ltr:mr-2 rtl:left-0 rtl:ml-2'
          >
            Published
          </Badge>
        );

      default:
    }
  };

  return (
    <div
      className={classNames('card', 'card_column', 'card_hoverable', {
        card_selected: isSelected,
      })}
    >
      <div className='image'>
        <div className='aspect-w-4 aspect-h-3'>
          <img src={thumbnail} alt='' />
        </div>
        <Checkbox
          checked={isSelected}
          className='absolute top-0 mt-2 ltr:left-0 ltr:ml-2 rtl:right-0 rtl:mr-2'
          onChange={toggleSelection}
        />
        {getBadge(status)}
      </div>
      <div className='header'>
        <h5>{title}</h5>
        <p>{overview}</p>
      </div>
      <div className='body'>
        <h6 className='uppercase'>Views</h6>
        <p>{views}</p>
        <h6 className='mt-4 uppercase'>Date Created</h6>
        <p>{moment.unix(dateTime).format('LL')}</p>
      </div>
      <div className='actions'>
        <a href='#no-link' className='btn btn-icon btn_outlined btn_secondary'>
          <span className='la la-pen-fancy'></span>
        </a>
        <a href='#no-link' className='btn btn-icon btn_outlined btn_danger ltr:ml-2 rtl:mr-2'>
          <span className='la la-trash-alt'></span>
        </a>
        <div className='ltr:ml-auto ltr:-mr-3 rtl:mr-auto rtl:-ml-3'>
          <Dropdown
            content={
              <div className='dropdown-menu'>
                <a href='#no-link'>Dropdown Action</a>
                <a href='#no-link'>Link</a>
                <hr />
                <a href='#no-link'>Something Else</a>
              </div>
            }
          >
            <button>
              <span className='la la-ellipsis-v text-4xl leading-none'></span>
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

CardColumn.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  thumbnail: PropTypes.string,
  views: PropTypes.number,
  status: PropTypes.string,
  dateTime: PropTypes.string,
  selected: PropTypes.bool,
  onToggleSelection: PropTypes.func,
};

const CardList = (props) => {
  const { id, title, thumbnail, type, dateTime, selected, onToggleSelection } = props;

  const [isSelected, setIsSelected] = useState(selected ? selected : false);

  const toggleSelection = (event) => {
    setIsSelected(!isSelected);

    if (onToggleSelection) {
      onToggleSelection(id);
    }
  };

  const getThumbnail = (thumbnail, type) => {
    if (thumbnail) {
      return (
        <div className='image'>
          <img src={thumbnail} alt='' />
        </div>
      );
    } else {
      switch (type) {
        case 'audio/mp3':
          return (
            <div className='image image_icon'>
              <span className='la la-music la-4x'></span>
            </div>
          );

        case 'video/mp4':
          return (
            <div className='image image_icon'>
              <span className='la la-video la-4x'></span>
            </div>
          );

        case 'document/pdf':
          return (
            <div className='image image_icon'>
              <span className='la la-file la-4x'></span>
            </div>
          );

        default:
          return (
            <div className='image image_icon'>
              <span className='la la-folder la-4x'></span>
            </div>
          );
      }
    }
  };

  return (
    <div
      className={classNames('card', 'card_list', 'card_hoverable', {
        card_selected: isSelected,
      })}
    >
      {getThumbnail(thumbnail, type)}
      <div className='body'>
        <h5>{title}</h5>
        <p>{moment.unix(dateTime).format('LL')}</p>
      </div>
      <div className='actions'>
        <Checkbox checked={isSelected} onChange={toggleSelection} />
      </div>
    </div>
  );
};

CardList.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  type: PropTypes.string,
  dateTime: PropTypes.string,
  selected: PropTypes.bool,
  onToggleSelection: PropTypes.func,
};

export { CardRow, CardColumn, CardList };
