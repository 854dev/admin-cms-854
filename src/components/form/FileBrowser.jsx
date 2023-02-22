import { useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const FileBrowser = (props) => {
  const { onChange, className, ...rest } = props;

  const [fileName, setFileName] = useState('No file chosen');

  const handleOnChange = (event) => {
    const fileName = event.target.value.split('\\').pop();
    setFileName(fileName);

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <label className={classNames('input-group font-normal', className)}>
      <div className='file-name input-addon input-addon-prepend input-group-item w-full overflow-x-hidden'>
        {fileName}
      </div>
      <input type='file' className='hidden' onChange={handleOnChange} {...rest} />
      <div className='input-group-item btn btn_primary uppercase'>Choose File</div>
    </label>
  );
};

FileBrowser.propTypes = {
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default FileBrowser;
