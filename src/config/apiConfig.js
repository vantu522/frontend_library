export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080', // Mặc định dùng localhost nếu không có biến môi trường
  USER: {
    BOOKS: '/books/categories',
    BOOK: '/books',
    SUGGESTBOOK: '/books/suggest',
    CATEGORYBOOK: '/books/categories',
  },
  ADMIN: {
    BOOKS: '/books',
    ADDBOOKS: '/books',
    DELETEBOOKS: '/books/delete',
    EDITBOOKS: '/books/update',
    CATEGORIES: '/books/categories',
    MEMBERS: '/members',
    ADDMEM: '/members/register',
    EDITMEMBER: '/members/update',
    DELETEMEM: '/members/delete',
    POSTS: '/posts',
    UPDATEPOSTS: '/posts/update',
    ADDPOSTS: '/posts',
    DELETEPOSTS: '/posts/delete',
    BORROWED: '/transactions/borrowed',
    ADDBORROWED: '/transactions/borrow',
    ADDRETURN: '/transactions/return',
    ADDRENEW: '/transactions/renew',
    RETURNED: '/transactions/returned',
    PENDING: '/transactions/pending',
    APPROVE: '/transactions/approve',
  },
  STATISTICS: {
    CATEGORY: '/books/category-distribution',
  },
  TRANSACTIONS: {
    BORROW: '/transactions/borrow',
    USER: '/transactions/user'
  },
  RATINGS: {
    SUBMIT: '/ratings/submit',
    GETRATINGS: '/ratings/book',
    GETAVG: "/ratings/book/average",
  }
};
