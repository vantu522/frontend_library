import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBorrow } from '../../../../redux/admin/borrowsReducer';

const EditBorrowForm = ({ borrowId, setVisibleForm }) => {
  const borrow = useSelector((state) =>
    state.borrows.find((borrow) => borrow.id === borrowId)
  ); 
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (borrow) {
      setBookId(borrow.bookId);
      setBookTitle(borrow.bookTitle); 
      setBorrowerName(borrow.borrowerName);
      setBorrowerPhone(borrow.borrowerPhone);
      setBorrowerEmail(borrow.borrowerEmail);
      setDueDate(borrow.dueDate);
    }
  }, [borrow]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBorrow = {
      id: borrowId,
      bookId,
      bookTitle, 
      borrowerName,
      borrowerPhone,
      borrowerEmail,
      dueDate,
      status: borrow.status, 
    };

    dispatch(updateBorrow(updatedBorrow));
    setVisibleForm(false); 
  };

  if (!borrow) {
    return null;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Chỉnh Sửa Phiếu Mượn</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Tên Sách:
          <input
            type="text"
            value={bookTitle} 
            onChange={(e) => setBookTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Tên Người Mượn:
          <input
            type="text"
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Số Điện Thoại:
          <input
            type="text"
            value={borrowerPhone}
            onChange={(e) => setBorrowerPhone(e.target.value)}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Email:
          <input
            type="email"
            value={borrowerEmail}
            onChange={(e) => setBorrowerEmail(e.target.value)}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Ngày Trả Dự Kiến:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </label>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cập Nhật Phiếu Mượn
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBorrowForm;
