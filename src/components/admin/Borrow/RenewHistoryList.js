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
    const searchLower = searchTerm.toLowerCase();
    return (
      item.bookTitle.toLowerCase().includes(searchLower) ||  // Tìm theo tên sách
      item.memberName.toLowerCase().includes(searchLower) || // Tìm theo tên người mượn
      item.phoneNumber.includes(searchLower)                // Tìm theo số điện thoại
    );
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Trả về định dạng ngày (DD/MM/YYYY)
  };


  
  // Cấu hình bảng
  const columns = [
    { label: 'Tên người mượn', field: 'memberName' },
    { label: 'Tên sách', field: 'bookTitle', render: (val) => <span className="font-semibold">{val}</span> },
    { label: 'Tác giả', field: 'author' },
    { label: 'Số điện thoại', field: 'phoneNumber' },
    { label: 'Ngày gia hạn', field: 'transactionDate', render:(val) => formatDate(val) },
    { label: 'Hạn mới ', field: 'dueDate', render:(val) => formatDate(val) },
  ];

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-4">Lịch Sử Gia Hạn</h1>

      {/* Tìm kiếm */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên người mượn hoặc số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}  // Cập nhật searchTerm khi người dùng nhập
          className="p-2 border rounded-md w-64"
        />
      </div>

      {/* Bảng */}
      <Table columns={columns} data={filteredBooks} />
    </div>
  );
};

export default RenewHistoryList;
