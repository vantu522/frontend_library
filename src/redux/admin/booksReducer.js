import { createSlice } from '@reduxjs/toolkit';
import bookService from '../../services/admin/booksService';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return action.payload;
    },
    addBook: (state, action) => {
      state.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload.id);
    }
  }
});

export const { setBooks, addBook, updateBook, deleteBook } = booksSlice.actions;

// Thêm action fetchBooks để gọi API
export const fetchBooks = () => async (dispatch) => {
  try {
    const books = await bookService.fetchAllBooks();
    dispatch(setBooks(books));
  } catch (error) {
    console.error('Failed to fetch books:', error);
  }
};

export default booksSlice.reducer;
