import React, { useState } from "react";

const AddReaderForm = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(""); // Thêm state cho địa chỉ

  const handleSubmit = () => {
    if (name && email && phone && address) {
      onAdd({ name, email, phone, address }); // Thêm địa chỉ vào đối tượng
      onClose();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Địa chỉ"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Số điện thoại"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSubmit}>Thêm</button>
      <button onClick={onClose}>Hủy</button>
    </div>
  );
};

export default AddReaderForm;
