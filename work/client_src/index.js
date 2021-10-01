// Entry point into app. Imports React, React DOM, Context Provider, and App
// Renders App, wrapped in Provider, at the root div.

import React from 'react';
import ReactDOM from 'react-dom';

import './styles/reset.css';
import './styles/global.css';

import {Provider} from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);