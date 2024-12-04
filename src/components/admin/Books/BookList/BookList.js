import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../common/admin/Modal/Modal";
import Table from "../../../../common/admin/Table/Table";
import Tooltip from "../../../../common/admin/Tooltip/Tooltip";
import AddBookForm from "../AddBookForm/AddBookForm";
import EditBookForm from "../EditBookForm/EditBookForm";
import { deleteBook, updateBook, addBook } from "../../../../redux/admin/booksReducer";
import { FaEdit, FaTrashAlt, FaPlus, FaExclamationCircle, FaSearch, FaTimes } from "react-icons/fa";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(10);

  const handleDeleteBook = () => {
    if (bookToDelete) {
      dispatch(deleteBook(bookToDelete.id));
      setShowDeleteConfirm(false);
      setBookToDelete(null);
    }
  };

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
    { label: "Tên sách", field: "title", width: "20%" },
    { label: "Tác giả", field: "author", width: "20%" },
    { label: "Thể loại", field: "genre", width: "20%" },
    { label: "Nhà xuất bản", field: "publisher", width: "15%" },
    { label: "NXB", field: "year", width: "5%", className: "text-center" },
    { label: "SL", field: "quantity", width: "5%", className: "text-center" },
    {
      label: "Trạng thái",
      field: "status",
      width: "10%",
      render: (val) => (
        <span
          className={`font-bold ${
            val === "available" ? "text-green-500" : "text-red-500"
          }`}
        >
          {val === "available" ? "Còn sách" : "Hết sách"}
        </span>
      ),
    },
    {
      label: "Hành động",
      width: "20%",
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
              <FaTrashAlt size={18} color="red" />
            </button>
          </Tooltip>

          <Tooltip
            content={row.status === "available" ? "Đánh dấu hết sách" : "Đánh dấu còn sách"}
            position="left"
          >
            <button onClick={() => handleUpdateBookStatus(row)}>
              <FaExclamationCircle
                size={18}
                className={row.status === "available" ? "text-yellow-500" : "text-blue-500"}
              />
            </button>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
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
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Xác nhận xóa</h3>
          <p className="mb-4">
            Bạn có chắc chắn muốn xóa sách <strong>{bookToDelete?.title}</strong> không?
          </p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleDeleteBook}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </Modal>

      <h2 className="text-2xl font-bold mb-4">Tất cả sách</h2>

      <div className="navigation flex justify-between items-center mb-4">
        <div className="search-container flex flex-grow items-center relative">
          <div className="search-input-wrapper relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách hoặc tác giả"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {searchTerm && (
              <button
                className="absolute right-2 top-2 text-gray-500 hover:text-red-500"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="filters flex items-center gap-4 ml-4">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Còn Sách</option>
            <option value="unavailable">Hết sách</option>
          </select>

          <select
            onChange={(e) => setGenreFilter(e.target.value)}
            value={genreFilter}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
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
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
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
