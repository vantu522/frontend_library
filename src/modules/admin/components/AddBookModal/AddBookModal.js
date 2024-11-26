// AddBookModal.jsx
import React, { useState, useEffect } from 'react';
import './AddBookModal.css';

const AddBookModal = ({ isOpen, onRequestClose, onAdd, onUpdate, editBook }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: '',
        genre: '',
        publisher: '',
        quantity: '',
        status: 'available',
        dateAdded: new Date().toLocaleDateString(),
    });

    useEffect(() => {
        if (editBook) {
            setFormData({ ...editBook }); // Set data for editing
        }
    }, [editBook]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editBook) {
            onUpdate(formData); // Call onUpdate if editing
        } else {
            onAdd(formData); // Call onAdd if adding new book
        }
        onRequestClose();
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <h3>{editBook ? 'Chỉnh sửa sách' : 'Thêm sách'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Tác giả</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Năm xuất bản</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Thể loại</label>
                            <input
                                type="text"
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="publisher">Nhà xuất bản</label>
                            <input
                                type="text"
                                id="publisher"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Số lượng</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Trạng thái</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="available">Còn sách</option>
                                <option value="unavailable">Hết sách</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit">{editBook ? 'Cập nhật' : 'Thêm sách'}</button>
                            <button type="button" onClick={onRequestClose}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default AddBookModal;
