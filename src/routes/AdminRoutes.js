// AppRoutes.jsx
import React, { useState } from 'react';
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

const AdminRoutes = ({ ...props }) => {
    const [books, setBooks] = useState([]);
    const [borrows, setBorrows] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [readers, setReaders] = useState([]);

    return (
        <AdminLayout>
                 <Routes>
                <Route path="/" element={<Dashboard/>} />
                <Route path="/books" element={
                    <BookList 
                        books={books} 
                        onDelete={props.handleDeleteBook} 
                        onAdd={(newBook) => {
                            setBooks([...books, newBook]);
                            props.handleAddBook?.(newBook);
                        }} 
                        onUpdate={(updatedBook) => {
                            setBooks(books.map(book => 
                                book.id === updatedBook.id ? updatedBook : book
                            ));
                            props.handleUpdateBook?.(updatedBook);
                        }}
                    />
                } />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route
                    path="/stored-borrows"
                    element={<StoredBorrows borrows={borrows} setBorrows={setBorrows} onAdd={props.handleAddBorrow} onDelete={props.handleDeleteBorrow} onUpdate={props.handleUpdateBorrow} onReturn={props.markAsReturned} onNotReturned={props.markAsNotReturned} />}
                />
                <Route
                    path="/employees"
                    element={
                        <EmployeeManagement 
                            employees={employees} 
                            setEmployees={setEmployees}
                            onAdd={(newEmployee) => {
                                setEmployees([...employees, newEmployee]);
                                props.handleAddEmployee?.(newEmployee);
                            }}
                            onUpdate={(updatedEmployee) => {
                                setEmployees(employees.map(emp => 
                                    emp.id === updatedEmployee.id ? updatedEmployee : emp
                                ));
                                props.handleUpdateEmployee?.(updatedEmployee);
                            }}
                            onDelete={(id) => {
                                setEmployees(employees.filter(emp => emp.id !== id));
                                props.handleDeleteEmployee?.(id);
                            }}
                        />
                    }
                />
                <Route
                    path="/readers"
                    element={
                        <ReaderManagement 
                            readers={readers}
                            setReaders={setReaders}
                            onAdd={(newReader) => {
                                setReaders([...readers, newReader]);
                                props.handleAddReader?.(newReader);
                            }}
                            onUpdate={(updatedReader) => {
                                setReaders(readers.map(reader => 
                                    reader.id === updatedReader.id ? updatedReader : reader
                                ));
                                props.handleUpdateReader?.(updatedReader);
                            }}
                            onDelete={(id) => {
                                setReaders(readers.filter(reader => reader.id !== id));
                                props.handleDeleteReader?.(id);
                            }}
                        />
                    }
                />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/top-readers" element={<TopReaders />} />
                <Route path="/top-book" element={<TopFavoriteBooks />} />
            </Routes>
        </AdminLayout>
           
    );
};

export default AdminRoutes;
