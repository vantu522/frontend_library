import React, { useEffect, useState } from 'react';
import borrowService from '../../../../services/admin/borrowService';
import Table from '../../../../common/admin/Table/Table';
import { color } from 'framer-motion';

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState([]); // Lưu trữ lịch sử phiếu mượn đã trả
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

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

  // Cấu trúc cột cho bảng
  const columns = [
    { label: 'Tên sách', field: 'bookTitle', width: '25%' },
    { label: 'Tên người mượn', field: 'memberName', width: '25%' },
    { label: 'Số điện thoại', field: 'phoneNumber', width: '20%' },
    { label: 'Ngày mượn', field: 'transactionDate', width: '15%' },
    { label: 'Ngày dự kiến trả', field: 'dueDate', width: '15%' },
    {
      label: 'Trạng thái',
      field: 'status',
      width: '15%',
      render: (val) => (
        <span className="text-green-500 px-2 py-1 rounded-full">
          {val}
        </span>
      ),
    }
  ];

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Thông báo khi dữ liệu đang được tải
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Lịch Sử Phiếu Mượn Đã Trả</h1>
      <Table columns={columns} data={borrowHistory} />
    </div>
  );
};

export default BorrowHistory;
