import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';

const Popover = (props) => {
  const { title, content, children } = props;

  return (
    <Tippy
      theme='light-border popover'
      offset={[0, 12]}
      interactive
      allowHTML
      trigger='click'
      animation='shift-toward-extreme'
      appendTo={document.body}
      {...props}
      content={
        <>
          <h5>{title}</h5>
          <div className='mt-5'>{content}</div>
        </>
      }
    >
      {children}
    </Tippy>
  );
};

Popover.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Popover;
