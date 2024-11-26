import React, { useState, useEffect } from 'react';

const BorrowModal = ({ isOpen, onRequestClose, onAdd, onUpdate, selectedBorrow }) => {
    const [borrow, setBorrow] = useState({
        id: '',
        bookName: '',
        borrowerName: '',
        borrowerPhone: '',
        borrowerEmail: '',
        borrowDate: '',
        dueDate: '',
        isReturned: false,
        isOverdue: false,
    });

    const resetForm = () => {
        setBorrow({
            id: '',
            bookName: '',
            borrowerName: '',
            borrowerPhone: '',
            borrowerEmail: '',
            borrowDate: '',
            dueDate: '',
            isReturned: false,
            isOverdue: false,
        });
    };

    useEffect(() => {
        if (isOpen) {
            if (selectedBorrow) {
                setBorrow(selectedBorrow);
            } else {
                const newId = `PM${String(Math.floor(100 + Math.random() * 900))}`;
                setBorrow((prevBorrow) => ({ ...prevBorrow, id: newId }));
            }
        }
    }, [isOpen, selectedBorrow]);

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrow((prevBorrow) => ({
            ...prevBorrow,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (!borrow.bookName || !borrow.borrowerName || !borrow.borrowerPhone || !borrow.borrowDate || !borrow.dueDate) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (selectedBorrow) {
            onUpdate(borrow);
        } else {
            onAdd(borrow);
        }
        onRequestClose();
    };

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <h2>{selectedBorrow ? 'Chỉnh Sửa Phiếu Mượn' : 'Thêm Phiếu Mượn'}</h2>

                <label htmlFor="id">Mã Phiếu:</label>
                <input type="text" id="id" name="id" value={borrow.id} readOnly />

                <label htmlFor="bookName">Tên Sách:</label>
                <input
                    type="text"
                    id="bookName"
                    name="bookName"
                    placeholder="Tên Sách"
                    value={borrow.bookName}
                    onChange={handleChange}
                />

                <label htmlFor="borrowerName">Tên Người Mượn:</label>
                <input
                    type="text"
                    id="borrowerName"
                    name="borrowerName"
                    placeholder="Tên Người Mượn"
                    value={borrow.borrowerName}
                    onChange={handleChange}
                />

                <label htmlFor="borrowerPhone">Số Điện Thoại:</label>
                <input
                    type="text"
                    id="borrowerPhone"
                    name="borrowerPhone"
                    placeholder="Số Điện Thoại"
                    value={borrow.borrowerPhone}
                    onChange={handleChange}
                />

                <label htmlFor="borrowerEmail">Email:</label>
                <input
                    type="email"
                    id="borrowerEmail"
                    name="borrowerEmail"
                    placeholder="Email"
                    value={borrow.borrowerEmail}
                    onChange={handleChange}
                />

                <label htmlFor="borrowDate">Ngày Mượn:</label>
                <input
                    type="date"
                    id="borrowDate"
                    name="borrowDate"
                    value={borrow.borrowDate}
                    onChange={handleChange}
                />

                <label htmlFor="dueDate">Ngày Trả Dự Kiến:</label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={borrow.dueDate}
                    onChange={handleChange}
                />

                <label htmlFor="isReturned">
                    Trạng Thái:
                    <input
                        type="checkbox"
                        id="isReturned"
                        name="isReturned"
                        checked={borrow.isReturned}
                        onChange={(e) => setBorrow({ ...borrow, isReturned: e.target.checked })}
                    />
                </label>

                <button onClick={handleSave}>Lưu</button>
                <button onClick={() => { onRequestClose(); resetForm(); }}>Đóng</button>
            </div>
        </div>
    ) : null;
};

export default BorrowModal;
