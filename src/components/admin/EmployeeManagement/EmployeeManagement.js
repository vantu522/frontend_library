import React, { useState } from 'react';
import './EmployeeManagement.css';
import EmployeeModal from './EditEmployeeModal';

const EmployeeManagement = ({ employees, onAdd, onUpdate, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5; 

    const handleOpenModal = (employee = null) => {
        setCurrentEmployee(employee);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setCurrentEmployee(null);
        setShowModal(false);
    };

    const handleSave = (employeeData) => {
        if (currentEmployee) {
            onUpdate(employeeData);
        } else {
            const newId = 'NV' + String(Math.floor(100000 + Math.random() * 900000));  // Tạo id bắt đầu bằng NV và 6 số
            onAdd({ ...employeeData, id: newId });
        }
        handleCloseModal();
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    return (
        <div className="employee-management">
            <h2>Quản Lý Nhân Viên</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc chức vụ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button onClick={() => handleOpenModal()}>Thêm Nhân Viên</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Chức Vụ</th>
                        <th>Địa Chỉ</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button onClick={() => handleOpenModal(employee)}>Sửa</button>
                                <button onClick={() => onDelete(employee.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <EmployeeModal 
                    employee={currentEmployee} 
                    onClose={handleCloseModal} 
                    onSave={handleSave} 
                />
            )}
            <div className="pagination">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Trước</button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Tiếp theo</button>
            </div>
        </div>
    );
};

export default EmployeeManagement;
