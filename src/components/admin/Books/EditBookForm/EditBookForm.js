import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../../../redux/admin/booksReducer";

const EditBookForm = ({ setVisibleForm, bookId }) => {
  const book = useSelector((state) => state.books.find((book) => book.id === bookId));
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("available");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setYear(book.year);
      setGenre(book.genre);
      setPublisher(book.publisher);
      setQuantity(book.quantity);
      setStatus(book.status);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      id: book.id,
      title,
      author,
      year,
      genre,
      publisher,
      quantity,
      status: quantity === 0 ? "unavailable" : "available", 
    };
    dispatch(updateBook(updatedBook)); 
    setVisibleForm(false);
  };

  return (
    <div className="form-container">
      <h2>Chỉnh sửa Sách</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tác giả"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Năm xuất bản"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Thể loại"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nhà xuất bản"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
        />
        <input
          type="number"
          placeholder="Số lượng"
          value={quantity}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            setQuantity(newQuantity);
            setStatus(newQuantity === 0 ? "unavailable" : "available"); // Cập nhật trạng thái tự động
          }}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">Còn sách</option>
          <option value="unavailable">Hết sách</option>
        </select>
        <button type="submit">Lưu Thay Đổi</button>
      </form>
      <button className="back-btn" onClick={() => setVisibleForm(false)}>Quay lại</button>
    </div>
  );
};

export default EditBookForm;
