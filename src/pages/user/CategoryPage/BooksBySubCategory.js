import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSlug } from "../../../utils/slugify";
import bookService from "../../../services/user/bookService";

function BooksBySubCategory() {
  const { bigCategoryName, subCategoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [originalBigCategoryName, setOriginalBigCategoryName] = useState("");
  const [originalSubCategoryName, setOriginalSubCategoryName] = useState("");
  const [layout, setLayout] = useState("grid");

  useEffect(() => {
    const fetchBooks = async () => {
      if (!bigCategoryName || !subCategoryName) {
        console.log("Missing category parameters");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const categories = JSON.parse(
          localStorage.getItem("categories") || "[]"
        );
        const originalBigCategory = categories.find(
          (cat) => createSlug(cat) === bigCategoryName
        );
        setOriginalBigCategoryName(originalBigCategory || bigCategoryName);

        const subCategories = JSON.parse(
          localStorage.getItem("subCategories") || "[]"
        );
        const originalSubCategory = subCategories.find(
          (sub) => createSlug(sub) === subCategoryName
        );
        setOriginalSubCategoryName(originalSubCategory);

        const bigCategorySlug = createSlug(bigCategoryName);
        const subCategorySlug = createSlug(subCategoryName);

        const data = await bookService.fetchBooksByCategory(
          bigCategorySlug,
          subCategorySlug
        );
        if (!data) {
          throw new Error("Không nhận được dữ liệu từ API");
        }

        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message || "Có lỗi xảy ra khi tải sách");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bigCategoryName, subCategoryName]);

  const handleBookDetailClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "grid":
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
      case "list":
        return "flex flex-col space-y-4";
      case "compact":
        return "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4";
      default:
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
    }
  };

  if (!bigCategoryName || !subCategoryName) {
    return (
      <div className="p-4 text-center text-gray-600">
        Không tìm thấy danh mục
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-gray-700">Đang tải sách...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        Lỗi: {error}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="p-4 text-center text-gray-600">
        Không tìm thấy sách trong danh mục này
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-24 p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Sách trong {originalBigCategoryName} - {originalSubCategoryName}
      </h2>
      <div className="flex justify-end mb-4 space-x-2">
        <button
          onClick={() => handleLayoutChange("grid")}
          className={`p-2 rounded-md ${
            layout === "grid"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          aria-label="Grid layout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        </button>
        <button
          onClick={() => handleLayoutChange("list")}
          className={`p-2 rounded-md ${
            layout === "list"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          aria-label="List layout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>
        <button
          onClick={() => handleLayoutChange("compact")}
          className={`p-2 rounded-md ${
            layout === "compact"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
          aria-label="Compact layout"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h7"
            />
          </svg>
        </button>
      </div>
      <div className={getLayoutClasses()}>
        {books.map((book) => (
          <div
            key={book.id}
            className={`bg-white shadow-lg rounded-lg overflow-hidden ${
              layout === "list" ? "flex" : ""
            } transform transition-all duration-300 hover:shadow-xl`}
          >
            <div
              className={`${layout === "list" ? "w-1/4" : "w-full"} ${
                layout === "compact" ? "h-40" : "h-64"
              } overflow-hidden`}
            >
              <img
                src={book.img}
                alt={book.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className={`${layout === "list" ? "w-3/4" : "w-full"} p-4`}>
              <p className="text-sm text-gray-600 mb-1">{book.author}</p>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {book.title}
              </h3>
              <button
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => handleBookDetailClick(book.bookId)}
              >
                Xem Chi Tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BooksBySubCategory;
