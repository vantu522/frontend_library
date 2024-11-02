// src/utils/slugify.js
import slugify from 'slugify'

export const createSlug = (text) => {
  return slugify(text, {
    lower: true,      // Chuyển sang chữ thường
    strict: true,     // Loại bỏ ký tự đặc biệt
    locale: 'vi'      // Hỗ trợ tiếng Việt
  })
}