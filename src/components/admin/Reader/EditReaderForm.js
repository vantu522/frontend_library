import React, { useState, useEffect } from 'react';

const EditReaderForm = ({ readerId, setVisibleForm, onUpdate, readers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");


  useEffect(() => {
    if (readers && Array.isArray(readers)) {
      const reader = readers.find((reader) => reader.id === readerId);
      if (reader) {
        setName(reader.name);
        setEmail(reader.email);
        setAddress(reader.address);
        setPhone(reader.phone);
      }
    }
  }, [readerId, readers]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReader = { id: readerId, name, email, address, phone };
    onUpdate(updatedReader);  
    setVisibleForm(false);    
  };

  return (
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
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Địa Chỉ:</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
      </div>
      <div>
        <label>Số Điện Thoại:</label>
        <input 
          type="text" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
      </div>
      <button type="submit">Lưu</button>
      <button type="button" onClick={() => setVisibleForm(false)}>Hủy</button>
    </form>
  );
};

export default EditReaderForm;
