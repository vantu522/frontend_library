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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded-lg shadow-lg"
    >
      <div>
        <label className="block font-medium text-gray-700">Tên:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Địa Chỉ:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Số Điện Thoại:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default EditReaderForm;
