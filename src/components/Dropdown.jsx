import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';

const Dropdown = (props) => {
  const { content, children, ...rest } = props;

  return (
    <Tippy
      content={content}
      theme='light-border'
      offset={[0, 8]}
      arrow={false}
      placement='bottom-start'
      interactive
      allowHTML
      animation='shift-toward-extreme'
      appendTo={document.body}
      {...rest}
    >
      {children}
    </Tippy>
  );
};

Dropdown.propTypes = {
  content: PropTypes.object,
};

export default Dropdown;
