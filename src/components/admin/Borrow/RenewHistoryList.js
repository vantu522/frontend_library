// components/admin/RenewHistoryList/RenewHistoryList.js
import React, { useState, useEffect } from 'react';
import borrowService from '../../../services/admin/borrowService'; // Dịch vụ borrowService
import Table from '../../../common/admin/Table/Table'; // Đảm bảo Table là một component sẵn có
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RenewHistoryList = () => {
  // State để lưu trữ sách đã gia hạn
  const [renewedBooks, setRenewedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchRenewedBooks = async () => {
      try {
        // Gọi phương thức fetchAllRenewed() từ borrowService
        const data = await borrowService.fetchAllRenewed(); 
        setRenewedBooks(data);  // Lưu dữ liệu vào state
      } catch (error) {
        toast.error('Lỗi khi tải danh sách sách gia hạn.');
      }
    };

    fetchRenewedBooks();
  }, []);  // Chạy 1 lần khi component mount

  // Lọc dữ liệu theo tìm kiếm
  const filteredBooks = renewedBooks.filter(item => {
    return (
      item.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.memberName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Cấu hình bảng
  const columns = [
    { label: 'Tên người mượn', field: 'memberName' },
    { label: 'Tên sách', field: 'bookTitle' },
    { label: 'Số điện thoại', field: 'phoneNumber' },
    { label: 'Ngày gia hạn', field: 'renewalDate' },
    { label: 'Thời gian gia hạn', field: 'renewalPeriod' },
  ];

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Sách Đã Gia Hạn</h1>

      {/* Tìm kiếm */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
      </div>

      {/* Bảng */}
      <Table columns={columns} data={filteredBooks} />
    </div>
  );
};

export default RenewHistoryList;
