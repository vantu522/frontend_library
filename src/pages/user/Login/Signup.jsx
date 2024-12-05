import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup Success');
    navigate('/loginemail');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex">
        {/* Welcome Section */}
        <div className="flex flex-col items-center bg-orange-300 rounded-l-lg shadow-md p-6 w-80">
          <h2 className="font-bold text-xl mb-4">CHÀO MỪNG TRỞ LẠI</h2>
          <p className="text-center text-lg mb-6">
            Hãy đăng nhập bằng thông tin cá nhân của bạn để không bỏ lỡ bất kỳ điều gì từ chúng tôi!
          </p>
          <Link
            to="/loginemail"
            className="bg-orange-500 text-black font-bold py-2 px-6 rounded-full hover:bg-orange-400"
          >
            ĐĂNG NHẬP
          </Link>
        </div>

        {/* Signup Form */}
        <div className="flex flex-col items-center bg-blue-100 rounded-r-lg shadow-md p-6 w-80">
          <h2 className="font-bold text-xl mb-4">ĐĂNG KÝ</h2>
          <form onSubmit={handleSignup} className="w-full">
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-orange-400"
            >
              ĐĂNG KÝ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
