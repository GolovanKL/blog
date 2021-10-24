import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import store from './Reducer/store';
import App from './Components/App/App';

import 'antd/dist/antd.css';
import './index.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider>
        <App/>
      </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

