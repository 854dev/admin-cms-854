import React from 'react';

import { Provider } from 'react-redux';

import './App.css';

import Router from './routes';
import Store from './features/store';

const App = () => {
  return (
    <Provider store={Store}>
      <Router />
    </Provider>
  );
};

export default App;
