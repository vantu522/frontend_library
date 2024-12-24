import React, { useState, useEffect } from "react";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import Tooltip from "../../../common/admin/Tooltip/Tooltip";
import AddBookForm from "./AddBookForm";
import EditBookForm from "./EditBookForm";
import { FaEdit, FaTrashAlt, FaPlus, FaExclamationCircle, FaTimes } from "react-icons/fa";
import bookService from "../../../services/admin/booksService";
import { toast } from "react-toastify";
import Pagination from "../../../common/admin/Pagination";
import { createSlug } from "../../../utils/slugify";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [booksPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [bigCategories, setBigCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedBigCategory, setSelectedBigCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await bookService.fetchCategories();
        setBigCategories(categories || []);
        console.log(bigCategories);
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
          console.log(selectedBigCategory)
          const subCats = await bookService.fetchSubCategories(selectedBigCategory);
          setSubCategories(subCats || []);
          console.log(subCategories)
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
  }, [currentPage, booksPerPage, selectedBigCategory, selectedSubCategory]);

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

  const filteredBooks = books.filter((book) => {
    const matchesSearch = (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof book.author === 'string' ? book.author.toLowerCase() : '').includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "available" && book.quantity > 0) ||
      (statusFilter === "unavailable" && book.quantity <= 0);

    return matchesSearch && matchesStatus;
  });

  const renderImage = (image) => {
  if (!image) return "Không có hình ảnh";

  // Kiểm tra nếu là URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return <img src={image} alt="Hình ảnh" className="text-gray-600 font-mono" />;
  }

  // Kiểm tra nếu là base64
  if (image.startsWith("data:image")) {
    return <img src={image} alt="Hình ảnh Base64" className="text-gray-600 font-mono" />;
  }

  // Nếu là chuỗi base64 không có tiền tố
  const base64Image = `data:image/png;base64,${image}`;
  return <img src={base64Image} alt="Hình ảnh Base64" className="text-gray-600 font-mono" />;
};

  const columns = [
    { 
      label: "Hình ảnh", 
      field: "img", 
      width: "10%",
      render:(img) => renderImage(img)
    },
    { 
      label: "Tên sách", 
      field: "title", 
      width: "20%",
      render: (val) => <span className="font-semibold">{val}</span>
    },
    { 
      label: "Tác giả", 
      field: "author", 
      width: "5%",
      render: (val) => <span className="text-gray-700">{val.join(",")}</span>
    },
    { 
      label: "Thể loại", 
      field: "bigCategory", 
      width: "10%",
      render: (val) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {val?.name || (Array.isArray(val) && val[0]?.name) || 'Chưa phân loại'}
        </span>
      )
    },
    { 
      label: "Kho", 
      field: "quantity", 
      width: "10%",
      render: (val) => (
        <div className="flex flex-col items-center">
          <span className={`font-bold ${val > 5 ? 'text-green-600' : val > 0 ? 'text-[#5352ed]' : 'text-red-600'}`}>
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
      width: "10%",
      render: (val, row) => (
        <div className="flex space-x-2 justify-center">
          <Tooltip content="Chỉnh sửa" position="top">
            <button
              onClick={() => {
                setVisibleForm(true);
                setIsEdit(true);
                setSelectedBook(row);
                console.log(row)
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
  try {
    await bookService.deleteBook(bookToDelete.bookId);
    // Lọc bỏ quyển sách vừa xóa, so sánh bookId với bookId
    const updatedBooks = books.filter(book => book.bookId !== bookToDelete.bookId);
    // Cập nhật state books với danh sách đã lọc
    setBooks(updatedBooks);
    toast.success("Xóa sách thành công");
  } catch (error) {
    console.error("Xóa sách thất bại", error);
    toast.error("Không thể xóa sách");
  } finally {
    setShowDeleteConfirm(false);
    setBookToDelete(null);
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
            book={selectedBook}
            setVisibleForm={setVisibleForm}
            onUpdate={(updatedBook) => {
              // Cập nhật trực tiếp vào state books
              setBooks(prevBooks => 
                prevBooks.map(book => 
                  book.bookId === updatedBook.bookId ? updatedBook : book
                )
              )}
            }
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
            <option value="available">Còn sách</option>
            <option value="unavailable">Hết sách</option>
          </select>
          <select
            onChange={(e) => {
              setSelectedBigCategory(e.target.value);
              setCurrentPage(1);
            }}
            value={selectedBigCategory}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Tất cả thể loại</option>
            {bigCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {selectedBigCategory !== "all" && (
            <select
              onChange={(e) => {
                setSelectedSubCategory(e.target.value);
                setCurrentPage(1);
              }}
              value={selectedSubCategory}
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">Tất cả thể loại con</option>
              {subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          )}

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

