import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../common/admin/Modal/Modal";
import Table from "../../../../common/admin/Table/Table";
import Tooltip from "../../../../common/admin/Tooltip/Tooltip";
import AddBookForm from "../AddBookForm/AddBookForm";
import EditBookForm from "../EditBookForm/EditBookForm";
import { deleteBook, updateBook, addBook } from "../../../../redux/admin/booksReducer";
import { FaEdit, FaTrashAlt, FaPlus, FaExclamationCircle, FaSearch, FaTimes } from "react-icons/fa";
import "./BookList.css";

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");  


  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleDeleteBook = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete.id));
      setShowDeleteConfirm(false);
      setBookToDelete(null);
    }
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter; 
    return matchesSearch && matchesStatus && matchesGenre;
  });


  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);


  const handleUpdateBookStatus = (book) => {
    const updatedBook = {
      ...book,
      status: book.status === "available" ? "unavailable" : "available",
      quantity: book.status === "available" ? 0 : book.quantity || 1,
    };
    dispatch(updateBook(updatedBook));
  };

  const columns = [
    { label: "Tên sách", field: "title" },
    { label: "Tác giả", field: "author" },
    { label: "Thể loại", field: "genre" },
    { label: "Nhà xuất bản", field: "publisher" },
    { label: "Năm xuất bản", field: "year", className: "compact" },
    { label: "Số lượng", field: "quantity", className: "compact" },
    {
      label: "Trạng thái",
      field: "status",
      render: (val) => (
        <span
          className={val === "available" ? "status-available" : "status-unavailable"}
        >
          {val === "available" ? "Còn sách" : "Hết sách"}
        </span>
      ),
    },
    {
      label: "Hành động",
      width: 130,
      render: (val, row) => (
        <>
          <Tooltip content="Chỉnh sửa" position="left">
            <button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setBookId(row.id);
              }}
            >
              <FaEdit size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Xóa sách" position="left">
            <button
              onClick={() => {
                setShowDeleteConfirm(true);
                setBookToDelete(row);
              }}
            >
              <FaTrashAlt size={18} />
            </button>
          </Tooltip>

          <Tooltip
            content={row.status === "available" ? "Đánh dấu hết sách" : "Đánh dấu còn sách"}
            position="left"
          >
            <button onClick={() => handleUpdateBookStatus(row)}>
              <FaExclamationCircle
                size={18}
                className={row.status === "available" ? "icon-warning" : "icon-primary"}
              />
            </button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditBookForm
            bookId={bookId}
            setVisibleForm={setVisibleForm}
            onUpdate={(book) => dispatch(updateBook(book))}
          />
        ) : (
          <AddBookForm
            setVisibleForm={setVisibleForm}
            onAdd={(book) => dispatch(addBook(book))}
          />
        )}
      </Modal>

      <Modal onClose={() => setShowDeleteConfirm(false)} isOpen={showDeleteConfirm}>
        <div className="delete-confirm-modal">
          <h3>Xác nhận xóa</h3>
          <p>Bạn có chắc chắn muốn xóa sách <strong>{bookToDelete?.title}</strong> không?</p>
          <div className="delete-confirm-actions">
            <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
              Hủy
            </button>
            <button className="confirm-btn" onClick={handleDeleteBook}>
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>

      <h2>Tất cả sách</h2>

      <div className="navigation">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách hoặc tác giả"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {filteredBooks.length === 0 && (
          <div className="no-results">
            <p>❌ Không tìm thấy kết quả phù hợp. Thử lại với từ khóa khác!</p>
          </div>
        )}

        <div className="filters">
          <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Còn Sách</option>
            <option value="unavailable">Hết sách</option>
          </select>

          <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
            <option value="all">Tất cả thể loại</option>
            <option value="fiction">Tiểu thuyết</option>
            <option value="non-fiction">Phi hư cấu</option>
            <option value="science">Khoa học</option>
          </select>

          <button
            onClick={() => {
              setVisibleForm(true);
              setIsEdit(false);
            }}
          >
            <FaPlus /> Thêm sách
          </button>
        </div>
      </div>

      <Table columns={columns} data={currentBooks} />
    </div>
  );
};

export default BookList;
