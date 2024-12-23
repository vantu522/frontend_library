import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaReply} from "react-icons/fa";
import feedbackService from "../../../services/admin/feedbackService"; // Đảm bảo đường dẫn đúng
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table"; // Đảm bảo Table đã được cấu hình đúng
import FeedbackForm from "../Feedback/FeedbackForm"; // Import FeedbackForm

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]); // Dữ liệu phản hồi
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    id: null,
  });
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    id: null,
    feedback: null,
    response: "", // Lưu phản hồi admin
  });
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(""); // Trạng thái lỗi

  // Fetch feedbacks khi component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const data = await feedbackService.fetchFeedbacks(); // Gọi API lấy tất cả phản hồi
        setFeedbacks(data); // Cập nhật dữ liệu phản hồi
        console.log(data);
      } catch (error) {
        setError("Lỗi khi lấy phản hồi");
        console.error("Lỗi khi lấy phản hồi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks(); // Gọi API khi component mount
  }, []); // Chỉ gọi khi component mount lần đầu

  // Xử lý xóa phản hồi
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await feedbackService.deleteFeedback(id); // Gọi API xóa phản hồi
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id)); // Cập nhật lại danh sách phản hồi
      closeModal(); // Đóng modal
    } catch (error) {
      setError("Lỗi khi xóa phản hồi");
      console.error("Lỗi khi xóa phản hồi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mở modal xác nhận xóa
  const openModal = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  // Đóng modal xác nhận xóa
  const closeModal = () => {
    setConfirmModal({ isOpen: false, id: null });
  };

  // Mở modal để gửi phản hồi từ admin
  const openResponseModal = (id, feedback) => {
    setResponseModal({ isOpen: true, id, feedback, response: "" });
  };

  // Đóng modal phản hồi
  const closeResponseModal = () => {
    setResponseModal({ isOpen: false, id: null, feedback: null, response: "" });
  };

  // Cấu hình các cột cho bảng
  const columns = [
    { label: "Tên người gửi", field: "name" },
    { label: "Số điện thoại", field: "phoneNumber" },
    { label: "Nội dung", field: "content" },
    { label: "Ngày gửi", field: "createdAt", render: (value) => new Date(value).toLocaleDateString("vi-VN") },
    { label: "Trạng thái", field: "status" },
    { label: "Hành động", field: "actions", render: (value, row) => (
      <div className="flex justify-center gap-2">
        <button
          onClick={() => openModal(row.id)} // Mở modal xác nhận xóa
          className="text-red-500 hover:text-red-700"
        >
          <FaTrashAlt />
        </button>
        <button
          onClick={() => openResponseModal(row.id, row)} // Mở modal phản hồi admin
          className="text-blue-500 hover:text-blue-700"
        >
          <FaReply /> {/* Thay thế nút "Phản hồi" bằng icon */}
        </button>
      </div>
  ) }
  ];

  const data = feedbacks.map(feedback => ({
    ...feedback,
    actions: feedback.id, // Giữ lại ID để xóa khi cần
  }));

  return (
    <div className="p-4">
      {/* Modal xác nhận xóa */}
      <Modal
        isOpen={confirmModal.isOpen} // Sử dụng isOpen thay vì visible
        onClose={closeModal}
        title="Xác nhận xóa phản hồi"
      >
        <p className="mb-4">Bạn có chắc chắn muốn xóa phản hồi này?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            onClick={() => handleDelete(confirmModal.id)} // Đảm bảo ID đúng
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Xóa
          </button>
        </div>
      </Modal>

      {/* Modal phản hồi */}
      <FeedbackForm
        isModalOpen={responseModal.isOpen}
        onClose={closeResponseModal}
        feedbackId={responseModal.id}
        feedback={responseModal.feedback}
      />

      <h2 className="text-2xl font-bold mb-4">Danh sách phản hồi</h2>

      {/* Error state */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Empty state */}
      {!isLoading && feedbacks.length === 0 && <div className="text-center">Không có phản hồi nào.</div>}

      {/* Bảng phản hồi */}
      {!isLoading && feedbacks.length > 0 && <Table columns={columns} data={data} />}
    </div>
  );
};

export default FeedbackList;
