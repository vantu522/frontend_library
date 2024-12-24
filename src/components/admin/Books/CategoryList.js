// import React, { useState, useEffect } from "react";
// import Table from "../../../common/admin/Table/Table";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import bookService from "../../../services/admin/booksService";
// const LiteratureCategoryList = () => {
//   const [categories, setCategories] = useState([]);
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [editSubCategoryId, setEditSubCategoryId] = useState(null);
//   const [newSubCategoryName, setNewSubCategoryName] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const data = await bookService.fetchCategories();
//         setCategories(data);
//       } catch (error) {
//         setError("Có lỗi khi lấy dữ liệu thể loại");
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);



//   const columns = [
//     { label: "Thể Loại Lớn", field: "name" },
//     {
//       label: "Thể Loại Nhỏ",
//       render: (val, row) => (
//         <div>
       
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return <div className="p-6">Đang tải dữ liệu...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Danh Sách Thể Loại</h2>

   

//       <Table columns={columns} data={filteredCategories} type="category" />
//     </div>
//   );
// };

// export default LiteratureCategoryList;