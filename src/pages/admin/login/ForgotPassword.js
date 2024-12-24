import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Bước 1: Nhập email, Bước 2: Nhập OTP và mật khẩu mới
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Gửi email để nhận OTP
  const handleSendOTP = async () => {
    try {
      const response = await axios.post("https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/librarians/send-otp", {
        email,
      });
      console.log(response.data.message);
      setStep(2); // Chuyển sang bước nhập OTP
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Không thể gửi OTP. Vui lòng kiểm tra email.");
    }
  };

  // Gửi OTP và cập nhật mật khẩu mới
  const handleResetPassword = async () => {
    try {
      const response = await axios.post("https://librarybe-f7dpbmd5fte9ggd7.southeastasia-01.azurewebsites.net/librarians/reset", {
        email,
        otp,
        newPassword,
      });
      console.log(response.data.message);
      alert("Mật khẩu đã được cập nhật thành công!");
  
      // Chuyển về trang login
      navigate("/admin/loginemail");
  
      // Reset lại trạng thái input
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (error) {
      setErrorMessage("OTP không hợp lệ hoặc có lỗi xảy ra.");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-md max-w-sm w-full">
        <div className="text-center">
          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Quên mật khẩu</h2>
              <p className="text-base text-gray-600 mb-5">
                Chúng tôi sẽ gửi mã OTP vào email của bạn
              </p>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
              <button
                onClick={handleSendOTP}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Gửi OTP
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Đặt lại mật khẩu</h2>
              <p className="text-base text-gray-600 mb-5">Nhập mã OTP và mật khẩu mới</p>
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
              <button
                onClick={handleResetPassword}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Cập nhật mật khẩu
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
