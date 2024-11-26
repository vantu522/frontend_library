// AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookList from './components/BookList/BookList';
import ChangePassword from './components/ChangePassword/ChangePassword';
import StoredBorrows from './components/StoredBorrows/StoredBorrows';
import EmployeeManagement from './components/EmployeeManagement/EmployeeManagement';
import ReaderManagement from './components/ReaderManagement/ReaderManagement';
import StatisticsPage from './components/StatisticsCharts/StatisticsPage';
import TopReaders from './components/TopReaders/TopReaders';
import TopFavoriteBooks from './components/TopFavoriteBooks/TopFavoriteBooks';

const AppRoutes = ({ books, borrows, employees, readers, ...props }) => (
    <Routes>
        <Route path="/" element={<Home />} />
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
);

export default AppRoutes;
