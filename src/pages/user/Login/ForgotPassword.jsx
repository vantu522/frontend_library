import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Gửi OTP qua API
  const handleSendOTP = async () => {
    try {
      await axios.post("https://library-mana.azurewebsites.net/members/send-otp", { email });
      setStep(2); // Chuyển sang bước nhập OTP
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Không thể gửi OTP. Vui lòng kiểm tra email.");
    }
  };

  // Xác nhận OTP
  const handleVerifyOTP = async () => {
    try {
      await axios.post("https://library-mana.azurewebsites.net/members/reset", { email, otp });
      setStep(3); // Chuyển sang bước cập nhật mật khẩu mới
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Mã OTP không hợp lệ.");
    }
  };

  // Cập nhật mật khẩu mới
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }
    try {
      await axios.post("https://library-mana.azurewebsites.net/members/change", {
        email,
        otp,
        newPassword,
      });
      alert("Mật khẩu đã được cập nhật thành công!");
  
      // Reset input và trạng thái
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
      setStep(1); // Reset về bước đầu tiên
  
      // Điều hướng sang trang đăng nhập
      window.location.href = "/login"; 
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
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
                className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Nhập mã OTP</h2>
              <p className="text-base text-gray-600 mb-5">Vui lòng nhập mã OTP đã gửi đến email</p>
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
              <button
                onClick={handleVerifyOTP}
                className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-300"
              >
                Xác nhận
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Cập nhật mật khẩu</h2>
              <p className="text-base text-gray-600 mb-5">Nhập mật khẩu mới của bạn</p>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              {errorMessage && <p className="text-red-500 text-sm mb-3">{errorMessage}</p>}
              <button
                onClick={handleUpdatePassword}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
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
