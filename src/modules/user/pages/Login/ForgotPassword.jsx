import React from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <div className="form-background">
      <div className="form-container">
        <div className="form-body">
          <div className="forgot_password">
            <h2 className="title">Quên mật khẩu</h2>
            <p className="script">
              Chúng tôi sẽ gửi lại mật khẩu vào tài khoản email của bạn
            </p>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="input-email"
            />
            <button className="submit-btn">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
