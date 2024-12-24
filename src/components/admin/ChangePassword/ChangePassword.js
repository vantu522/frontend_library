import React, { useState } from 'react';
import Modal from '../../../common/admin/Modal/Modal'; // Import Modal component
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

function ChangePassword({ isOpen, onClose }) {
  const [username, setUsername] = useState('');  // Trường nhập username
  const [oldPassword, setOldPassword] = useState('');  // oldPassword
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatusMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await axios.post('https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/librarians/change', {
        username,  // Truyền username
        oldPassword,  // Truyền oldPassword
        newPassword
      });

      if (response.status === 200) {
        setStatusMessage('Đổi mật khẩu thành công!');
        setUsername('');
        setOldPassword('');
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
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Tên người dùng
          </label>
          <div className="relative">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="old-password" className="block text-sm font-medium text-gray-700">
            Mật khẩu cũ
          </label>
          <div className="relative">
            <input
              id="old-password"
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} className="text-gray-500 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="new-password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} className="text-gray-500 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-gray-500 w-5 h-5" />
            </button>
          </div>
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
