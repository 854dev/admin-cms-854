import { createContext, useContext, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const TabsContext = createContext();

const Tabs = (props) => {
  const { activeIndex, onActiveIndexChange, className, children } = props;

  const [activeTab, setActiveTab] = useState(activeIndex);

  useEffect(() => {
    setActiveTab(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (onActiveIndexChange) {
      onActiveIndexChange(activeTab);
    }
  }, [activeTab]);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={classNames('tabs', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  activeIndex: PropTypes.number,
  onActiveIndexChange: PropTypes.func,
  className: PropTypes.string,
};

const TabsNavigation = (props) => {
  const { children } = props;

  return <nav className='tab-nav'>{children}</nav>;
};

const TabsNavigationItem = (props) => {
  const { index, className, children } = props;

  const { activeTab, setActiveTab } = useContext(TabsContext);

  const isActive = () => {
    return activeTab === index;
  };

  return (
    <button
      className={classNames('nav-link', 'h5', className, {
        active: isActive(),
      })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

TabsNavigationItem.propTypes = {
  index: PropTypes.number,
  className: PropTypes.string,
};

const TabsContent = (props) => {
  const { className, children } = props;

  const { activeTab } = useContext(TabsContext);

  const tabContentRef = useRef();

  const onEnter = () => {
    tabContentRef.current.style.height = 0;
    tabContentRef.current.style.opacity = 0;
  };

  const onEntering = () => {
    tabContentRef.current.style.height = tabContentRef.current.scrollHeight + 'px';
    tabContentRef.current.style.opacity = 100;
  };

  const onEntered = () => {
    tabContentRef.current.style.removeProperty('height');
    tabContentRef.current.style.removeProperty('opacity');
  };

  const onExit = () => {
    tabContentRef.current.style.height = tabContentRef.current.scrollHeight + 'px';
    tabContentRef.current.style.opacity = 100;
  };

  const onExiting = () => {
    tabContentRef.current.style.height = 0;
    tabContentRef.current.style.opacity = 0;
  };

  const onExited = () => {
    tabContentRef.current.style.removeProperty('height');
    tabContentRef.current.style.removeProperty('opacity');
  };

  const renderItems = () => {
    return children.map((item) => {
      return item.props.index === activeTab ? item : null;
    });
  };

  return (
    <SwitchTransition>
      <CSSTransition
        key={activeTab}
        nodeRef={tabContentRef}
        timeout={200}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div ref={tabContentRef} className={classNames('collapse', 'open', 'mt-5', className)}>
          {renderItems()}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

TabsContent.propTypes = {
  className: PropTypes.string,
};

const TabsContentItem = (props) => {
  const { className, children } = props;

  return <div className={className}>{children}</div>;
};

TabsContentItem.propTypes = {
  className: PropTypes.string,
};

export default Tabs;

export { TabsNavigation, TabsNavigationItem, TabsContent, TabsContentItem };
