import React from 'react';
import Alert from 'components/Alert';
import { useSelector } from 'react-redux';
import { RootState } from 'features/store';

function AlertContainer() {
  const alertState = useSelector((state: RootState) => state.alert);

  const { alert } = alertState;

  return (
    <div className={`fixed left-1/2 bottom-8`}>
      {alert.map((elem) => {
        const { title, dismissable, color, outlined, children } = elem;
        return (
          <Alert title={title} dismissable={dismissable} color={color} outlined={outlined}>
            {children}
          </Alert>
        );
      })}
    </div>
  );
}

export default AlertContainer;
