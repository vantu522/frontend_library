import React, { useState, useEffect } from "react";
import memberService from "../../../services/admin/memberService";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from 'framer-motion';


const EditReaderForm = ({ reader, onClose, onUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [booksBorrowed, setBooksBorrowed] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [borrowingMem, setBorrowingMem] = useState([]);

  useEffect(() => {
    if (reader) {
      setName(reader.name);
      setEmail(reader.email);
      setAddress(reader.address);
      setPhoneNumber(reader.phoneNumber);
      setBooksBorrowed(reader.booksBorrowed);
    }
  }, [reader]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    const updatedReader = { id: reader.memberId, name, email, address, phoneNumber, booksBorrowed };
  
    try {
      const result = await memberService.updateMember(reader.memberId, updatedReader);
      onUpdate(result); // Cập nhật dữ liệu trong Redux Store
      onClose(); 
      toast.success("Cập nhật độc giả thành công!")
    } catch (err) {
      setError("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.");
      toast.error("Cập nhật độc giả thất bại!")
    } finally {
      setIsLoading(false);
    }
    
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-lg "
    >
      <h1 className="uppercase"><strong>Chỉnh sửa người dùng</strong></h1>
      <div className="grid grid-cols-2 gap-10">
        {/* Cột trái */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">ID:</label>
            <input
              type="text"
              disabled
              value={reader.memberId}
              className="w-full mt-1 p-2 bg-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Đang mượn:</label>
            <input
              type="number"
              value={booksBorrowed}
              onChange={(e) => setBooksBorrowed(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Địa chỉ:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">Số điện thoại:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Phần error và button submit ở dưới cùng */}
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </form>
  );
};

export default EditReaderForm;


