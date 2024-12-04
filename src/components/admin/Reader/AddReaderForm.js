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
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
      <div>
        <label className="block font-medium text-gray-700">Tên:</label>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Địa chỉ:</label>
        <input
          type="text"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Số điện thoại:</label>
        <input
          type="text"
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Thêm
        </button>

      </div>
    </div>
  );
};

export default AddReaderForm;
