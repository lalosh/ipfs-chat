import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RootContainer } from './root/root.container';
import { Provider } from 'react-redux';
import { store } from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
