import React, { useState } from 'react';
import Modal from '../../../common/admin/Modal/Modal'; // Import Modal component
import axios from 'axios';

function ChangePassword({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await axios.post('https://library-mana.azurewebsites.net/librarians/change', {
        currentPassword,
        newPassword
      });

      if (response.status === 200) {
        setStatusMessage('Đổi mật khẩu thành công!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setStatusMessage(
        error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.'
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Đổi Mật Khẩu">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
            Mật khẩu hiện tại
          </label>
          <input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu mới
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="py-1 px-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Đổi Mật Khẩu
          </button>
        </div>
      </form>
      {statusMessage && <p className="mt-4 text-center text-sm text-red-500">{statusMessage}</p>}
    </Modal>
  );
}

export default ChangePassword;
