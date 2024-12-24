import React, { useState, useEffect } from "react";
import { FaReply } from "react-icons/fa";
import { toast } from "react-toastify"; // Thông báo
import feedbackService from "../../../services/admin/feedbackService";
import Modal from "../../../common/admin/Modal/Modal";
import Table from "../../../common/admin/Table/Table";
import FeedbackForm from "../Feedback/FeedbackForm";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    id: null,
    feedback: null,
    response: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const data = await feedbackService.fetchFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        setError("Lỗi khi lấy phản hồi");
        console.error("Lỗi khi lấy phản hồi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  const openResponseModal = (id, feedback) => setResponseModal({ isOpen: true, id, feedback, response: "" });
  const closeResponseModal = () => setResponseModal({ isOpen: false, id: null, feedback: null, response: "" });

  const handleResponseSubmit = async (id, response) => {
    setIsLoading(true);
    try {
      await feedbackService.respondToFeedback(id, { message: response });
      setFeedbacks(
        feedbacks.map((feedback) => (feedback.id === id ? { ...feedback, status: "Đã phản hồi" } : feedback))
      );
      toast.success("Phản hồi đã được gửi thành công!");
      closeResponseModal();
    } catch (error) {
      setError("Lỗi khi gửi phản hồi");
      console.error("Lỗi khi gửi phản hồi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { label: "Tên người gửi", field: "name" },
    { label: "Số điện thoại", field: "phoneNumber" },
    { label: "Nội dung", field: "content" },
    { label: "Ngày gửi", field: "createdAt", render: (value) => new Date(value).toLocaleDateString("vi-VN") },
    { label: "Trạng thái", field: "status" },
    {
      label: "Hành động",
      field: "actions",
      render: (value, row) => (
        <div className="flex justify-center gap-2">
          <button onClick={() => openResponseModal(row.id, row)} className="text-blue-500 hover:text-blue-700">
            <FaReply size={25}/>
          </button>
        </div>
      ),
    },
  ];

  const data = feedbacks.map((feedback) => ({ ...feedback, actions: feedback.id }));

  return (
    <div className="p-4">
      <FeedbackForm
        isModalOpen={responseModal.isOpen}
        onClose={closeResponseModal}
        feedbackId={responseModal.id}
        feedback={responseModal.feedback}
        onSubmitResponse={handleResponseSubmit}
      />

      <h2 className="text-2xl font-bold mb-4">Danh sách phản hồi</h2>

      {error && <div className="text-center text-red-500">{error}</div>}
      {!isLoading && feedbacks.length === 0 && <div className="text-center">Không có phản hồi nào.</div>}
      {!isLoading && feedbacks.length > 0 && <Table columns={columns} data={data} />}
    </div>
  );
};

export default FeedbackList;
