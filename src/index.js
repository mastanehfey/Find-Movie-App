import React from 'react';
import ReactDOM from 'react-dom';
import {ContextProvider} from './Context'

import './index.css';
import App from './component/App';

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById('root')
)