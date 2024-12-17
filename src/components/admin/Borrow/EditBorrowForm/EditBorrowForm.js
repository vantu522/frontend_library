import React, { useState, useEffect } from 'react';
import borrowService from '../../../../services/admin/borrowService';
import { toast } from 'react-toastify';

const EditBorrowForm = ({ borrowId, setVisibleForm }) => {
  const [bookId, setBookId] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  // Fetch dữ liệu chi tiết phiếu mượn khi component mount
  useEffect(() => {
    const fetchBorrow = async () => {
      try {
        const borrow = await borrowService.fetchBorrowById(borrowId);
        setBookId(borrow.bookId || '');
        setBookTitle(borrow.bookTitle || '');
        setBorrowerName(borrow.borrowerName || '');
        setBorrowerPhone(borrow.borrowerPhone || '');
        setBorrowerEmail(borrow.borrowerEmail || '');
        setDueDate(borrow.dueDate || '');
        setStatus(borrow.status || '');
      } catch (error) {
        toast.error('Không thể tải thông tin phiếu mượn.');
      }
    };

    fetchBorrow();
  }, [borrowId]);

  // Submit form cập nhật phiếu mượn
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBorrow = {
      bookId,
      bookTitle,
      borrowerName,
      borrowerPhone,
      borrowerEmail,
      dueDate,
      status,
    };

    try {
      await borrowService.updateBorrow(borrowId, updatedBorrow);
      toast.success('Cập nhật phiếu mượn thành công!');
      setVisibleForm(false); // Đóng form sau khi cập nhật thành công
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật phiếu mượn.');
    }
  };

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
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Tên Người Mượn:
          <input
            type="text"
            value={borrowerName}
            disabled
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Số Điện Thoại:
          <input
            type="text"
            value={borrowerPhone}
            disabled
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Email:
          <input
            type="email"
            value={borrowerEmail}
            disabled
            className="mt-1 block w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Ngày Trả Dự Kiến:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Cập Nhật Phiếu Mượn
          </button>
          <button
            type="button"
            onClick={() => setVisibleForm(false)}
            className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBorrowForm;
