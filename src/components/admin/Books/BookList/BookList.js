import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../common/admin/Modal/Modal";
import Table from "../../../../common/admin/Table/Table";
import Tooltip from "../../../../common/admin/Tooltip/Tooltip";
import AddBookForm from "../AddBookForm/AddBookForm";
import EditBookForm from "../EditBookForm/EditBookForm";
import { deleteBook, updateBook, addBook, fetchBooks } from "../../../../redux/admin/booksReducer";
import { FaEdit, FaTrashAlt, FaPlus, FaExclamationCircle, FaTimes } from "react-icons/fa";
import bookService from "../../../../services/admin/booksService";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const data = await bookService.fetchAllBooks();
        console.log(data)
        dispatch(fetchBooks(data));
        toast.success("Tải sách thành công");
      } catch (error) {
        console.error("Failed to load books", error);
        toast.error("Không thể tải danh sách sách");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [dispatch]);

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await bookService.deleteBook(bookToDelete.id);
        dispatch(deleteBook(bookToDelete.id));
        toast.success(`Đã xóa sách "${bookToDelete.title}"`);
        setShowDeleteConfirm(false);
        setBookToDelete(null);
      } catch (error) {
        console.error("Failed to delete book", error);
        toast.error("Không thể xóa sách");
      }
    }
  };

  const handleUpdateBookStatus = async (book) => {
    try {
      const updatedBook = {
        ...book,
        status: book.status === "available" ? "unavailable" : "available",
        quantity: book.status === "available" ? 0 : book.quantity || 1,
      };
      
      await bookService.updateBook(book.id, updatedBook);
      dispatch(updateBook(updatedBook));
      toast.success(`Cập nhật trạng thái sách "${book.title}"`);
    } catch (error) {
      console.error("Failed to update book status", error);
      toast.error("Không thể cập nhật trạng thái sách");
    }
  };

  const filteredBooks = Array.isArray(books) ? books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter;
    return matchesSearch && matchesStatus && matchesGenre;
  }) : [];

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

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
          className={`font-bold ${val === "available" ? "text-green-500" : "text-red-500"}`}
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
            onUpdate={async (book) => {
              try {
                await bookService.updateBook(bookId, book);
                dispatch(updateBook(book));
                toast.success(`Cập nhật sách "${book.title}" thành công`);
                setVisibleForm(false);
              } catch (error) {
                console.error("Failed to update book", error);
                toast.error("Không thể cập nhật sách");
              }
            }}
          />
        ) : (
          <AddBookForm
            setVisibleForm={setVisibleForm}
            onAdd={async (book) => {
              try {
                const newBook = await bookService.addBook(book);
                dispatch(addBook(newBook));
                toast.success(`Thêm sách "${book.title}" thành công`);
                setVisibleForm(false);
              } catch (error) {
                console.error("Failed to add book", error);
                toast.error("Không thể thêm sách");
              }
            }}
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <Table columns={columns} data={currentBooks} />
      )}
    </div>
  );
};

export default BookList;