import { createContext, useContext, useRef } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Backdrop from 'components/Backdrop';

import useOnClickOutside from 'hooks/useOnClickOutside';

const ModalContext = createContext();

const Modal = (props) => {
  const { active, centered, scrollable, staticBackdrop = false, aside, onClose, children } = props;

  const modalContentRef = useRef();

  // Static Backdrop
  useOnClickOutside(modalContentRef, () => {
    if (!staticBackdrop) {
      onClose();
    }
  });

  const animations = aside
    ? {
        enterActive: 'animate__animated animate__faster animate__fadeInRight',
        exitActive: 'animate__animated animate__faster animate__fadeOutRight',
      }
    : {
        enterActive: 'animate__animated animate__faster animate__fadeInDown',
        exitActive: 'animate__animated animate__faster animate__fadeOutUp',
      };

  return (
    <ModalContext.Provider value={{ onClose }}>
      <Backdrop active={active} />
      <CSSTransition
        nodeRef={modalContentRef}
        in={active}
        timeout={200}
        classNames={animations}
        unmountOnExit
      >
        <div
          className={classNames('modal', 'active', {
            modal_aside: aside,
          })}
        >
          <div
            className={classNames('modal-dialog', 'max-w-2xl', {
              'modal-dialog_centered': centered,
              'modal-dialog_scrollable': scrollable,
            })}
          >
            <div ref={modalContentRef} className='modal-content'>
              {children}
            </div>
          </div>
        </div>
      </CSSTransition>
    </ModalContext.Provider>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  centered: PropTypes.bool,
  scrollable: PropTypes.bool,
  staticBackdrop: PropTypes.bool,
  aside: PropTypes.bool,
  onClose: PropTypes.func,
};

const ModalHeader = (props) => {
  const { children } = props;

  const { onClose } = useContext(ModalContext);

  return (
    <div className='modal-header'>
      <h2 className='modal-title'>{children}</h2>
      <button className='close la la-times' onClick={onClose}></button>
    </div>
  );
};

const ModalBody = (props) => {
  const { children } = props;

  return <div className='modal-body'>{children}</div>;
};

const ModalFooter = (props) => {
  const { children } = props;

  return <div className='modal-footer'>{children}</div>;
};

export default Modal;

export { ModalHeader, ModalBody, ModalFooter };
