// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="container">
      <Header />
      <main className="content">
        <p className="quote">
          “Đọc sách rất quan trọng. Đó là cách để chúng ta đặt mình vào hoàn cảnh
          của người khác, từ đó gây dựng lòng đồng cảm sâu sắc. Thế giới câu
          chuyện trong sách cho chúng ta khả năng tĩnh lặng và độc lập, hai điều
          đang biến mất nhanh hơn nước băng tan ở vùng cực.”
        </p>
        <button className="btn">MƯỢN NGAY</button>
      </main>
    </div>
  );
}

export default HomePage;
