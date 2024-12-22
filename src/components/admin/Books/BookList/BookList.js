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
  const [bookbookId, setBookbookId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [bigCategories, setBigCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedBigCategory, setSelectedBigCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await bookService.fetchCategories();
        setBigCategories(categories || []);
      } catch (error) {
        console.error("Failed to load categories", error);
        toast.error("Không thể tải danh mục");
        setBigCategories([]);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadSubCategories = async () => {
      if (selectedBigCategory !== "all") {
        try {
          const subCats = await bookService.fetchSubCategories(selectedBigCategory);
          setSubCategories(subCats || []);
        } catch (error) {
          console.error("Failed to load sub-categories", error);
          toast.error("Không thể tải danh mục con");
          setSubCategories([]);
        }
      } else {
        setSubCategories([]);
      }
      setSelectedSubCategory("all");
    };
    loadSubCategories();
  }, [selectedBigCategory]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        let resData;

        if (selectedBigCategory !== "all" && selectedSubCategory !== "all") {
          resData = await bookService.fetchBooksBySubCategory(selectedBigCategory, selectedSubCategory);
          setBooks(resData);
          setTotalPages(Math.ceil(resData.length / booksPerPage));
        } else {
          resData = await bookService.fetchAllBooks(currentPage + 1, booksPerPage);
          setBooks(resData.data || resData);
          setTotalPages(resData.totalPages || Math.ceil(resData.length / booksPerPage));
        }
      } catch (error) {
        console.error("Failed to load books", error);
        toast.error("Không thể tải danh sách sách");
        setBooks([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
<<<<<<< HEAD
  }, [currentPage, booksPerPage]);

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await bookService.deleteBook(bookToDelete.bookId);
        setBooks(books.filter(book => book.bookId !== bookToDelete.bookId));
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
      
      await bookService.updateBook(book.bookId, updatedBook);
      setBooks(books.map(b => b.bookId === book.bookId ? updatedBook : b));
      toast.success(`Cập nhật trạng thái sách "${book.title}"`);
    } catch (error) {
      console.error("Failed to update book status", error);
      toast.error("Không thể cập nhật trạng thái sách");
    }
  };
=======
  }, [currentPage, booksPerPage, selectedBigCategory, selectedSubCategory]);
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      try {
        const searchRes = await bookService.searchBooks(term);
        setBooks(searchRes.data || searchRes);
        setTotalPages(Math.ceil((searchRes.data || searchRes).length / booksPerPage));
      } catch (error) {
        console.error("Failed to search books", error);
        toast.error("Lỗi tìm kiếm");
      }
    } else if (term.length === 0) {
      const resData = await bookService.fetchAllBooks(currentPage + 1, booksPerPage);
      setBooks(resData.data || resData);
      setTotalPages(resData.totalPages || Math.ceil(resData.length / booksPerPage));
    }
  };
<<<<<<< HEAD
  
  const handleAddBook = async (bookData) => {
    try {
      const newBook = await bookService.addBook(bookData);
      setBooks((prevBooks) => [...prevBooks, newBook]);
      toast.success(`Thêm sách "${bookData.title}" thành công`);
      setVisibleForm(false);
    } catch (error) {
      console.error("Failed to add book", error);
      toast.error("Không thể thêm sách");
    }
  };
