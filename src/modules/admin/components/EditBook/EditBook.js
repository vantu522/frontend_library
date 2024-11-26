import React, { useState, useEffect } from 'react';
import './EditBook.css';

const EditBookModal = ({ book, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        genre: '',
        year: ''
    });

    useEffect(() => {
        if (book) {
            setFormData(book);
        } else {
            setFormData({ title: '', author: '', genre: '', year: '' });
        }
    }, [book]);

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
                <h2>{book ? 'Chỉnh Sửa Sách' : 'Thêm Sách'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Tên Sách:
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </label>
                    <label>
                        Tác Giả:
                        <input type="text" name="author" value={formData.author} onChange={handleChange} required />
                    </label>
                    <label>
                        Thể Loại:
                        <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
                    </label>
                    <label>
                        Năm Xuất Bản:
                        <input type="number" name="year" value={formData.year} onChange={handleChange} />
                    </label>
                    <button type="submit">Lưu</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </form>
            </div>
        </div>
    );
};

export default EditBookModal;
