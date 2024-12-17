import React, { useEffect, useState } from 'react';
import borrowService from '../../../../services/admin/borrowService';
import Table from '../../../../common/admin/Table/Table';

const BorrowHistory = () => {
  const [borrowHistory, setBorrowHistory] = useState([]);  // Lưu trữ lịch sử phiếu mượn đã trả
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

  // Hàm tính số ngày mượn
  const calculateDaysBorrowed = (transactionDate, returnDate) => {
    const transactionDateObj = new Date(transactionDate);
    const returnDateObj = new Date(returnDate);
    const timeDiff = returnDateObj - transactionDateObj; // tính chênh lệch thời gian
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // chuyển đổi thành số ngày
  };

  // Hàm tính số ngày trễ hạn
  const calculateDaysLate = (returnDate, dueDate) => {
    const returnDateObj = new Date(returnDate);
    const dueDateObj = new Date(dueDate);
    const timeDiff = returnDateObj - dueDateObj; // tính chênh lệch thời gian
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // chuyển đổi thành số ngày
  };

  // Fetch dữ liệu phiếu mượn đã trả từ API
  useEffect(() => {
    const fetchBorrowHistory = async () => {
      try {
        const data = await borrowService.fetchAllReturned();
        setBorrowHistory(data);  // Lưu dữ liệu vào state
        setLoading(false); // Dữ liệu đã được tải
      } catch (error) {
        console.error('Lỗi khi tải lịch sử mượn:', error);
        setLoading(false); // Kết thúc quá trình tải dù có lỗi hay không
      }
    };

    fetchBorrowHistory();
  }, []); // Chạy một lần khi component mount

  const columns = [
    { label: 'Tên sách', field: 'bookTitle', width: '25%' },
    { label: 'Tên người mượn', field: 'memberName', width: '25%' },
    { label: 'Số điện thoại', field: 'phoneNumber', width: '25%' },
    { label: 'Ngày mượn', field: 'transactionDate', width: '20%' },
    { label: 'Ngày dự kiến trả', field: 'dueDate', width: '20%' },
    { label: 'Ngày trả thực tế', field: 'returnDate', width: '20%' },
    { label: 'Số ngày mượn', field: 'daysBorrowed', width: '10%' },
    { label: 'Số ngày trễ hạn', field: 'daysLate', width: '10%' },
  ];

  // Cập nhật data với các giá trị tính toán
  const formattedData = borrowHistory.map((borrow) => {
    const daysBorrowed = calculateDaysBorrowed(borrow.transactionDate, borrow.returnDate);
    const daysLate = calculateDaysLate(borrow.returnDate, borrow.dueDate);

    return {
      ...borrow,
      daysBorrowed,
      daysLate,
      returnStatusColor: daysLate > 0 ? 'text-red-500' : 'text-green-500', // Thêm lớp màu sắc cho trạng thái trả đúng hạn
    };
  });

  if (loading) {
    return <div>Đang tải dữ liệu...</div>; // Thông báo khi dữ liệu đang được tải
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Lịch Sử Phiếu Mượn Đã Trả</h1>
      <Table columns={columns} data={formattedData} />
    </div>
  );
};

export default BorrowHistory;
