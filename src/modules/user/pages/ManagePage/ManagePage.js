import React, { useState } from 'react';
import DatePickerInput from '../../components/DatePickerInput'; 
import './ManagePage.css';

const BookList = () => {
  const [borrowDate, setBorrowDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const books = [
    { id: '001', name: 'Tấm Cám', author: 'Không nhớ', genre: 'Truyện cổ tích' },
    { id: '002', name: 'Ông lão đánh cá và con cá vàng', author: 'Không nhớ', genre: 'Truyện gì cũng được' },
    // Thêm các sách khác nếu cần
  ];

  return (
    <div className="book-list">
      <div className="book-header">
        <div>ID</div>
        <div>Tên sách</div>
        <div>Tác giả</div>
        <div>Thể loại</div>
        <div>Ngày mượn</div>
        <div>Ngày trả</div>
        <div>Phí phạt</div>
        <div>Hành động</div>
      </div>
      {books.map((book) => (
        <div className="book-row" key={book.id}>
          <div>{book.id}</div>
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
          <div>0 VNĐ</div>
          <button className="return-button">Trả ngay</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
