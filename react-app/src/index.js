import React from 'react';
import ReactDOM from 'react-dom';
// CSS読み込み
import '../src/css/index.css';
import '../src/css/style.css';
import '../src/css/reset.css';
import '../src/css/root.css';
import App from '../src/js/App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
