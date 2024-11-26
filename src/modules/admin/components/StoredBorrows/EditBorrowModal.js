
import React, { useState } from 'react';
import './EditBorrowModal.css'; 

const EditBorrowModal = ({ borrow, onClose, onSave }) => {
    const [formData, setFormData] = useState(borrow);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Chỉnh Sửa Phiếu Mượn</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Mã Sách:
                        <input type="text" name="bookId" value={formData.bookId} onChange={handleChange} required />
                    </label>
                    <label>
                        Tên Người Mượn:
                        <input type="text" name="borrowerName" value={formData.borrowerName} onChange={handleChange} required />
                    </label>
                    <label>
                        Số Điện Thoại:
                        <input type="text" name="borrowerPhone" value={formData.borrowerPhone} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="borrowerEmail" value={formData.borrowerEmail} onChange={handleChange} required />
                    </label>
                    <label>
                        Ngày Mượn:
                        <input type="date" name="borrowDate" value={formData.borrowDate} onChange={handleChange} required />
                    </label>
                    <label>
                        Ngày Trả Dự Kiến:
                        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                    </label>
                    <button type="submit">Lưu</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </form>
            </div>
        </div>
    );
};

export default EditBorrowModal;
