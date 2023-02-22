import { useRef } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Collapse = (props) => {
  const { open, children } = props;

  const collapseRef = useRef();

  const onEnter = () => {
    collapseRef.current.style.height = 0;
    collapseRef.current.style.opacity = 0;
  };

  const onEntering = () => {
    collapseRef.current.style.height = collapseRef.current.scrollHeight + 'px';
    collapseRef.current.style.opacity = 100;
  };

  const onEntered = () => {
    collapseRef.current.style.removeProperty('height');
    collapseRef.current.style.removeProperty('opacity');
    collapseRef.current.classList.add('open');
  };

  const onExit = () => {
    collapseRef.current.style.height = collapseRef.current.scrollHeight + 'px';
    collapseRef.current.style.opacity = 100;
  };

  const onExiting = () => {
    collapseRef.current.style.height = 0;
    collapseRef.current.style.opacity = 0;
  };

  const onExited = () => {
    collapseRef.current.style.removeProperty('height');
    collapseRef.current.style.removeProperty('opacity');
    collapseRef.current.classList.remove('open');
  };

  return (
    <CSSTransition
      nodeRef={collapseRef}
      appear={open}
      in={open}
      timeout={200}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      <div ref={collapseRef} className='collapse'>
        {children}
      </div>
    </CSSTransition>
  );
};

Collapse.propTypes = {
  open: PropTypes.bool,
};

const Accordion = (props) => {
  const { children } = props;

  return <div className='accordion mt-5 rounded-xl border border-divider'>{children}</div>;
};

const AccordionItem = (props) => {
  const { activeIndex, index, title, onToggle, children } = props;

  const accordionItemRef = useRef();

  const onEnter = () => {
    accordionItemRef.current.style.height = 0;
    accordionItemRef.current.style.opacity = 0;
  };

  const onEntering = () => {
    accordionItemRef.current.style.height = accordionItemRef.current.scrollHeight + 'px';
    accordionItemRef.current.style.opacity = 100;
  };

  const onEntered = () => {
    accordionItemRef.current.style.removeProperty('height');
    accordionItemRef.current.style.removeProperty('opacity');
    accordionItemRef.current.classList.add('open');
  };

  const onExit = () => {
    accordionItemRef.current.style.height = accordionItemRef.current.scrollHeight + 'px';
    accordionItemRef.current.style.opacity = 100;
  };

  const onExiting = () => {
    accordionItemRef.current.style.height = 0;
    accordionItemRef.current.style.opacity = 0;
  };

  const onExited = () => {
    accordionItemRef.current.style.removeProperty('height');
    accordionItemRef.current.style.removeProperty('opacity');
    accordionItemRef.current.classList.remove('open');
  };

  const isActive = () => {
    return activeIndex === index;
  };

  const toggle = () => {
    onToggle(index);
  };

  return (
    <>
      <h5
        className={classNames('accordion-header', 'p-5', {
          active: isActive(),
        })}
        onClick={() => toggle()}
      >
        {title}
        <span className='collapse-indicator la la-arrow-circle-down'></span>
      </h5>
      <CSSTransition
        nodeRef={accordionItemRef}
        appear={isActive()}
        in={isActive()}
        timeout={200}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div ref={accordionItemRef} className='collapse'>
          <div className='p-5 pt-0'>{children}</div>
        </div>
      </CSSTransition>
    </>
  );
};

AccordionItem.propTypes = {
  activeIndex: PropTypes.number,
  index: PropTypes.number,
  title: PropTypes.string,
  onToggle: PropTypes.func,
};

export default Collapse;

export { Accordion, AccordionItem };
