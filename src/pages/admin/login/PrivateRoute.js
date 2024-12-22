import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Kiểm tra xem người dùng đã đăng nhập chưa
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
