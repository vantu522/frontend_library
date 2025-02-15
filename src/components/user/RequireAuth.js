import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    localStorage.setItem('redirectUrl', window.location.pathname);
    navigate('/login');
  };

 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Yêu cầu đăng nhập</h2>
          <p className="text-gray-600 mb-6">
            Vui lòng đăng nhập hoặc đăng ký để tiếp tục
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Đăng nhập
          </button>
          
          
          
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-600 py-2 px-4 rounded hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

const RequireAuth = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    if (!user) {
      setShowModal(true);
    }
  }, [user]);

  // Nếu có user thì hiển thị component con
  if (user) {
    return children;
  }

  // Nếu không có user, hiển thị modal và không render children
  return (
    <AuthModal 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
    />
  );
};

export default RequireAuth;