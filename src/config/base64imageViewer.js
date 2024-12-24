import React, { useState } from 'react';

const Base64ImageViewer = () => {
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    setBase64String(input);
    setError('');

    // Check if the string is valid base64
    try {
      atob(input.split(',')[1] || input);
    } catch (e) {
      setError('Chuỗi base64 không hợp lệ');
    }
  };

  const renderImage = () => {
    if (!base64String) return null;

    const imageSource = base64String.startsWith('data:')
      ? base64String
      : `data:image/png;base64,${base64String}`;

    return (
      <div className="mt-4">
        <img
          src={imageSource}
          alt="Base64 decoded"
          className="max-w-full h-auto rounded-lg"
          onError={() => setError('Không thể hiển thị ảnh. Vui lòng kiểm tra chuỗi base64.')}
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <div className="p-6">
        <div className="space-y-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập chuỗi base64 của ảnh vào đây..."
            value={base64String}
            onChange={handleInputChange}
          />
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {renderImage()}
        </div>
      </div>
    </div>
  );
};

export default Base64ImageViewer;

