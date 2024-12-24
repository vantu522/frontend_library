import React, { useState, useEffect } from "react";
import Table from "../../../common/admin/Table/Table"; 
import { FaCheck, FaTimes } from "react-icons/fa"; 
import axios from 'axios';
import { API_ENDPOINTS } from "../../../config/apiConfig"; // Import API endpoints

const LiteratureCategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

  // Fetch categories from API when the component mounts
  useEffect(() => {
    axios.get(API_ENDPOINTS.ADMIN.CATEGORIES) // Use the API endpoint from API_ENDPOINTS object
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu thể loại:", error);
      });
  }, []);

  const handleEditCategory = (id) => {
    setEditCategoryId(id);
    const category = categories.find((category) => category.id === id);
    setNewCategoryName(category.name);
  };

  const handleSaveCategory = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, name: newCategoryName } : category
    );
    setCategories(updatedCategories);
    setEditCategoryId(null);
    setNewCategoryName("");
  };

  const handleCancelCategory = () => {
    setEditCategoryId(null);
    setNewCategoryName("");
  };

  const handleEditSubCategory = (id, parentId) => {
    setEditSubCategoryId(id);
    const category = categories.find((category) => category.id === parentId);
    const subCategory = category.subCategories.find((sub) => sub.id === id);
    setNewSubCategoryName(subCategory.name);
  };

  const handleSaveSubCategory = (id, parentId) => {
    const updatedCategories = categories.map((category) =>
      category.id === parentId
        ? {
            ...category,
            subCategories: category.subCategories.map((subCategory) =>
              subCategory.id === id
                ? { ...subCategory, name: newSubCategoryName }
                : subCategory
            ),
          }
        : category
    );
    setCategories(updatedCategories);
    setEditSubCategoryId(null);
    setNewSubCategoryName("");
  };

  const handleCancelSubCategory = () => {
    setEditSubCategoryId(null);
    setNewSubCategoryName("");
  };

  const filteredCategories = categories
    .map((category) => {
      const filteredSubCategories = category.subCategories.filter((subCategory) =>
        subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...category,
        matchesSearch: category.name.toLowerCase().includes(searchTerm.toLowerCase()),
        subCategories: filteredSubCategories,
      };
    })
    .filter(
      (category) => category.matchesSearch || category.subCategories.length > 0
    );

  const columns = [
    { label: "Thể Loại Lớn", field: "name" },
    {
      label: "Thể Loại Nhỏ",
      render: (val, row) => (
        <div>
          {editCategoryId === row.id ? (
            <div className="flex items-center">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md shadow-sm"
              />
              <FaCheck
                onClick={() => handleSaveCategory(row.id)}
                style={{ cursor: "pointer", marginLeft: 8 }}
                className="text-green-500"
              />
              <FaTimes
                onClick={handleCancelCategory}
                style={{ cursor: "pointer", marginLeft: 8 }}
                className="text-red-500"
              />
            </div>
          ) : (
            <span
              onClick={() => handleEditCategory(row.id)}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {row.name}
            </span>
          )}

          {row.subCategories.map((subCategory) => (
            <div key={subCategory.id} className="ml-4 mt-2">
              {editSubCategoryId === subCategory.id ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newSubCategoryName}
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <FaCheck
                    onClick={() => handleSaveSubCategory(subCategory.id, row.id)}
                    style={{ cursor: "pointer", marginLeft: 8 }}
                    className="text-green-500"
                  />
                  <FaTimes
                    onClick={handleCancelSubCategory}
                    style={{ cursor: "pointer", marginLeft: 8 }}
                    className="text-red-500"
                  />
                </div>
              ) : (
                <span
                  onClick={() => handleEditSubCategory(subCategory.id, row.id)}
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {subCategory.name}
                </span>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Danh Sách Thể Loại</h2>

      <input
        type="text"
        placeholder="Tìm kiếm thể loại"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-md mb-4 w-full"
      />

      <Table columns={columns} data={filteredCategories} type="category" />
    </div>
  );
};

export default LiteratureCategoryList;
