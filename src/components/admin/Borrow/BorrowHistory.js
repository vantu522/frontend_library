// components/admin/BorrowHistory/BorrowHistory.js
import React, { useEffect, useState } from 'react';
import borrowService from '../../../services/admin/borrowService';
import Table from '../../../common/admin/Table/Table';

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState([]); // Lưu trữ lịch sử phiếu mượn đã trả
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái cho tìm kiếm

  // Fetch dữ liệu phiếu mượn đã trả từ API
  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        const data = await borrowService.fetchAllReturned();
        setBorrowHistory(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Lỗi khi tải lịch sử mượn:', error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải dù thành công hay lỗi
      }
    };

    fetchBorrowHistory();
  }, []); // Chạy một lần khi component mount

  // Lọc dữ liệu theo tìm kiếm
  const filteredHistory = borrowHistory.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.memberName.toLowerCase().includes(searchLower) ||  // Tìm kiếm theo tên người mượn
      item.phoneNumber.includes(searchLower)                 // Tìm kiếm theo số điện thoại
    );
  });

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString(); // Trả về định dạng ngày (DD/MM/YYYY)
  };


  // Cấu trúc cột cho bảng
  const columns = [
    { label: 'Tên người mượn', field: 'memberName' },
    { label: 'Tên sách', field: 'bookTitle', render: (val) => <span className="font-semibold">{val}</span> },
    { label: 'Tác giả', field: 'author' },
    { label: 'Số điện thoại', field: 'phoneNumber' },
    { label: 'Ngày mượn', field: 'transactionDate', render:(val) => formatDate(val) },
    { label: 'Ngày dự kiến trả', field: 'dueDate',render:(val) => formatDate(val)  },
    {
      label: 'Trạng thái',
      field: 'status',
      render: (val) => (
        <span className="text-green-500 px-2 py-1 rounded-full font-bold flex justify-center">
          {val}
        </span>
      ),
    },
  ];

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Thông báo khi dữ liệu đang được tải
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold mb-4">Lịch Sử Phiếu Mượn Đã Trả</h1>

      {/* Thanh tìm kiếm */}
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
      <Table columns={columns} data={filteredHistory} />
    </div>
  );
};

export default BorrowHistory;
