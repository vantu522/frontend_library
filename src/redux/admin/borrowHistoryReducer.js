
import { createSlice } from "@reduxjs/toolkit";


const loadHistoryFromLocalStorage = () => {
  const history = localStorage.getItem("borrowHistory");
  return history ? JSON.parse(history) : [];
};


const saveHistoryToLocalStorage = (history) => {
  localStorage.setItem("borrowHistory", JSON.stringify(history));
};

const borrowHistorySlice = createSlice({
  name: "borrowHistory",
  initialState: loadHistoryFromLocalStorage(),
  reducers: {
    addToHistory: (state, action) => {
      const updatedHistory = [...state, action.payload];
      saveHistoryToLocalStorage(updatedHistory); 
      return updatedHistory;
    },
  },
});

export const { addToHistory } = borrowHistorySlice.actions;
export default borrowHistorySlice.reducer;