=======
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6

  const filteredBooks = books.filter((book) => {
    const matchesSearch = (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof book.author === 'string' ? book.author.toLowerCase() : '').includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "available" && book.quantity > 0) ||
      (statusFilter === "unavailable" && book.quantity <= 0);

    return matchesSearch && matchesStatus;
  });

  const columns = [
    { 
      label: "Hình ảnh", 
      field: "img", 
<<<<<<< HEAD
      render: (val) => (
        <span className="text-gray-600 font-mono">
          <img src={val} alt="Book" />
        </span>
      )
=======
      width: "10%",
      render: (val) => <img src={val} alt="Book" className="text-gray-600 font-mono" />
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
    },
    { 
      label: "Tên sách", 
      field: "title", 
<<<<<<< HEAD
      render: (val, row) => (
        <div className="flex flex-col">
          <span className="font-semibold">{val}</span>
          <span className="text-sm text-gray-500">ISBN: {row.isbn || 'Chưa cập nhật'}</span>
        </div>
      )
=======
      width: "20%",
      render: (val) => <span className="font-semibold">{val}</span>
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
    },
    { 
      label: "Tác giả", 
      field: "author", 
<<<<<<< HEAD
      render: (val) => (
        <span className="text-gray-700">{val}</span>
      )
=======
      width: "5%",
      render: (val) => <span className="text-gray-700">{val}</span>
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
    },
    { 
      label: "Thể loại", 
      field: "bigCategory", 
      render: (val) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {val?.name || (Array.isArray(val) && val[0]?.name) || 'Chưa phân loại'}
        </span>
      )
    },
    { 
<<<<<<< HEAD
      label: "Xuất bản", 
      field: "publicationYear", 
      render: (val) => <span>{val}</span>
    },
    { 
      label: "Kho", 
      field: "quantity", 
      render: (val, row) => (
=======
      label: "Kho", 
      field: "quantity", 
      width: "10%",
      render: (val) => (
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
        <div className="flex flex-col items-center">
          <span className={`font-bold ${val > 5 ? 'text-green-600' : val > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
            {val || 0} quyển
          </span>
          <span className={`text-xs ${(val > 0) ? 'text-green-500' : 'text-red-500'}`}>
            {val > 0 ? 'Còn sách' : 'Hết sách'}
          </span>
        </div>
      )
    },
    {
      label: "Hành động",
      render: (val, row) => (
        <div className="flex space-x-2 justify-center">
          <Tooltip content="Chỉnh sửa" position="top">
            <button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setBookbookId(row.bookId);
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
        </div>
      )
    }
  ];

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await bookService.deleteBook(bookToDelete.id);
        setBooks(books.filter(book => book.id !== bookToDelete.id));
        toast.success("Xóa sách thành công");
      } catch (error) {
        console.error("Failed to delete book", error);
        toast.error("Không thể xóa sách");
      } finally {
        setShowDeleteConfirm(false);
        setBookToDelete(null);
      }
    }
  };

  return (
    <div className="p-4">
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(false)} isOpen={showDeleteConfirm}>
          <h2 className="text-lg font-bold">Xác nhận xóa sách</h2>
          <p>Bạn có chắc chắn muốn xóa sách này?</p>
          <div className="flex justify-end mt-4">
            <button onClick={() => setShowDeleteConfirm(false)} className="mr-2 bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded">Hủy</button>
            <button onClick={handleDeleteBook} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Xóa</button>
          </div>
        </Modal>
      )}

      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditBookForm
            bookbookId={bookbookId}
            setVisibleForm={setVisibleForm}
            onUpdate={handleAddBook}
          />
        ) : (
          <AddBookForm setVisibleForm={setVisibleForm} onAdd={handleAddBook} />
        )}
      </Modal>

      <h2 className="text-2xl font-bold mb-4">Tất cả sách</h2>

      <div className="navigation flex justify-between items-center mb-4">
        <div className="search-container flex flex-grow items-center relative">
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

        <div className="filters flex items-center gap-4 ml-4">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="available">Còn trong kho</option>
            <option value="unavailable">H��t hàng</option>
          </select>

          <select
            onChange={(e) => {
              setSelectedBigCategory(e.target.value);
              setCurrentPage(0);
            }}
            value={selectedBigCategory}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Tất cả thể loại</option>
<<<<<<< HEAD
            <option value="fiction">Tiểu thuyết</option>
            <option value="non-fiction">Phi hư cấu</option>
=======
            {bigCategories.map(category => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
>>>>>>> 9afd62669f0c6c9c98f096eb3762cb979ab0b5d6
          </select>

          {selectedBigCategory !== "all" && (
            <select
              onChange={(e) => {
                setSelectedSubCategory(e.target.value);
                setCurrentPage(0);
              }}
              value={selectedSubCategory}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Tất cả thể loại con</option>
              {subCategories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setVisibleForm(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex items-center gap-2"
          >
            <FaPlus /> Thêm sách
          </button>
        </div>
      </div>

      <Table columns={columns} data={filteredBooks} isLoading={isLoading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default BookList;