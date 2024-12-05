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
        <div className="bg-blue-100 rounded-l-lg shadow-lg p-5 w-80 h-[350px] flex flex-col items-center">
          <h2 className="font-bold text-lg">ĐĂNG NHẬP</h2>
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-11/12 p-2 my-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-11/12 p-2 my-2 border border-gray-300 rounded-lg"
            />
            <div className="w-11/12 text-right text-sm">
              <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded-full mt-4"
            >
              ĐĂNG NHẬP
            </button>
          </form>
        </div>
        <div className="bg-orange-400 rounded-r-lg shadow-lg p-5 w-80 h-[350px] flex flex-col items-center text-center">
          <h2 className="font-bold text-lg">XIN CHÀO</h2>
          <p className="text-xl my-4">
            Nhập thông tin cá nhân của bạn và cùng chúng tôi khởi đầu hành trình thú vị này!
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-2 px-4 rounded-full mt-4"
          >
            ĐĂNG KÝ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
