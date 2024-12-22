import React, { useState } from "react";
import memberService from "../../../services/admin/memberService";
import { toast } from 'react-toastify'; // Đảm bảo đã cài đặt thư viện toast

const AddReaderForm = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!name || !email || !phoneNumber || !address) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    // Kiểm tra định dạng số điện thoại (ví dụ: 10-11 chữ số)
    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      // Gọi API thêm thành viên
      const memberData = { name, email, phoneNumber, address, password };
      const response = await memberService.addMember(memberData);
     

      // Xử lý kết quả 
      if (response) {
        toast.success("Thêm thành viên thành công!");
        onClose(); // Đóng form sau khi thêm thành công

        if (onAdd) onAdd(response);
      }
    } catch (error) {
      console.error("Lỗi khi thêm thành viên:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi thêm thành viên");
    } finally {
      setIsLoading(false);
    }
  };

  // Phần còn lại của component giữ nguyên

  return (
    <div className="space-y-5 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Thêm Bạn Đọc</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}
  
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block font-medium text-gray-700">Mật khẩu:</label>
        <input
          type="text"
          placeholder="mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-2 text-white font-semibold rounded-md 
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
            }`}
        >
          {isLoading ? 'Đang thêm...' : 'Thêm'}
        </button>
      </div>
    </div>
  );
};

export default AddReaderForm;

