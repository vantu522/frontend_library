import React, { useState } from 'react';
import AddBookModal from '../AddBookModal/AddBookModal';
import './BookList.css';

const BookList = ({ books, onAdd, onDelete, onUpdate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [booksPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editBook, setEditBook] = useState(null); // For editing books

    // Filter books based on search term and status
    const filteredBooks = books.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setEditBook(null); // Reset when closing modal
    };

    const handleEditBook = (book) => {
        setEditBook(book);
        setIsModalOpen(true);
    };

    const handleStatusToggle = (id) => {
        const book = books.find(b => b.id === id);
        if (book) {
            onUpdate({ ...book, status: book.status === 'available' ? 'unavailable' : 'available' });
        }
    };

    return (
        <div className="book-list">
            <h2>Danh Sách Sách</h2>

            <div className="navigation">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sách theo tên hoặc tác giả..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="available">Còn Sách</option>
                    <option value="unavailable">Hết sách</option>
                </select>
                <button onClick={openModal} className="add-book-btn">Thêm Sách</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Năm xuất bản</th>
                        <th>Thể loại</th>
                        <th>Nhà xuất bản</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Mô tả</th>
                        <th>Ngày thêm</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBooks.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                            <td>{book.genre}</td>
                            <td>{book.publisher}</td>
                            <td>{book.quantity}</td>
                            <td className={book.status === 'available' ? 'status-available' : 'status-unavailable'}>
                                {book.status === 'available' ? 'Còn sách' : 'Hết sách'}
                            </td>
                            <td>{book.description}</td>
                            <td>{book.dateAdded}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditBook(book)}>Chỉnh sửa</button>
                                <button className="delete-btn" onClick={() => onDelete(book.id)}>Xóa</button>
                                <button className="status-toggle-btn" onClick={() => handleStatusToggle(book.id)}>
                                    {book.status === 'available' ? 'Hết sách' : 'Còn sách'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Trước</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Tiếp</button>
            </div>

            <AddBookModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onAdd={onAdd}
                onUpdate={onUpdate}
                editBook={editBook}
            />
        </div>
    );
};

export default BookList;
