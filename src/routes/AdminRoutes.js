// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import BookList from '../components/admin/BookList/BookList';
import ChangePassword from '../components/admin/ChangePassword/ChangePassword';
import StoredBorrows from '../components/admin/StoredBorrows/StoredBorrows';
import EmployeeManagement from '../components/admin/EmployeeManagement/EmployeeManagement';
import ReaderManagement from '../components/admin/ReaderManagement/ReaderManagement';
import StatisticsPage from '../components/admin/StatisticsCharts/StatisticsPage';
import TopReaders from '../components/admin/TopReaders/TopReaders';
import TopFavoriteBooks from '../components/admin/TopFavoriteBooks/TopFavoriteBooks';
import AdminLayout from '../components/admin/layout/AdminLayout/AdminLayout';

const AdminRoutes = ({ books, borrows, employees, readers, ...props }) => {
    return (
        <AdminLayout>
                 <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/books" element={<BookList books={books} onDelete={props.handleDeleteBook} onAdd={props.handleAddBook} onUpdate={props.handleUpdateBook}/>} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route
                    path="/stored-borrows"
                    element={<StoredBorrows borrows={borrows} onAdd={props.handleAddBorrow} onDelete={props.handleDeleteBorrow} onUpdate={props.handleUpdateBorrow} setBorrows={props.setBorrows} onReturn={props.markAsReturned} onNotReturned={props.markAsNotReturned} />}
                />
                <Route
                    path="/employees"
                    element={<EmployeeManagement employees={employees} onAdd={props.handleAddEmployee} onUpdate={props.handleUpdateEmployee} onDelete={props.handleDeleteEmployee} />}
                />
                <Route
                    path="/readers"
                    element={<ReaderManagement readers={readers} onAdd={props.handleAddReader} onUpdate={props.handleUpdateReader} onDelete={props.handleDeleteReader} />}
                />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/top-readers" element={<TopReaders />} />
                <Route path="/top-book" element={<TopFavoriteBooks />} />
            </Routes>
        </AdminLayout>
           
    );
};

export default AdminRoutes;
