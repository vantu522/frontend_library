import React, { useState, useEffect } from "react";
import Modal from "../../../common/admin/Modal/Modal";
import { toast } from "react-toastify";

const FeedbackForm = ({ feedbackId, isModalOpen, onClose, feedback, onSubmitResponse }) => {
  const [response, setResponse] = useState(feedback ? feedback.response || "" : "");
  
  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!response.trim()) {
      toast.warn("Vui lòng nhập nội dung phản hồi.");
      return;
    }
    onSubmitResponse(feedbackId, response);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} title="Phản hồi">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow-lg rounded-md">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium">Tên:</label>
          <input type="text" id="name" value={feedback?.name} readOnly className="mt-1 px-3 py-2 border rounded bg-gray-100" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNumber" className="text-sm font-medium">Số điện thoại:</label>
          <input type="text" id="phoneNumber" value={feedback?.phoneNumber} readOnly className="mt-1 px-3 py-2 border rounded bg-gray-100" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium">Email:</label>
          <input type="email" id="email" value={feedback?.email} readOnly className="mt-1 px-3 py-2 border rounded bg-gray-100" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-sm font-medium">Nội dung:</label>
          <textarea
            id="content"
            value={feedback?.content}
            readOnly
            className="mt-1 px-3 py-2 border rounded bg-gray-100"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="response" className="text-sm font-medium">Phản hồi của Admin:</label>
          {feedback?.status === "Responded" ? (
            <textarea
              id="response"
              value={feedback?.response || ""}
              readOnly
              className="mt-1 px-3 py-2 border rounded bg-gray-100"
            />
          ) : (
            <textarea
              id="response"
              value={response}
              onChange={handleResponseChange}
              placeholder="Nhập phản hồi của admin"
              className="mt-1 px-3 py-2 border rounded focus:ring-2"
            />
          )}
        </div>
        {feedback?.status !== "Responded" && (
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={!response.trim()}>
            Gửi phản hồi
          </button>
        )}
      </form>
    </Modal>
  );
};

export default FeedbackForm;
