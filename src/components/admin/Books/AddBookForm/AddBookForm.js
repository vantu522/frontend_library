import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../../../redux/admin/booksReducer";

const AddBookForm = ({ setVisibleForm }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("available");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title,
      author,
      year: parseInt(year),
      genre,
      publisher,
      quantity: parseInt(quantity),
      status,
      dateAdded: new Date().toLocaleDateString(),
    };
    dispatch(addBook(newBook)); // Dispatch action để thêm sách
    setVisibleForm(false); // Đóng form sau khi thêm
  };

  return (
    <div className="form-container">
      <h2>Thêm Sách</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Tiêu đề</label>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Tác giả</label>
          <input
            type="text"
            placeholder="Tác giả"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Năm xuất bản</label>
          <input
            type="number"
            placeholder="Năm xuất bản"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label>Thể loại</label>
          <input
            type="text"
            placeholder="Thể loại"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Nhà xuất bản</label>
          <input
            type="text"
            placeholder="Nhà xuất bản"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Số lượng</label>
          <input
            type="number"
            placeholder="Số lượng"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Trạng thái</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Còn sách</option>
            <option value="unavailable">Hết sách</option>
          </select>
        </div>
        <button type="submit">Thêm Sách</button>
      </form>
    </div>
  );
};

export default AddBookForm;
