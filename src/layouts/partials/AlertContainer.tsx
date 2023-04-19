import React from 'react';
import Alert from 'components/Alert';
import { useSelector } from 'react-redux';
import { RootState } from 'features/store';

function AlertContainer() {
  const alertState = useSelector((state: RootState) => state.alert);

  const { alert } = alertState;

  return (
    <div className={`fixed bottom-8 flex w-screen flex-col justify-center px-[30%]`}>
      {alert.map((elem) => {
        const { title, dismissable, color, outlined, children } = elem;
        return (
          <Alert
            key={title}
            title={title}
            dismissable={dismissable}
            color={color}
            outlined={outlined}
          >
            {children}
          </Alert>
        );
      })}
    </div>
  );
}

export default AlertContainer;
