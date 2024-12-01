// AddBorrowForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../common/admin/Modal/Modal";
import { addBorrow } from "../../../../redux/admin/borrowsReducer";
import "./AddBorrowForm.css"

const AddBorrowForm = ({ setVisibleForm }) => {
  const dispatch = useDispatch();


  const [bookTitle, setBookTitle] = useState("");
  const [borrowerPhone, setBorrowerPhone] = useState("");
  const [borrowerEmail, setBorrowerEmail] = useState("");
  const [borrowerName, setBorrowerName] = useState(""); 
  const [dueDate, setDueDate] = useState("");
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [showModalMessage, setShowModalMessage] = useState(false); 

 
  const readers = useSelector((state) => state.readers);
  const books = useSelector((state) => state.books);


  useEffect(() => {
    const existingReader = readers.find(
      (reader) =>
        reader.email === borrowerEmail || reader.phone === borrowerPhone
    );
    if (existingReader) {
      setBorrowerName(existingReader.name);
    } else {
      setBorrowerName("");
    }
  }, [borrowerEmail, borrowerPhone, readers]);


  const handleBookTitleChange = (e) => {
    const title = e.target.value;
    setBookTitle(title);
    if (title.trim() !== "") {
      const suggestions = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
      setSuggestedBooks(suggestions);
    } else {
      setSuggestedBooks([]);
    }
  };


  const isPhoneValid = (phone) => /^\d{10}$/.test(phone);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPhoneValid(borrowerPhone)) {
      alert("Số điện thoại phải đủ 10 số!");
      return;
    }

    const existingReader = readers.find(
      (reader) =>
        reader.email === borrowerEmail || reader.phone === borrowerPhone
    );

    if (!existingReader) {
      setShowModalMessage(true); 
      return;
    }

    const borrowDate = new Date().toISOString();
    const newBorrow = {
      id: Date.now(),
      bookTitle,
      borrowerName,
      borrowerPhone,
      borrowerEmail,
      borrowDate,
      dueDate,
      status: "active",
    };

    dispatch(addBorrow(newBorrow)); 
    setVisibleForm(false);
  };

  return (
    <div className="add-borrow-form">
      <h2>Thêm Phiếu Mượn</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tên Sách:
          <input
            type="text"
            value={bookTitle}
            onChange={handleBookTitleChange}
            required
          />
          {suggestedBooks.length > 0 && (
            <ul className="suggestions">
              {suggestedBooks.map((book) => (
                <li
                  key={book.id}
                  onClick={() => {
                    setBookTitle(book.title);
                    setSuggestedBooks([]); 
                  }}
                >
                  {book.title}
                </li>
              ))}
            </ul>
          )}
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
          Ngày Trả Dự Kiến:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Thêm Phiếu Mượn</button>

      </form>

      {showModalMessage && (
        <Modal onClose={() => setShowModalMessage(false)} isOpen={showModalMessage}>
          <h2>Thông Báo</h2>
          <p>Người mượn chưa tồn tại. Vui lòng thêm người mượn trước.</p>
        </Modal>
      )}
    </div>
  );
};

export default AddBorrowForm;
