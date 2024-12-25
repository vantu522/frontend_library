import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/layout/AdminLayout';
import Dashboard from '../components/admin/AdminDashboard';
import ChangePassword from '../components/admin/ChangePassword/ChangePassword';
import BookList from '../components/admin/Books/BookList';
import BorrowList from '../components/admin/Borrow/BorrowList';
import Reader from '../components/admin/Reader/ReaderList';
import FeedBack from '../components/admin/Feedback/FeedbackList';
import BorrowHistory from '../components/admin/Borrow/BorrowHistory';
import PostList from '../components/admin/PostList/PostList';
import PendingBorrowList from '../components/admin/Borrow/PendingBorrowList';
import RenewHistoryList from '../components/admin/Borrow/RenewHistoryList';
import ForgotPassword from '../pages/admin/login/ForgotPassword';

const AdminRoutes = () => {
  // Kiểm tra nếu có thông tin đăng nhập (token)
  const token = localStorage.getItem('admin');

  if (!token) {
    // Nếu không có token, điều hướng đến trang login của admin
    return <Navigate to="/admin/login" />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/readers" element={<Reader />} />
        <Route path="/PendingBorrowList" element={<PendingBorrowList />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/RenewHistoryList" element={<RenewHistoryList />} />
        <Route path="/postlist" element={<PostList />} />
        <Route path="/feedback" element={<FeedBack />} />
        <Route path="/borrowhistory" element={<BorrowHistory />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/stored-borrows" element={<BorrowList />} />
        <Route path="/change-password" element={<ChangePassword />} />

      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
