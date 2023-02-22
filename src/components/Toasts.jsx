import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Toasts = (props) => {
  const { toastList, autoDelete, autoDeleteTime = 3 } = props;

  const [list, setList] = useState(toastList);

  const deleteToast = (id) => {
    const index = list.findIndex((toast) => toast.id === id);
    list.splice(index, 1);
    setList([...list]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  return (
    <TransitionGroup
      id='toasts-container'
      className='toasts-container top-auto bottom-0 right-0 left-0 overflow-y-scroll lg:top-0 lg:ltr:left-auto lg:rtl:right-auto'
    >
      {list.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDeleteToast={deleteToast} />
      ))}
    </TransitionGroup>
  );
};

Toasts.propTypes = {
  toastList: PropTypes.array,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number,
};

const ToastItem = (props) => {
  const { toast, onDeleteToast, ...rest } = props;

  const toastRef = useRef();

  const animations = {
    enterActive: 'animate__animated animate__faster animate__fadeInUp',
    exitActive: 'animate__animated animate__faster animate__fadeOutUp',
  };

  const onExit = () => {
    toastRef.current.style.height = toastRef.current.scrollHeight + 'px';
  };

  const onExiting = () => {
    toastRef.current.style.height = 0;
  };

  const onExited = () => {
    toastRef.current.style.removeProperty('height');
  };

  const deleteToast = () => {
    onDeleteToast(toast.id);
  };

  return (
    <CSSTransition
      {...rest}
      nodeRef={toastRef}
      timeout={200}
      classNames={animations}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      unmountOnExit
    >
      <div ref={toastRef} className='toast mb-4'>
        <div className='toast-header'>
          <h5>{toast.title}</h5>
          <small>{toast.time}</small>
          <button className='close' onClick={() => deleteToast()}>
            &times;
          </button>
        </div>
        <div className='toast-body'>{toast.body}</div>
      </div>
    </CSSTransition>
  );
};

ToastItem.propTypes = {
  toast: PropTypes.object,
  onDeleteToast: PropTypes.func,
};

export default Toasts;
