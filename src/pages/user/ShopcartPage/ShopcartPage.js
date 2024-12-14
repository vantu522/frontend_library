import React, { useState } from 'react';
import DatePickerInput from '../../../components/user/DatePickerInput';

const BookList = () => {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const books = [
    { id: '001',img:'https://nhasachphuongnam.com/images/thumbnails/435/537/detailed/177/ho-oan-han.jpg', name: 'Tấm Cám', author: 'Không nhớ', genre: 'Truyện cổ tích' },
    { id: '002', name: 'Ông lão đánh cá và con cá vàng', author: 'Không nhớ', genre: 'Truyện gì cũng được' },
    // Thêm các sách khác nếu cần
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-8 gap-2 bg-orange-400 text-white font-bold text-center py-2 mt-24">
        <div>ID</div>
        <div>Hình ảnh</div>
        <div>Tên sách</div>
        <div>Tác giả</div>
        <div>Thể loại</div>
        <div>Ngày mượn</div>
        <div>Ngày trả</div>
        <div>Hành động</div>
      </div>

      {/* Book Rows */}
      {books.map((book) => (
        <div
          key={book.id}
          className="grid grid-cols-8 gap-2 items-center text-center py-2 border-b border-gray-300"
        >
          <div>{book.id}</div>
          <div>
            <img src={book.img} className="w-16 h-16 object-cover mx-auto"/>
          </div>
          <div>{book.name}</div>
          <div>{book.author}</div>
          <div>{book.genre}</div>
          <div>
            <DatePickerInput
              selectedDate={borrowDate}
              onChangeDate={setBorrowDate}
              placeholder="Chọn ngày mượn"
            />
          </div>
          <div>
            <DatePickerInput
              selectedDate={returnDate}
              onChangeDate={setReturnDate}
              placeholder="Chọn ngày trả"
            />
          </div>
          <button className="bg-orange-400 text-white py-1 px-3 rounded-lg hover:bg-orange-500">
            Trả ngay
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
