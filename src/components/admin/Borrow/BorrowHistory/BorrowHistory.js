// BorrowHistory.js
import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../../../../common/admin/Table/Table';

const BorrowHistory = () => {
  const borrowHistory = useSelector((state) => state.borrowHistory);

  const columns = [
    { label: 'Tên sách', field: 'bookTitle' },
    { label: 'Tên người mượn', field: 'borrowerName' },
    { label: 'Ngày mượn', field: 'borrowDate' },
    { label: 'Ngày trả', field: 'returnDate' },
    { label: 'Trạng thái', field: 'status' },
  ];

  return (
    <div>
      <h1>Lịch Sử Phiếu Mượn Đã Trả</h1>
      <Table columns={columns} data={borrowHistory} />
    </div>
  );
};

export default BorrowHistory;
