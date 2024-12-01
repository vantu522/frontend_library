import { createSlice } from "@reduxjs/toolkit";

const loadBooksFromLocalStorage = () => {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
};

const saveBooksToLocalStorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

const handleUpdateBookStatus = (book) => {
  const updatedBook = { ...book };
  updatedBook.status = updatedBook.quantity === 0 ? 'unavailable' : 'available';
  console.log(updatedBook);
};

const initialState = loadBooksFromLocalStorage();

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
      saveBooksToLocalStorage(state); 
    },
    updateBook: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        const updatedBook = { ...state[index], ...action.payload };
        updatedBook.status = updatedBook.quantity === 0 ? "unavailable" : "available";
        state[index] = updatedBook; 
        saveBooksToLocalStorage(state); 
      }
    },
    deleteBook: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1); 
        saveBooksToLocalStorage(state); 
      }
    },

    setPagination: (state, action) => {
      state.pagination = action.payload;
    }
  },
});

export const { addBook, updateBook, deleteBook, setPagination } = booksSlice.actions;
export default booksSlice.reducer;
