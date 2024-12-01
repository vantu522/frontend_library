import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBorrow } from '../../../../redux/admin/borrowsReducer';

const EditBorrowForm = ({ borrowId, setVisibleForm }) => {
  const borrow = useSelector((state) =>
    state.borrows.find((borrow) => borrow.id === borrowId)
  ); 
  const [bookId, setBookId] = useState('');
  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const [borrowerEmail, setBorrowerEmail] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

 
  useEffect(() => {
    if (borrow) {
      setBookId(borrow.bookId);
      setBorrowerName(borrow.borrowerName);
      setBorrowerPhone(borrow.borrowerPhone);
      setBorrowerEmail(borrow.borrowerEmail);
      setBorrowDate(borrow.borrowDate);
      setDueDate(borrow.dueDate);
    }
  }, [borrow]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBorrow = {
      id: borrowId,
      bookId,
      borrowerName,
      borrowerPhone,
      borrowerEmail,
      borrowDate,
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
    <div className="borrow-form">
      <h2>Chỉnh Sửa Phiếu Mượn</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Mã Sách:
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </label>
        <label>
          Tên Người Mượn:
          <input
            type="text"
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
            required
          />
        </label>
        <label>
          Số Điện Thoại:
          <input
            type="text"
            value={borrowerPhone}
            onChange={(e) => setBorrowerPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={borrowerEmail}
            onChange={(e) => setBorrowerEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Ngày Mượn:
          <input
            type="date"
            value={borrowDate}
            onChange={(e) => setBorrowDate(e.target.value)}
            required
          />
        </label>
        <label>
          Ngày Trả Dự Kiến:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Cập Nhật Phiếu Mượn</button>
        <button type="button" onClick={() => setVisibleForm(false)}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default EditBorrowForm;
