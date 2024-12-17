import React from 'react';
import ReactDOM from 'react-dom/client'; // Đổi từ 'react-dom' sang 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/admin/store';
import App from './App';
import "./index.css"; 

// Tạo root bằng createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
