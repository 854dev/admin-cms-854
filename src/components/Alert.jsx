import { useRef, useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const Alert = (props) => {
  const { title, color = 'primary', outlined, dismissable, children } = props;

  const alertRef = useRef();

  const [isAlertActive, setIsAlertActive] = useState(true);

  const onEnter = () => {
    alertRef.current.style.opacity = 0;
    alertRef.current.style.height = 0;
  };

  const onEntering = () => {
    alertRef.current.style.opacity = 100;
    alertRef.current.style.height = alertRef.current.scrollHeight + 'px';
  };

  const onEntered = () => {
    alertRef.current.style.removeProperty('opacity');
    alertRef.current.style.removeProperty('height');
  };

  const onExit = () => {
    alertRef.current.style.opacity = 100;
    alertRef.current.style.height = alertRef.current.scrollHeight + 'px';
  };

  const onExiting = () => {
    alertRef.current.style.opacity = 0;
    alertRef.current.style.height = 0;
  };

  const onExited = () => {
    alertRef.current.style.removeProperty('opacity');
    alertRef.current.style.removeProperty('height');
  };

  return (
    <CSSTransition
      nodeRef={alertRef}
      appear={isAlertActive}
      in={isAlertActive}
      timeout={200}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      unmountOnExit
    >
      <div ref={alertRef} className='alert-wrapper'>
        <div
          className={classNames('alert', `alert_${color}`, {
            alert_outlined: outlined,
          })}
        >
          <div className={`_content ${dismissable ? 'pr-8' : null}`}>
            <strong className='uppercase'>
              <bdi>{title}</bdi>
            </strong>
            {children}
          </div>

          {dismissable ? (
            <button
              className='dismiss la la-times'
              onClick={() => setIsAlertActive(false)}
            ></button>
          ) : null}
        </div>
      </div>
    </CSSTransition>
  );
};

Alert.propTypes = {
  title: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  outlined: PropTypes.bool,
  dismissable: PropTypes.bool,
};

export default Alert;
