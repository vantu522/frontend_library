import React, { useState } from "react";
import Table from "../../../../common/admin/Table/Table"; 
import { FaCheck, FaTimes } from "react-icons/fa"; 

const LiteratureCategoryList = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Văn học",
      subCategories: [
        { id: 1, name: "Thơ" },
        { id: 2, name: "Truyện" },
      ],
    },
    {
      id: 2,
      name: "Khoa học",
      subCategories: [
        { id: 1, name: "Vật lý" },
        { id: 2, name: "Hóa học" },
      ],
    },
  ]);

  const [editCategoryId, setEditCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 

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
            <div>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <FaCheck
                onClick={() => handleSaveCategory(row.id)}
                style={{ cursor: "pointer", marginLeft: 8 }}
              />
              <FaTimes
                onClick={handleCancelCategory}
                style={{ cursor: "pointer", marginLeft: 8 }}
              />
            </div>
          ) : (
            <span onClick={() => handleEditCategory(row.id)}>{row.name}</span>
          )}

          {row.subCategories.map((subCategory) => (
            <div key={subCategory.id}>
              {editSubCategoryId === subCategory.id ? (
                <div>
                  <input
                    type="text"
                    value={newSubCategoryName}
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                  />
                  <FaCheck
                    onClick={() => handleSaveSubCategory(subCategory.id, row.id)}
                    style={{ cursor: "pointer", marginLeft: 8 }}
                  />
                  <FaTimes
                    onClick={handleCancelSubCategory}
                    style={{ cursor: "pointer", marginLeft: 8 }}
                  />
                </div>
              ) : (
                <span onClick={() => handleEditSubCategory(subCategory.id, row.id)}>
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
    <div>
      <h2>Thể loại</h2>

      <input
        type="text"
        placeholder="Tìm kiếm thể loại"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <Table columns={columns} data={filteredCategories} type="category" />
    </div>
  );
};

export default LiteratureCategoryList;
