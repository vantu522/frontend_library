
import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./booksReducer";
import employeesReducer from "./employeesReducer";
import borrowsReducer from "./borrowsReducer";
import readerReducer from "./readerReducer"; 
import feedbackReducer from "./feedbackReducer"; 
import borrowHistoryReducer from "./borrowHistoryReducer";

const store = configureStore({
  reducer: {
    books: booksReducer,
    employees: employeesReducer,
    borrows: borrowsReducer,
    readers: readerReducer,
    feedbacks: feedbackReducer,
    borrowHistory: borrowHistoryReducer
  },
});

export default store;
