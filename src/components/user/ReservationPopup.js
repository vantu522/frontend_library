import React, { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import DatePickerInput from './DatePickerInput';

const ReservationPopup = ({ book, onClose, onConfirm }) => {
  const [borrowDate, setBorrowDate] = useState(null);

  const handleConfirm = () => {
    if (borrowDate) {
      onConfirm(borrowDate);
    } else {
      alert('Vui lòng chọn ngày mượn sách');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Đặt lịch mượn sách</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-gray-600">Tác giả: {book.author.join(", ")}</p>
          <p className='text-gray-600'>Thể loại: {book.bigCategory[0]?.name}</p>
          <img src={book.img} className='h-40 w-30'></img>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chọn ngày mượn</label>
          <DatePickerInput
            selectedDate={borrowDate}
            onChangeDate={setBorrowDate}
            placeholder="Chọn ngày mượn"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Xác nhận đặt lịch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPopup;
