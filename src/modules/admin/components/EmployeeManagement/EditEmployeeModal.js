import React, { useState, useEffect } from 'react';
import './EditEmployeeModal.css';

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        position: '',
        address: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

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
                <h2>{employee ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Tên:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>
                        Chức Vụ:
                        <input type="text" name="position" value={formData.position} onChange={handleChange} required />
                    </label>
                    <label>
                        Địa Chỉ:
                        <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    </label>
                    <label>
                        Số Điện Thoại:
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <button type="submit">Lưu</button>
                    <button type="button" onClick={onClose}>Đóng</button>
                </form>
            </div>
        </div>
    );
};

export default EditEmployeeModal;
