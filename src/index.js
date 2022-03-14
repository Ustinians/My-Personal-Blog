import React from 'react';
import ReactDOM from 'react-dom';
// 引入路由相关
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

