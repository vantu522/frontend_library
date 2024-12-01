import React, { useState, useEffect } from 'react';
import Button from "../../../common/admin/Button/Button";

const EditEmployeeForm = ({ employeeId, onUpdate, setVisibleForm }) => {
  const [employee, setEmployee] = useState(null);

  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const currentEmployee = employees.find(emp => emp.id === employeeId);

  useEffect(() => {
    if (currentEmployee) {
      setEmployee(currentEmployee);
    }
  }, [currentEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      onUpdate(employee);
      setVisibleForm(false);
    }
  };

  if (!employee) return null;

  return (
    <div>
      <h2>Chỉnh Sửa Nhân Viên</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input 
            type="text" 
            value={employee.name} 
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })} 
            required
          />
        </div>
        <div>
          <label>Chức Vụ:</label>
          <input 
            type="text" 
            value={employee.position} 
            onChange={(e) => setEmployee({ ...employee, position: e.target.value })} 
            required
          />
        </div>
        <div>
          <label>Số Điện Thoại:</label>
          <input 
            type="text" 
            value={employee.phone} 
            onChange={(e) => setEmployee({ ...employee, phone: e.target.value })} 
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={employee.email} 
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })} 
            required
          />
        </div>
        <div>
          <Button type="submit" className="primary">Lưu</Button>
          <Button type="button" onClick={() => setVisibleForm(false)} className="secondary">Hủy</Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
