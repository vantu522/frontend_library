import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../../common/admin/Table/Table';

const BorrowHistory = () => {
  const borrowHistory = useSelector((state) => state.borrowHistory);

  // Hàm tính số ngày mượn
  const calculateDaysBorrowed = (borrowDate, returnDate) => {
    const borrowDateObj = new Date(borrowDate);
    const returnDateObj = new Date(returnDate);
    const timeDiff = returnDateObj - borrowDateObj; // tính chênh lệch thời gian
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // chuyển đổi thành số ngày
  };

  // Hàm tính số ngày trễ hạn
  const calculateDaysLate = (returnDate, dueDate) => {
    const returnDateObj = new Date(returnDate);
    const dueDateObj = new Date(dueDate);
    const timeDiff = returnDateObj - dueDateObj; // tính chênh lệch thời gian
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // chuyển đổi thành số ngày
  };

  const columns = [
    { label: 'Tên sách', field: 'bookTitle', width: '25%' },
    { label: 'Tên người mượn', field: 'borrowerName', width: '25%' },
    { label: 'Ngày mượn', field: 'borrowDate', width: '20%' },
    { label: 'Ngày dự kiến trả', field: 'dueDate', width: '20%' },  // Cập nhật trường 'dueDate'
    { label: 'Ngày trả thực tế', field: 'returnDate', width: '20%' },  // Thêm cột 'Ngày trả thực tế'
    { label: 'Số ngày mượn', field: 'daysBorrowed', width: '10%' }, // Cập nhật đúng trường
    { label: 'Số ngày trễ hạn', field: 'daysLate', width: '10%' },
  ];

  // Cập nhật data với các giá trị tính toán
  const formattedData = borrowHistory.map((borrow) => {
    const daysBorrowed = calculateDaysBorrowed(borrow.borrowDate, borrow.returnDate);
    const daysLate = calculateDaysLate(borrow.returnDate, borrow.dueDate);

    return {
      ...borrow,
      daysBorrowed,
      daysLate,
      returnStatusColor: daysLate > 0 ? 'text-red-500' : 'text-green-500', // Thêm lớp màu sắc cho trạng thái trả đúng hạn
    };
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Lịch Sử Phiếu Mượn Đã Trả</h1>
      <Table columns={columns} data={formattedData} />
    </div>
  );
};

export default BorrowHistory;
