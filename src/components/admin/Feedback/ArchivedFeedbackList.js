// src/components/admin/Feedback/ArchivedFeedbackList.js
import React from "react";
import { useSelector } from "react-redux";
import Table from "../../../common/admin/Table/Table";

const ArchivedFeedbackList = () => {
  const archivedFeedbacks = useSelector(
    (state) => state.feedbacks.archivedFeedbacks
  );

  const columns = [
    { label: "Họ Tên", field: "name" },
    { label: "Email", field: "email" },
    { label: "Câu Hỏi", field: "question" },
    { label: "Phản Hồi", field: "feedback" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-700 mb-6">Danh Sách Phản Hồi Đã Lưu Trữ</h1>
      
      <Table columns={columns} data={archivedFeedbacks} />
    </div>
  );
};

export default ArchivedFeedbackList;
