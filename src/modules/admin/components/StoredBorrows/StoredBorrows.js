import React, { useState, useEffect } from 'react';
import './StoredBorrows.css';
import BorrowModal from '../BorrowModal/BorrowModal';

const StoredBorrows = ({ borrows, onAdd, onUpdate, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');
    const [borrowsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBorrow, setSelectedBorrow] = useState(null);

    const checkOverdueBorrows = () => {
        borrows.forEach(borrow => {
            const isOverdue = new Date(borrow.dueDate) < new Date();
            if (isOverdue && !borrow.isReturned && !borrow.isOverdue) {
                borrow.isOverdue = true;
                onUpdate(borrow); 
            }
        });
    };

    useEffect(() => {
        checkOverdueBorrows();
    }, [borrows]);

    const handleStatusToggle = (id) => {
        const updatedBorrow = borrows.find(borrow => borrow.id === id);
        if (updatedBorrow) {
            updatedBorrow.isReturned = !updatedBorrow.isReturned;
            updatedBorrow.isOverdue = false; 
            onUpdate(updatedBorrow);
        }
    };

    const filteredBorrows = borrows.filter(borrow => {
        const matchesSearch = 
            borrow.borrowerPhone.includes(searchTerm) ||
            borrow.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            borrow.id.toString().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || 
                             (statusFilter === 'returned' ? borrow.isReturned : !borrow.isReturned);
                             
        return matchesSearch && matchesStatus;
    });

    const indexOfLastBorrow = currentPage * borrowsPerPage;
    const indexOfFirstBorrow = indexOfLastBorrow - borrowsPerPage;
    const currentBorrows = filteredBorrows.slice(indexOfFirstBorrow, indexOfLastBorrow);
    const totalPages = Math.ceil(filteredBorrows.length / borrowsPerPage);

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
        setSelectedBorrow(null);
    };

    const handleEditBorrow = (borrow) => {
        setSelectedBorrow(borrow);
        setIsModalOpen(true);
    };

    return (
        <div className="stored-borrows">
            <h2>Quản Lý Phiếu Mượn</h2>

            <div className="navigation">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, mã phiếu, hoặc số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
                    <option value="all">Tất cả trạng thái</option>
                    <option value="returned">Đã trả</option>
                    <option value="not-returned">Chưa trả</option>
                    <option value="overdue">Quá hạn</option>
                </select>
                <button onClick={openModal} className="add-borrow-btn">Thêm Phiếu Mượn</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Mã Phiếu</th>
                        <th>Tên Sách</th>
                        <th>Tên Người Mượn</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th>Ngày Mượn</th>
                        <th>Ngày Trả Dự Kiến</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentBorrows.map((borrow) => (
                        <tr key={borrow.id}>
                            <td>{borrow.id}</td>
                            <td>{borrow.bookName}</td>
                            <td>{borrow.borrowerName}</td>
                            <td>{borrow.borrowerPhone}</td>
                            <td>{borrow.borrowerEmail}</td>
                            <td>{borrow.borrowDate}</td>
                            <td style={{ color: borrow.isOverdue && !borrow.isReturned ? 'red' : 'black' }}>
                                {borrow.dueDate}
                            </td>
                            <td style={{ color: borrow.isOverdue ? 'red' : 'black' }}>
                                {borrow.isReturned ? 'Đã Trả' : borrow.isOverdue ? 'Quá Hạn' : 'Chưa Trả'}
                            </td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEditBorrow(borrow)}>Chỉnh Sửa</button>
                                <button
                                    className={borrow.isReturned ? 'returned-btn' : 'edit-btn'}
                                    onClick={() => handleStatusToggle(borrow.id)}
                                >
                                    {borrow.isReturned ? 'Đã Trả' : 'Chưa Trả'}
                                </button>
                                <button className="delete-btn" onClick={() => onDelete(borrow.id)}>Xóa</button>
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

            <BorrowModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onAdd={onAdd}
                onUpdate={onUpdate}
                selectedBorrow={selectedBorrow}
            />
        </div>
    );
};

export default StoredBorrows;
