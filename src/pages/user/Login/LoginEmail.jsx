import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Success');
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="flex">
        {/* Form Đăng Nhập */}
        <div className="bg-blue-100 rounded-l-lg shadow-lg p-10 w-[400px] h-auto flex flex-col items-center">
          <h2 className="font-bold text-2xl mb-4">ĐĂNG NHẬP</h2>
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 my-3 border border-gray-300 rounded-lg text-lg"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 my-3 border border-gray-300 rounded-lg text-lg"
            />
            <div className="w-full text-right text-sm">
              <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-[#OA7075] hover:bg-[#9F5F64] text-black font-bold py-3 px-6 rounded-full mt-6 text-lg transition-colors"
            >
              ĐĂNG NHẬP
            </button>
          </form>
        </div>

        <div className="bg-[#OA7075] rounded-r-lg shadow-lg p-10 w-[400px] h-auto flex flex-col items-center text-center">
          <h2 className="font-bold text-2xl text-black mb-4">XIN CHÀO</h2>
          <p className="text-xl text-black my-6">
            Nhập thông tin cá nhân của bạn và cùng chúng tôi khởi đầu hành trình thú vị này!
          </p>
          <Link
            to="/signup"
            className="bg-white hover:bg-gray-200 text-[#OA7075] font-bold py-3 px-6 rounded-full mt-6 text-lg transition-colors"
          >
            ĐĂNG KÝ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
