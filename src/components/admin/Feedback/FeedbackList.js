import React, { useState, useEffect } from "react";
import { FaReply, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import feedbackService from "../../../services/admin/feedbackService";
import Table from "../../../common/admin/Table/Table";
import FeedbackForm from "../Feedback/FeedbackForm";
import Modal from "../../../common/admin/Modal/Modal";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [responseModal, setResponseModal] = useState({
    isOpen: false,
    id: null,
    feedback: null,
    response: "",
  });
  const [viewResponseModal, setViewResponseModal] = useState({
    isOpen: false,
    response: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const allFeedbacks = await feedbackService.fetchFeedbacks();
        setFeedbacks(allFeedbacks);
      } catch (error) {
        setError("Lỗi khi lấy phản hồi");
        console.error("Lỗi khi lấy phản hồi:", error);
      } finally {
        setIsLoading(false);
        setPageLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const openResponseModal = (id, feedback) => setResponseModal({ isOpen: true, id, feedback, response: "" });
  const closeResponseModal = () => setResponseModal({ isOpen: false, id: null, feedback: null, response: "" });
  const openViewResponseModal = (response) => setViewResponseModal({ isOpen: true, response });
  const closeViewResponseModal = () => setViewResponseModal({ isOpen: false, response: "" });

  const handleResponseSubmit = async (id, response) => {
    setIsLoading(true);
    try {
      await feedbackService.respondToFeedback(id, { response });
      setFeedbacks((prevState) =>
        prevState.map((feedback) =>
          feedback.id === id ? { ...feedback, status: "Responded", response } : feedback
        )
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
    {
      label: "Trạng thái",
      field: "status",
      render: (value) =>
        value === "Pending"
          ? "Chờ xử lý"
          : value === "Responded"
          ? "Đã phản hồi"
          : "Không xác định",
    },
    {
      label: "Hành động",
      field: "actions",
      render: (value, row) => (
        <div className="flex justify-center gap-2">
          {row.status === "Pending" && (
            <button onClick={() => openResponseModal(row.id, row)} className="text-blue-500 hover:text-blue-700">
              <FaReply size={25} />
            </button>
          )}
          {row.status === "Responded" && (
            <button onClick={() => openViewResponseModal(row.response)} className="text-green-500 hover:text-green-700">
              <FaEye size={25} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      {pageLoading ? (
        <div className="flex justify-center items-center h-screen mt-[-150px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4 text-gray-700">Đang tải danh sách...</span>
        </div>
      ) : (
        <>
          <FeedbackForm
            isModalOpen={responseModal.isOpen}
            onClose={closeResponseModal}
            feedbackId={responseModal.id}
            feedback={responseModal.feedback}
            onSubmitResponse={handleResponseSubmit}
          />

          {viewResponseModal.isOpen && (
            <Modal isOpen={viewResponseModal.isOpen} onClose={closeViewResponseModal} title="Câu trả lời của Admin">
              <div className="p-4">
                <p>{viewResponseModal.response}</p>
              </div>
            </Modal>
          )}

          <h2 className="text-2xl font-bold mb-4">Danh sách phản hồi</h2>

          {error && <div className="text-center text-red-500">{error}</div>}

          {isLoading ? (
            <div className="text-center">Đang tải dữ liệu...</div>
          ) : (
            <Table columns={columns} data={feedbacks} />
          )}
        </>
      )}
    </div>
  );
};

export default FeedbackList;