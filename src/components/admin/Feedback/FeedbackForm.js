import React, { useState, useEffect } from 'react';
import feedbackService from '../../../services/admin/feedbackService'; // Đảm bảo đường dẫn đúng
import Modal from '../../../common/admin/Modal/Modal'; // Đảm bảo đường dẫn đúng

const FeedbackForm = ({ feedbackId, isModalOpen, onClose }) => {
  const [feedback, setFeedback] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const data = await feedbackService.fetchFeedbacks();
        const selectedFeedback = data.find(f => f.id === feedbackId);
        setFeedback(selectedFeedback);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phản hồi:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (feedbackId) {
      fetchFeedback();
    }
  }, [feedbackId]);

  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!response.trim()) {
      alert("Vui lòng nhập phản hồi.");
      return;
    }

    try {
      await feedbackService.respondToFeedback(feedbackId, { message: response });
      alert("Phản hồi đã được gửi thành công!");
      onClose(); // Đóng modal sau khi gửi phản hồi
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
      alert("Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Đang tải thông tin phản hồi...</p>;
  }

  if (!feedback) {
    return <p className="text-center text-lg">Không tìm thấy phản hồi này.</p>;
  }

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title="Phản hồi">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow-lg rounded-md">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Tên:</label>
          <input 
            type="text" 
            id="name" 
            value={feedback.name} 
            readOnly 
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={feedback.email} 
            readOnly 
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Số điện thoại:</label>
          <input 
            type="text" 
            id="phoneNumber" 
            value={feedback.phoneNumber} 
            readOnly 
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">Nội dung</label>
          <textarea 
            id="content" 
            value={feedback.content} 
            readOnly 
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="response" className="text-sm font-medium text-gray-700">Phản hồi của Admin:</label>
          <textarea
            id="response"
            value={response}
            onChange={handleResponseChange}
            placeholder="Nhập phản hồi của admin"
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!response.trim()}
        >
          Gửi phản hồi
        </button>
      </form>
    </Modal>
  );
};

export default FeedbackForm;
