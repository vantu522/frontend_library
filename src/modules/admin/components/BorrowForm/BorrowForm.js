
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BorrowForm.css';

const BorrowForm = ({ onAddBorrow }) => {
    const [bookId, setBookId] = useState('');
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowerPhone, setBorrowerPhone] = useState('');
    const [borrowerEmail, setBorrowerEmail] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newBorrow = {
            id: Date.now(),
            bookId,
            borrowerName,
            borrowerPhone,
            borrowerEmail,
            borrowDate,
            dueDate,
        };

        onAddBorrow(newBorrow);
        navigate('/stored-borrows'); 
    };

    return (
        <div className="borrow-form">
            <h2>Lập Phiếu Mượn</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Mã Sách:
                    <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
                </label>
                <label>
                    Tên Người Mượn:
                    <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} required />
                </label>
                <label>
                    Số Điện Thoại:
                    <input type="text" value={borrowerPhone} onChange={(e) => setBorrowerPhone(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={borrowerEmail} onChange={(e) => setBorrowerEmail(e.target.value)} required />
                </label>
                <label>
                    Ngày Mượn:
                    <input type="date" value={borrowDate} onChange={(e) => setBorrowDate(e.target.value)} required />
                </label>
                <label>
                    Ngày Trả Dự Kiến:
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                </label>
                <button type="submit">Lập Phiếu Mượn</button>
                <button type="button" onClick={() => navigate(-1)}>Quay lại</button> 
            </form>
        </div>
    );
};

export default BorrowForm;
