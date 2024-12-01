import React, { useState } from 'react';
import Button from "../../../common/admin/Button/Button";

const AddEmployeeForm = ({ onAdd, setVisibleForm }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: `NV${String(Math.floor(100000 + Math.random() * 900000))}`, // Tạo ID ngẫu nhiên
      name,
      position,
      phone,
      email,
    };

    onAdd(newEmployee);
    setVisibleForm(false);
  };

  return (
    <div>
      <h2>Thêm Nhân Viên</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Chức Vụ:</label>
          <input 
            type="text" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Số Điện Thoại:</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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

export default AddEmployeeForm;
