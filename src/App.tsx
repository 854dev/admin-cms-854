import React from 'react';

import { Provider } from 'react-redux';

import './App.css';

import Router from './routes';
import Store from './features/store';
import AlertContainer from 'layouts/partials/AlertContainer';

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
      <AlertContainer />
    </Provider>
  );
};

export default App;
