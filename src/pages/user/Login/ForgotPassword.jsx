import React from "react";

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-md max-w-sm w-full h-[300px]">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Quên mật khẩu</h2>
            <p className="text-base text-gray-600 mb-5">
              Chúng tôi sẽ gửi lại mật khẩu vào tài khoản email của bạn
            </p>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full p-3 mb-5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full py-3 text-base bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
