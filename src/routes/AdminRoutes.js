import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/layout/AdminLayout/AdminLayout';
import Dashboard from '../components/admin/AdminDashboard/AdminDashboard';
import ChangePassword from '../components/admin/ChangePassword/ChangePassword';
import BookList from '../components/admin/Books/BookList/BookList';
import BorrowList from '../components/admin/Borrow/BorrowList/BorrowList';
import EmployeeList from '../components/admin/Employee/EmployeeList';
import Reader from '../components/admin/Reader/ReaderList';
import FeedBack from '../components/admin/Feedback/FeedbackList';
import ArchivedFeedback from '../components/admin/Feedback/ArchivedFeedbackList';
import BorrowHistory from '../components/admin/Borrow/BorrowHistory/BorrowHistory';
import CategoryList from '../components/admin/Books/CategoryList/CategoryList';

const AdminRoutes = () => {
  return (
    <AdminLayout >
      <Routes>
      <Route path="/" element={<Dashboard/>} />
        <Route path="/readers" element={<Reader/>} />
        <Route path="/feedback" element={<FeedBack/>} />
        <Route path="/borrowhistory" element={<BorrowHistory/>} />
        <Route path="/categorylist" element={<CategoryList/>} />
        <Route path="/archivedfeedback" element={<ArchivedFeedback/>} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/stored-borrows" element={<BorrowList />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;

