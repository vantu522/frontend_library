// src/utils/slugify.js
import slugify from 'slugify';

export const createSlug = (text) => {
  if (!text) return ''; // Kiểm tra nếu text không có giá trị

  // Thay thế dấu "/" bằng "-"
  const modifiedText = text.replace(/\//g, '-');

  // Tạo slug từ chuỗi đã được xử lý
  return slugify(modifiedText, {
    lower: true,      // Chuyển sang chữ thường
    strict: true,     // Loại bỏ ký tự đặc biệt
    locale: 'vi'      // Hỗ trợ tiếng Việt
  });
}

