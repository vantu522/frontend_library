import React, { useState, useEffect } from "react";

const EditReaderForm = ({ reader, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // Cập nhật giá trị form khi `reader` thay đổi
  useEffect(() => {
    if (reader) {
      setName(reader.name);
      setEmail(reader.email);
      setAddress(reader.address);
      setPhone(reader.phone);
    }
  }, [reader]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReader = { id: reader.id, name, email, address, phone };
    onUpdate(updatedReader); // Gọi hàm update
    onClose(); // Đóng form sau khi cập nhật
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
      <button type="button" onClick={onClose}>
        Hủy
      </button>
    </form>
  );
};

export default EditReaderForm;
