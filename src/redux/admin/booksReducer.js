import { createSlice } from '@reduxjs/toolkit';
import bookService from '../../services/admin/booksService';

const initialState = {
  data: [],
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
  booksPerPage: 10
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooks: (state, action) => {
      state.data = action.payload.books;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalItems = action.payload.totalItems;
      state.booksPerPage = action.payload.booksPerPage;
    },
    addBook: (state, action) => {
      state.data.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.data.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    
    deleteBook: (state, action) => {
      state.data = state.data.filter((book) => book.id !== action.payload);
    }
  }
});

export const { fetchBooks, addBook, updateBook, deleteBook } = booksSlice.actions;

export default booksSlice.reducer;