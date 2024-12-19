import React, { useState, useEffect } from "react";
import Modal from "../../../../common/admin/Modal/Modal";
import Table from "../../../../common/admin/Table/Table";
import Tooltip from "../../../../common/admin/Tooltip/Tooltip";
import AddBookForm from "../AddBookForm/AddBookForm";
import EditBookForm from "../EditBookForm/EditBookForm";
import { FaEdit, FaTrashAlt, FaPlus, FaExclamationCircle, FaTimes } from "react-icons/fa";
import bookService from "../../../../services/admin/booksService";
import { toast } from "react-toastify";
import Pagination from "../../../../common/admin/Pagination";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const resData = await bookService.fetchAllBooks(currentPage + 1, booksPerPage); // Truyền page và size
        setBooks(resData.data);
        setTotalPages(resData.totalPages);
        toast.success("Tải sách thành công");
      } catch (error) {
        console.error("Failed to load books", error);
        toast.error("Không thể tải danh sách sách");
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [currentPage, booksPerPage]); // Thêm dependencies để gọi lại khi `currentPage` hoặc `booksPerPage` thay đổi

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await bookService.deleteBook(bookToDelete.id);
        setBooks(books.filter(book => book.id !== bookToDelete.id));
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
      setBooks(books.map(b => b.id === book.id ? updatedBook : b));
      toast.success(`Cập nhật trạng thái sách "${book.title}"`);
    } catch (error) {
      console.error("Failed to update book status", error);
      toast.error("Không thể cập nhật trạng thái sách");
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      try {
        const searchRes = await bookService.searchBooks(term); // Gọi API tìm kiếm sách
        setSearchResults(searchRes.data);
      } catch (error) {
        console.error("Failed to search books", error);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (typeof book.author === 'string' ? book.author.toLowerCase() : '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || book.status === statusFilter;
    const matchesGenre = genreFilter === "all" || book.genre === genreFilter;
    return matchesSearch && matchesStatus && matchesGenre;
  });

  const columns = [
    { 
      label: "Hình ảnh", 
      field: "img", 
      width: "10%",
      render: (val) => (
        <span className="text-gray-600 font-mono">
          <img src={val} alt="Book" />
        </span>
      )
    },
    { 
      label: "Tên sách", 
      field: "title", 
      width: "20%",
      render: (val, row) => (
        <div className="flex flex-col">
          <span className="font-semibold">{val}</span>
          <span className="text-sm text-gray-500">ISBN: {row.isbn || 'Chưa cập nhật'}</span>
        </div>
      )
    },
    { 
      label: "Tác giả", 
      field: "author", 
      width: "5%",
      render: (val) => (
        <span className="text-gray-700">{val}</span>
      )
    },
    { 
      label: "Thể loại", 
      field: "bigCategory", 
      width: "10%",
      render: (val) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {val[0].name} 
        </span>
      )
    },
    { 
      label: "Xuất bản", 
      field: "publicationYear", 
      width: "10%",
      render: (val) => <span>{val}</span>
    },
    { 
      label: "Kho", 
      field: "quantity", 
      width: "10%",
      render: (val, row) => (
        <div className="flex flex-col items-center">
          <span className={`font-bold ${val > 5 ? 'text-green-600' : val > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            {val} quyển
          </span>
          <span className={`text-xs ${row.availability === true ? 'text-green-500' : 'text-red-500'}`}>
            {row.availability ? 'Còn sách' : 'Hết sách'}
          </span>
        </div>
      )
    },
    {
      label: "Hành động",
      width: "10%",
      render: (val, row) => (
        <div className="flex space-x-2 justify-center">
          <Tooltip content="Chỉnh sửa" position="top">
            <button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setBookId(row.id);
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit size={18} />
            </button>
          </Tooltip>

          <Tooltip content="Xóa sách" position="top">
            <button
              onClick={() => {
                setShowDeleteConfirm(true);
                setBookToDelete(row);
              }}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrashAlt size={18} />
            </button>
          </Tooltip>

          <Tooltip content={row.status === "available" ? "Đánh dấu hết sách" : "Đánh dấu còn sách"} position="top">
            <button onClick={() => handleUpdateBookStatus(row)}>
              <FaExclamationCircle size={18} className={row.status === "available" ? "text-yellow-500" : "text-blue-500"} />
            </button>
          </Tooltip>
        </div>
      )
    }
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
                setBooks(books.map(b => b.id === bookId ? book : b));
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
                setBooks([...books, newBook]);
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
              onChange={(e) => handleSearch(e.target.value)}
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

      <Table
        data={filteredBooks}
        columns={columns}
        isLoading={isLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BookList;
