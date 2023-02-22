import Tippy from '@tippyjs/react';

const Tooltip = (props) => {
  const { children } = props;

  return (
    <Tippy
      theme='light-border tooltip'
      touch={['hold', 500]}
      offset={[0, 12]}
      interactive
      animation='scale'
      appendTo={document.body}
      {...props}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
