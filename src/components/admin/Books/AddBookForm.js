import React, { useState, useEffect } from "react";
import bookService from "../../../services/admin/booksService";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";


const AddBookForm = ({ setVisibleForm }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [category, setCategory] = useState([
    {
      name: "",
      smallCategory: [],
    },
  ]);
  const [nxb, setNxb] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await bookService.fetchCategories();
        setCategories(response); // Lưu danh sách thể loại vào state
      } catch (error) {
        console.error("Lỗi khi tải thể loại:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await bookService.fetchSubCategories(selectedCategory);
          setSubCategories(response);
        } catch (error) {
          console.error("Lỗi khi tải thể loại con:", error);
        }
      };
      fetchSubCategories();
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const bookData = {
      title,
      description,
      author: [author],
      publicationYear: parseInt(publicationYear),
      bigCategory: category,
      quantity: parseInt(quantity),
      nxb,
      pageCount: parseInt(pageCount),
      availability: true,
      likedByMembers: [],
    };

    formData.append("book", JSON.stringify(bookData));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await bookService.addBook(formData);
      console.log("Sách đã được thêm:", response);
      setVisibleForm(false);
      toast.success("Thêm sách thành công !")
    } catch (error) {
      console.error("Thêm sách thất bại:", error);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    // Cập nhật category state với format đúng
    setCategory([
      {
        name: value,
        smallCategory: [], // Reset smallCategory khi thay đổi category chính
      },
    ]);
  };
  
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategory(value);
    // Cập nhật smallCategory trong category state
    setCategory([
      {
        name: selectedCategory,
        smallCategory: value ? [value] : [],
      },
    ]);
  };

  const handleCustomCategoryChange = (value) => {
    setCategory([
      {
        name: value,
        smallCategory: [],
      },
    ]);
  };

  const handleCustomSubCategoryChange = (value) => {
    setCategory([
      {
        name: selectedCategory,
        smallCategory: [value],
      },
    ]);
  };
  

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-xl font-bold mb-4">Thêm Sách</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hình ảnh</label>
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <FaImage className="w-8 h-8 text-gray-400" />
              )}
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
                className="text-red-500 hover:text-red-700"
              >
                Xóa ảnh
              </button>
            )}
          </div>
        </div>


        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sách</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Tên sách"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="Tác giả"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Số trang</label>
          <input
            type="number"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            min="1"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Năm xuất bản</label>
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            placeholder="Năm xuất bản"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mô tả sách"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          ></textarea>
        </div>

       
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nhà xuất bản</label>
          <input
            type="text"
            value={nxb}
            onChange={(e) => setNxb(e.target.value)}
            placeholder="Nhà xuất bản"
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại lớn</label>
      {selectedCategory === "other" ? (
        <input
          type="text"
          value={category[0].name}
          onChange={(e) => handleCustomCategoryChange(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập thể loại lớn"
        />
      ) : (
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Chọn thể loại</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          <option value="other">Thể loại khác</option>
        </select>
      )}
    </div>

    {selectedCategory && (
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Thể loại con</label>
        {selectedSubCategory === "other" ? (
          <input
            type="text"
            value={category[0].smallCategory[0] || ""}
            onChange={(e) => handleCustomSubCategoryChange(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập thể loại con"
          />
        ) : (
          <select
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="w-full p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Chọn thể loại con</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
            <option value="other">Thể loại con khác</option>
          </select>
        )}
      </div>
    )}


    
        <div className="col-span-2 text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Thêm sách
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;