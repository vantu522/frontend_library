import React from "react";
import "./HomePage.css";

function CategoryPage() {
    return (
      <div className="category-page">
        <h2 className="category-title">Tên Thể Loại</h2>
        <div className="book-list">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div className="book-item" key={index}>
              <div className="book-image"></div>
              <button className="borrow-button">Mượn Ngay</button>
            </div>
          ))}
        </div>
        <button className="load-more-button">
          Hiện Thêm <span className="arrow">↓</span>
        </button>
      </div>
    );
}

export default CategoryPage;