import { createSlice } from "@reduxjs/toolkit";

const loadBooksFromLocalStorage = () => {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

const saveBooksToLocalStorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

const booksSlice = createSlice({
  name: "books",
  initialState: loadBooksFromLocalStorage(),
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
      saveBooksToLocalStorage(state); 
    },
    updateBook: (state, action) => {
      const updatedBook = action.payload;
      const index = state.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        state[index] = updatedBook;
        saveBooksToLocalStorage(state); 
      }
    },
    deleteBook: (state, action) => {
      const updatedState = state.filter((book) => book.id !== action.payload);
      saveBooksToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const { addBook, updateBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;
