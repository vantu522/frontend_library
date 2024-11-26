import React, { useState, useEffect } from 'react';
import './EditReaderModal.css';

const EditReaderModal = ({ reader, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        if (reader) {
            setFormData(reader);
        } else {
            setFormData({ name: '', email: '', address: '', phone: '' });
        }
    }, [reader]);

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
                <h2>{reader ? 'Chỉnh Sửa Độc Giả' : 'Thêm Độc Giả'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Tên:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Địa Chỉ:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <label>
                        Số Điện Thoại:
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </label>
                    <button type="submit">Lưu</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </form>
            </div>
        </div>
    );
};

export default EditReaderModal;
